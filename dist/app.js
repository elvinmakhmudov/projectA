"use strict";

var _automator = require("./automator");

var _automator2 = _interopRequireDefault(_automator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// new automater().getFollowings();
// new automater().savePosts();
// new automater().analyzePosts();
// new automater().analyzeUsers();
// new automater().followUsers();
// new automater().unfollowUsers();
// new automater().likeUserPosts();
// new automater().commentPosts();
// new automater("leyli8294","topaz.az").findNewPages();
// new automater("leyli8294","topaz.az").getPostsToComment();
new _automator2.default().tripleAnalyzator();
new _automator2.default("ayselqurbanova2222", "topaz.az").triplePageActions();