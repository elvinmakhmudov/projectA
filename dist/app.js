'use strict';

var _automator = require('./automator');

var _automator2 = _interopRequireDefault(_automator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let automateFollowers = new automater().getFollowings();
//  let automateFollowers2 = new automater().savePosts();
// let automateFollowers3 = new automater().analyzePosts();
//  let automateFollowers3 = new automater().followUsers();
//  let automateFollowers3 = new automater().analyzeUsers();
//  let automateFollowers4 = new automater().likeUserPosts();
// new automater().tripleCombo();
new _automator2.default().commentPosts();
// new automater().unfollowUsers();