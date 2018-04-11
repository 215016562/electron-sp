const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
  // 保持一个对于 window 对象的全局引用，如果你不这样做，
  // 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
  let win
  let newWin
  let displayData
//   let menu
  
  function createWindow () {
    // 创建浏览器窗口。
    win = new BrowserWindow({width: 300, height: 150, show: false, resizable: false, maximizable: false})
    newWin = new BrowserWindow({parent: win, modal: true, width: 500, height: 100, show: false, resizable: false, maximizable: false})
    displayData = new BrowserWindow({parent: win, width: 0, height: 0, title: '0', show: true, x: 100000,y: 100000})

    // 然后加载应用的 index.html。
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    win.on('ready-to-show', () => {
        win.show()
    })

    Menu.setApplicationMenu(null)
  
    // 打开开发者工具。
    // win.webContents.openDevTools()
  // 
    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
      // 取消引用 window 对象，如果你的应用支持多窗口的话，
      // 通常会把多个 window 对象存放在一个数组里面，
      // 与此同时，你应该删除相应的元素。
      win = null
      newWin = null
      displayData = null
    //   menu
    })
    
    newWin.on('closed', () => {
      console.log('close child')
      newWin = null
    })
  }

  // Electron 会在初始化后并准备
  // 创建浏览器窗口时，调用这个函数。
  // 部分 API 在 ready 事件触发后才能使用。
  app.on('ready', createWindow)
  
  // 当全部窗口关闭时退出。
  app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
    //监听ipc
    ipcMain.on('newWindow', (event, data) => {
      console.log(data)
      newWin.loadURL(url.format({
        pathname: path.join(__dirname, 'child.html'),
        protocol: 'file:',
        slashes: true
      }))
      newWin.show()
    })
    ipcMain.on('close', (event, data) => {
      newWin.hide()
    })
    ipcMain.on('disData', (event, data) => {
      displayData.setTitle(data.toString())
    })
  app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      createWindow()
    }
  })