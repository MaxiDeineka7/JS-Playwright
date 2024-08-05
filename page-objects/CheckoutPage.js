import { expect } from "@playwright/test"

export class CheckoutPage {
    constructor (page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }


    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const newArray = allPriceTexts.map((element) => {
                const trimmedText = element.replace("$","")
                return parseInt(trimmedText, 10)
            })
        const smallestPrice = Math.min(...newArray)
        const smallestPriceIndex = newArray.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(2);
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/gm, {timeout: 3000})
    }
}