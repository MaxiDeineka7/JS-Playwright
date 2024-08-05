import { expect } from "@playwright/test"

export class PaymentPage {
    constructor (page) {
        this.page = page

        this.discountCodeText = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.creditCardOwnerField = page.locator('xpath=//input[@data-qa="credit-card-owner"]')
        this.creditCardNumberField = page.locator('xpath=//input[@data-qa="credit-card-number"]')
        this.validUntilField = page.locator('xpath=//input[@data-qa="valid-until"]')
        this.cvcNumberField = page.locator('xpath=//input[@data-qa="credit-card-cvc"]')
        this.payButton = page.locator('xpath=//button[contains(@class,"pay-button")]')
        this.discountCodeField = page.locator('xpath=//input[@data-qa="discount-code-input"]')
        this.submitDiscountButton = page.locator('xpath=//button[@data-qa="submit-discount-button"]')
        this.discountActivatedText = page.locator('xpath=//p[text()="Discount activated!"]')  
    }

    activateDiscount = async () => {
        await this.discountCodeText.waitFor()
        const discount = await this.discountCodeText.innerText()
        await this.discountCodeField.waitFor()
        await this.discountCodeField.fill(discount)
        await expect(this.discountCodeField).toHaveValue(discount)

        await this.submitDiscountButton.click()
        await expect(this.discountActivatedText).toBeVisible()

        // інший спосіб, тупіший
        // await this.discountCodeField.focus()
        // await this.page.keyboard.type(discount, {delay: 1500})
        // await expect(this.discountCodeField.inputValue()).toBe(discount)
    }

    fillPaymentDetails = async (creditCardData) => {
        await this.creditCardOwnerField.waitFor()
        await this.creditCardOwnerField.fill(creditCardData.creditCardOwner)
        await this.creditCardNumberField.fill(creditCardData.creditCardNumber)
        await this.validUntilField.fill(creditCardData.validUntil)
        await this.cvcNumberField.fill(creditCardData.cvcNumber)
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/gm, {timeout: 15000})
    }
}