// 関東の店舗に絞って、検索。
var REGION = '関東'
var REGIONS = {
    '北海道':      'hokkaido',
    '東北':        'tohoku',
    '関東':        'kanto',
    '甲信越・北陸': 'koshinetsu',
    '東海':        'tokai',
    '近畿':        'kinki',
    '中国・四国':   'chugoku',
    '九州':        'kyushu'
}
var ORIGIN = 'http://www.sej.co.jp'
var NEW_ITEM_DIR = '/i/products/thisweek/'
var NEW_ITEM_URL    = ORIGIN + NEW_ITEM_DIR
var QUERY  = '?page=1&sort=f&limit=100' //　sortがf n で新商品 おすすめ なのだが、規則がわからない

var SLACK_INCOMING_URL = 'webhookのURLを書こう。'


// 色彩からなる商標をCMYからRGB変換
// http://www.sej.co.jp/dbps_data/_material_/_files/000/000/019/198/20170301shikisai-sej.pdf
// …しようとしたらかなりかけ離れている気がするのでロゴをスポイトツールでRGB取得します。
var SEVEN_COLOR = [
    '#f58220', // セブンオレンジ
    '#00a54f', // セブングリーン
    '#ee1c23', // セブンレッド
]

function main() {
    var attachments = []

    var html = UrlFetchApp.fetch(NEW_ITEM_URL + REGIONS[REGION] + QUERY).getContentText()
    var items = Parser.data(html).from('<li class="item">').to('</div>\n</li>').iterate()
    for(i=0;i<items.length;++i){      
        var link   = ORIGIN + items[i].match(/<a href="(.+)">/)[1]
        var image  = items[i].match(/data-original="([^"]+)" alt="商品画像"/)[1]
        var name   = items[i].match(/<div class="itemName">.+">(.+?)<\/a><\/strong>/)[1]
        var price  = items[i].match(/<li class="price">(.+?)<\/li>/)[1]  
        var launch = items[i].match(/<li class="launch">(.+?)<\/li>/)[1]
        var region = items[i].match(/<li class="region">(.+?)<\/li>/)[1].replace('<em>販売地域</em>', '')
        attachments.push(makeAttachment(link, image, name, price, launch, region, i))
    }
    sendSlack(attachments)
}


function makeAttachment(link, image, name, price, launch, region, i) {
    return {
    color: SEVEN_COLOR[i % SEVEN_COLOR.length],
    title: name,
    title_link: link,
//    image_url: image, // thumb_urlより大きい画像
    thumb_url: image, // 大きな画像は邪魔な場合に。image_urlとお好みで
    fields: [
        {
            title: '値段',
            value: price,
            short: true,
        },
        {
            title: '販売時期',
            value: launch,
            short: true,
        },
        {
            title: '販売地域',
            value: region,
            short: true,
        }
            ]
        }
}

function sendSlack(attachments) {
    var jsonData = {
        username:   'セブン新商品おしえます。',
        // 好きな絵文字にしよう。（今回はカスタム絵文字使用。）
        icon_emoji: ':angel-penguin:',
        // チャンネル名を書こう。
        channel:    'general',
        text: '今週の新商品です。買いに行こう。',
        attachments: attachments,
    }
    payload = JSON.stringify(jsonData);
    options =
    {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
    };
    UrlFetchApp.fetch(SLACK_INCOMING_URL, options)
}