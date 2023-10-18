
# このプロジェクトの目的

- フロントエンドのアプリケーション開発における、モノレポの導入を検証する
- モノレポの導入において、開発者の負担を軽減する
- モノレポの導入において、ビルド時間を短縮する

# モノレポとは

> モノレポ（Monorepo）とは、複数のソフトウェアプロジェクトを1つのリポジトリに格納することを指す用語である。
> モノレポを採用することで、複数のプロジェクトを管理する際の手間が軽減されることが期待される。

[モノレポとは？モノリポとは？ | モノレポとは？モノリポとは？](https://www.kaizenprogrammer.com/entry/2020/02/15/090000)

# このプロジェクトの構成

クリーンアーキテクチャを導入することで、形式的なコード実装を目指す。
ドメイン層は設計が難しくもっとも時間がかかるが、それ以外は比較的簡単に実装できるはず。

## フォルダ構成

```
├── apps
│   ├── mobile
│   └── web
├── domain 
│   ├── app - アプリケーションのドメイン
│   └── todo - TODOアプリのドメイン
├── packages
│   ├── eslint-config-custom
│   ├── form
│   ├── tsconfig
│   └── utils
├── .gitignore
├── .prettierrc
├── README.md
├── package.json
├── tsconfig.json
└── yarn.lock
```

## 各アプリケーションの構成

### Web

- Next.js
- TypeScript
- React

### Mobile

- TypeScript
- React Native
- 
### Domain

- zod
- react-hook-form
- redux-toolkit

# このプロジェクトの開発環境

## 前提条件

- yarn
- Node.js

## 環境構築

```shell
$ cd プロジェクト名
$ yarn install
```

## 開発サーバーの起動

### Webアプリケーション

```shell
yarn web:start
```
これにより、開発サーバーが起動し、http://localhost:3000 でWebアプリケーションにアクセスできます。

### Mobileアプリケーション
```shell
yarn ios:build
yarn ios:start
```
これにより、開発サーバーが起動し、Expo Goアプリを使用して、モバイルデバイス上でアプリケーションをプレビューできます。

## テストの実行
プロジェクト全体のテストを実行するには、プロジェクトのルートディレクトリで以下のコマンドを実行します。

```shell
$ yarn test
```
