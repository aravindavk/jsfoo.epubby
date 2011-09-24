function app_init(){
    $("#generate").click(function(){
                             if ($.trim($("#title").val()) == "" || $.trim($("#author").val()) == "" || $.trim($("#url").val()) == "") {
                                 $("#container").hide().fadeIn();
                                 return false;
                             }
                             $("#form").hide();
                             $("#msg").html('processing your request, please wait... <img src="/static/loading.gif"/>').show();
                             var params = {
                                 "title" : $("#title").val(),
                                 "author" : $("#author").val(),
                                 "url" : $("#url").val()
                             };
                             $.getJSON("/generate", params, function(data){
                                           if (data.ok) {
                                               $("#msg").html(data.val).show();
                                           }
                                           else {
                                               $("#msg").html(data.val).show().css("color", "red");
                                           }
                                       });
                             return true;
                         });    
}
