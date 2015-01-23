# broccoli-inject-livereload

This plugin injects a reference to the livereload script into your HTML files.
Please note that the plugin will only modify files with `.html` extension and simply copy everything else.

## Installation

`npm install broccoli-inject-livereload --save-dev`

## Usage

```javascript
var injectLivereload = require('broccoli-inject-livereload');

var public = injectLivereload('public');

```
