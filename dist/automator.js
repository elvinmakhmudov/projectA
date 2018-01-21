'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InstagramAPI = require('./InstagramAPI.js');

var _InstagramAPI2 = _interopRequireDefault(_InstagramAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var Automater = function () {
        function Automater(login, password) {
                _classCallCheck(this, Automater);

                this.login = login;
                this.password = password;
                this.instagram = new _InstagramAPI2.default(login, password).init().logIn();
        }

        _createClass(Automater, [{
                key: 'getFollowings',
                value: function getFollowings() {
                        this.instagram.goToProfile().getFollowings();
                        //click followings
                }
        }]);

        return Automater;
}();

exports.default = Automater;