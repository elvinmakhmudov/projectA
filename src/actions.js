let config = require('../config.json');
import api from './InstagramAPI.js';
import postrepo from './repositories/post';
import userrepo from './repositories/user';
import pagerepo from './repositories/page';

export default {

    async findNewPages() {
        let postsReviewed = await postrepo.reviewed();
        let oldExplorePages = await pagerepo.explore();
        let posts;
        await this.instagram.goToUsername((oldExplorePages.length > 0) ? oldExplorePages[Math.floor(Math.random() * oldExplorePages.length)].username : "qizlargramm");
        try {
            let explorePages = await this.instagram.explorePage(oldExplorePages);
        } catch (e) {
            // console.log(e)
        }
    },
    async getPostsToComment() {
        let explorePages;
        try {
            explorePages = await pagerepo.explore(10);
            console.log(this.login + ' : Pages to explore : ' + explorePages.length);
        } catch (e) {
            console.log(e);
        }
        for (let i = 0, k=0; k < explorePages.length && i < explorePages.length ; i++) {
            try {
                await this.instagram.goToUsername(explorePages[i].username);
                let postsFor = await postrepo.postsFor(explorePages[i]);
                console.log(this.login + ' : post to analyze for a user is : ' + postsFor.length);
                let posts = await this.instagram.getNewPosts(explorePages[i], postsFor, 'comment');
                console.log(this.login + ' : posts length is : ' + posts.length)
                for (let j = 0; j < posts.length; j++) {
                    try {
                        let rating = await this.instagram.getRating(posts[j]);
                        posts[j].rating = rating;
                    } catch (e) {
                        // console.log(e);
                    }
                }
                await postrepo.insertMany(posts);
                k++;
            } catch (e) {
                // await pagerepo.remove(explorePages[i])
                // console.log(e);
            }
        }
        // await pagerepo.insertMany(explorePages)
        console.log(this.login + ' : inserting explore pages');
    },
    async savePosts() {
        let pages, postsReviewed;
        try {
            pages = await pagerepo.private(20);
            console.log(this.login + ' : Private page size is : ' + pages.length);
            postsReviewed = await postrepo.reviewed();
            console.log(this.login + ' : Reviewed posts size is : ' + postsReviewed.length);
        } catch (e) {
            console.log(e);
        }
        let posts;
        //get new usernames
        for (let i = 0,j=0; j < pages.length && i < pages.length; i++) {
            let username = pages[i].username;
            //go to the username page
            try {
                await this.instagram.goToUsername(username);
                posts = await this.instagram.getNewPosts(pages[i], postsReviewed, 'analyze');
                await postrepo.insertMany(posts);
                j++;
            } catch (e) {
                // await pagerepo.remove(pages[i])
            }
            await pagerepo.setReviewed(pages[i])
        }
    },

    async analyzePosts() {
        let posts, users;
        try {
            posts = await postrepo.analyze(10);
            console.log(this.login + ' : Posts to analyze : ' + posts.length);
            users = await userrepo.analyze() || [];
        } catch (e) {
            console.log(e);
        }
        let newUsers = [];
        console.log(this.login + ' : Analyzing posts.');
        for (let i = 0,j=0; j < posts.length && i < posts.length; i++) {
            try {
                let postData = await this.instagram.getPostData(posts[i], users);
                newUsers.push.apply(newUsers, postData.newUsers);
                await postrepo.setReviewed(posts[i], postData);
                j++;
            } catch (e) {
                // console.log(e);
                await postrepo.remove(posts[i]);
            }
        }
        if (newUsers.length > 0) {
            try {
                await userrepo.insertMany(newUsers);
                console.log(this.login + ' : ' + users.length + ' users found.');
                newUsers.length = 0;
                users.length = 0;
            } catch (e) {
                // console.log(e);
            }
        }
    },
    async analyzeUsers() {
        let users;
        try {
            users = await userrepo.analyze(10) || [];
            console.log(this.login + ' : Users  to analyze : ' + users.length);
        } catch (e) {
            console.log(e);
        }
        for (let i = 0,j=0; j < users.length && i < users.length; i++) {
            try {
                let type = await this.instagram.getUserType(users[i]);
                await userrepo.setType(users[i], type);
                j++;
            } catch (e) {
                // console.log(e);
                await userrepo.softDelete(users[i]);
            }
        }
    },

    async followUsers() {
        let users;
        try {
            users = await userrepo.follow();
            console.log(this.login + ' : Users  to follow : ' + users.length);
        } catch (e) {
            console.log(e);
        }
        for (let i = 0,j=0; j < users.length && i < users.length; i++) {
            try {
                let followed = await this.instagram.followUser(users[i]);
                await userrepo.setFollowed(users[i], this.login);
                j++;
            } catch (e) {
                await userrepo.setType(users[i], 'error');
                console.log(this.login + ' : Error following: ' + users[i].username);
            }
        }
    },

    async unfollowUsers() {
        // await this.instagram.unfollowUsers();
        let users;
        try {
            users = await userrepo.unfollow();
            console.log(this.login + ' : Users  to unfollow : ' + users.length);
        } catch (e) {
            console.log(e);
        }
        for (let i = 0,j=0; j < users.length && i < users.length; i++) {
            try {
                let unfollowed = await this.instagram.unfollowUser(users[i]);
                await userrepo.setType(users[i], 'unfollowed');
                j++;
            } catch (e) {
                await userrepo.setType(users[i], 'error');
                console.log(this.login + ' : Error unfollowing: ' + users[i].username);
            }
        }
    },
    async likeUserPosts() {
        let users;
        try {
            users = await userrepo.like();
            console.log(this.login + ' : Users  to like : ' + users.length);
        } catch (e) {
            console.log(e);
        }
        for (let i = 0,j=0; j < users.length && i< users.length; i++) {
            try {
                await this.instagram.likeUserPosts(users[i]);
                await userrepo.setType(users[i], 'liked');
                j++;
            } catch (e) {
                await userrepo.softDelete(users[i]);
                console.log(this.login + ' : Soft deleted: ' + users[i].username);
            }
        }
    },
    async commentPosts() {
        let posts;
        try {
            posts = await postrepo.comment();
            console.log(this.login + ' : Posts to comment : ' + posts.length);
        } catch (e) {
            console.log(e);
        }
        for (let i = 0,j=0; j < posts.length && i< posts.length; i++) {
            try {
                console.log(this.login + ' : Commenting ' + (i + 1) + ' of ' + posts.length + ' posts.')
                await this.instagram.commentPosts(posts[i]);
                await postrepo.setType(posts[i], 'commented');
                await pagerepo.setCommented(posts[i].page[0]);
                j++;
            } catch (e) {
                await postrepo.remove(posts[i]);
            }
        }
    }
}