import { withPluginApi, decorateCooked } from 'discourse/lib/plugin-api';

function toHumbleBox($e, settings) {
    $elem = $($e).find('a');
        $date = $($e).find('.cooked-time-inlay').html();
        $today = new Date();
        $lastMonth = $today.setMonth($today.getMonth()-1);
        $postDate = new Date($date).getTime();
        if(!isNaN($postDate) && $lastMonth <= $postDate ){
            if ($elem == undefined || $elem == null || !$($elem).is("a")) { return; }
            $($elem).each(function(i, el) {
                $(el).linkToHumbleBox(settings);
            });
        }
}

function initializeBox(api) {
    var settings = api.container.lookup('site-settings:main');
    api.decorateWidget('post-contents:after-cooked', function (dec) {
        dec.attrs.cooked = dec.attrs.cooked + "<span class='cooked-time-inlay' style='display:none;'>"+dec.attrs.created_at+"</span>";
        return;
    })

    api.decorateCooked(t => toHumbleBox($(t), settings));
}

export default {
    name: "humble-box",
    initialize(container) {
        const siteSettings = container.lookup('site-settings:main');
        if (siteSettings.humble_box_enabled) {
            withPluginApi('0.5', initializeBox);
        }
    }
};