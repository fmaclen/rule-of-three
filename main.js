const { app, BrowserWindow, Tray, nativeImage } = require('electron')
const path = require('path')

let tray, window

const createWindow = () => {
  window = new BrowserWindow({
    width: 248,
    height: 80,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.loadFile('app/index.html')
  window.on('closed', () => window = null)
}

const createTray = () => {
  const icon = path.join(__dirname, 'assets/icon.png')
  const nImage = nativeImage.createFromPath(icon)

  tray = new Tray(nImage)
  tray.on('click', (event) => toggleWindow())
}

const showWindow = () => {
  const position = windowPosition()
  window.setPosition(position.x, position.y)
  window.show()
}

const windowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height)

  return {x, y}
}

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow()
}

////////////////////////////////////////////////////////////////////////////////

app.whenReady().then(createTray).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.dock.hide()
