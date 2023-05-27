# Moripo LIFF App

## 概要

### エンドユーザ向け LIFF アプリ

### 機能

- イベント QR コードのスキャン (ポイント登録)
- 所持ポイントの一覧
- ポイントの利用 (ポイント利用用 QR コード発行)

### 技術要素

- node v18
- yarn v1.22
- next v13
- mui v5
- react v18
- swr v2.1
- typescript v4.9


### for Deploy

- Vercel

## 開発用にローカルで起動する

### Setup

`.env.local` に以下を記述する

```
NEXT_PUBLIC_LIFF_ID=(LIFF ID)
NEXT_PUBLIC_API_ROOT=(service-backend API のエンドポイント)
NEXT_PUBLIC_DEBUG_LINE_ID_TOKEN=(デバグ用 LINE トークン)
```

#### LIFF ID の取得方法

参考 URL: https://developers.line.biz/ja/docs/liff/trying-liff-app/#get-and-set-liff-id

#### service-backend API のエンドポイント

ソースコード: https://github.com/mori-po/service-backend

これを Cloud Functions などにデプロイする

#### デバグ用 LINE トークン

`liff.getIDToken()` で得られる値。LIFF アプリとして LINE の ID 認証が通り、`liff` オブジェクトが取得できている必要がある。
この値を環境変数 `NEXT_PUBLIC_DEBUG_LINE_ID_TOKEN` に設定していると、開発用ローカルサーバで該当トークンのユーザとして認証ができる。
トークンは 1 時間程度で有効期限が切れるため、都度更新する必要がある。

### 依存パッケージのインストール

```
yarn install --frozen-lockfile
```

### 開発サーバの起動

```
yarn dev
```

`localhost:3000` にサーバが起動する
