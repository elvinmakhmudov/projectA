'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('./database/database.js');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var _require = require('selenium-webdriver'),
    Builder = _require.Builder,
    By = _require.By,
    until = _require.until;

var async = require('async');

var InstagramAPI = function () {
        function InstagramAPI(login, password) {
                _classCallCheck(this, InstagramAPI);

                this.login = login || config.instagram.login;
                this.password = password || config.instagram.password;
        }

        _createClass(InstagramAPI, [{
                key: 'init',
                value: function init() {
                        this.driver = new Builder().forBrowser(config.browser).build();
                        this.dbase = _database2.default.init();
                        return this;
                }
        }, {
                key: 'logIn',
                value: function logIn() {
                        var driver = this.driver;
                        driver.get(config.urls.login);
                        driver.wait(until.elementLocated(By.name("username")), config.timeout);
                        driver.findElement(By.name('username')).sendKeys(this.login);
                        driver.findElement(By.name('password')).sendKeys(this.password);
                        driver.findElement(By.className('_qv64e _gexxb _4tgw8 _njrw0')).click();
                        return this;
                }
        }, {
                key: 'goToProfile',
                value: function goToProfile() {
                        this.driver.wait(until.elementLocated(By.className('coreSpriteDesktopNavProfile')), config.timeout);
                        this.driver.findElement(By.className('coreSpriteDesktopNavProfile')).click();
                        return this;
                }
        }, {
                key: 'getFollowings',
                value: function getFollowings() {
                        this.driver.wait(until.elementLocated(By.partialLinkText('following')), config.timeout);
                        this.driver.sleep(2000);
                        this.driver.findElement(By.partialLinkText('following')).click();
                        this.driver.sleep(2000);
                        console.log('Getting followings');
                        var scrollElement = this.driver.wait(until.elementLocated(By.className('_2g7d5 notranslate _o5iw8')), config.timeout);
                        scrollElement.then(function () {
                                this.scrollFollowings(0).then(function () {
                                        this.driver.findElements(By.className('_2g7d5 notranslate _o5iw8')).then(function (followings) {
                                                // console.log(followings);
                                                var followingsArr = [];
                                                for (var i = 0; i < followings.length; i++) {
                                                        followings[i].getText().then(function (following) {
                                                                followingsArr.push({
                                                                        'username': following
                                                                });
                                                                if (followingsArr.length === followings.length) {
                                                                        this.dbase.insertMany('pages', followingsArr);
                                                                }
                                                        }.bind(this));
                                                }
                                                console.log(followingsArr);
                                        }.bind(this));
                                }.bind(this));
                        }.bind(this));
                }
        }, {
                key: 'scrollFollowings',
                value: function scrollFollowings(scrollTop) {
                        return new Promise(function (resolve) {
                                var scrolled = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;');
                                this.driver.sleep(1000);
                                scrolled.then(function () {
                                        var currentScroll = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;return objDiv.scrollTop;').then(function (current) {
                                                if (scrollTop !== current) {
                                                        this.driver.sleep(500);
                                                        return this.scrollFollowings(current).then(function () {
                                                                return resolve();
                                                        }.bind(this));
                                                } else {
                                                        return resolve();
                                                }
                                        }.bind(this));
                                }.bind(this));
                        }.bind(this));
                }
        }]);

        return InstagramAPI;
}();

exports.default = InstagramAPI;