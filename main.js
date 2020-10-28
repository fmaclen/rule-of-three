const { app, BrowserWindow, Tray, nativeImage, nativeTheme } = require('electron')
const path = require('path')

let tray, window

const createWindow = () => {
  window = new BrowserWindow({
    width: 248,
    height: 88,
    show: false,
    frame: false,
    fullscreenable: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.loadFile('app/index.html')
  window.on('closed', () => window = null)

  // Hide the window when it loses focus
  window.on('blur', () => window.hide())
}

// Create tray icon
const createTray = () => {
  const icon = setThemedIcon()
  const nImage = nativeImage.createFromPath(icon)

  tray = new Tray(nImage)
  tray.on('click', (event) => toggleWindow())
}

// Set position and reveal window
const showWindow = () => {
  const position = windowPosition()
  window.setPosition(position.x, position.y)
  window.show()
}

// Set window positoin
const windowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height)

  return {x, y}
}

// Show/hide window
const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow()
}

// Determine the icon asset based on system theme
const setThemedIcon = () => {
  const icon = nativeTheme.shouldUseDarkColors ? 'assets/icon-dark.png' : 'assets/icon-light.png'
  return path.join(__dirname, icon)
}

// Update icon if the system theme changes
nativeTheme.on('updated', (e) => {
  const icon = setThemedIcon()
  const nImage = nativeImage.createFromPath(icon)

  tray.setImage(nImage)
})

// Create the tray and window
app.whenReady().then(createTray).then(createWindow)

// Close the window
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

// Hide the app in the dock
app.dock.hide()
