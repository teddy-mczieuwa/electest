const {app, BrowserWindow} = require('electron')

let win

const createWindow = () => {

    // create browser window
    win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        
        webPreferences: {
            nodeIntegration: true
        }
    })

    // load the index.html 
    win.loadFile(`views/index.html`)

    //win.loadURL(`file://${__dirname}/views/index.html`)


    // Open the DevTools.
    //win.webContents.openDevTools()

    //ready to show 
    win.once('ready-to-show', () => {
        win.show()
    })

    //close the window
    win.once('closed', () => {
        win = null
    })
}

// execute app when ready
app.on('ready', createWindow)

