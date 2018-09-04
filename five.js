//日历点击后要进入这个
var data;

function ThedayOnclick(i) {
  //给选中元素变色！
  var claDates = document.getElementsByClassName("cla-cb-dates")[0].getElementsByClassName("cla-cb-date-hover");
  claDates[i - 1].className = "cla-cb-date select";

  var Aday = i;
  var year = parseInt(document.getElementsByClassName("cch-years-current")[0].children[0].innerHTML);
  var month = parseInt(document.getElementsByClassName("cch-months")[0].getElementsByClassName("select")[0].getAttribute("id"));
  if (Aday < 10) {
    Aday = "0" + parseInt(Aday);
  }
  if (month < 10) {
    month = "0" + parseInt(month);
  }

  var calDay = year + "." + month + "." + Aday;
  var day = "" + year + month + Aday + "";
  translate(calDay);

  var atime = new Date();//获取当前时间
  var qyear = atime.getFullYear();
  var qmonth = atime.getMonth();
  qmonth = qmonth + 1;
  var qdate = atime.getDate();
  if (qmonth < 10) {
    qmonth = "0" + qmonth;
  }
  if (qdate < 10) {
    qdate = "0" + qdate;
  }
  var qday = "" + qyear + qmonth + qdate;
  console.log(qday);
  if (day == qday) {
    console.log("当前时间 当前时间 当前时间");
    var dapan = document.getElementsByClassName("cal-box")[0].getElementsByTagName("span")[0];
    dapan.innerHTML = "今日实时";
    timerdata = setInterval("demo()", 5000);
  } else {
    clearInterval(timerdata);
    console.log("Aday " + Aday);
    console.log("day " + day);
    var http = "http://ttms.zhangchaoweb.xin/api/searchList?date=" + day;
    console.log(http);
    demo2(http);
  }
}

function demo2(http) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = xhr.responseText;
      data = JSON.parse(data);
      chulier(data);
      beforeStarup();
    } else {
      console.log("readyState" + xhr.readyState);
    }
  };
  xhr.open("GET", http, true);
  xhr.send(null);
}


//从日历界面转化为表格界面
//同时日历接口的内容也变化一下
function translate(calDay) {
  var bd3 = document.getElementById("table");
  var bdCal = document.getElementById("cal");
  bd3.style.display = "";
  bdCal.style.display = "none";
  var calText = document.getElementsByClassName("cal-current")[0];
  calText.innerHTML = calDay + "\n<span class=\"traingle\"></span>\n";
  var dapan = document.getElementsByClassName("cal-box")[0].getElementsByTagName("span")[0];
  dapan.innerHTML = "大盘";
}
