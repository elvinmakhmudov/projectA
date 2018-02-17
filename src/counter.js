export default class {
    constructor() {
        this.users = {
            followed: 0,
            unfollowed: 0,
            liked: 0,
            analyzed: 0,
            toAnalyze: 0,
            toLike: 0,
            toFollow: 0,
            toUnfollow: 0
        };
        this.pages = {
            followed: 0,
            explored: 0
        };
        this.posts = {
            commented: 0,
            liked: 0,
            toComment: 0,
            toAnalyze: 0
        };
    }
}