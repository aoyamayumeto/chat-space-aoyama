$(function() { 
  var buildHTML = function(message) {
    if ( message.content && message.image ) {
      var html = `<div class="message-list1" data-message-id=` + message.id + `>` +
          `<div class="message-list1__user">` +
            message.user_name +
            `<div class="message-list1__user__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="message-list1__message">` +
            message.content +
            `<img src="` + message.image + `" class="message-list1__image" >` +
          `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message-list1" data-message-id=` + message.id + `>` +
          `<div class="message-list1__user">` +
            message.user_name +
            `<div class="message-list1__user__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="message-list1__message">` +
            message.content +
          `</div>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message-list1" data-message-id=` + message.id + `>` +
          `<div class="message-list1__user">` +
            message.user_name +
            `<div class="message-list1__user__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="message-list1__message">` +
            `<img src="` + message.image + `" class="message-list1__image" >` +
          `</div>` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
   
     .done(function(data){
       var html = buildHTML(data);
       $('.main-chat__message-list').append(html);      
       $('form')[0].reset();
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
     })
   
     .always(function(){
       $('.submit-btn').prop("disabled", false);
     })
     
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     });
  })

 
  var reloadMessages = function() {
   if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.message-list1:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json',
    })

     .done(function(messages){
       if (messages.length !== 0) {
         var insertHTML = '';
         $.each(messages, function(i, message) {
           insertHTML += buildHTML(message)
         })
         $('.main-chat__message-list').append(insertHTML)
         $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight}, 'fast')
       }
     })

     .always(function() {
       $('.submit-btn').prop("disabled", false);
     })
  
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     });
   }
  }
   setInterval(reloadMessages, 7000);
  })