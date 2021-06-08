const app = require("./src/app")

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("[!] Could not start server")
        console.error(err)
    } else {
        console.log(`[+] Server running at :${process.env.PORT}`)
    }
})