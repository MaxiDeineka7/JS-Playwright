import {test, expect} from "@playwright/test"

test("Product Page Add to Basket", async ({ page }) => {
    await page.goto('/')

    const addToBasketButton = page.locator("[data-qa='product-button']").first()
    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")

    const basketCount = page.locator("[data-qa='header-basket-count']")
    await expect(basketCount).toHaveText("0")
    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCount).toHaveText("1")

    const checkoutButton = page.getByRole('link', {name : 'Checkout'})
    await checkoutButton.waitFor()
    await checkoutButton.click()

    await page.waitForURL('/basket');
})