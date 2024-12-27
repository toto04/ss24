/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs/promises"
import ccs from "chrome-cookies-secure"
import puppeteer from "puppeteer"
import wishdetails from "./WishGiftDetails.json" assert { type: "json" }

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    userDataDir:
      "/Users/tommasomorganti/Library/Application Support/Google/Chrome Canary/Default",
  })

  const cookies = await ccs.getCookiesPromised(
    "https://www.amazon.it",
    "puppeteer"
  )
  console.log(cookies)
  browser.setCookie(...cookies)

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  console.log("Navigating to Amazon")
  await page.goto("https://www.amazon.it/", { waitUntil: "networkidle2" })
  console.log("Navigated to Amazon")

  // await page.click("#nav-global-location-popover-link")
  // await wait(1000)
  // console.log("Clicked on location popover")
  // await page.type("input[autocomplete=postal-code]", "20125")
  // await page.click("input[aria-labelledby=GLUXZipUpdate-announce]")
  // console.log("Typed in the zip code")
  // await wait(1000)
  // await page.click("button[name=glowDoneButton]")
  // console.log("Clicked on Done button")
  // await wait(1000)
  // await page.reload({ waitUntil: "networkidle2" })

  const zip = await page.evaluate(() => {
    return document.querySelector("#glow-ingress-line2").innerHTML.trim()
  })
  console.log("zip code is ", zip)

  const products = []

  try {
    for (const wish of wishdetails) {
      const url = wish.productURL.split("?")[0]
      console.log("Navigating to ", url)
      await page.goto(url, { waitUntil: "load" })

      const price = await page.evaluate(() => {
        const s = document.querySelector("#priceblock_ourprice")?.innerText
        if (!s) return null
        return parseFloat(s.slice(0, -1).replace(",", ".")) || null
      })

      const spedizione = await page.evaluate(() => {
        return (
          document.querySelector(
            "#mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE"
          )?.innerText ?? null
        )
      })

      const rating = await page.evaluate(() => {
        const r = document.querySelector(
          "#averageCustomerReviews span span"
        )?.innerText
        if (!r) return null
        return parseFloat(r.substring(0, 3).replace(",", "."))
      })

      const reviewCount = await page.evaluate(() => {
        const s = document.querySelector("#acrCustomerReviewText")?.innerText
        if (!s) return 0
        return parseInt(s.replace(/\D/g, ""))
      })

      const fmValue = await page.evaluate(() => {
        const e = document.querySelectorAll(".offer-display-feature-text")
        const c = [
          e[0]?.innerText?.trim() ?? null,
          e[2]?.innerText?.trim() ?? null,
        ]
        return c.reduce((acc, i) => (i === "Amazon" ? acc + 1 : acc), 0)
      })

      products.push({
        name: wish.name,
        url,
        category: wish.category,
        imageURL: wish.image.url,
        price,
        spedizione,
        rating,
        reviewCount,
        fmValue,
      })
    }
  } catch (_) {
    console.log("Error while fetching details")
  } finally {
    console.log(products.length, "products fetched")
    fs.writeFile("wishlist.json", JSON.stringify(products, null, 2))
  }

  await browser.close()
}

main()
