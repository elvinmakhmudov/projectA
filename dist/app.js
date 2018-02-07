'use strict';

var _automator = require('./automator');

var _automator2 = _interopRequireDefault(_automator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let automateFollowers = new automater().getFollowings();
//  let automateFollowers2 = new automater().savePosts();
// let automateFollowers3 = new automater().getNewUsers();
var automateFollowers3 = new _automator2.default().followUsers();
//  let automateFollowers3 = new automater().analyzeUsers();
//  let automateFollowers4 = new automater().likeUserPosts();
// new automater().tripleCombo();
// new automater().commentPosts();
// new automater().unfollowUsers();