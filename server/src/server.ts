import express = require('express')
import helmet = require('helmet')
import bodyParser = require('body-parser')
import playwright = require('playwright')

const { webkit, devices } = playwright
const pixel = devices['Pixel 2 XL']
const iPhone11 = devices['iPhone 11 Pro']

const app = express()

const PORT = process.env.PORT || 3000
let status: any = {}

app.use(express.static('static'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.set('json spaces', 2)

app.get('/generate', (req, res) => {
    const { url, devices }: any = req.body
    devices.forEach((device: any) => {
        generateReport(device, url)
        status[device] = 'loading'
    })
    // generateReport('Pixel 2 XL', url)
    // generateReport('iPhone 11 Pro', url)
    res.json({ message: 'success' })
})
app.get('/status', (req, res) => {
    res.json({ status })
})
async function generateReport(selectedDevice: string, url: string) {
    const device = devices[selectedDevice]
    const fileName = selectedDevice.toLowerCase().split(' ').join('-')
    try {
        const browser = await webkit.launch()
        const context = await browser.newContext(device)
        const page = await context.newPage()
        await page.goto(url)

        await page.screenshot({
            path: `./static/${url}/${fileName}.png`,
        })

        await browser.close()
        status[selectedDevice] = 'done'
    } catch (error) {
        console.log(error)
        status = 'error'
        status[selectedDevice] = 'error'
    }
}

app.use('/*', (req, res) => {
    res.status(404).send({})
})

export default app.listen(PORT, () => {
    console.log('listening on port', PORT, '...')
})

// 2 routes for V1

// Get entry
// POST entry
// PUT entry
// delete entry

// GET user
// POST user
// PUT user
// delete user
