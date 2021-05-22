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

new Notification('Brihat Calendar App', {
  body: " started in background",
  icon: "./brihaticon.png",
})

// function show_weather_notification() {
//   let nrequest = new XMLHttpRequest();
//   let ncity_name = document.getElementById("location").innerHTML;
//   ncity_name = ncity_name.substring(0, ncity_name.length - 5);
//
//   let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ncity_name + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
//   nrequest.open('GET', url, true);
//
//   nrequest.onload = function() {
//     let notify_data = JSON.parse(this.response);
//
//     if (notify_data.cod == 200) {
//       let body = notify_data.name + " (" + notify_data.sys.country + ")";
//       body += '\n' + notify_data.weather[0].main + " (" + notify_data.weather[0].description + ")";
//       if (notify_data.hasOwnProperty("rain")) {
//         if (notify_data.rain.hasOwnProperty("1h"))
//           body += "\tRain: " + notify_data.rain["1h"] + " mm";
//         else if (notify_data.rain.hasOwnProperty("3h"))
//           body += "\tRain: " + notify_data.rain["3h"] + " mm";
//       }
//       body += '\nTemp: ' + notify_data.main.temp + " C (feels like " + notify_data.main.feels_like + " C)";
//       body += '\nHumidity: ' + notify_data.main.humidity + '% \tPressure: ' + notify_data.main.pressure + " hpa";
//       console.log('notification i am here');
//       let notify = new Notification('Weather Update', {
//         body: body,
//         icon: "https://openweathermap.org/img/wn/" + notify_data.weather[0].icon + "@2x.png",
//       });
//
//       notify.onclick = function(event) {
//         get_weather();
//       }
//     }
//   }
//   nrequest.send();
// }
//
// function notifyMe() {
//   if (!window.Notification) {
//     console.log('This browser does not support notifications.');
//   }
//   else {
//     if (Notification.permission === 'granted') {
//       if (new Date().getMinutes() % 15 == 0) {
//         show_weather_notification();
//       }
//     }
//     else {
//       Notification.requestPermission().then(function(p) {
//         if (p === 'granted') {
//           if (new Date().getMinutes() % 15 == 0) {
//             show_weather_notification();
//           }
//         }
//         else {
//           console.log('User blocked notifications.');
//         }
//       }).catch(function(err) {
//         console.error(err);
//       });
//     }
//   }
//
//   // UPDATE THE WEATHER ON EVERY MINUTE DIVISIBLE BY 5
//   if (new Date().getMinutes() % 5 == 0) {
//     update_weather();
//   }
//
//   // check every minute, receive notification on every quarter of hour
//   setTimeout("notifyMe()", 60000);
// }
// notifyMe();
