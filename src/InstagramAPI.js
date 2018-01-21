const config = require('../config.json');
const {
        Builder,
        By,
        until
} = require('selenium-webdriver');
const async = require('async');
import db from './database/database.js';

class InstagramAPI {
        constructor(login, password) {
                this.login = login || config.instagram.login;
                this.password = password || config.instagram.password;
        }

        init() {
                this.driver = new Builder()
                        .forBrowser(config.browser)
                        .build();
                this.dbase = db.init();
                return this;
        }

        logIn() {
                let driver = this.driver;
                driver.get(config.urls.login);
                driver.wait(until.elementLocated(By.name("username")), config.timeout);
                driver.findElement(By.name('username')).sendKeys(this.login);
                driver.findElement(By.name('password')).sendKeys(this.password);
                driver.findElement(By.className('_qv64e _gexxb _4tgw8 _njrw0')).click();
                return this;
        }

        goToProfile() {
                this.driver.wait(until.elementLocated(By.className('coreSpriteDesktopNavProfile')), config.timeout);
                this.driver.findElement(By.className('coreSpriteDesktopNavProfile')).click();
                return this;
        }

        getFollowings() {
                this.driver.wait(until.elementLocated(By.partialLinkText('following')), config.timeout);
                this.driver.sleep(2000);
                this.driver.findElement(By.partialLinkText('following')).click();
                this.driver.sleep(2000);
                console.log('Getting followings');
                let scrollElement = this.driver.wait(until.elementLocated(By.className('_2g7d5 notranslate _o5iw8')), config.timeout);
                scrollElement.then(function () {
                        this.scrollFollowings(0).then(function() {
                                this.driver.findElements(By.className('_2g7d5 notranslate _o5iw8')).then(function (followings) {
                                        let followingsArr = [];
                                        for(let i=0;i<followings.length;i++) {
                                                followings[i].getText().then(function(following){
                                                        followingsArr.push({
                                                                'username': following
                                                        })
                                                        if(followingsArr.length === followings.length) {
                                                                this.dbase.insertMany('pages', followingsArr);
                                                        }
                                                }.bind(this))
                                        }
                                }.bind(this));
                        }.bind(this));
                }.bind(this))
        }

        scrollFollowings(scrollTop) {
                return new Promise(function(resolve) {
                        let scrolled = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;');
                        this.driver.sleep(1000);
                        scrolled.then(function () {
                                let currentScroll = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;return objDiv.scrollTop;').then(function(current){
                                        if (scrollTop !== current) {
                                                this.driver.sleep(500);
                                                return this.scrollFollowings(current).then(function(){
                                                        return resolve()
                                                }.bind(this));
                                        } else {
                                                return resolve();
                                        }
                                }.bind(this));
                        }.bind(this))
                }.bind(this))
        }
}

export default InstagramAPI;