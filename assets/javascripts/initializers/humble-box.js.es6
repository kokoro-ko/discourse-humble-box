import { withPluginApi, decorateCooked } from 'discourse/lib/plugin-api';

function toHumbleBox($elem, settings) {
    if ($elem == undefined || $elem == null || !$($elem).is("a")) { return; }
    $($elem).each(function(i, el) {
        $(el).linkToHumbleBox(settings);
    });
}

function initializeBox(api) {
    var settings = api.container.lookup('site-settings:main');
    api.decorateCooked(t => toHumbleBox($(t).find("a"), settings));

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