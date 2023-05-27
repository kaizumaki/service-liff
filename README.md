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

依存パッケージのインストール

```
yarn install --frozen-lockfile
```

### 開発サーバの起動

```
yarn dev
```

`localhost:3000` にサーバが起動する
