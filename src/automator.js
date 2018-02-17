import "babel-polyfill";
let config = require('../config.json');
import Counter from './counter';
import Action from './action.js';
import postrepo from './repositories/post';
import userrepo from './repositories/user';
import pagerepo from './repositories/page';
import User from './models/user';
import Logger from './logger';
const async = require('async');

let secondsInDay = 60 * 60 * config.workingHours;
class Automater {
    constructor(login, password, comments) {
        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
        this.comments = comments || config.comments;
        this.counter = new Counter();
        this.action = new Action(this.counter, this.login, this.password, this.comments);
        this.logger = new Logger(this.login);
        return this;
    }

    async getFollowings() {
        await this.action.getFollowings();
    }

    async findNewPages() {
        await this.action.logIn();
        let errors = 0;
        while (true) {
            try {
                if (errors >= config.maxErrors) {
                    await this.action.sleep(config.sleepEveryIteration, true);
                    errors = 0;
                }
                let explored = this.counter.pages.explored;
                await this.action.findNewPages();
                if (this.counter.pages.explored > explored)
                    await this.action.sleep(config.sleepEveryIteration, true);
                errors = 0;
            } catch (e) {
                this.logger.update(e);
                errors++;
            }
        }
    }

    async getPostsToComment() {
        await this.action.logIn();
        while (true) {
            this.action.getPostsToComment();
            await this.action.sleep(config.sleepEveryIteration, true);
        }
    }

    async savePosts() {
        await this.action.logIn();
        while (true) {
            this.action.savePosts();
            await this.action.sleep(config.sleepEveryIteration, true);
        }
    }

    async analyzePosts() {
        await this.action.logIn();
        while (true) {
            this.action.analyzePosts();
            await this.action.sleep(config.sleepEveryIteration, true);
        }
    }

    async analyzeUsers() {
        await this.action.logIn();
        while (true) {
            this.action.analyzeUsers();
            await this.action.sleep(config.sleepEveryIteration, true);
        }
    }

    async followUsers() {
        await this.action.logIn();
        while (true) {
            this.action.followUsers();
            await this.action.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay, true);
        }
    }

    async unfollowUsers() {
        await this.action.logIn();
        while (true) {
            this.action.unfollowUsers();
            await this.action.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay, true);
        }
    }

    async likeUserPosts() {
        await this.action.logIn();
        while (true) {
            this.action.likeUserPosts();
            await this.action.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay, true);
        }
    }

    async commentPosts() {
        await this.action.logIn();
        while (true) {
            this.action.commentPosts();
            await this.action.sleep(secondsInDay * config.batchUserLimitCount / config.pagesToCommentPerDay, true);
        }
    }

    async triplePageActions() {
        await this.action.logIn();

        let errors = 0;
        while (true) {
            let liked = this.counter.users.liked;
            // do {
            await this.action.likeUserPosts();
            // }
            // while (liked >= this.counter.users.liked);
            if (this.counter.users.liked > liked) {
                this.logger.update('LIKED ' + (this.counter.users.liked - liked) + ' USERS');
                await this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToLikePerDay * config.userPostsToLike * 4), true);
            }


            let followed = this.counter.users.followed;
            // do {
            await this.action.followUsers();
            // }
            // while (followed >= this.counter.users.followed);
            if (this.counter.users.followed > followed) {
                this.logger.update('FOLLOWED ' + (this.counter.users.followed - followed) + ' USERS');
                await this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToFollowPerDay * 4), true);
            }

            let commented = this.counter.posts.commented;
            // do {
            await this.action.commentPosts();
            // } while (commented >= this.counter.posts.commented);
            if (this.counter.posts.commented > commented) {
                this.logger.update('COMMENTED ' + (this.counter.posts.commented - commented) + ' POSTS');
                await this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay * 4), true);
            }

            // let unfollowed = this.counter.users.unfollowed;
            // do {
            //     await actions.unfollowUsers.call(this);
            // } while (unfollowed >= this.counter.users.unfollowed);
            //     this.logger.update('Unfollowing users is done.');
            // await this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToUnfollowPerDay * 4), true);


            //sleep the rest of the time after working hours
            // await this.action.sleep((24 - config.workingHours) * 60 * 60);
        }
    }
    async tripleAnalyzator() {
        await this.action.logIn();
        while (true) {
            let usersToAnalyze = this.counter.users.toAnalyze;
            // do {
            try {
                await this.action.analyzePosts();
            } catch (e) {
                this.logger.update(e);
            }
            // } while (usersToAnalyze >= this.counter.users.toAnalyze);
            if (this.counter.users.toAnalyze > usersToAnalyze) {
                this.logger.update('ADDED ' + (this.counter.users.toAnalyze - usersToAnalyze) + ' USERS TO ANALYZE');
                await this.action.sleep(config.sleepEveryIteration, true);
            }

            let analyzed = this.counter.users.analyzed;
            // do {
            try {
                await this.action.analyzeUsers();
            } catch (e) {
                this.logger.update(e);
            }
            // } while (analyzed >= this.counter.users.analyzed);
            if (this.counter.users.analyzed > analyzed) {
                this.logger.update('ANALYZED ' + (this.counter.users.analyzed - analyzed) + ' USERS');
                await this.action.sleep(config.sleepEveryIteration, true);
            }

            let postsToAnalyze = this.counter.posts.toAnalyze;
            // do {
            try {
                await this.action.savePosts();
            } catch (e) {
                this.logger.update(e);
            }
            // } while (postsToAnalyze >= this.counter.posts.toAnalyze);
            if (this.counter.posts.toAnalyze > postsToAnalyze) {
                this.logger.update('ADDED ' + (this.counter.posts.toAnalyze - postsToAnalyze) + 'POSTS TO ANALYZE');
                await this.action.sleep(config.sleepEveryIteration, true);
            }

            let toComment = this.counter.posts.toComment;
            // do {
            try {
                await this.action.getPostsToComment();
            } catch (e) {
                this.logger.update(e);
            }
            // } while (toComment >= this.counter.posts.toComment);
            if (this.counter.posts.toComment > toComment) {
                this.logger.update('Get posts to comment is done.')
                await this.action.sleep(config.sleepEveryIteration, true);
            }

            // await this.action.sleep((24 - config.workingHours) * 60 * 60);
        }
    }
}

export default Automater;