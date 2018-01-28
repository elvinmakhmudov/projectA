import Post from './models/post';
export default  {
    analyzePosts() {
        Post.find({type: 'analyze'}).then(function (resolve) {
            
        });
    },
}

