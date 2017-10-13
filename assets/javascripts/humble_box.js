(function($) {

    var DEFAULTS = {
        viewUrl: "https://api.kokoro-ko.de/humblebox/index.php",
        reg: new RegExp(/^https?:\/\/(?:www\.)?humblebundle\.com\/([a-zA-Z0-9-_]{1,25})\/([a-zA-Z0-9-_]{1,25})/)
    };

    function applyBox($el, $options) {
        var href = $(obj).attr("href");
        if (DEFAULTS.reg.test(href)) {
            var excP = DEFAULTS.reg.exec(href);
            if (result == null) {
                return;
            }

            var type, objCode = "";
            if (excP.length > 1 && (excP[1] == "books" || excP[1] == "software" || excP[1] == "store")) {
                type = excP[1];
                objCode = excP[2];
            } else if (excP.length == 1) {
                type = "game";
                objCode = excP[1];
            } else {
                return;
            }

            if (type == "books" || type == "software" || type == "store") {
                //TO-DO
            } else {
                $($el).closest(".onebox").replaceWith('<iframe src="' + DEFAULTS.viewUrl + '?type=' + type + '&urlCode=' + objCode + '" frameborder="0" width="100%" height="150"></iframe>');
            }



        }
    }

    $.fn.linkToHumbleBox = function(options) {
        var opts = $.extend(DEFAULTS, options || {});
        return this.each(function() {
            applyBox($(this), opts);
        });
    };
})(jQuery);