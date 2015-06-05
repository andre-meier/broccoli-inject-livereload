var Writer = require('broccoli-writer');
var fs = require('fs-extra');
var path = require('path');

function InjectLivereload(inputTree, options) {
  if (!(this instanceof InjectLivereload)) {
    return new InjectLivereload(inputTree, options);
  }

  this.options = options || {};

  this.options.port = this.options.port || 35729;
  this.options.src = this.options.src || 'index.html';

  this.inputTree = inputTree;
}

InjectLivereload.prototype = Object.create(Writer.prototype);
InjectLivereload.prototype.constructor = InjectLivereload;

InjectLivereload.prototype.write = function (readTree, destDir) {
  var self = this;

  return readTree(self.inputTree).then(function (srcDir) {
    self.injectLivereloadScript(srcDir, destDir);
  });
};

InjectLivereload.prototype.injectLivereloadScript = function (srcDir, destDir) {
  var self = this;

  var snippet = [
    "<!-- livereload snippet -->",
    "<script>document.write('<script src=\"http://'",
    " + (location.host || 'localhost').split(':')[0]",
    " + ':" + this.options.port + "/livereload.js\"><\\/script>')",
    "</script>",
    ""
  ].join('\n');

  var file = srcDir + '/' + self.options.src;
  var data = fs.readFileSync(file, 'utf-8');

  if (path.extname(file) === '.html') {
    data = data.replace(/<\/body>/, function (w) {
      return snippet + w;
    });
  }

  fs.outputFileSync(destDir + '/' + self.options.src, data);
};

module.exports = InjectLivereload;
