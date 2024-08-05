export class LoginPage {
    constructor (page) {
        this.page = page

        this.emailField = page.locator('xpath=//input[@placeholder="E-Mail"]')
        this.passwordField = page.locator('xpath=//input[@placeholder="Password"]')
        this.loginButton = page.locator('xpath=//button[./div[text()="Login"]]')
        this.registerButton = page.locator('xpath=//button[./div[text()="Register"]]')
    }

    goToRegisterPage = async () => {
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/gm, {timeout: 3000})
    }
}