'use strict';

var _automator = require('./automator');

var _automator2 = _interopRequireDefault(_automator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let automateFollowers = new automater().getFollowings();
// let automateFollowers2 = new automater().savePosts();
// let automateFollowers3 = new automater().getNewUsers();
//let automateFollowers3 = new automater().sendUserRequests();
//let automateFollowers3 = new automater().analyzeUsers();
var automateFollowers3 = new _automator2.default().likeUserPosts();