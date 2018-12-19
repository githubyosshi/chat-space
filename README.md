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

## membersテーブル
create_table :menbers

|Column|Type|Options|
|------|----|-------|
|user_id |integer|null: false, foreign_key: false|
|userneme|string |null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## groupテーブル
create_table :group

|Column|Type|Options|
|------|----|-------|
|group_id |integer|null: false, foreign_key: false|
|groupname|integer|null: false, foreign_key: true|

## messagesテーブル
create_table :messages

|Column|Type|Options|
|------|----|-------|
|messages_id|integer|null: false, foreign_key: false|
|body       |text   |null: false, foreign_key: true|
|image      |string |null: false, foreign_key: true|
|group_id   |integer|null: false, foreign_key: true|
|user_id    |integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :users
- has_many :massages

