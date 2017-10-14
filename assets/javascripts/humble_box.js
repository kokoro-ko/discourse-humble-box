(function($) {

    var DEFAULTS = {
        viewUrl: "https://api.kokoro-ko.de/humblebox/index.php",
        reg: new RegExp(/^https?:\/\/(?:www\.)?humblebundle\.com\/([a-zA-Z0-9_-]{1,45})\/?([a-zA-Z0-9_-]{1,45})?/)
    };

    function applyBox($el, $options) {
        var href = $($el).attr("href");

        if (DEFAULTS.reg.test(href)) {

            var excP = DEFAULTS.reg.exec(href);
            if (excP == null) {
                return;
            }

            var type, objCode = "";

            if (excP[2] !== undefined > 2 && (excP[1] == "books" || excP[1] == "software" || excP[1] == "store")) {
                type = excP[1];
                objCode = excP[2];
            } else if (excP[2] == undefined) {
                type = "games";
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