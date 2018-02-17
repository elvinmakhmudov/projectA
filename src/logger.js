class Logger {
    constructor(login) {
        this.login = login;
    }
    update(message) {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        console.log(this.checkTime(hours) + ':' + this.checkTime(minutes) + ' ' + this.login + ' : ' + message);
    }
    checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}

export default Logger;