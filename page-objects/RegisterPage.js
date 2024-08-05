export class RegisterPage {
    constructor (page) {
        this.page = page

        this.emailField = page.locator('xpath=//input[@placeholder="E-Mail"]')
        this.passwordField = page.locator('xpath=//input[@placeholder="Password"]')
        this.registerButton = page.locator('xpath=//button[./div[text()="Register"]]')
    }

    registerNewUser = async (userName, password) => {
        await this.emailField.waitFor()
        await this.emailField.fill(userName)
        await this.passwordField.fill(password)
        await this.registerButton.click()
    }
}