let config = require('../config.json');
import api from './InstagramAPI.js';
import db from './database.js';
class Automater {
        constructor(login, password) {
                this.login = login;
                this.password = password;
                this.dbase = db.init();
                this.instagram = new api(login, password).init().logIn();
        }

        findUsers() {


        }
}

export default Automater;