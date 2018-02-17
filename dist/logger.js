'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger(login) {
        _classCallCheck(this, Logger);

        this.login = login;
    }

    _createClass(Logger, [{
        key: 'update',
        value: function update(message) {
            var time = new Date();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            console.log(this.checkTime(hours) + ':' + this.checkTime(minutes) + ' ' + this.login + ' : ' + message);
        }
    }, {
        key: 'checkTime',
        value: function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
    }]);

    return Logger;
}();

exports.default = Logger;