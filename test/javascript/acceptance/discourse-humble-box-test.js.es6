import { acceptance } from "helpers/qunit-helpers";
acceptance("Discourse Humble-Box", { loggedIn: true });

test("Discourse Humble-Box Setting is available", assert => {
  visit("/admin/site_settings/category/plugins?filter=humble_box");

  andThen(() => {
    assert.ok(exists('.admin-detail > .settigs > .setting input[type="checkbox"]'), "the settings checkbox is visible");
  });
});

test("Link parsing works in preview for games-bundle", assert => {
    visit("/");
  
    andThen(() => {
      assert.ok(exists('#create-topic'), "create button exists");
    });

    click("#create-topic");

    andThen(() => {
        assert.ok(exists('#reply-control > .reply-area'), "reply is open");
        assert.ok(exists('#reply-control > .reply-area .d-editor-textarea-wrapper .ember-text-area'), "reply texteditor exists");
    });

    fillIn("#reply-control > .reply-area .d-editor-textarea-wrapper .ember-text-area","https://www.humblebundle.com/games/testbundle");

    andThen(() => {
        assert.ok(exists('#reply-control > .reply-area'), "reply is open");
        assert.ok(exists('#reply-control > .reply-area .d-editor-preview-wrapper .d-editor-preview'), "reply preview exists");
        assert.ok(exists('#reply-control > .reply-area .d-editor-preview-wrapper .d-editor-preview > iframe'), "successfully parsed");
    });
  });