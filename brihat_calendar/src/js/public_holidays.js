// GET PUBLIC HOLIDAYS

const fs2 = require('fs');
const path2 = require('path');

const public_holidays = JSON.parse(fs2.readFileSync(path2.resolve(__dirname, '../data/public_holidays_in_nepal.json')));

var public_holidays_start_year = public_holidays.start_year;
var public_holidays_end_year = public_holidays.end_year;

function show_public_holidays(bs_year_start, bs_year_end, bs_month_start, bs_month_end) {
  if(bs_year_end < public_holidays_start_year || bs_year_start > public_holidays_end_year) {
    return;
  }
  for(var year = bs_year_start; year<=bs_year_end; year++) {
    for(var month = bs_month_start; (month % 12) <= bs_month_end; month++) {
      for(var days = 1; days <= BS_CALENDAR_DATA[year][(month % 12) - 1]; days++) {
        // console.log(year, " ", month, " ", days);
        var public_holidays_key = month.toString().padStart(2, "0") + "-" + days.toString().padStart(2, '0');
        var complete_date = year + "-" + public_holidays_key;
        if(!document.getElementById(complete_date)){
          continue;
        }
        if(public_holidays[year]) {
          if(public_holidays[year][public_holidays_key]) {
            var holiday_cause = public_holidays[year][public_holidays_key][0];
            var holiday_type = public_holidays[year][public_holidays_key][1];
            var holiday_description = public_holidays[year][public_holidays_key][1];

            if(holiday_type == "national") {
              document.getElementById(complete_date).parentNode.parentNode.style.color = "red";
            }

            else if(holiday_type == "specific") {
              document.getElementById(complete_date).parentNode.parentNode.style.color = "orange";
            }
          }
        }
      }
    }
  }
}

function add_public_holiday_info(complete_date, has_events) {
  document.getElementById('modal_title').classList.remove("national_holiday");
  document.getElementById('modal_title').classList.remove("specific_holiday");

  var public_holidays_year = complete_date.toString().substr(0,4);
  var public_holidays_key = complete_date.toString().slice(5);
  var public_holidays_info = "";

  if(public_holidays_year < public_holidays_start_year.toString() || public_holidays_year > public_holidays_end_year.toString()) {
    return public_holidays_info;
  }

  if (public_holidays[public_holidays_year][public_holidays_key]) {
    public_holidays_array = public_holidays[public_holidays_year][public_holidays_key];
    public_holidays_info = "<br />";
    if(!has_events) {
      public_holidays_info += "<br />";
    }
    public_holidays_info += "<div class=" + public_holidays_array[1] + "_holiday>";
    public_holidays_info += "<div id='public_holiday_title'>holiday information</div>";
    public_holidays_info += "<div id='public_holiday_cause'>" + public_holidays_array[0] + "</div>";
    public_holidays_info += "<div id='public_holiday_description'>( " + public_holidays_array[2] + " )</div>";
    public_holidays_info += "</div>";

    document.getElementById('modal_title').classList.add(public_holidays_array[1] + "_holiday");
  }

  return public_holidays_info;
}
