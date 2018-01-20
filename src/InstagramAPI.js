const config = require('../config.json');
const {Builder, By, until} = require('selenium-webdriver');

class InstagramAPI {
        constructor(login, password) {
                this.login = login || config.instagram.login;
                this.password = password || config.instagram.password;
        }

        init() {
                this.driver = new Builder()
                .forBrowser(config.browser)
                .build();
                return this;
        }

        logIn() {
                let driver = this.driver;
                driver.get(config.urls.login);
                driver.wait(until.elementLocated(By.name("username")), 3000);
                driver.findElement(By.name('username')).sendKeys(this.login);
                driver.findElement(By.name('password')).sendKeys(this.password);
                driver.findElement(By.className('_qv64e _gexxb _4tgw8 _njrw0')).click();
                return this;
        }
}

export default InstagramAPI;