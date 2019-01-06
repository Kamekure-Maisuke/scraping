# スクレイピングを行うために必要なライブラリ。
require 'open-uri'
require 'nokogiri'

# 取得対象のURLを指定
url=URI::parse("http://www.nogizaka46.com/member/")
# URLから情報を取得。※この際、ユーザーエージェント指定しないとエラーが出る場合がある。
html=url.read("user-agent"=>"aaaa")
# NokogiriでHTMLを解析（parse）してオブジェクトを生成。
doc=Nokogiri::HTML::parse(html)

puts # 最初の改行を出力

# 取得したい部分のdiv要素指定。その分繰り返し。
doc.xpath('//div[@class="unit"]').each do |node|

  # 持ってきたい部分のクラス指定して、テキストのみ。抽出
  print node.css('span.main').inner_text 
  print "（"
  print node.css('span.sub').inner_text 
  print "）"
  puts # 次の行へ

  puts # メンバーごとに改行

end