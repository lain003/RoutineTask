# 環境構築方法
- ```docker-compose up``` でdockerを立ち上げてください
- http://localhost:3000/ にアクセスしてWebサイトにアクセス出来ることを確認してください

# Slackに通知を送りたい場合
- チャンネルに書きこめる権限を持ったSlackBotを https://api.slack.com/apps/ にアクセスして作ってください。
- 「OAuth & Permissions」に書かれているトークンを控えてください
- ```rails credentials:edit --environment development```で```slack_bot_token```というキーを作成(編集)し、トークンを設定してください
- ```rails notify_task_slack:run```を実行してください

# 実装における仕様
- 認証はAuthorizationヘッダーを使用したトークン認証を行っています
  - TokenはDBとクライアントのlocalStorageで保存されています
- reactのフォルダは```./react_app```以下にあります

# 操作画面
![Animation](https://github.com/lain003/RoutineTask/assets/1112171/ce0d7079-daa9-425d-a007-523f1c086b2b)

