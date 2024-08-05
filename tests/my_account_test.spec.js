import { expect, test } from '@playwright/test'
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { sendRequest } from "../api-calls/sendRequest.js"
import { adminDetails } from "../data/userDetails.js"

test("Login with cookies injection", async ({page}) => {
    const loginToken = await sendRequest(adminDetails.username, adminDetails.password)

    await page.route("**/api/user**",async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT MESSAGE"})
        })
    })

    console.warn({loginToken})
    const myAccountPage = new MyAccountPage(page)
    await myAccountPage.visit()

    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])

    await myAccountPage.visit()
    await myAccountPage.waitForMyAccountPageLoaded()
    await myAccountPage.waitForErrorMessage()
})