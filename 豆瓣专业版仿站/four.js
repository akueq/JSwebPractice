////这个是日历的js

//一个问题就是 .cal-current 上的日期需要根据返回的数据de日期而定
//当点进日历之后就 clearInterval(timerdata);
//点击非本日的数据就只获取一次数据就好
//直到点击本日之后再 var timerdata = setInterval("demo()",5000);

//点击日历按钮显示日历界面
function calButton() {
  var calCurrent = document.getElementsByClassName("cal-current")[0];
  calCurrent.onclick = function () {
    clearInterval(timerdata);
    var bd3 = document.getElementById("table");
    var bdCal = document.getElementById("cal");
    bd3.style.display = "none";
    bdCal.style = "";
    putInDate();
  }
}

window.onload = calButton();

//这里先写日历的js

//判断闰年的函数
function runNian(year) {
  if (year % 499 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return true;//闰年的意思啦
  } else {
    return false;
  }
}

//判断某年某月的一号 星期几 的函数
function getFirstDay(year, month) {
  var allDay = 0, y = year - 1, i = 1;
  allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
  for (; i < month; i++) {
    switch (i) {
      case 1:
        allDay += 31;
        break;
      case 2:
        if (runNian(year)) {
          allDay += 29;
        }
        else {
          allDay += 28;
        }
        break;
      case 3:
        allDay += 31;
        break;
      case 4:
        allDay += 30;
        break;
      case 5:
        allDay += 31;
        break;
      case 6:
        allDay += 30;
        break;
      case 7:
        allDay += 31;
        break;
      case 8:
        allDay += 31;
        break;
      case 9:
        allDay += 30;
        break;
      case 10:
        allDay += 31;
        break;
      case 11:
        allDay += 30;
        break;
      case 12:
        allDay += 31;
        break;
    }
  }
  return allDay % 7;
}

//得到一个月有多少天
function daysMonth(year, i) {
  var allDay;
  // console.log("year = " + year + " i = " + i);
  switch (i) {
    case 1:
      allDay = 31;
      break;
    case 2:
      if (runNian(year)) {
        allDay = 29;
      } else {
        allDay = 28;
      }
      break;
    case 3:
      allDay = 31;
      break;
    case 4:
      allDay = 30;
      break;
    case 5:
      allDay = 31;
      break;
    case 6:
      allDay = 30;
      break;
    case 7:
      allDay = 31;
      break;
    case 8:
      allDay = 31;
      break;
    case 9:
      allDay = 30;
      break;
    case 10:
      allDay = 31;
      break;
    case 11:
      allDay = 30;
      break;
    case 12:
      allDay = 31;
      break;
  }
  return allDay;
}

//把日期填充到html里面
function putInDate() {
  var year = parseInt(document.getElementsByClassName("cch-years-current")[0].children[0].innerHTML);
  var month = parseInt(document.getElementsByClassName("cch-months")[0].getElementsByClassName("select")[0].getAttribute("id"));

  var firstDay = getFirstDay(year, month);  //周一返回就是1 周二是2 周日是0
  var dates = document.getElementsByClassName("cla-cb-dates")[0];
  var days = daysMonth(year, month);
  //获取上一个月的天数
  var DayB;
  if (month === 1) {
    DayB = daysMonth(year - 1, 1);
  } else {
    DayB = daysMonth(year, month - 1);
  }
  var i;
  var hover = "";
  for (i = 1; i < days + 1; i++) {
    hover +=
      "              <div class=\"cla-cb-date cla-cb-date-hover\" onclick=\"ThedayOnclick(" + i + ")\">\n" +
      "                <div class=\"cla-num\">" + i + "</div>\n" +
      "                <div class=\"cla-fastival\"></div>\n" +
      "              </div>\n"
  }
  //console.log(hover);
  var beforeDate = (firstDay + 6) % 7;//现在周一是0  周日是6
  if (beforeDate !== 0) {
    for (i = 0; i < beforeDate; i++) {
      hover =
        "              <div class=\"cla-cb-date disable\">\n" +
        "                <div class=\"cla-num\">" + DayB + "</div>\n" +
        "                <div class=\"cla-fastival\"></div>\n" +
        "              </div>\n" + hover;
      DayB--;
    }
  }
  //console.log(hover);

  var daysAll1 = beforeDate + days;
  console.log(daysAll1);
  console.log(daysAll1 % 7);
  console.log(8 - daysAll1 % 7);

  if (daysAll1 % 7 !== 0) {
    for (i = 1; i < 8 - daysAll1 % 7; i++) {
      hover +=
        "              <div class=\"cla-cb-date disable\">\n" +
        "                <div class=\"cla-num\">" + i + "</div>\n" +
        "                <div class=\"cla-fastival\"></div>\n" +
        "              </div>\n";
    }
  }
  //console.log(hover);
  dates.innerHTML = hover;
  //在这里加一个变色函数

  var calDayText = document.getElementsByClassName("cal-current")[0].childNodes[0].nodeValue;
  var rel = /\d+/g;
  var daymatch = calDayText.match(rel);
  var byear = daymatch[0];
  var bmonth = daymatch[1];
  var bday = daymatch[2];
  if (year == byear && month == bmonth) {
    var claDates = document.getElementsByClassName("cla-cb-dates")[0].getElementsByClassName("cla-cb-date-hover");
    claDates[bday - 1].className = "cla-cb-date select";
  }

  monthOnclick();
  todayText();
}

