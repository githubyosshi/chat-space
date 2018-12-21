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
|neme |string |null: false,add_index|
|email|integer|null: false|

### Association users
- has_many :users_groups
- has_many :groups,through: :users_groups
- has_many :massages


## groupsテーブル
create_table :groups

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|

### Association groups
- has_many :messages
- has_many :users_groups
- has_many :users,through: :users_groups


## messagesテーブル
create_table :messages

|Column|Type|Options|
|------|----|-------|
|body    |text   |null: false                   |
|image   |string |                              |
|group_id|integer|null: false, foreign_key: true|
|user_id |integer|null: false, foreign_key: true|

### Association messages
- belongs_to :user
- belongs_to :group


## users_groups中間テーブル
create_table :users_groups

|Column|Type|Options|
|------|----|-------|
|user_id |references :user |null: false,foreign_key: true|
|group_id|references :group|null: false,foreign_key: true|

### Association messages
- belongs_to :user
- belongs_to :group
