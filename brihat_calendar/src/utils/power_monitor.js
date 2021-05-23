const electron = require('electron');
const powerMonitor = electron.remote.powerMonitor;

pm = document.getElementById('power_monitor');
pm.innerHTML += "<br/>";

powerMonitor.on('suspend', () => {
  pm.innerHTML += 'The system is going to sleep' + "<br/>";
});

powerMonitor.on('resume', () => {
  location.reload();
  pm.innerHTML += 'The system is resuming' + "<br/>";
});

powerMonitor.on('on-ac', () => {
  document.getElementById("calendar_mini_ns").classList.remove('dark');
  // document.getElementById("calendar_mini_bs").classList.remove('dark');
  document.getElementById("calendar_mini_sns").classList.remove('dark');
  // document.getElementById("calendar_mini_ad").classList.remove('dark');
  document.getElementById("calendar_mini").classList.remove('dark');
  pm.innerHTML += 'The system is on AC Power (charging)' + "<br/>";
});

powerMonitor.on('on-battery', () => {
  // location.reload();
  document.getElementById("calendar_mini_ns").classList.add('dark');
  // document.getElementById("calendar_mini_bs").classList.add('dark');
  document.getElementById("calendar_mini_sns").classList.add('dark');
  // document.getElementById("calendar_mini_ad").classList.add('dark');
  document.getElementById("calendar_mini").classList.add('dark');
  pm.innerHTML += 'The system is on Battery Power' + "<br/>";
});

powerMonitor.on('shutdown', () => {
  // document.getElementById('calendar_mini').innerHTML = "Exiting";
  pm.innerHTML += 'The system is Shutting Down' + "<br/>";
});

powerMonitor.on('lock-screen', () => {
  // document.getElementById('calendar_mini').innerHTML = "<br />Bye<br />Bye<br /><br />";
  pm.innerHTML += 'The system is about to be locked' + "<br/>";
});

powerMonitor.on('unlock-screen', () => {
  location.reload();
  pm.innerHTML += 'The system is unlocked' + "<br/>";
});

// const state = powerMonitor.getSystemIdleState(4);
// pm.innerHTML += 'Current System State - ' + state + "<br/>";
//
// const idle = powerMonitor.getSystemIdleTime();
// pm.innerHTML += 'Current System Idle Time - ' + idle + "<br/>";

if (powerMonitor.isOnBatteryPower()) {
  document.getElementById("calendar_mini_ns").classList.add('dark');
  // document.getElementById("calendar_mini_bs").classList.add('dark');
  document.getElementById("calendar_mini_sns").classList.add('dark');
  // document.getElementById("calendar_mini_ad").classList.add('dark');
  document.getElementById("calendar_mini").classList.add('dark');
  pm.innerHTML += 'The system is on Battery Power' + "<br/>";
}
