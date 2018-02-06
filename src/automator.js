import "babel-polyfill";
let config = require('../config.json');
import api from './InstagramAPI.js';
import postrepo from './repositories/post';
import userrepo from './repositories/user';
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
            let posts = await postrepo.analyze();
            let users = await userrepo.analyze() || [];
            let newUsers = [];
            for (let i = 0; i < posts.length; i++) {
                console.log((i + 1) + ' of ' + posts.length + ' posts.')
                try {
                    newUsers.concat(await this.instagram.getNewUsers(posts[i], users));
                    if (newUsers.length > config.userRefreshRate) {
                        await userrepo.insertMany(newUsers);
                        console.log(users.length + ' users found.');
                        users = await userrepo.analyze() || [];
                        newUsers.length = 0;
                    }
                } catch (e) {
                    console.log(e);
                    await postrepo.remove(posts[i]);
                }
            }
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async analyzeUsers() {
        await this.instagram.logIn();
        let type;
        while (true) {
            let users = await userrepo.analyze() || [];
            for (let i = 0; i < users.length; i++) {
                try {
                    type = await this.instagram.getUserType(users[i]);
                    await userrepo.setType(users[i], type);
                } catch (e) {
                    console.log(e);
                    await userrepo.remove(users[i]);
                }
            }
            await this.instagram.sleep(config.sleepEveryIteration);
        }
    }

    async followUsers() {
        await this.instagram.logIn();
        while (true) {
            let users = await userrepo.follow();
            for (let i = 0; i < users.length; i++) {
                let followed = await this.instagram.followUser(users[i]);
                await userrepo.setType(users[i], followed ? 'followed' : 'error');
            }
            await this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay);
        }
    }

    async unfollowUsers() {
        await this.instagram.logIn();
        while (true) {
            // await this.instagram.unfollowUsers();
            let users = await userrepo.unfollow();
            for (let i = 0; i < users.length; i++) {
                let unfollowed = await this.instagram.unfollowUser(users[i]);
                await userrepo.setType(users[i], unfollowed ? 'unfollowed' : 'error');
            }
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