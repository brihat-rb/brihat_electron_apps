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

new Notification('Brihat Weather App', {
  body: " started in background",
  icon: "./brihaticon.png",
})

//  CODE 22 - 76 experiment with remote
// // const { remote } = require('electron');
// // const { BrowserWindow } = require('@electron/remote')
//
// /* Note this is different to the html global `window` variable */
// // const current_window = require('electron').remote.getCurrentWindow();
//
// function handleWindowControls() {
//   // Make minimise/maximise/restore/close buttons work when they are clicked
//   document.getElementById('minbtn').addEventListener("click", event => {
//     console.log("minimize");
//     // current_window.minimizeCurrentWindow();
//   });
//
//   document.getElementById('maxbtn').addEventListener("click", event => {
//     console.log("maximize");
//     // current_window.maximize();
//   });
//
//   // document.getElementById('restore-button').addEventListener("click", event => {
//   //   current_window.unmaximize();
//   // });
//
//   document.getElementById('closebtn').addEventListener("click", event => {
//     console.log("close");
//     // current_window.closeCurrentWindow();
//   });
//
//   // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
//   // toggleMaxRestoreButtons();
//   // win.on('maximize', toggleMaxRestoreButtons);
//   // win.on('unmaximize', toggleMaxRestoreButtons);
//
//   // function toggleMaxRestoreButtons() {
//   //   if (win.isMaximized()) {
//   //     document.body.classList.add('maximized');
//   //   } else {
//   //     document.body.classList.remove('maximized');
//   //   }
//   // }
// }
//
// // When document has loaded, initialise
// document.onreadystatechange = (event) => {
//     if (document.readyState == "complete") {
//         handleWindowControls();
//     }
// };
//
// // window.onbeforeunload = (event) => {
// //     /* If window is reloaded, remove win event listeners
// //     (DOM element listeners get auto garbage collected but not
// //     Electron win listeners as the win is not dereferenced unless closed) */
// //     current_window.removeAllListeners();
// // }

function show_weather_notification() {
  let nrequest = new XMLHttpRequest();
  let ncity_name = document.getElementById("location").innerHTML;
  ncity_name = ncity_name.substring(0, ncity_name.length - 5);

  let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ncity_name + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
  nrequest.open('GET', url, true);

  nrequest.onload = function() {
    let notify_data = JSON.parse(this.response);

    if (notify_data.cod == 200) {
      let body = notify_data.name + " (" + notify_data.sys.country + ")";
      body += '\n' + notify_data.weather[0].main + " (" + notify_data.weather[0].description + ")";
      if (notify_data.hasOwnProperty("rain")) {
        if (notify_data.rain.hasOwnProperty("1h"))
          body += "\tRain: " + notify_data.rain["1h"] + " mm";
        else if (notify_data.rain.hasOwnProperty("3h"))
          body += "\tRain: " + notify_data.rain["3h"] + " mm";
      }
      body += '\nTemp: ' + notify_data.main.temp + " C (feels like " + notify_data.main.feels_like + " C)";
      body += '\nHumidity: ' + notify_data.main.humidity + '% \tPressure: ' + notify_data.main.pressure + " hpa";
      console.log('notification i am here');
      let notify = new Notification('Weather Update', {
        body: body,
        icon: "https://openweathermap.org/img/wn/" + notify_data.weather[0].icon + "@2x.png",
      });

      notify.onclick = function(event) {
        get_weather();
      }
    }
  }
  nrequest.send();
}

function notifyMe() {
  if (!window.Notification) {
    console.log('This browser does not support notifications.');
  }
  else {
    if (Notification.permission === 'granted') {
      if (new Date().getMinutes() % 15 == 0) {
        show_weather_notification();
      }
    }
    else {
      Notification.requestPermission().then(function(p) {
        if (p === 'granted') {
          if (new Date().getMinutes() % 15 == 0) {
            show_weather_notification();
          }
        }
        else {
          console.log('User blocked notifications.');
        }
      }).catch(function(err) {
        console.error(err);
      });
    }
  }

  // UPDATE THE WEATHER ON EVERY MINUTE DIVISIBLE BY 5
  if (new Date().getMinutes() % 5 == 0) {
    update_weather();
  }

  // check every minute, receive notification on every quarter of hour
  setTimeout("notifyMe()", 60000);
}
notifyMe();
