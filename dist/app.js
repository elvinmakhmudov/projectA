"use strict";

var _automator = require("./automator");

var _automator2 = _interopRequireDefault(_automator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// new automater().getFollowings();
// new automater("leyli8294","topaz.az").getPostsToComment();
// new automater("leyli8294","topaz.az").findNewPages();
// new automater().tripleAnalyzator();
// new automater().sleep(60).tripleAnalyzator();
// new automater().sleep(60).tripleAnalyzator();
// new automater().sleep(60).tripleAnalyzator();
// new automater().sleep(60).tripleAnalyzator();
new _automator2.default("queens_of_baku", "topaz.az13").sleep(60).triplePageActions();
new _automator2.default("modnoaz", "topaz.az15").sleep(60).triplePageActions();