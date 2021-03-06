const config = require('../config.json');
const {
    Builder,
    By,
    until,
    Key,
    logging
} = require('selenium-webdriver');
import chrome from 'selenium-webdriver/chrome';
import db from './database/database.js';
import Page from './models/page';
import Post from './models/post';
import User from './models/user';
import Cookie from './models/cookie';
import Logger from './logger';

class InstagramAPI {
    constructor(login, password, comments) {
        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
        this.comments = comments || config.comments;
        this.logger = new Logger(this.login);
    }

    init() {
        let options = config.headless ? new chrome.Options().headless() : new chrome.Options();
        // let loggingPrefs = new logging.Preferences();
        // loggingPrefs.setLevel(logging.Type.PERFORMANCE, logging.Level.OFF);
        // options.setLoggingPrefs(loggingPrefs);
        options.addArguments('--log-level=3');

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
                username: this.login || config.instagram.login
            });
            if (cookies.length !== 0) {
                await this.cookieLogIn(cookies).then(function () {
                    this.logger.update('Logged in with Cookies');
                    return resolve();
                }.bind(this))
            } else {
                await driver.wait(until.elementLocated(By.name("username")), config.timeout);
                await driver.findElement(By.name('username')).sendKeys(this.login);
                await driver.findElement(By.name('password')).sendKeys(this.password);
                await driver.findElement(By.className('_qv64e _gexxb _4tgw8 _njrw0')).click();
                await driver.sleep(2000).then(() => resolve());
                this.logger.update('Logged in');
                //set cookies 
                await this.setCookies(this.login)
            }
        }.bind(this));
    }

    async cookieLogIn(cookies) {
        return new Promise(async function (resolve, reject) {
            if (cookies.length !== 0) {
                for (let i = 0; i < cookies.length; i++) {
                    await this.driver.manage().addCookie(JSON.parse(cookies[i].cookies));
                }
                return resolve();
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
            return resolve();
        }.bind(this))
    }

    goToProfile() {
        return new Promise(async function (resolve) {
            await this.driver.get(config.urls.main);
            await this.driver.wait(until.elementLocated(By.className('coreSpriteDesktopNavProfile')), config.timeout);
            await this.driver.findElement(By.className('coreSpriteDesktopNavProfile')).click().then(() => resolve());
        }.bind(this))
    }

    getAndSaveFollowings() {
        return new Promise(function (resolve) {
            this.driver.wait(until.elementLocated(By.partialLinkText('following')), config.timeout);
            this.driver.sleep(2000);
            this.driver.findElement(By.partialLinkText('following')).click();
            this.driver.sleep(2000);
            this.logger.update('Getting followings');
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
                                    return resolve();
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
                            return resolve();
                        }.bind(this));
                    } else {
                        return resolve();
                    }
                }.bind(this));
            }.bind(this))
        }.bind(this))
    }

    goToUsername(username) {
        // this.logger.update('Reviewing ' + username);
        return this.driver.get(config.urls.main + username);
    }

    getNewPosts(page, postsAnalyze, type) {
        return new Promise(async function (resolve, reject) {
            //fetch posts
            // if (await this.driver.findElements(By.className("_kcrwx")) != 0) return reject();
            if (await this.driver.findElements(By.className("_mck9w")) == 0) {
                return reject('The page is empty');
            };
            // this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
            // if (await this.driver.findElements(By.className("_mck9w a")) == 0) {
            //     return reject();
            // };
            let posts = await this.driver.findElements(By.css('._mck9w a'));
            let postsArr = [];
            for (let i = 0; i < posts.length && i < config.postsToReview; i++) {
                try {
                    let url = await posts[i].getAttribute('href');
                    if ((postsAnalyze.length > 0) ? !postsAnalyze.some(post => post.url === url) : true) {
                        await this.driver.actions().mouseMove(posts[i]).perform();
                        if (await this.driver.findElements(By.css('._3apjk span')) == 0) continue;
                        let commentSize = await this.driver.findElement(By.css('._3apjk span')).getText();
                        if (commentSize == 0) continue;
                        await postsArr.push(new Post({
                            'url': url,
                            'username': page.username,
                            'type': type,
                            'page': page._id
                        }));
                    }
                } catch (e) {
                    continue;
                }
            }
            return resolve(postsArr);
        }.bind(this));
    }

    getRatingAndDate(post) {
        return new Promise(async function (resolve, reject) {
            // let posts = await this.dbase.getPostsToAnalyze();
            // let users = await this.dbase.getUsersToAnalyze() || [];
            let newUsers = [];
            // for (let i = 0; i < posts.length; i++) {
            await this.driver.get(post.url);
            //if page has been removed then break
            if (await this.driver.findElements(By.className("error-container")) != 0 || await this.driver.findElements(By.className("_ezgzd")) == 0) {
                return reject('Post contains an error');
            };
            await this.driver.wait(until.elementLocated(By.className("_2g7d5")));
            let comments = await this.driver.findElements(By.className("_ezgzd"));
            let likes = await this.driver.findElements(By.className("_nzn1h")) != 0 ? await this.driver.findElement(By.css("._nzn1h span")).getText().then(likes => likes.replace(',', '')) : 0;
            let dateattr = await this.driver.findElements(By.className("_p29ma")) != 0 ? await this.driver.findElement(By.className("_p29ma")).getAttribute('datetime') : 0;
            let datetime = Math.round((Date.now() - new Date(dateattr).getTime()) / (1000 * 60));
            let rating = Math.round(likes / datetime * 100) / 100;
            return resolve({
                date: new Date(dateattr).getTime(),
                rating
            });
        }.bind(this));
    }

    getPostData(post, users, newUsers) {
        return new Promise(async function (resolve, reject) {
            // let posts = await this.dbase.getPostsToAnalyze();
            // let users = await this.dbase.getUsersToAnalyze() || [];
            // let newUsers = [];
            // for (let i = 0; i < posts.length; i++) {
            await this.driver.get(post.url);
            //if page has been removed then break
            if (await this.driver.findElements(By.className("error-container")) != 0 || await this.driver.findElements(By.className("_ezgzd")) == 0) {
                return reject('Post contains error-container or does not contain comments.');
            };
            await this.driver.wait(until.elementLocated(By.className("_2g7d5")));
            let comments = await this.driver.findElements(By.className("_ezgzd"));
            let likes = await this.driver.findElements(By.className("_nzn1h")) != 0 ? await this.driver.findElement(By.css("._nzn1h span")).getText().then(likes => likes.replace(',', '')) : 0;
            let dateattr = await this.driver.findElements(By.className("_p29ma")) != 0 ? await this.driver.findElement(By.className("_p29ma")).getAttribute('datetime') : 0;
            let datetime = Math.round((Date.now() - new Date(dateattr).getTime()) / (1000 * 60 * 60));
            let rating = Math.round(likes / datetime * 100) / 100;

            for (let j = 0; j < comments.length; j++) {
                let username = await comments[j].findElement(By.tagName('a')).getText();
                try {
                    // console.log('userlength : ' + users.length );
                    // console.log('username : ' + username);
                    // console.log('usersome is : ' + !await users.some(user => user.username === username));
                    // users.some(function (user) {
                    //     console.log('user is : ' + user.username + ' , username is : ' + username);
                    //     return user.username === username
                    // })
                    //get the users which are not author of post and which are not duplicate
                    if ((username !== post.username) && ((users.length > 0) ? (!users.some(user => user.username === username)) : true) && ((newUsers.length > 0) ? (!newUsers.some((user) => user.username === username)) : true)) {
                        for (let k = 0; k < config.toExclude.length; k++) {
                            if (username.indexOf(config.toExclude[k]) !== -1) throw ('String ' + username + ' was excluded');
                            newUsers.push(await new User({
                                username,
                                type: 'analyze',
                                direct_sent: false
                            }));
                        }
                        this.logger.update('New username is : ' + username);
                    }
                } catch (e) {
                    this.logger.update(e);
                }
            }
            return resolve({
                newUsers,
                likes,
                rating
            });
        }.bind(this))
    }



    /**
     * Analyzes user and returns user type 
     * 
     * @param {*} user 
     */
    async getUserType(user) {
        return new Promise(async function (resolve, reject) {
            await this.driver.get(config.urls.main + user.username);
            if (await this.driver.findElements(By.className("error-container")) != 0) {
                return reject();
            };
            // this.logger.update('Analyzing ' + user.username);
            //await this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);
            if (await this.driver.findElements(By.className("_rf3jb")) == 0) {
                return reject();
            };
            if (await this.driver.findElements(By.className("_kcrwx")) != 0) {
                // this.logger.update('to follow');
                return resolve('follow');
            } else {
                // this.logger.update('to like');
                return resolve('like');
            }
        }.bind(this));
    }

    async followUser(user) {
        return new Promise(async function (resolve, reject) {
            await this.driver.get(config.urls.main + user.username);
            if ((await this.driver.findElements(By.className("error-container")) != 0) || (await this.driver.findElements(By.className("_rf3jb")) == 0)) {
                return reject();
            };
            this.logger.update('Following ' + user.username);
            // await this.driver.wait(until.elementLocated(By.className("r9b8f")), config.timeout);
            //follow
            if (await this.driver.findElements(By.className("_gexxb")) != 0) {
                //click follow button
                await this.driver.findElement(By.className('_gexxb')).click();
                await this.sleep(3);
                //wait until requested text
                // await this.driver.wait(until.elementLocated(By.className("_t78yp")), config.timeout);
                return resolve(true);
            } else {
                return reject(false);
            }
        }.bind(this));
    }

    async unfollowUser(user) {
        return new Promise(async function (resolve, reject) {
            await this.driver.get(config.urls.main + user.username);
            if (await this.driver.findElements(By.className("error-container")) != 0) {
                // this.removeUser(user.username)
                return reject();
            };
            if (await this.driver.findElements(By.className("_t78yp")) != 0) {
                this.logger.update('Unfollowing ' + user.username);
                await this.driver.findElement(By.className('_t78yp')).click();
                await this.sleep(1);
                return resolve();
            }
            return reject();
        }.bind(this))
    }

    async likeUserPosts(user) {
        return new Promise(async function (resolve, reject) {
            await this.driver.get(config.urls.main + user.username);
            //follow
            if (await this.driver.findElements(By.className("_mck9w")) == 0) {
                return reject();
            };
            //await this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);
            if (await this.driver.findElements(By.className("_rf3jb")) == 0) {
                return reject();
            };
            this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
            let posts = await this.driver.findElements(By.css('._mck9w a'));
            let postsArr = [];
            for (let k = 0; k < posts.length; k++) {
                let href = await posts[k].getAttribute('href');
                postsArr.push(href);
            }
            for (let j = 0;
                (j < config.userPostsToLike) && (j < postsArr.length); j++) {
                await this.driver.get(postsArr[j]);
                if ((await this.driver.findElements(By.className("coreSpriteHeartFull"))).length != []) continue;
                // this.driver.wait(until.elementLocated(By.className('coreSpriteHeartOpen')), config.timeout);
                if ((await this.driver.findElements(By.className("coreSpriteHeartOpen"))).length != []) {
                    await this.driver.findElement(By.className('coreSpriteHeartOpen')).click();
                    await this.sleep(2);
                };
            }
            this.logger.update('liked posts of ' + user.username);
            return resolve();
        }.bind(this));
    }

    async commentPosts(post) {
        return new Promise(async function (resolve, reject) {
            await this.driver.get(post.url);
            //if page has been removed then break
            if (await this.driver.findElements(By.className("error-container")) != 0 || await this.driver.findElements(By.className("_bilrf")) == 0) {
                return reject();
            };
            await this.driver.wait(until.elementLocated(By.className("_bilrf")), config.timeout);
            //comment post
            let comment = this.comments[Math.floor(Math.random() * this.comments.length)];
            await this.driver.findElement(By.className('_bilrf')).clear();
            await this.driver.findElement(By.className('_bilrf')).sendKeys(comment);
            await this.driver.findElement(By.className('_bilrf')).sendKeys(Key.ENTER);
            await this.sleep(5);
            return resolve();
        }.bind(this));
    }

    async explorePage(allPages) {
        return new Promise(async function (resolve, reject) {
            do {
                // await this.driver.wait(until.elementLocated(By.className("_4tgw8")), config.timeout);
                if (await this.driver.findElements(By.className("_4tgw8")) == 0) {
                    reject('ERROR EXPLORING PAGES');
                    //follow
                    // if (await this.driver.findElements(By.className("_t78yp")) == 0) {
                    //     //click follow button
                    //     // await this.driver.findElement(By.className('_gexxb')).click();
                    //     //wait until requested text
                    //     // await this.driver.wait(until.elementLocated(By.className("_t78yp")), config.timeout);
                    //     await this.driver.navigate().refresh();
                    //     await this.sleep(2);
                    // } else {
                    //     await this.driver.navigate().refresh();
                    //     await this.sleep(2);
                    // }
                } else {
                    break;
                };
            } while (true);
            await this.driver.findElement(By.className('_4tgw8')).click();
            await this.sleep(1);
            let tmpPages = [];
            let next = true;
            do {
                next = (await this.driver.findElements(By.className("_r48jm")) != 0) ? true : false;
                await this.sleep(2);
                let newPages = await this.driver.findElements(By.className('_2g7d5'));
                for (let i = 0; i < newPages.length; i++) {
                    let username = await newPages[i].getText() || false;
                    if (username && ((allPages.length > 0) ? !allPages.some(page => page.username === username) : true) && ((tmpPages.length > 0) ? !tmpPages.some(page => page.username === username) : true)) {
                        try {
                            // if () {
                            let newPage = await new Page({
                                username,
                                type: 'explore',
                                reviewed: false
                            });
                            // }).save();
                            tmpPages.push(newPage);
                            // }
                        } catch (e) {
                            continue;
                        }
                    }
                }
                try {
                    if (next) await this.driver.findElement(By.className('_r48jm')).click();
                } catch (e) {
                    break;
                }
            } while (next && tmpPages.length < 10);
            let pages = [];
            for (let j = 0; j < tmpPages.length; j++) {
                let username = tmpPages[j].username;
                await this.driver.get(config.urls.main + username);
                try {
                    let followers = await this.driver.findElement(By.partialLinkText('followers')).findElement(By.className('_fd86t')).getAttribute('title').then(follows => follows.replace(',', ''));
                    if (followers < 50000) continue;
                    this.logger.update('new page is : ' + tmpPages[j].username);
                    pages.push(tmpPages[j]);
                } catch (e) {
                    continue;
                }
            }
            return resolve(pages);
        }.bind(this));
    }

    async sleep(seconds, log = false) {
        try {
            if (log) this.logger.update('SLEEPING FOR ' + seconds + ' SECONDS.');
            await this.driver.sleep(seconds * 1000)
        } catch (e) {
            console.log(e);
        }
    }
}

export default InstagramAPI;