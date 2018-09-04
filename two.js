//下面这个可以成功调用那个接口
var data;

function demo() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = xhr.responseText;
      data = JSON.parse(data);
      chulier(data);
    } else {
      console.log("readyState" + xhr.readyState);
    }
  };
  xhr.open("GET", "http://ttms.zhangchaoweb.xin/api/searchList", true);
  xhr.send(null);
}

//上面这个可以成功调用那个接口
demo();
var timerdata = setInterval("demo()", 5000);
//每5秒刷新一次数据
//以后data就是返回的数据


//判断一下是综合票房还是分账票房
function chulier(data) {
  var active = document.getElementsByClassName("top-center-active")[0];
  var one1 = document.getElementsByClassName("movelist-bd")[0].getElementsByTagName("tbody")[0];
  var one2 = one1.getElementsByTagName("tr")[0];
  listclass(data);
  if (one2 == undefined || one2.className != "selected-movie") {
    if (active.innerHTML == "综合票房") {
      console.log("1");
      chuli(1,data);
    } else {
      console.log("2");
      chuli(2,data);
    }
  }
  else {
    if (active.innerHTML == "综合票房") {

      console.log("3");
      chuli(3,data);
    } else {

      console.log("4");
      chuli(4,data);
    }
  }
}

function chuli(choose,data) {
  if (choose == 1) {
    console.log("1");
    todayall(1,data);
    listall(1,data);
  } else if (choose == 2) {
    console.log("2");
    todayall(2,data);
    listall(2,data);
  } else if (choose == 3) {
    console.log("3");
    todayall(1,data);
    listall(3,data);
  } else {
    console.log("4");
    todayall(2,data);
    listall(4,data);
  }
}

//今日实时票房
function todayall(choose,data) {
  var calBoxNum = document.getElementsByClassName('cal-box-num')[0];
  if (choose == 1) {
    calBoxNum.innerHTML = data.data.totalBoxInfo + "万";
  } else {
    calBoxNum.innerHTML = data.data.splitTotalBox + "万";
  }
}

//右侧表格数据
function listall(choose,data) {
  //先取得这几个 tr
  var trLists1 = document.getElementsByClassName("movelist-bd")[0].getElementsByTagName("tbody")[0];
  var trLists = trLists1.getElementsByTagName("tr");
  var i;
  var len = data.data.list.length;
  for (i = 0; i < len; i++) {
    //取得 tr 里面的第一个 td
    var td1 = trLists[i].getElementsByTagName("td")[0];
    td1.title = data.data.list[i].movieName;
    var movienameName = document.getElementsByClassName("moviename-name")[i];
    movienameName.innerHTML = data.data.list[i].movieName;
    var movienameInfo = document.getElementsByClassName("moviename-info")[i];
    movienameInfo.innerHTML = "<span>" + data.data.list[i].releaseInfo + "</span>&nbsp;&nbsp;<span>" + data.data.list[i].sumBoxInfo + "</span>"
    //现在要后几个 td了
    if (choose == 1 || choose == 3) {
      var td2 = trLists[i].getElementsByTagName("td")[1];
      td2.innerHTML = data.data.list[i].boxInfo;
      var td3 = trLists[i].getElementsByTagName("td")[2];
      td3.innerHTML = data.data.list[i].boxRate;
    } else if (choose == 2 || choose == 4) {
      var td2 = trLists[i].getElementsByTagName("td")[1];
      td2.innerHTML = data.data.list[i].splitBoxInfo;
      var td3 = trLists[i].getElementsByTagName("td")[2];
      td3.innerHTML = data.data.list[i].splitBoxRate;
    }
    var td4 = trLists[i].getElementsByTagName("td")[3];
    td4.innerHTML = data.data.list[i].showInfo;
    var td5 = trLists[i].getElementsByTagName("td")[4];
    td5.innerHTML = data.data.list[i].showRate;
    var td6 = trLists[i].getElementsByTagName("td")[5];
    td6.innerHTML = data.data.list[i].avgShowView;
    var td7 = trLists[i].getElementsByTagName("td")[6];
    td7.innerHTML = data.data.list[i].avgSeatView;
  }
  if (choose == 3 || choose == 4) {
    condition = true;
    starupup(trLists[onlystar], trLists1);
  }
}

//右侧表格框架
function listclass(data) {
  var atbody1 = document.getElementsByClassName("movelist-bd")[0];
  var atbody = atbody1.getElementsByTagName("tbody")[0];
  //先清空
  atbody.innerHTML = "";

  console.log(data);

  var len = data.data.list.length;
  var i;
  var ii;
  for (i = 0; i < len; i++) {

    if (i < 9) {
      ii = "0" + (i + 1);
    } else {
      ii = (i + 1).toString();
    }

    var atr = document.createElement("tr");
    atr.className = "not";
    atbody.appendChild(atr);
    atr.innerHTML =
      "                   <td class=\"moviename-td\" title=\"\">\n" +
      "                    <div>\n" +
      "                      <div class=\"moviename-num\">\n" +
      "                        <p class=\"moviename-index\">" + ii + "</p>\n" +
      "                        <p class=\"moviename-star\">\n" +
      "                          <span class=\"star star-gray\"></span>\n" +
      "                        </p>\n" +
      "                      </div>\n" +
      "                      <div class=\"moviename-desc\">\n" +
      "                        <p class=\"moviename-name\"></p>\n" +
      "                        <p class=\"moviename-info\">\n" +
      "                          <span></span>\n" +
      "                          &nbsp;&nbsp;\n" +
      "                          <span></span>\n" +
      "                        </p>\n" +
      "                      </div>\n" +
      "                    </div>\n" +
      "                  </td>\n" +
      "                  <td class=\"realtime\"></td>\n" +
      "                  <td></td>\n" +
      "                  <td></td>\n" +
      "                  <td></td>\n" +
      "                  <td></td>\n" +
      "                  <td></td>";
  }
}

