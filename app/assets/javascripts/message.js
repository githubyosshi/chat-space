$(function(){
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class=message>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${imagehtml}
                    </div>
                  </div> `
    return html;
  }

  function scrollToNewestMessage() {
    $('.chat .messages').animate({scrollTop: $('.chat .messages')[0].scrollHeight},'fast')
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);

      $( ".form__submit").prop( "disabled", false );
      scrollToNewestMessage()
      $('.form__message').val('');
      $('.hidden').val('');
     })

    .fail(function(){
      alert('送信失敗');
    })
  })


  function scrollToNewestMessage() {
    $('.chat .messages').animate({scrollTop: $('.chat .messages')[0].scrollHeight},'fast')
   }
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var message_id = $('.message').last().data('id');
      $.ajax({
        url: location.href,
        type: "GET",
        data: {id: message_id},
        dataType: "json"
      })
      .done(function(data){
        data.forEach(function(message){
          var html = buildHTML(message);
          $('.messages').append(html);
          scrollToNewestMessage()
        })
      })
      .fail(function(data){
        alert('自動更新に失敗')
        $('.form__submit').prop('disabled', false);
      });
    } else {
       clearInterval(interval);
    }
  }, 5000 );
});
