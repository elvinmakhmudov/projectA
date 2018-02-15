import "babel-polyfill";
let config = require('../config.json');
import api from './InstagramAPI.js';
import counter from './counter';
import actions from './actions.js';
import postrepo from './repositories/post';
import userrepo from './repositories/user';
import pagerepo from './repositories/page';
import User from './models/user';
const async = require('async');

let secondsInDay = 60 * 60 * config.workingHours;
class Automater {
    constructor(login, password, comments) {
        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
        this.comments = comments || config.comments;
        this.instagram = new api(login, password, comments).init();
        return this;
    }

    async getFollowings() {
        await this.instagram.logIn();
        await this.instagram.goToProfile();
        await this.instagram.getAndSaveFollowings();
    }

    async findNewPages() {
        await this.instagram.logIn();
        while (true) {
            await actions.findNewPages.call(this);
            await this.instagram.sleep(config.sleepEveryIteration, true);
        }
    }

    async getPostsToComment() {
        await this.instagram.logIn();
        while (true) {
            await actions.getPostsToComment.call(this);
            await this.instagram.sleep(config.sleepEveryIteration,true);
        }
    }

    async savePosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.savePosts.call(this);
            await this.instagram.sleep(config.sleepEveryIteration, true);
        }
    }

    async analyzePosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.analyzePosts.call(this);
            await this.instagram.sleep(config.sleepEveryIteration, true);
        }
    }

    async analyzeUsers() {
        await this.instagram.logIn();
        while (true) {
            await actions.analyzeUsers.call(this);
            await this.instagram.sleep(config.sleepEveryIteration,true);
        }
    }

    async followUsers() {
        await this.instagram.logIn();
        while (true) {
            await actions.followUsers.call(this);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay, true);
        }
    }

    async unfollowUsers() {
        await this.instagram.logIn();
        while (true) {
            await actions.unfollowUsers.call(this);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay, true);
        }
    }

    async likeUserPosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.likeUserPosts.call(this);
            await this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay, true);
        }
    }

    async commentPosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.commentPosts.call(this);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.pagesToCommentPerDay, true);
        }
    }

    async triplePageActions() {
        await this.instagram.logIn();
        while (true) {

            let followed = counter.users.followed;
            do {
                await actions.followUsers.call(this);
                console.log(this.login + ' : Following users is done');
            }
            while (followed <= counter.users.followed);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToFollowPerDay * 4), true);


            let commented = counter.posts.commented;
            do {
                await actions.commentPosts.call(this);
                console.log(this.login + ' : Commenting posts is done.');
            } while (commented <= counter.posts.commented);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay * 4), true);

            let unfollowed = counter.users.unfollowed;
            do {
                await actions.unfollowUsers.call(this);
                console.log(this.login + ' : Unfollowing users is done.');
            } while (unfollowed <= counter.users.unfollowed);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToUnfollowPerDay * 4), true);

            let liked = counter.users.liked;
            do {
                await actions.likeUserPosts.call(this);
                console.log(this.login + ' : Liking user posts is done.');
            }
            while (liked <= counter.users.liked);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToLikePerDay * config.userPostsToLike * 4), true);

            //sleep the rest of the time after working hours
            // await this.instagram.sleep((24 - config.workingHours) * 60 * 60);
        }
    }
    async tripleAnalyzator() {
        await this.instagram.logIn();
        while (true) {
            let postsToAnalyze = counter.posts.toAnalyze;
            do {
                await actions.savePosts.call(this);
                console.log(this.login + ' : Save posts is done.')
                await this.instagram.sleep(config.sleepEveryIteration, true);
            } while (postsToAnalyze <= counter.posts.toAnalyze);

            let usersToAnalyze = counter.users.toAnalyze;
            do {
                await actions.analyzePosts.call(this);
                console.log(this.login + ' : Analyzing posts is done.')
                await this.instagram.sleep(config.sleepEveryIteration, true);
            } while (usersToAnalyze <= counter.users.toAnalyze);

            let toComment = counter.posts.toComment;
            do {
                await actions.getPostsToComment.call(this);
                console.log(this.login + ' : Get posts to comment is done.')
                await this.instagram.sleep(config.sleepEveryIteration, true);
            }
            while (toComment <= counter.posts.toComment);

            let analyzed = counter.users.analyzed;
            do {
                await actions.analyzeUsers.call(this);
                console.log(this.login + ' : Analyzing users is done.')
                await this.instagram.sleep(config.sleepEveryIteration, true);
            } while (analyzed <= counter.users.analyzed);

            // await this.instagram.sleep((24 - config.workingHours) * 60 * 60);
        }
    }
}

export default Automater;