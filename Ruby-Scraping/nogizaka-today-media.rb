# スクレイピングを行うために必要なライブラリ
require "nokogiri"
require "open-uri"

# 取得対象のURL指定
url = URI::parse("http://www.nogizaka46.com")
# URLから情報取得。※ユーザーエージェント指定しないと、エラーが出る。
page = url.read("user-agent"=>"aaaa")
# NokogiriでHTMLを解析（parse）してオブジェクトを生成
html = Nokogiri::HTML::parse(page)

# ハッシュ定義
media={テレビ:".tv",ラジオ:".radio",Web:".web"}
media.each do |key,value|
    puts("[#{key}]")
    tmp=html.css(".today").css(value)
    # ハッシュに値がないときの出力
    if tmp.size==0 then
        puts(" 出演はありません")
    else
        tmp.each do |item|
            puts(" - #{item.content}")
        end
    end
    puts("")
end