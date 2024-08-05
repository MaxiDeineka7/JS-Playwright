import { expect, test } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid';
import { ProductPage } from '../page-objects/ProductPage.js'
import { Navigation } from "../page-objects/Navigation.js"
import { CheckoutPage } from "../page-objects/CheckoutPage.js"
import { LoginPage } from "../page-objects/LoginPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage.js"
import { PaymentPage } from "../page-objects/PaymentPage.js"
import { isDesktopViewport } from "../utilities/isDesktopViewport.js"
import { deliveryDetailsData } from '../data/deliveryDetailsData.js';
import { creditCardData } from '../data/creditCardData.js';

test("New user E2E test", async ({browser, page }) => {
    const productPage = new ProductPage(page)
    const navigation = new Navigation(page)
    await productPage.visit()

    const productTitlesBeforeSorting = await productPage.getProductSortOrder()
    await productPage.productsSortBy()
    const productTitlesAfterSorting = await productPage.getProductSortOrder()
    expect(productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting)

    let basketCounterBeforeAdding = 0

    if (isDesktopViewport(page)) {
        basketCounterBeforeAdding = await navigation.getBasketCount()
    }

    await productPage.addProductsToBasket(0)
    await productPage.addProductsToBasket(1)
    await productPage.addProductsToBasket(2)

    if (isDesktopViewport(page)) {
        const basketCounterAfterAdding = await navigation.getBasketCount()
        expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
    }
    await navigation.navigateToCheckoutPage()

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.removeCheapestProduct()

    if (isDesktopViewport(page)) {
        const basketCounterAfterRemoving = await navigation.getBasketCount()
        expect(basketCounterAfterRemoving).toBeLessThan(basketCounterAfterAdding)
    }
    await checkoutPage.continueToCheckout()

    const loginPage = new LoginPage(page)
    await loginPage.goToRegisterPage()

    const registerPage = new RegisterPage(page)
    await registerPage.registerNewUser(uuidv4() + '@gg.com', 'password')

    const deliveryDetailsPage = new DeliveryDetailsPage(page)
    await deliveryDetailsPage.fillDetails(deliveryDetailsData)
    const detailsCountBeforeSaving = await deliveryDetailsPage.getDetailsContainerCount()
    await deliveryDetailsPage.saveDetails()
    const detailsCountAfterSaving = await deliveryDetailsPage.getDetailsContainerCount()
    expect(detailsCountAfterSaving).toBeGreaterThan(detailsCountBeforeSaving)
    await deliveryDetailsPage.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(creditCardData) 
    await paymentPage.completePayment()

    await page.pause()
})