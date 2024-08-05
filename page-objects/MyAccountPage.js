export class MyAccountPage {
    constructor (page) {
        this.page = page

        this.pageHeading = page.locator('xpath=//h1[text()="My Account"]')
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        await this.page.goto('/my-account')
    }

    waitForMyAccountPageLoaded = async() => {
        await this.pageHeading.waitFor()
    }

    waitForErrorMessage = async() => {
        await this.errorMessage.waitFor()
    }
}