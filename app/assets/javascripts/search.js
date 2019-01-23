$(function() {

  var search_list = $("#user-search-result");

// 以下、検索結果の表示に関する記述
  function appendUserName(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUserName(fail_comment) {
    var html = `<p>
                  <div class="chat-group-user__name'>${fail_comment}</div>
                </p>`
    search_list.append(html);
  }

// 以下、user検索欄に入力後の挙動に関する記述
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();       //キャンセル可能なイベントをキャンセル
    var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0 && input.length !==0) {
          users.forEach(function(user) {
            appendUserName(user);
          });
        }
        else {
          appendNoUserName("一致する名前はありません");
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
  });


  var search_list_add = $("#chat-group-users");
// 以下、追加されたチャットメンバー欄の表示に関する記述
  function appendUserNameAdd(user_name, user_id) {
     var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
                console.log(user_id)
      search_list_add.append(html);
  }

// 以下、追加ボタンの挙動に関する記述
  $("#user-search-result").on("click", ".chat-group-user__btn--add", function () {
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    appendUserNameAdd(user_name, user_id);
    $(this).parent().remove();
  });

// 以下、削除ボタンの挙動に関する記述
  $("#chat-group-users").on("click", ".js-remove-btn", function () {
    $(this).parent().remove();
  });
});
