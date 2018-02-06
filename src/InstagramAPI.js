const config = require('../config.json');
const {
    Builder,
    By,
    until,
    Key
} = require('selenium-webdriver');
import chrome from 'selenium-webdriver/chrome';
import db from './database/database.js';
import Page from './models/page';
import Post from './models/post';
import User from './models/user';
import Cookie from './models/cookie';
import analyzator from './analyzator.js';

class InstagramAPI {
    constructor(login, password, comments) {
        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
        this.comments = comments || config.comments;
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

    savePostsToAnalyze(page) {
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
                    'username': page.username,
                    'type': 'analyze',
                    'page': page._id
                }).save());
                if (postsArr.length === posts.length) {
                    Page.update({
                        username: page.username
                    }, {
                            $set: {
                                reviewed: true,
                                reviewed_at: Date.now()
                            }
                        })
                    // await Post.insertMany(postsArr, () => console.log(posts.length + ' posts were added'));
                    resolve();
                }
            }
        }.bind(this));
    }

    async getNewUsers(post, users) {
        try {
            // let posts = await this.dbase.getPostsToAnalyze();
            // let users = await this.dbase.getUsersToAnalyze() || [];
            let newUsers = [];
            // for (let i = 0; i < posts.length; i++) {
            await this.driver.get(post.url);
            //if page has been removed then break
            if (await this.driver.findElements(By.className("error-container")) != 0) {
                throw "Error";
                // this.removePost(post.url)
                return [];
            };
            await this.driver.wait(until.elementLocated(By.className("_2g7d5")));
            let comments = await this.driver.findElements(By.className("_ezgzd"));
            let likes = await this.driver.findElements(By.className("_nzn1h")) != 0 ? await this.driver.findElement(By.css("._nzn1h span")).getText().then(likes => likes.replace(',', '')) : 0;
            let dateattr = await this.driver.findElements(By.className("_p29ma")) != 0 ? await this.driver.findElement(By.className("_p29ma")).getAttribute('datetime') : 0;
            let datetime = Math.round((Date.now() - new Date(dateattr).getTime()) / (1000 * 60 * 60));
            let rating = Math.round(likes / datetime * 100) / 100;

            await Post.update({
                url: post.url
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
                    newUsers.push(await new User({
                        username: username,
                        type: 'analyze'
                    }));
                    console.log('New username is:' + username);
                }
            }
            return newUsers;
            // if (newUsers.length > config.userRefreshRate) {
            //     await User.insertMany(newUsers, async function () {
            //         console.log(newUsers.length + ' users were added to collection');
            //         console.log(users.length + ' users found.');
            //         newUsers.length = 0;
            //         users = await User.find({}) || [];
            //     });
            // }
            // }
        } catch (e) {
            console.log(e)
        }
    }


    /**
     * Analyzes user and returns user type 
     * 
     * @param {*} user 
     */
    async getUserType(user) {
        // let users = await this.dbase.getUsersToAnalyze();
        // for (let i = 0; i < users.length; i++) {
        await this.driver.get(config.urls.main + user.username);
        if (await this.driver.findElements(By.className("error-container")) != 0) {
            // this.removeUser(user.username)
            throw 'Error';
            return [];
        };
        console.log('Analyzing ' + user.username);
        await this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);
        //add to follow
        if (await this.driver.findElements(By.className("_kcrwx")) != 0) {
            return 'follow';
            // await User.update({
            //     username: user.username
            // }, {
            //         $set: {
            //             type: 'follow',
            //         }
            //     });
        } else {
            return 'like';
            //add to like
            // await User.update({
            //     username: user.username
            // }, {
            //         $set: {
            //             type: 'like',
            //         }
            //     });
        }
        // }
    }

    removePost(url) {
        return Post.remove({
            url
        }, function (err) {
            if (err) console.log(err);
            console.log('Post was removed');
        })
    }

    removeUser(username) {
        return User.remove({
            username
        }, function (err) {
            if (err) console.log(err);
            console.log(username + ' was removed');
        })
    }

    async followUser(user) {
        // let users = await this.dbase.getUsersToFollow();
        // for (let i = 0; i < users.length; i++) {
        await this.driver.get(config.urls.main + user.username);
        if (await this.driver.findElements(By.className("error-container")) != 0) {
            // this.removeUser(user.username)
            return false;
        };
        console.log('Following ' + user.username);
        await this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);
        //follow
        if (await this.driver.findElements(By.className("_kcrwx")) != 0) {
            //click follow button
            await this.driver.findElement(By.className('_r9b8f')).click();
            //wait until requested text
            await this.driver.wait(until.elementLocated(By.className("_t78yp")), config.timeout);
            return true;

            // await User.update({
            //     username: user.username
            // }, {
            //         $set: {
            //             type: 'followed',
            //             reviewed: true,
            //             reviewed_at: Date.now(),
            //             followed_at: Date.now()
            //         }
            //     });
        } else {
            return false;
        }
        // }

    }

    async unfollowUser(user) {
        // let users = await this.dbase.getUsersToUnfollow();
        // for (let i = 0; i < users.length; i++) {
            await this.driver.get(config.urls.main + user.username);
            if (await this.driver.findElements(By.className("error-container")) != 0) {
                // this.removeUser(user.username)
                return false;
            };
            if (await this.driver.findElements(By.className("_t78yp")) != 0) {
                await this.driver.findElement(By.className('_t78yp')).click();
                await this.sleep(1);
            }
            console.log('Unfollowing ' + users[i].username);
            await User.update({
                username: users[i].username
            }, {
                    $set: {
                        type: 'unfollowed',
                        reviewed: true,
                        reviewed_at: Date.now(),
                    }
                });
        // }
    }

    async likeUserPosts() {
        let users = await this.dbase.getUsersToLike();
        for (let i = 0; i < users.length; i++) {
            await this.driver.get(config.urls.main + users[i].username);
            //follow
            if (await this.driver.findElements(By.className("_mck9w")) == 0) {
                this.removeUser(users[i].username)
                continue
            };
            await this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);
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
                this.driver.wait(until.elementLocated(By.className('coreSpriteHeartOpen')), config.timeout);
                await this.driver.findElement(By.className('coreSpriteHeartOpen')).click();
                await this.sleep(1);
            }
            await User.update({
                username: users[i].username
            }, {
                    $set: {
                        type: 'like',
                        reviewed: true,
                        reviewed_at: Date.now()
                    }
                });
            console.log('liked posts of ' + users[i].username);
        }
    }

    async commentPosts() {
        let posts = await this.dbase.getPostsToComment();
        for (let i = 0; i < posts.length; i++) {
            await this.driver.get(posts[i].url);
            //if page has been removed then break
            if (await this.driver.findElements(By.className("error-container")) != 0) {
                this.removePost(posts[i].url)
                continue
            };
            console.log((i + 1) + ' of ' + posts.length + ' posts.')
            await this.driver.wait(until.elementLocated(By.className("_bilrf")), config.timeout);
            //comment post
            let comment = this.comments[Math.floor(Math.random() * this.comments.length)];
            await this.driver.findElement(By.className('_bilrf')).clear();
            await this.driver.findElement(By.className('_bilrf')).sendKeys(comment);
            // await this.driver.findElement(By.className('_bilrf')).sendKeys(Key.ENTER);
            await Post.update({
                url: posts[i].url
            }, {
                    $set: {
                        type: 'commented',
                        reviewed: true,
                        reviewed_at: Date.now()
                    }
                });
            await Page.update({
                username: posts[i].username
            }, {
                    $set: {
                        type: 'commented',
                        reviewed: true,
                        reviewed_at: Date.now(),
                        commented_at: Date.now(),
                        commented_times: (post.page.commented_times >= config.maxCommentForPageInDay) ? 1 : (post.page.commented_times + 1)
                    }
                });
            await this.sleep(1);
        }
    }

    async sleep(seconds) {
        console.log('sleeping for ' + seconds + ' seconds.')
        await this.driver.sleep(seconds * 1000)
    }
}

export default InstagramAPI;