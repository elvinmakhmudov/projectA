const config = require('../config.json');
const {
    Builder,
    By,
    until
} = require('selenium-webdriver');
import chrome from 'selenium-webdriver/chrome';
import db from './database/database.js';
import Page from './models/page';
import Post from './models/post';
import User from './models/user';
import Cookie from './models/cookie';
import analyzator from './analyzator.js';

class InstagramAPI {
    constructor(login, password) {
        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
    }

    init() {
        let options = config.headless ? new chrome.Options().headless() : new chrome.Options();
        this.driver = new Builder()
            .forBrowser(config.browser)
            .setChromeOptions(options)
            .build();
        this.dbase = db.init();
        return this;
    }

    logIn() {
        return new Promise(async function (resolve) {
            let driver = this.driver;
            await driver.get(config.urls.login);
            let cookies = await Cookie.find({
                username: config.instagram.login
            });
            if (cookies.length !== 0) {
                await this.cookieLogIn(cookies).then(function () {
                    console.log('Logged in with Cookies');
                    resolve();
                })
            } else {
                await driver.wait(until.elementLocated(By.name("username")), config.timeout);
                await driver.findElement(By.name('username')).sendKeys(this.login);
                await driver.findElement(By.name('password')).sendKeys(this.password);
                await driver.findElement(By.className('_qv64e _gexxb _4tgw8 _njrw0')).click();
                await driver.sleep(2000).then(() => resolve());
                console.log('Logged in');
                //set cookies 
                await this.setCookies(this.login)
            }
        }.bind(this))
    }

    async cookieLogIn(cookies) {
        return new Promise(async function (resolve, reject) {
            if (cookies.length !== 0) {
                for (let i = 0; i < cookies.length; i++) {
                    await this.driver.manage().addCookie(JSON.parse(cookies[i].cookies));
                }
                resolve();
            }
        }.bind(this))
    }

    async setCookies(username) {
        return new Promise(async function (resolve, reject) {
            let cookies = await this.driver.manage().getCookies();
            let cookiesArr = [];
            for (let i = 0; i < cookies.length; i++) {
                cookiesArr.push(new Cookie({
                    username: username,
                    cookies: JSON.stringify(cookies[i])
                }));
            }
            await Cookie.find({
                username: username
            }).remove().exec();
            await Cookie.insertMany(cookiesArr, () => console.log('Cookie collection was populated'));
            resolve();
        }.bind(this))
    }

    goToProfile() {
        return new Promise(function (resolve) {
            this.driver.wait(until.elementLocated(By.className('coreSpriteDesktopNavProfile')), config.timeout);
            this.driver.findElement(By.className('coreSpriteDesktopNavProfile')).click().then(() => resolve());
        }.bind(this))
    }

    getAndSaveFollowings() {
        return new Promise(function (resolve) {
            this.driver.wait(until.elementLocated(By.partialLinkText('following')), config.timeout);
            this.driver.sleep(2000);
            this.driver.findElement(By.partialLinkText('following')).click();
            this.driver.sleep(2000);
            console.log('Getting followings');
            let scrollElement = this.driver.wait(until.elementLocated(By.className('_2g7d5 notranslate _o5iw8')), config.timeout);
            scrollElement.then(function () {
                this.scrollFollowings(0).then(function () {
                    this.driver.findElements(By.className('_2g7d5 notranslate _o5iw8')).then(function (followings) {
                        let followingsArr = [];
                        for (let i = 0; i < followings.length; i++) {
                            followings[i].getText().then(function (following) {
                                followingsArr.push(new Page({
                                    'username': following,
                                    'type': 'private'
                                }))
                                if (followingsArr.length === followings.length) {
                                    Page.collection.drop({}, () => console.log('Collection was cleared'))
                                    Page.insertMany(followingsArr, () => console.log('Collection was populated'));
                                    resolve();
                                }
                            }.bind(this))
                        }
                    }.bind(this));
                }.bind(this));
            }.bind(this))
        }.bind(this))
    }

