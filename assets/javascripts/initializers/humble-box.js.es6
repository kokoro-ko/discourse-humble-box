import { withPluginApi } from 'discourse/lib/plugin-api';

function toHumbleBox($e, settings) {
    let $elem = $($e).find('a');
    let $date = $($e).find('.cooked-time-inlay').html();
    let today = new Date();
    let date = new Date(String($date));
    let diff =(today.getTime() - date.getTime()) / 1000;
    diff = diff / (60 * 60 * 24 * 10 * 3);
    let diffMonths = Math.abs(Math.round(diff));
    let old = false;
    if(!isNaN(date) && diffMonths > 0 ){ old = true; }else { old = false; }
    if ($elem === undefined || $elem === null) { return; }
    $($elem).each(function(i, el) {
        if($(el).is("a")){
            $(el).linkToHumbleBox(settings, old);
        }
    });
}

function initializeBox(api) {
    let settings = api.container.lookup('site-settings:main');
    api.decorateWidget('post-contents:after-cooked', function (dec) {
        dec.attrs.cooked = dec.attrs.cooked + "<span class='cooked-time-inlay' style='display:none;'>"+dec.attrs.created_at+"</span>";
        return;
    });

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