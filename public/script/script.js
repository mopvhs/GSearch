$(document).ready(function(){
    var request = $.ajax({
        url: "list.php",
        type: "POST",
        dataType: "json"
    });

    request.done(function( res ) {

        if(res.success) {
            var data = {
                list : res.data
            };
            var html = template.render('urls', data);
            $('.tool-list').html(html);
        }
    });

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

    // 快速定位光标到搜索框
    Mousetrap.bind(['ctrl+`'], function(e) {
        $('#keyword').focus().select();
    }).bind(['shift+/'], function(e) {
        console.log('key');
    });

    $('.input-reset').on('click', function(){
        $('#keyword').val('');
        $(this).hide();
        clear_class();
    })

    $("#keyword").keyup(function(e) {
        var that = $(this);
        
        if (e.keyCode == 27) {
            $('#keyword').val('');
        }
        var v = that.val();
        if (v != '') {
            $('.input-reset').show();
            tool_list(v);
            sort_list();
        } else {
            $('.input-reset').hide();
            clear_class();
        }
    });
    $('.tool-list li').click(function() {
        console.log($(this).children('.title').text());
    })
});
function tool_list(v) {
    v = (v + '').toLowerCase();
    $(".tool-list li .title span").each(function(i) {
        var self = $(this);
        var text = self.text();
        var self_list = self.parents('li');
        text = (text + '').toLowerCase();
        var index = text.indexOf(v);
        if (index === 0) {
            self_list.attr('data-sort', 0).addClass('match');
        } else if(index > 0) {
            self_list.attr('data-sort', 1).addClass('similar');
        } else {
            self_list.attr('data-sort', 2);
        }
    });
}
function sort_list() {
    var last = -1;
    $(".tool-list li .title span").each(function() {
        var self = $(this).parents('li');
        // 移除class
        self.removeClass('match').removeClass('similar');
        var current = parseInt(self.attr('data-sort'));
        if (current === 0) {
            self.insertBefore($(".tool-list li:first")).addClass('match');
        } else if (current == 1) {
            self.addClass('similar');
        } else {
            self.insertBefore($(".tool-list li:last").next());
        }
    });
}
function clear_class() {
    $(".tool-list li").each(function() {
        $(this).removeClass('match').removeClass('similar');
    });
}
jQuery.fn.swap = function(b){ 
    b = jQuery(b)[0]; 
    var a = this[0]; 
    var t = a.parentNode.insertBefore(document.createTextNode(''), a); 
    b.parentNode.insertBefore(a, b); 
    t.parentNode.insertBefore(b, t); 
    t.parentNode.removeChild(t); 
    return this; 
};