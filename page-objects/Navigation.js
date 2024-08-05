import { isDesktopViewport } from "../utilities/isDesktopViewport.js"

export class Navigation {
    constructor (page) {
        this.page = page
        
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', {name: 'Checkout'})
        this.burgerMenuButton = page.locator('[data-qa="burger-button"]')
    }

    navigateToCheckoutPage = async () => {
        if(!isDesktopViewport(this.page)) {
            await this.burgerMenuButton.waitFor()
            await this.burgerMenuButton.click()
        }

        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }
}