//今天 我无法获取节日这个emmm
function todayText() {
  var atime = new Date();//获取当前时间
  var year = atime.getFullYear();
  var month = atime.getMonth();
  month = month + 1;
  var date1 = atime.getDate();

  var year1 = parseInt(document.getElementsByClassName("cch-years-current")[0].children[0].innerHTML);
  var month1 = parseInt(document.getElementsByClassName("cch-months")[0].getElementsByClassName("select")[0].getAttribute("id"));

  if (year1 == year && month1 == month) {
    var selectDate = document.getElementsByClassName("cla-cb-dates")[0].getElementsByClassName("select")[0];
    var claDates = document.getElementsByClassName("cla-cb-dates")[0].getElementsByClassName("cla-cb-date-hover");
    if (selectDate.children[0].innerHTML == date1) {
      selectDate.children[1].innerHTML = "今天";
    } else if (selectDate.children[0].innerHTML < date1) {
      claDates[date1 - 2].getElementsByClassName("cla-fastival")[0].innerHTML = "今天";
    } else {
      claDates[date1 - 1].getElementsByClassName("cla-fastival")[0].innerHTML = "今天";
    }
  }
}


//年份的下拉框
function yearsDropdown() {
  var years = document.getElementsByClassName("cch-years")[0];
  var dropdown = document.getElementsByClassName("cch-years-dropdown")[0];
  var dropArrow = document.getElementsByClassName("cch-years-caret")[0];
  years.onclick = function () {
    if (dropdown.style.display == "none") {
      //这个是要显示下拉框了
      dropArrow.className = "cch-years-caret up";
      dropdown.style.display = "";
      yearsOnclick(years, dropdown, dropArrow);
    } else {
      dropArrow.className = "cch-years-caret";
      dropdown.style.display = "none";
    }
  }
}

window.onload = yearsDropdown();

//年份下拉框的点击事件
function yearsOnclick(years, dropdown, dropArrow) {
  //这里呢还是使用时间委托来做
  dropdown.onclick = function (ev) {
    var atarget = ev.target;
    var yMenu = atarget;
    var select = dropdown.getElementsByClassName("select")[0];
    var spanYear = years.getElementsByClassName("cch-years-current")[0].getElementsByTagName("span")[0];
    spanYear.innerHTML = yMenu.innerHTML;
    select.className = "y-menu center";
    yMenu.className = "y-menu center select";
    yearsDropdown();
    putInDate();
  }
}

//下面是月份的点击事件
function monthOnclick() {
  var months = document.getElementsByClassName("cch-months")[0];
  months.onclick = function (ev) {
    var month = ev.target;
    var select = months.getElementsByClassName("select")[0];
    select.className = "cch-month center";
    month.className = "cch-month center select";
    putInDate();
  }
}

