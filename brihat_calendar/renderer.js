// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// prevent reload of page using MouseTrap
// require class="mousetrap" in input, select and textarea
Mousetrap.bind(['command+r', 'ctrl+r', 'ctrl+shift+r'], () => {
  console.log('command r or control r or control shift r')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// new Notification('Brihat Calendar Started', {
//   body: "Check Tray Icon for menu",
//   icon: "assets/brihat_calendar.png",
// })
