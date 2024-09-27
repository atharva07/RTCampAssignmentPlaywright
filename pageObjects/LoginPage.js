class LoginPage {

    constructor(page) {
        this.page = page;
        this.userNameField = page.locator('#user-name');
        this.passwordField = page.locator("#password");
        this.loginButton = page.locator("#login-button");
    }

    async goTo() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async validLogin(username, password) {
        await this.userNameField.type(username);
        await this.passwordField.type(password);
        await this.page.waitForTimeout(2000);
        await this.loginButton.click();
    }
}

module.exports = {LoginPage};