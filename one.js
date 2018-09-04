var aheight = document.documentElement.clientHeight;//取得视口高
var awidth = document.documentElement.clientWidth;//取得视口宽度

//rem值随着窗口大小而变化
var bhtml = document.documentElement;
bhtml.style.fontSize = awidth / 19 + "px";
window.onresize = function () {
  awidth = document.documentElement.clientWidth;//取得视口宽度
  bhtml.style.fontSize = awidth / 19 + "px";
};

//显示当前时间
function timerun() {
  var atime = new Date();//获取当前时间
  var year = atime.getFullYear();
  var month = atime.getMonth();
  month = month + 1;
  var date = atime.getDate();
  var hour = atime.getHours();
  var minutes = atime.getMinutes();
  var seconds = atime.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var newData = year + "年" + month + "月" + date + "日";
  var newTime = hour + ":" + minutes;
  document.getElementById("day").innerHTML = newData;
  document.getElementById("time").innerHTML = newTime;

  var calUpdateTime = document.getElementsByClassName("cal-update-time")[0].getElementsByTagName("span")[0];
  calUpdateTime.innerHTML = "北京时间 " + newTime + ":" + seconds;
}

timerun();
var timer = setInterval("timerun()", 1000);

//不点击星星展示
function middleLeftUphintE() {

  var middleLeftUphint = document.getElementsByClassName("middle-lu-hint")[0];
  if (middleLeftUphint) {
    middleLeftUphint.innerHTML = "点击&nbsp;" + "<span class='star star-big'></span>" + "&nbsp;优先展示"
  }
}

middleLeftUphintE();

//用一个立即执行函数 当第一次点开界面的时候
//日历端口显示的是当前时间
(function () {
  var atime = new Date();//获取当前时间
  var year = atime.getFullYear();
  var month = atime.getMonth();
  month = month + 1;
  var date = atime.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  var day = year + "." + month + "." + date;

  var calText = document.getElementsByClassName("cal-current")[0];
  calText.innerHTML = day + "\n<span class=\"traingle\"></span>\n";
})();
