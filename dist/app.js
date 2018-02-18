"use strict";

var _automator = require("./automator");

var _automator2 = _interopRequireDefault(_automator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// new automater().getFollowings();
// new automater("leyli8294","topaz.az").getPostsToComment();
new _automator2.default("leyli8294", "topaz.az").findNewPages();
new _automator2.default().tripleAnalyzator();
new _automator2.default().sleep(60).tripleAnalyzator();
new _automator2.default("ayselqurbanova2222", "topaz.az").sleep(60).triplePageActions();
new _automator2.default("aykamusya", "topaz.az2").sleep(60).triplePageActions();