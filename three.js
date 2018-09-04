//各种点击的样式变化

//综合票房和分账票房
function topCenterActive() {
  var topCenter = document.getElementsByClassName("top-center")[0];
  var topCenterLeft = topCenter.getElementsByTagName("span")[0];
  var topCenterRight = topCenter.getElementsByTagName("span")[1];
  var topCenterActive = topCenter.getElementsByClassName("top-center-active")[0];

  if (topCenterActive === topCenterLeft) {
    topCenterLeft.className = "";
    topCenterRight.className = "top-center-active";
    var theOnlyDay1 = document.getElementsByClassName("cla-cb-dates")[0].getElementsByClassName("select")[0];
    var theOnlyDay2 = theOnlyDay1.getElementsByClassName("cla-num")[0].innerHTML;
    console.log("theOnlyDay "+theOnlyDay2);
    ThedayOnclick(theOnlyDay2);
  } else {
    topCenterRight.className = "";
    topCenterLeft.className = "top-center-active";

    var theOnlyDay1 = document.getElementsByClassName("cla-cb-dates")[0].getElementsByClassName("select")[0];
    var theOnlyDay2 = theOnlyDay1.getElementsByClassName("cla-num")[0].innerHTML;
    console.log("theOnlyDay "+theOnlyDay2);
    ThedayOnclick(theOnlyDay2);
  }
}

//小星星
//尝试使用事件委托来写这里

var onlystar;     //存一下这个节点的位置，刷新之后也要保留星星
var condition = false;    //记录一下原来有没有置顶星星

window.onload = beforeStarup();
function beforeStarup() {

  var atbody = document.getElementsByClassName("movelist-bd")[0].getElementsByTagName("tbody")[0];

  atbody.onclick = function (ev) {

    var atarget = ev.target;
    var tr = atarget;
    for (; ;) {
      tr = tr.parentElement;
      if (tr.tagName == "TR") {
        break;
      }
    }
    if (condition == false) {
      onlystar = tr.rowIndex; //存一下
      condition = true;
      starupup(tr, atbody);
    } else if (condition == true) {
      if (tr.className == "selected-movie") { //这个只要去取消星星
        condition = false;
        stardown(onlystar, atbody);

      } else {  //这个在取消星星的同时还要提前一个新的tr
        stardown(onlystar, atbody);
        onlystar = tr.rowIndex;   //存一下
        starupup(tr, atbody);
      }
    }
  };
};

//星星上升
function starupup(tr, atbody) {

  tr.className = "selected-movie";
  var star = tr.getElementsByClassName("star")[0];
  star.className = "star middle-star";
  star = null;

  atbody.insertBefore(tr, atbody.children[0]);
  starRightup(atbody);
  console.log("starupup");

}

//星星下降
function stardown(trNo, atbody) {
  atbody.children[0].className = "not";
  atbody.children[0].style.display = "table-row";

  var star = atbody.children[0].getElementsByClassName("star")[0];
  star.className = "star star-gray";
  star = null;

  // trNo.className = "not";
  // trNo.style.display = "table-row";
  // atbody.removeChild(atbody.children[0]);
  if (trNo != --atbody.length) {
    atbody.insertBefore(atbody.children[0], atbody.children[trNo + 1])
  }
  starRightdown();
  console.log("stardown");
}

function starRightdown() {
  var middleLeftUp = document.getElementsByClassName("middle-left-up")[0];
  middleLeftUp.innerHTML =
    "            <div class=\"middle-lu-hint\">\n" +
    "              点击&nbsp;\n" +
    "              <span class='star star-big'></span>\n" +
    "              &nbsp;优先展示\n" +
    "            </div>"
}

function starRightup(atbody) {
  var middleLeftUp = document.getElementsByClassName("middle-left-up")[0];
//使用onlystar
  var piaofang;
  var pfzhanbi;
  var pftitle;
  var active = document.getElementsByClassName("top-center-active")[0];
  if (active.innerHTML == "综合票房") {
    pftitle = "综合票房";
    piaofang = data.data.list[onlystar].boxInfo;
    pfzhanbi = data.data.list[onlystar].boxRate;
  } else {
    pftitle = "分账票房";
    piaofang = data.data.list[onlystar].splitBoxInfo
    pfzhanbi = data.data.list[onlystar].splitBoxRate;
  }


  middleLeftUp.innerHTML =
    "<div class=\"ml-detail-part-name\">\n" +
    "  <p class=\"ml-detail-title\">\n" +
    "    <span class=\"star mlud-star\"></span>\n" +
    "    <span></span>   " +
    data.data.list[onlystar].movieName +
    "  </p>\n" +
    "  <p class=\"ml-detail-releaseinfo\">\n" +
    data.data.list[onlystar].releaseInfo +
    "    &nbsp;\n" +
    data.data.list[onlystar].sumBoxInfo +
    "  </p>\n" +
    "</div>\n" +
    "<div class=\"ml-detail-part-box\">\n" +
    "  <div class=\"ml-detail-box\">\n" +
    "    <p class=\"ml-detail-real-desc\">\n" +
    pftitle +
    "    </p>\n" +
    "    <p class=\"ml-detail-real\">\n" +
    piaofang +
    "      万\n" +
    "    </p>\n" +
    "    <p class=\"ml-detail-real-ratio\">\n" +
    "      票房占比\n" +
    pfzhanbi +
    "    </p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"ml-detail-part-extra\">\n" +
    "  <div class=\"ml-detail-item\">\n" +
    "    <p class=\"ml-detail-item-title\">排片场次</p>\n" +
    "    <p class=\"ml-deyail-item-num\">\n" +
    data.data.list[onlystar].showInfo +
    "    </p>\n" +
    "    <p class=\"ml-detail-item-ratio\">\n" +
    "      排片占比\n" +
    data.data.list[onlystar].showRate +
    "    </p>\n" +
    "  </div>\n" +
    "  <div class=\"ml-detail-item\">\n" +
    "    <p class=\"ml-detail-item-title\">场均人次</p>\n" +
    "    <p class=\"ml-deyail-item-num\">\n" +
    data.data.list[onlystar].avgShowView +
    "    </p>\n" +
    "    <p class=\"ml-detail-item-ratio\">\n" +
    "      上座率\n" +
    data.data.list[onlystar].avgSeatView +
    "    </p>\n" +
    "  </div>\n" +
    "</div>"
}