    scrollFollowings(scrollTop) {
        return new Promise(function (resolve) {
            let scrolled = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;');
            this.driver.sleep(1000);
            scrolled.then(function () {
                let currentScroll = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;return objDiv.scrollTop;').then(function (current) {
                    if (scrollTop !== current) {
                        this.driver.sleep(500);
                        return this.scrollFollowings(current).then(function () {
                            return resolve()
                        }.bind(this));
                    } else {
                        return resolve();
                    }
                }.bind(this));
            }.bind(this))
        }.bind(this))
    }

    getPrivatePages() {
        var d = new Date();
        d.setDate(d.getDate() - config.oldestPageInDays);
        let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        //IN PROD CHANGE $lt TO $gt
        return Page.find({
            reviewed: false,
            reviewed_at: {
                $lt: yesterdayInMseconds
            },
            type: 'private'
        })
    }

    goToUsername(username) {
        console.log('Reviewing ' + username);
        return this.driver.get(config.urls.main + username);
    }

    savePostsToAnalyze(username) {
        return new Promise(async function (resolve, reject) {
            //fetch posts
            if (await this.driver.findElements(By.className("_kcrwx")) != 0) return resolve();
            this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
            let posts = await this.driver.findElements(By.css('._mck9w a'));
            let postsArr = [];
            for (let i = 0; i < posts.length; i++) {
                let href = await posts[i].getAttribute('href');
                postsArr.push(new Post({
                    'url': href,
                    'username': username,
                    'type': 'analyze'
                }));
                if (postsArr.length === posts.length) {
                    Page.update({
                        username: username
                    }, {
                        $set: {
                            reviewed: true,
                            reviewed_at: Date.now()
                        }
                    })
                    await Post.insertMany(postsArr, () => console.log(posts.length + ' items were added to collection'));
                    resolve();
                }
            }
        }.bind(this));
    }

    async getNewUsers() {
        try {
            let posts = await Post.find({
                type: 'analyze'
            });
            let postsToDelete = [];
            let users = await User.find({
                type: 'analyze'
            }) || [];
            let newUsers = [];
            for (let i = 0; i < posts.length; i++) {
                await this.driver.get(posts[i].url);
                // postsToDelete.push(posts[i].url)
                //if page has been removed then break
                if (await this.driver.findElements(By.className("error-container")) != 0) continue;
                console.log(await this.driver.findElements(By.className("error-container")) != 0);
                console.log((i + 1) + ' of ' + posts.length + ' posts.')
                await this.driver.wait(until.elementLocated(By.className("_2g7d5")));
                let comments = await this.driver.findElements(By.className("_ezgzd"));
                let likes = await this.driver.findElements(By.className("_nzn1h")) != 0 ? await this.driver.findElement(By.css("._nzn1h span")).getText() : 0;
                let dateattr = await this.driver.findElements(By.className("_p29ma")) != 0 ? await this.driver.findElement(By.className("_p29ma")).getAttribute('datetime') : 0;
                let datetime = Math.round((Date.now() - new Date(dateattr).getTime()) / (1000 * 60 * 60));
                let rating = Math.round(likes / datetime * 100) / 100;

                await Post.update({
                    url: posts[i].url
                }, {
                    $set: {
                        type: 'reviewed',
                        reviewed: true,
                        likes: likes,
                        rating: rating,
                        reviewed_at: Date.now()
                    }
                });
                for (let j = 0; j < comments.length; j++) {
                    let username = await comments[j].findElement(By.tagName('a')).getText();
                    //get the users which are not author of post and which are not duplicate
                    if ((username !== posts[i].username) && ((users.length > 0) ? !users.some(user => user.username === username) : true) && ((newUsers.length > 0) ? !newUsers.some((user) => user.username === username) : true)) {
                        newUsers.push(new User({
                            username: username,
                            type: 'analyze'
                        }));
                        console.log('New username is:' + username);
                    }
                }
                if (newUsers.length > config.userRefreshRate) {
                    // await Post.update({
                    //     url: {
                    //         $in: postsToDelete
                    //     }
                    // }, {
                    //     $set: {
                    //         type: 'reviewed',
                    //         reviewed: true,
                    //         reviewed_at: Date.now(),
                    //     }
                    // }, () => postsToDelete.length = 0)
                    await User.insertMany(newUsers, async function () {
                        console.log(newUsers.length + ' users were added to collection');
                        console.log(users.length + ' users found.');
                        newUsers.length = 0;
                        users = await User.find({}) || [];
                    });
                }
            }
        } catch (e) {
            // console.log(e)
        }
    }
}

export default InstagramAPI;