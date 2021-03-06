(function($) {

    var DEFAULTS = {
        viewUrl: "https://api.kokoro-ko.de/humblebox/index.php",
        reg: new RegExp(/^https?:\/\/(?:www\.)?humblebundle\.com\/([a-zA-Z0-9_-]{1,45})\/?([a-zA-Z0-9_-]{1,45})?/)
    };

    function applyBox($el, $options, $old) {
        $old = (typeof $old === 'undefined') ? false : $old;
        var href = $($el).attr("href");
        var type = null
        var objCode = "";

        if (!DEFAULTS.reg.test(href)){
            type = null;
        }else {

            var excP = DEFAULTS.reg.exec(href);
            if (excP == null) {
                return;
            }

            if(excP.length > 2){ 
                type = excP[1]; 
                (excP[2] == undefined) ? objCode = "NoObjSet" : objCode = excP[2];
            }else{ return; }

            //TO-DO: store, monthly
            if (type != "games" && type != "books" && type != "software" && type != "comics" && type != "store" && type != "monthly") {
                type = null;
            }
        }

        //has onebox
        var rpo=null;
        if($($el).closest(".onebox").length > 0){
            rpo = $($el).closest(".onebox");
        }else{
            rpo = $($el);
        }

        if(type != null){
            $(rpo).replaceWith('<iframe src="' + DEFAULTS.viewUrl + '?type=' + type + '&urlCode=' + objCode + ( ($old) ? '&isOld=old_url' : '') +'" frameborder="0" width="100%" height="160"></iframe>');
        }
        
    }

    $.fn.linkToHumbleBox = function(options, oldFlag) {
        var opts = $.extend(DEFAULTS, options || {});
        return this.each(function() {
            applyBox($(this), opts, oldFlag);
        });
    };
})(jQuery);