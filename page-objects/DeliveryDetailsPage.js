import { expect, test } from '@playwright/test'

export class DeliveryDetailsPage {
    constructor (page) {
        this.page = page

        this.firstNameField = page.locator('xpath=//input[@data-qa="delivery-first-name"]')
        this.lastNameField = page.locator('xpath=//input[@data-qa="delivery-last-name"]')
        this.streetField = page.locator('xpath=//input[@data-qa="delivery-address-street"]')
        this.postalCodeField = page.locator('xpath=//input[@data-qa="delivery-postcode"]')
        this.cityField = page.locator('xpath=//input[@data-qa="delivery-city"]')
        this.countryDropDown = page.locator('xpath=//select[@data-qa="country-dropdown"]')
        this.saveDetailsButton = page.locator('xpath=//button[./div[text()="Save address for next time"]]')
        this.continueToPaymentButton = page.locator('xpath=//button[./div[text()="Continue to payment"]]')
        this.savedDetailsContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstNameField = page.locator('xpath=//p[@data-qa="saved-address-firstName"]')
        this.savedLastNameField = page.locator('xpath=//p[@data-qa="saved-address-lastName"]')
        this.savedStreetField = page.locator('xpath=//p[@data-qa="saved-address-street"]')
        this.savedPostalCodeField = page.locator('xpath=//p[@data-qa="saved-address-postcode"]')
        this.savedCityField = page.locator('xpath=//p[@data-qa="saved-address-city"]')
        this.savedCountryField = page.locator('xpath=//p[@data-qa="saved-address-country"]')
    }

    fillDetails = async (deliveryDetailsData) => {
        await this.firstNameField.waitFor()
        await this.firstNameField.fill(deliveryDetailsData.firstName)
        await this.lastNameField.fill(deliveryDetailsData.lastName)
        await this.streetField.fill(deliveryDetailsData.street)
        await this.postalCodeField.fill(deliveryDetailsData.postCode)
        await this.cityField.fill(deliveryDetailsData.city)
        await this.countryDropDown.selectOption(deliveryDetailsData.country)
    }

    saveDetails = async () => {
        await this.saveDetailsButton.waitFor()
        await this.saveDetailsButton.click()
        await this.savedDetailsContainer.waitFor()
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/gm, {timeout: 3000})
    }

    getDetailsContainerCount = async () => {
        await this.firstNameField.waitFor()
        const numberOfElements = await this.savedDetailsContainer.count()
        return parseInt(numberOfElements, 10)
    }

    checkForSavedData = async (deliveryDetailsData) => {
        await this.savedFirstNameField.first().waitFor()
        expect(this.savedFirstNameField.first().innerText()).toBe(await this.firstNameField.inputValue()) //як один з можливих варіків
        expect(this.savedLastNameField.first().innerText()).toEqual(deliveryDetailsData.lastName)
        expect(this.savedStreetField.first().innerText()).toEqual(deliveryDetailsData.street)
        expect(this.savedPostalCodeField.first().innerText()).toEqual(deliveryDetailsData.postCode)
        expect(this.savedCityField.first().innerText()).toEqual(deliveryDetailsData.city)
        expect(this.savedCountryField.first().innerText()).toEqual(deliveryDetailsData.country)
    }
}