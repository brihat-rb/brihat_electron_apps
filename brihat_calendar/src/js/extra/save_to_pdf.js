function print() {
  var print_content = document.getElementsByTagName('html')[0].innerHTML;
  // 595 x 842
  var win = window.open('', '', 'left=0, top=0, width=800, height=567, toolbar=0, scrollbars=0, status=0');
  win.document.title = 'Brihat Calendar';
  win.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">');
  win.document.write('<link rel="stylesheet" href="./index.css" />');
  win.document.write('<link rel="stylesheet" href="./index_cal_conv.css" />');
  win.document.write('<link rel="stylesheet" href="./index_details.css" />');
  win.document.write(print_content);
  win.document.getElementById("solarnsconverter").style.display = "none";
  win.document.getElementById("brihat_calendar_date_jumper").style.display = "none";
  win.document.getElementById("print").style.display = "none";
  win.document.close();
  win.focus();
  win.print();
  win.close();
}
