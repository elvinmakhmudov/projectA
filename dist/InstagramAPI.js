'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var _require = require('selenium-webdriver'),
    Builder = _require.Builder,
    By = _require.By,
    until = _require.until;

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
                        return this;
                }
        }, {
                key: 'logIn',
                value: function logIn() {
                        var driver = this.driver;
                        driver.get(config.urls.login);
                        driver.wait(until.elementLocated(By.name("username")), 3000);
                        driver.findElement(By.name('username')).sendKeys(this.login);
                        driver.findElement(By.name('password')).sendKeys(this.password);
                        driver.findElement(By.className('_qv64e _gexxb _4tgw8 _njrw0')).click();
                        return this;
                }
        }]);

        return InstagramAPI;
}();

exports.default = InstagramAPI;