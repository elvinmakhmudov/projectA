let config = require('../config.json');
import api from './InstagramAPI.js';
import postrepo from './repositories/post';
import userrepo from './repositories/user';
import pagerepo from './repositories/page';
import counter from './counter';
import Logger from './logger';

export default class Action {
    constructor(counter, login, password, comments) {
        this.login = login;
        this.counter = counter;
        this.instagram = new api(login, password, comments).init();
        this.logger = new Logger(login);
    }
    async getFollowings() {
        await this.instagram.logIn();
        await this.instagram.goToProfile();
        await this.instagram.getAndSaveFollowings();
    }

    async logIn() {
        await this.instagram.logIn();
    }
    async sleep(seconds, log) {
        await this.instagram.sleep(seconds, log);
    }
    async findNewPages() {
        let postsReviewed = await postrepo.reviewed();
        let oldExplorePages = await pagerepo.explore();
        let posts;
        await this.instagram.goToUsername((oldExplorePages.length > 0) ? oldExplorePages[Math.floor(Math.random() * oldExplorePages.length)].username : "qizlargramm");
        try {
            let explorePages = await this.instagram.explorePage(oldExplorePages);
            this.counter.pages.explored++;
        } catch (e) {
            this.logger.update(e);
        }
    }
    async getPostsToComment() {
        return new Promise(async function (resolve, reject) {
            let explorePages;
            try {
                explorePages = await pagerepo.explore(10);
                if ((typeof explorePages === "undefined") || explorePages.length === 0) {
                    // await this.instagram.sleep(config.sleepEveryIteration, true);
                    return reject('ERROR ON GETTINGS POSTS TO COMMENT. EXPLORE PAGES is undefined or explorepages.length is 0');
                }
                this.logger.update('Pages to explore : ' + explorePages.length)
                var oldPosts = await postrepo.explore();
            } catch (e) {
                this.logger.update(e);
            }
            for (var i = 0, k = 0; k < explorePages.length && i < explorePages.length; i++) {
                try {
                    await this.instagram.goToUsername(explorePages[i].username);
                    // let postsFor = await postrepo.postsFor(explorePages[i]);
                    let posts = await this.instagram.getNewPosts(explorePages[i], oldPosts, 'comment');
                    this.logger.update('posts length is : ' + posts.length);
                    let freshPosts = [];
                    for (var j = 0, l = 0; j < posts.length && l < posts.length; j++) {
                        try {
                            //set yesterday since epoch in mseconds
                            var d = new Date();
                            d.setDate(d.getDate() - config.oldestPageInDays);
                            let yesterdayInMseconds = Date.now() - d.getTime();
                            let data = await this.instagram.getRatingAndDate(posts[j]);
                            posts[j].rating = data.rating;
                            posts[j].datetime = data.datetime;
                            //if post is old, skip it
                            if (data.datetime < yesterdayInMseconds) continue;
                            freshPosts.push(posts[j])
                            l++;
                        } catch (e) {
                            this.logger.update(e);
                        }
                    }
                    await postrepo.insertMany(freshPosts);
                    k++;
                    // this.logger.update('New posts to comment size : ' + (this.counter.posts.toComment += l));
                } catch (e) {
                    // await pagerepo.remove(explorePages[i])
                    this.logger.update(e);
                }
                await pagerepo.setReviewed(explorePages[i]);
            }
            // await pagerepo.insertMany(explorePages)
            this.logger.update('Inserting explore pages');
            return resolve();
        }.bind(this));
    }
    async savePosts() {
        return new Promise(async function (resolve, reject) {
            let pages, postsReviewed;
            try {
                pages = await pagerepo.private(20);
                if ((typeof pages === "undefined") || pages.length === 0) {
                    // await this.instagram.sleep(config.sleepEveryIteration, true);
                    return reject(this.instagram.login + ' : ERROR ON SAVING POSTS. POSTS is undefined or posts.length is 0');
                }
                this.logger.update('Private page size is : ' + pages.length);
                postsReviewed = await postrepo.reviewed();
                this.logger.update('Reviewed posts size is : ' + postsReviewed.length);
            } catch (e) {
                this.logger.update(e);
            }
            let posts;
            //get new usernames
            for (var i = 0, j = 0; j < pages.length && i < pages.length; i++) {
                let username = pages[i].username;
                //go to the username page
                try {
                    await this.instagram.goToUsername(username);
                    posts = await this.instagram.getNewPosts(pages[i], postsReviewed, 'analyze');
                    await postrepo.insertMany(posts);
                    j++;
                } catch (e) {
                    // await pagerepo.remove(pages[i])
                }
                await pagerepo.setReviewed(pages[i])
            }
            return resolve();
        }.bind(this));
    }

