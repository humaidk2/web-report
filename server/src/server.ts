import express = require('express')
import helmet = require('helmet')
import bodyParser = require('body-parser')
import playwright = require('playwright')

const { webkit, devices } = playwright
const pixel = devices['Pixel 2 XL']
const iPhone11 = devices['iPhone 11 Pro']
const reports: any = []
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
app.get('/report', (req, res) => {
    const { id } = req.query
    const userReports = reports.filter((report: any) => report.id === id)
    res.json({ reports: userReports })
})
app.post('/generate', (req, res) => {
    const { url, devices }: any = req.body
    const id = reports.length + ''
    devices.forEach((device: any) => {
        generateReport(device, url, id)
        status[device] = 'loading'
    })
    res.json({ message: 'success', id })
})
app.get('/status', (req, res) => {
    res.json({ status })
})
async function generateReport(selectedDevice: string, url: string, id: string) {
    const device = devices[selectedDevice]
    const fileName = selectedDevice.toLowerCase().split(' ').join('-')
    reports.push({
        id,
        device: selectedDevice,
        url,
        source: `${id}/${fileName}.png`,
    })
    try {
        const browser = await webkit.launch()
        const context = await browser.newContext(device)
        const page = await context.newPage()
        await page.goto(url)

        await page.screenshot({
            path: `./static/${id}/${fileName}.png`,
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
