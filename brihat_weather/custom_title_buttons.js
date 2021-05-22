// (function () {
//   const remote = require('electron').remote;
//
//   /* Note this is different to the html global `window` variable */
//   const current_window = remote.getCurrentWindow();
//
//   function handleWindowControls() {
//     // Make minimise/maximise/restore/close buttons work when they are clicked
//     document.getElementById('minbtn').addEventListener("click", event => {
//       current_window.minimize();
//     });
//
//     document.getElementById('maxbtn').addEventListener("click", event => {
//       // current_window.maximize();
//     });
//
//     // document.getElementById('restore-button').addEventListener("click", event => {
//     //   current_window.unmaximize();
//     // });
//
//     document.getElementById('closebtn').addEventListener("click", event => {
//       current_window.close();
//     });
//
//     // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
//     // toggleMaxRestoreButtons();
//     // win.on('maximize', toggleMaxRestoreButtons);
//     // win.on('unmaximize', toggleMaxRestoreButtons);
//
//     // function toggleMaxRestoreButtons() {
//     //   if (win.isMaximized()) {
//     //     document.body.classList.add('maximized');
//     //   } else {
//     //     document.body.classList.remove('maximized');
//     //   }
//     // }
//   }
//
//   // When document has loaded, initialise
//   document.onreadystatechange = (event) => {
//       if (document.readyState == "complete") {
//           handleWindowControls();
//       }
//   };
//
//   window.onbeforeunload = (event) => {
//       /* If window is reloaded, remove win event listeners
//       (DOM element listeners get auto garbage collected but not
//       Electron win listeners as the win is not dereferenced unless closed) */
//       win.removeAllListeners();
//   }
//
// })();