    async analyzePosts() {
        return new Promise(async function (resolve, reject) {
            let posts, users;
            try {
                posts = await postrepo.analyze(20);
                if ((typeof posts === "undefined") || posts.length === 0) {
                    // await this.instagram.sleep(config.sleepEveryIteration, true);
                    return reject(this.instagram.login + ' : ERROR ON ANALYZING POSTS. POSTS is undefined or posts.length is 0');
                }
                this.logger.update('Posts to analyze : ' + posts.length);
                users = await userrepo.all() || [];
            } catch (e) {
                this.logger.update(e);
            }
            let newUsers = [];
            this.logger.update('Analyzing posts.');
            for (var i = 0, j = 0; j < posts.length && i < posts.length; i++) {
                try {
                    let postData = await this.instagram.getPostData(posts[i], users, newUsers);
                    // newUsers.push.apply(newUsers, postData.newUsers);
                    await postrepo.setReviewed(posts[i], postData);
                    j++;
                } catch (e) {
                    this.logger.update(e);
                    await postrepo.remove(posts[i]);
                }
            }
            if (newUsers.length > 0) {
                try {
                    await userrepo.insertMany(newUsers);
                    // this.logger.update(users.length + ' users found.');
                    // this.logger.update('New users to analyze size : ' + (this.counter.users.toAnalyze +=j));
                    newUsers.length = 0;
                    users.length = 0;
                } catch (e) {
                    this.logger.update(e);
                }
            }
            return resolve();
        }.bind(this));
    }
    async analyzeUsers() {
        return new Promise(async function (resolve, reject) {
            let users;
            try {
                users = await userrepo.analyze(20) || [];
                if ((typeof users === "undefined") || users.length === 0) {
                    // await this.instagram.sleep(config.sleepEveryIteration, true);
                    return reject(this.instagram.login + ' : ERROR ON ANALYZING USERS. USERS IS UNDEFINED OR USERS LENGTH IS 0');
                }
                this.logger.update('Users  to analyze : ' + users.length);
            } catch (e) {
                this.logger.update(e);
            }
            for (var i = 0, j = 0; j < users.length && i < users.length; i++) {
                try {
                    let type = await this.instagram.getUserType(users[i]);
                    await userrepo.setType(users[i], type);
                    j++;
                } catch (e) {
                    this.logger.update(e);
                    await userrepo.softDelete(users[i]);
                }
            }
            this.logger.update('New users to analyze size : ' + (this.counter.users.analyzed += j));
            return resolve();
        }.bind(this));
    }

    async followUsers() {
        let users;
        try {
            users = await userrepo.follow();
            if ((typeof users === "undefined") || users.length === 0) {
                // await this.instagram.sleep(config.sleepEveryIteration, true);
                return;
            }
            this.logger.update('Users  to follow : ' + users.length);
        } catch (e) {
            this.logger.update(e);
        }
        for (var i = 0, j = 0; j < users.length && i < users.length; i++) {
            try {
                let followed = await this.instagram.followUser(users[i]);
                await userrepo.setFollowed(users[i], this.instagram.login);
                j++;
            } catch (e) {
                await userrepo.setType(users[i], 'error');
                this.logger.update('Error following: ' + users[i].username);
            }
        }
        this.logger.update('New users to follow size : ' + (this.counter.users.followed += j));
    }

    async unfollowUsers() {
        // await this.instagram.unfollowUsers();
        let users;
        try {
            users = await userrepo.unfollow(this.instagram.login);
            if ((typeof users === "undefined") || users.length === 0) {
                // await this.instagram.sleep(config.sleepEveryIteration, true);
                return;
            }
            this.logger.update('Users  to unfollow : ' + users.length);
        } catch (e) {
            this.logger.update(e);
        }
        for (var i = 0, j = 0; j < users.length && i < users.length; i++) {
            try {
                let unfollowed = await this.instagram.unfollowUser(users[i]);
                await userrepo.setType(users[i], 'unfollowed');
                j++;
            } catch (e) {
                await userrepo.setType(users[i], 'error');
                this.logger.update('Error unfollowing: ' + users[i].username);
            }
        }
        this.logger.update('New users to unfollow size : ' + (this.counter.users.unfollowed += j));
    }

    async likeUserPosts() {
        let users;
        try {
            users = await userrepo.like();
            if ((typeof users === "undefined") || users.length === 0) {
                // await this.instagram.sleep(config.sleepEveryIteration, true);
                return;
            }
            this.logger.update(this, 'Users to like : ' + users.length);
        } catch (e) {
            this.logger.update(e);
        }
        for (var i = 0, j = 0; j < users.length && i < users.length; i++) {
            try {
                await this.instagram.likeUserPosts(users[i]);
                await userrepo.setType(users[i], 'liked');
                j++;
            } catch (e) {
                await userrepo.softDelete(users[i]);
                this.logger.update('Soft deleted: ' + users[i].username);
            }
        }
        this.logger.update('Liked users size : ' + (this.counter.users.liked += j));
    }

    async commentPosts() {
        let posts;
        try {
            posts = await postrepo.comment();
            if ((typeof posts === "undefined") || posts.length === 0) {
                // await this.instagram.sleep(config.sleepEveryIteration, true);
                return;
            }
            this.logger.update('Posts to comment : ' + posts.length);
        } catch (e) {
            this.logger.update(e);
        }
        for (var i = 0, j = 0; j < posts.length && i < posts.length; i++) {
            try {
                this.logger.update('Commenting ' + (i + 1) + ' of ' + posts.length + ' posts.')
                await this.instagram.commentPosts(posts[i]);
                await postrepo.setType(posts[i], 'commented');
                // await pagerepo.setCommented(posts[i].page[0]);
                j++;
            } catch (e) {
                await postrepo.remove(posts[i]);
            }
        }
        this.logger.update('Commented posts size : ' + (this.counter.posts.commented += j));
    }
}