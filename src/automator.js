let config = require('../config.json');
import api from './InstagramAPI.js';
class Automater {
        constructor(login, password) {
                this.login = login;
                this.password = password;
                this.instagram = new api(login, password).init().logIn();
        }

        getFollowings() {
                this.instagram.goToProfile()
                                .getFollowings();
        }
}

export default Automater;