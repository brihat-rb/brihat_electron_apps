const main_div = document.getElementById("calendar_mini");
const main_div_ns = document.getElementById("calendar_mini_ns");
const main_div_bs = document.getElementById("calendar_mini_bs");
const main_div_sns = document.getElementById("calendar_mini_sns");
const main_div_ad = document.getElementById("calendar_mini_ad");

const BS_DATE_TODAY = bs_today_year.toString() + "-" + bs_today_month.toString().padStart(2, "0") + "-" + bs_today_date.toString().padStart(2, "0");

const fs = require('fs');
const path = require('path');
var PAKSHYA_JSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/' + bs_today_year.toString() + '_lunar_data.json')));

today_json = PAKSHYA_JSON[BS_DATE_TODAY];

nepal_sambat_text = arabic_number_to_nepali(today_json[3])

// main_div_ns.innerHTML = "ने. सं. ";
// main_div_bs.innerHTML = "वि. सं. ";
// main_div_sns.innerHTML = "सौ. ने. सं. ";
// main_div_ad.innerHTML = "AD ";

main_div_ns.innerHTML += nepal_sambat_text + " " + today_json[0];
main_div_ns.innerHTML += " (" + today_json[1] + "), " + today_json[2];

main_div_bs.innerHTML += arabic_number_to_nepali(bs_today_year) + " ";
main_div_bs.innerHTML += BS_MONTHS_NEP[bs_today_month - 1] + " ";
main_div_bs.innerHTML += arabic_number_to_nepali(bs_today_date) + ", ";
main_div_bs.innerHTML += NEPALI_DAYS[AD_TODAY_DAY] + " ";

main_div_sns.innerHTML += arabic_number_to_nepali(ns_today_year) + " ";
main_div_sns.innerHTML += NS_NEP[ns_today_month - 1] + " ";
main_div_sns.innerHTML += arabic_number_to_nepali(ns_today_date) + ", ";
main_div_sns.innerHTML += NS_DAYS[AD_TODAY_DAY] + " ";

main_div_ad.innerHTML += AD_TODAY_YEAR + " ";
main_div_ad.innerHTML += AD_MONTHS[AD_TODAY_MONTH] + " ";
main_div_ad.innerHTML += AD_TODAY_DATE + ", ";
main_div_ad.innerHTML += ENGLISH_DAYS[AD_TODAY_DAY] + " ";
