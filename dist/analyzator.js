'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _post = require('./models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    analyzePosts: function analyzePosts() {
        _post2.default.find({ type: 'analyze' }).then(function (resolve) {});
    }
};