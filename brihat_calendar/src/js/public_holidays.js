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

  var start_index = bs_year_start.toString() + "-" + bs_month_start.toString().padStart(2, '0');
  var end_index = bs_year_end.toString() + "-" + bs_month_end.toString().padStart(2, '0');

  var failsafe = 0;
  var ph_year = bs_year_start;
  var ph_month = bs_month_start;

  for(var index = start_index; index <= end_index;) {
    for(var days = 1; days <= BS_CALENDAR_DATA[ph_year][ph_month - 1]; days++) {
      // console.log(ph_year, " ", ph_month, " ", days);

      failsafe++;
      var public_holidays_key = ph_month.toString().padStart(2, "0") + "-" + days.toString().padStart(2, '0');
      var complete_date = ph_year + "-" + public_holidays_key;

      if(!document.getElementById(complete_date)) {
        continue;
      }

      if(public_holidays[ph_year]) {
        if(public_holidays[ph_year][public_holidays_key]) {
          var holiday_cause = public_holidays[ph_year][public_holidays_key][0];
          var holiday_type = public_holidays[ph_year][public_holidays_key][1];
          var holiday_description = public_holidays[ph_year][public_holidays_key][1];

          if(holiday_type == "national") {
            document.getElementById(complete_date).parentNode.parentNode.classList.add('national_holiday');
          }

          else if(holiday_type == "specific") {
            var date_node = document.getElementById(complete_date).parentNode.parentNode;

            // special case if specific holiday occurs on saturday
            if (date_node.classList.contains('saturday')) {
              date_node.classList.add('national_holiday');
            }
            else {
              date_node.classList.add('specific_holiday');
            }
          }
        }
      }
    }
    if (failsafe > 65) {
      console.log("Failsafe triggered");
      break;
    }
    ph_month++;
    if (ph_month > 12) {
      ph_month = 1;
      ph_year++;
    }
    index = ph_year.toString() + "-" + ph_month.toString().padStart(2, '0');
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

    var date_detail_popup_title = document.getElementById('modal_title');
    date_detail_popup_title.classList.add(public_holidays_array[1] + "_holiday");

    // special case when specific holiday lies on saturday
    if (date_detail_popup_title.classList.contains('saturday')) {
      date_detail_popup_title.classList.remove('saturday');
      date_detail_popup_title.classList.add('saturday');
    }
  }

  return public_holidays_info;
}
