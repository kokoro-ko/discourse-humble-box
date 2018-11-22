
<a href="https://www.kokoro-ko.de/">![Logo](https://www.kokoro-ko.de/uploads/default/original/1X/c425edbe738ac1f92e584cfb94305d1570042f45.png)</a>

# discourse-humble-box

[![Build Status](https://travis-ci.org/kokoro-ko/discourse-humble-box.svg?branch=master)](https://travis-ci.org/kokoro-ko/discourse-humble-box)

This plugin for Discourse uses the discourse-api to decorate the cooked-posts. Primary usage is for properly embedding [Humblebundle.com](https://humblebundle.com/)-Links in Discourse posts and parsing them into better looking iframes.

#### Features:
- Gamebundles

#### Coming:
- Bookbundles
- Softwarebundles
- Single-Games
- Monthly

#### Coming Settings:
- Checkboxes for supporting types
- Input for API-Endpoint

## Installation

Add the plugin's repository URL to your container's `app.yml` file, for example:

```yml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - mkdir -p plugins
          - git clone https://github.com/kokoro-ko/discourse-humble-box
```

Rebuild the container:

```sh
cd /var/discourse
./launcher rebuild app
```

## License

[MIT License](LICENSE).
