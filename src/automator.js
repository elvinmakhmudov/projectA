import "babel-polyfill";
let config = require('../config.json');
import api from './InstagramAPI.js';
const async = require('async');

let secondsInDay = 60 * 60 * config.workingHours;
class Automater {
    constructor(login, password) {
        this.login = login;
        this.password = password;
        this.instagram = new api(login, password).init();
    }

    async getFollowings() {
        await this.instagram.logIn();
        await this.instagram.goToProfile();
        await this.instagram.getAndSaveFollowings();
    }

    async savePosts() {
        await this.instagram.logIn();
        while (true) {
            let pages = await this.instagram.getPrivatePages();
            //get new usernames
            for (let i = 0; i < pages.length; i++) {
                let username = pages[i].username;
                //go to the username page
                await this.instagram.goToUsername(username);
                await this.instagram.savePostsToAnalyze(pages[i]);
            }
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async getNewUsers() {
        await this.instagram.logIn();
        while (true) {
            await this.instagram.getNewUsers();
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async analyzeUsers() {
        await this.instagram.logIn();
        while (true) {
            await this.instagram.analyzeUsers();
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async followUsers() {
        await this.instagram.logIn();
        while (true) {
            await this.instagram.followUsers();
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay);
        }
    }

    async unfollowUsers() {
        await this.instagram.logIn();
        while (true) {
            await this.instagram.unfollowUsers();
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay);
        }
    }

    async likeUserPosts() {
        await this.instagram.logIn();
        while (true) {
            await this.instagram.likeUserPosts();
            await this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay);
        }
    }

    async commentPosts() {
        await this.instagram.logIn();
        while (true) {
            await this.instagram.commentPosts();
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay));
        }
    }

    async tripleCombo() {
        await this.instagram.logIn();
        while (true) {
            await this.instagram.likeUserPosts();
            await this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / (config.usersToLikePerDay * 3));
            await this.instagram.followUsers();
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToFollowPerDay * 3));
            await this.instagram.commentPosts();
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay * 3));
        }
    }
}

export default Automater;