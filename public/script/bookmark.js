/* 
* @Author: mopvhs
* @Date:   2013-11-25 13:29:17
* @Email:  mopvhs@gmail.com
* @Last modified by:   mopvhs
* @Last Modified time: 2013-11-25 17:03:59
*/
// javascript:void(function(){var d = document,a = 'setAttribute',s = d.createElement('script');s[a]('tyle','text/javascript');s[a]('src','http://127.0.0.1/GitHub/tools/public/script/bookmark.js');d.head.appendChild(s);})();
console.log(!window.jQuery);
if(!window.jQuery) {
    var d = document,
        a = 'setAttribute',
        s = d.createElement('script');
    s[a]('tyle', 'text/javascript');
    s[a]('src', '//cdn.staticfile.org/jquery/1.10.2/jquery.min.js');
    d.head.appendChild(s);
}
setTimeout(function(){
    console.log(!window.jQuery);

    var request = $.ajax({
        url: "http://127.0.0.1/GitHub/tools/remote.php",
        type: "GET",
        data: {
            title: document.title,
            url: window.location.href
        },
        dataType: "jsonp"
    });

    request.done(function( res ) {

        console.log(res.msg);

    });

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

}, 500);