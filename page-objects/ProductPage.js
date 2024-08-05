import { expect } from "@playwright/test"

export class ProductPage {
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortByDropDown = page.locator('xpath=//select[@data-qa="sort-dropdown"]')
        this.productTitle = page.locator('xpath=//div[@data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto('/')
    }

    addProductsToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
    }

    productsSortBy = async () => {
        await this.sortByDropDown.waitFor()
        await this.sortByDropDown.selectOption("Price ascending")
    }

    getProductSortOrder = async () => {
        await this.productTitle.first().waitFor()
        return await this.productTitle.allInnerTexts()
    }
}