import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadURL('your-url-here'); // Replace with your URL or file path

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create audio context for DAW
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});