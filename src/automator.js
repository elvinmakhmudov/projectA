import "babel-polyfill";
let config = require('../config.json');
import api from './InstagramAPI.js';
import actions from './actions.js';
import postrepo from './repositories/post';
import userrepo from './repositories/user';
import pagerepo from './repositories/page';
import User from './models/user';
const async = require('async');

let secondsInDay = 60 * 60 * config.workingHours;
class Automater {
    constructor(login, password) {
        this.login = login;
        this.password = password;
        this.instagram = new api(login, password).init();
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
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async getPostsToComment() {
        await this.instagram.logIn();
        while (true) {
            await actions.getPostsToComment.call(this);
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async savePosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.savePosts.call(this);
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async analyzePosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.analyzePosts.call(this);
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async analyzeUsers() {
        await this.instagram.logIn();
        while (true) {
            await actions.analyzeUsers.call(this);
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async followUsers() {
        await this.instagram.logIn();
        while (true) {
            await actions.followUsers.call(this);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay);
        }
    }

    async unfollowUsers() {
        await this.instagram.logIn();
        while (true) {
            await actions.unfollowUsers.call(this);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay);
        }
    }

    async likeUserPosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.likeUserPosts.call(this);
            await this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay);
        }
    }

    async commentPosts() {
        await this.instagram.logIn();
        while (true) {
            await actions.commentPosts.call(this);
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay));
        }
    }

    async triplePageActions() {
        await this.instagram.logIn();
        while (true) {

            await actions.followUsers.call(this);
            console.log(this.login + ' : Following users is done');
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToFollowPerDay * 4));

            await actions.commentPosts.call(this);
            console.log(this.login + ' : Commenting posts is done.');
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay * 4));

            await actions.unfollowUsers.call(this);
            console.log(this.login + ' : Unfollowing users is done.');
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToUnfollowPerDay * 4));

            await actions.likeUserPosts.call(this);
            console.log(this.login + ' : Liking user posts is done.');
            await this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / (config.usersToLikePerDay * 4));

            //sleep the rest of the time after working hours
            // await this.instagram.sleep((24 - config.workingHours) * 60 * 60);
        }
    }
    async tripleAnalyzator() {
        await this.instagram.logIn();
        while (true) {
            await actions.savePosts.call(this);
            console.log(this.login + ' : Save posts is done.')
            await this.instagram.sleep(config.sleepEveryIteration);

            await actions.analyzePosts.call(this);
            console.log(this.login + ' : Analyzing posts is done.')
            await this.instagram.sleep(config.sleepEveryIteration);

            await actions.getPostsToComment.call(this);
            console.log(this.login + ' : Get posts to comment is done.')
            await this.instagram.sleep(config.sleepEveryIteration);

            await actions.analyzeUsers.call(this);
            console.log(this.login + ' : Analyzing users is done.')
            await this.instagram.sleep(config.sleepEveryIteration);

            // await this.instagram.sleep((24 - config.workingHours) * 60 * 60);
        }
    }
}

export default Automater;