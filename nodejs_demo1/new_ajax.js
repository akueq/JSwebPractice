function ajax(url, fnSucc, fnFaild) {
    //1创建ajax对象
    if (window.XMLHttpRequest) {                 //除了ie6
        var oAjax = new XMLHttpRequest();
    } else {                              //ie6
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2连接服务器
    oAjax.open('GET', url, true);//异步

    //3发送请求
    oAjax.send();

    //4接收返回
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {
                fnSucc(oAjax.responseText);
            } else {
                if (fnFaild) {//失败的时候
                    fnFaild(oAjax.status);
                }
            }
        }
    }
}
