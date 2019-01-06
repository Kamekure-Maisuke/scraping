# スクレイピング用
## ・Ruby
### 「準備」
1. Nokogiriのインストール  
→スクレイピングに必要なライブラリ。  
→インストールされていなかれば、`gem install nokogiri`でインストール
### 「目次」
1. [nogizaka-menber.rb](https://github.com/Kamekure-Maisuke/scraping/blob/master/Ruby-Scraping/nogizaka-member.rb)  
→乃木坂公式サイトから、メンバー一覧を取得してくる。  
2. [nogizaka-today-media.rb](https://github.com/Kamekure-Maisuke/scraping/blob/master/Ruby-Scraping/nogizaka-today-media.rb)  
→乃木坂公式サイトから、今日のメディア情報（TV,Radio,Web）を取得してくる。

## ・GAS
### 「準備」
1. Googleドライブアカウントの作成
2. LINE Notifyの登録。
3. LINE Developersの登録
### 「目次」
1. [chef-app.js]()  
→材料名送信したら、CookPadのレシピを返してくれるLINEBOT。
2. [today-weather.js]()  
→毎日今日の地元の天気を送信してくれるLINEBOT。
### 「使用方法」
※「.js」ファイルで書いているが、GASで使用しているため、コード.gsファイル内に書く。（コピー）