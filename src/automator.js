import "babel-polyfill";
let config = require('../config.json');
import api from './InstagramAPI.js';
const async = require('async');
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
        let pages = await this.instagram.getPrivatePages();
        //get new usernames
        for (let i = 0; i < pages.length; i++) {
            let username = pages[i].username;
            //go to the username page
            await this.instagram.goToUsername(username);
            await this.instagram.savePostsToAnalyze(username);
        }
    }

    async getNewUsers() {
        await this.instagram.logIn();
        await this.instagram.getNewUsers();
    }
}

export default Automater;