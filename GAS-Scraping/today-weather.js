// 「ACCESS_TOKEN」をLINE Notifyのアクセストークンに置き換える
var lineToken = "LINE NotifyのTOKENを書く";
function weatherForecast() {
    // 「CITY_ID」を、天気を取得したいcity idに置き換える(沖縄：471010)
    var response = UrlFetchApp.fetch("http://weather.livedoor.com/forecast/webservice/json/v1?city=471010");
    var json=JSON.parse(response.getContentText()); //受け取ったJSONデータを解析して配列jsonに格納
    /* メッセージ */
    var strBody = json["location"]["city"] + "の天気"+ "\n";
    strBody = strBody + "今日の天気： " + json["forecasts"][0]["telop"] + "\n";
    strBody = strBody + "明日の天気： " + json["forecasts"][1]["telop"] + "\n";
    strBody = strBody + "予報発表時間：" + json["publicTime"];
    sendToLine(strBody);
}
function sendToLine(text){
    var token = lineToken;
    var options =
    {
        "method"  : "post",
        "payload" : "message=" + text,
        "headers" : {"Authorization" : "Bearer "+ token}
    };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}