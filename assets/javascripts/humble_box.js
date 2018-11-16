(function($) {

    var DEFAULTS = {
        viewUrl: "https://api.kokoro-ko.de/humblebox/index.php",
        reg: new RegExp(/^https?:\/\/(?:www\.)?humblebundle\.com\/([a-zA-Z0-9_-]{1,45})\/?([a-zA-Z0-9_-]{1,45})?/)
    };

    function applyBox($el, $options, $old) {
        $old = (typeof $old === 'undefined') ? false : $old;
        var href = $($el).attr("href");
        var type, objCode = "";

        if (!DEFAULTS.reg.test(href)){
            type = "invalid_type";
        }else if($old){
            type = "old_url";
        }else {

            var excP = DEFAULTS.reg.exec(href);
            if (excP == null) {
                return;
            }

            if(excP.length > 2){ type = excP[1]; objCode = excP[2]; }else{ return; }

            //TO-DO: books, software, store, bundle
            if (type != "games") {
                type = "invalid_type";
            }
        }

        //has onebox
        var replaceobject=null;
        if($($el).closest(".onebox").length > 0){
            replaceobject = $($el).closest(".onebox");
        }else{
            replaceobject = $($el);
        }
        
        $(replaceobject).replaceWith('<iframe src="' + DEFAULTS.viewUrl + '?type=' + type + '&urlCode=' + objCode + '" frameborder="0" width="100%" height="150"></iframe>');
    }

    $.fn.linkToHumbleBox = function(options, oldFlag) {
        var opts = $.extend(DEFAULTS, options || {});
        return this.each(function() {
            applyBox($(this), opts, oldFlag);
        });
    };
})(jQuery);