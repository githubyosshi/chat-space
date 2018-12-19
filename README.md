# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
create_table :users

|Column|Type|Options|
|------|----|-------|
|id   |integer|null: false, foreign_key: false|
|neme |string |null: false, foreign_key: true|
|email|integer|null: false, foreign_key: true|

## groupsテーブル
create_table :groups

|Column|Type|Options|
|------|----|-------|
|id  |integer|null: false, foreign_key: false|
|name|integer|null: false, foreign_key: true|

## messagesテーブル
create_table :messages

|Column|Type|Options|
|------|----|-------|
|id      |integer|null: false, foreign_key: false|
|body    |text   |null: false, foreign_key: true|
|image   |string |null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|user_id |integer|null: false, foreign_key: true|

## users_groups中間テーブル
create_table :users_groups

|users|groups|
|-----|------|
|user_id|group_id|

### Association users
- has_many :groups
- has_many :massages

### Association groups
- has_many :users

### Association messages
- belongs_to :users
