import { initializeServer, startServer } from "./server"

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})

async function init() {
    await startServer()
}

init().catch((err) => {
    console.error(err)
    process.exit(1)
})
