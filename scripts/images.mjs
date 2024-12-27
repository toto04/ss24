import fs from "fs"
import wishlist from "../src/data/wishlist.json" assert { type: "json" }

for (const item of wishlist) {
  const params = new URLSearchParams(item.imageURL.split("?")[1])
  const url = Buffer.from(params.get("urlb64"), "base64").toString()
  item.imageURL = url
}

fs.writeFileSync("src/data/wishlist.json", JSON.stringify(wishlist, null, 2))
