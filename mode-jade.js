define('ace/mode/jade', function(require, exports, module) {

var oop = require("pilot/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var JadeHighlightRules = require("ace/mode/jade_highlight_rules").JadeHighlightRules;
// var JavascriptMode = require("ace/mode/javascript").Mode;
// var CssMode = require("ace/mode/css").Mode;

var Mode = function() {
    var highlighter = new JadeHighlightRules();
    
    this.$tokenizer = new Tokenizer(highlighter.getRules());
    // this.$embeds = highlighter.getEmbeds();
    // this.createModeDelegates({
    //   "js-": JavascriptMode
    //   "css-": CssMode
    // });
};
oop.inherits(Mode, TextMode);

(function() {
    // Extra logic goes here. (see below)
}).call(Mode.prototype);

exports.Mode = Mode;
});

define('ace/mode/jade_highlight_rules', function(require, exports, module) {

var oop = require("pilot/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
// var JavaScriptHighlightRules = require("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules;
// var CssHighlightRules = require("ace/mode/css_highlight_rules").CssHighlightRules;

var JadeHighlightRules = function() {

    this.$rules = {
      start: [
        {
          token : "comment",
          regex : "\\/\\/.*$"
        }, 
        // Jade's iteration: 'each foo in foos'
        {
          token : ["keyword", "text", "variable", "text", "keyword", "text", "variable"],
          regex : "(each)(\\s+)([\\w-]+)(\\s+)(in)(\\s+)([\\w-]+)"
        }, 
        // Jade's iteration: 'each foo, bar in foos'
        {
          token : ["keyword", "text", "variable", "text", "variable", "text", "keyword", "text", "variable"],
          regex : "(each)(\\s+)([\\w-]+)(\\s*,\\s*)([\\w-]+)(\\s+)(in)(\\s+)([\\w-]+)"
        }, {
          token : "text",
          regex : "\\|.*$"
        }, {
          token : ["keyword", "text"],
          regex : "(?:\\.|#)?([\\w-]+)(.*)$"
        }, {
          token : "comment",
          regex : "(?:!!!|doctype)\\s+\\w*\\s*$"
        }
      ]     
    }

    // this.embedRules(JavaScriptHighlightRules, "js-", {
    //   start: [{
    //     token: "string",
    //     regex: "^$"
    //   }]
    // });
    
    // this.embedRules(CssHighlightRules, "css-", [{
    //   token: "keyword",
    //   regex: "style",
    //   next: "start"
    // }]);
}

oop.inherits(JadeHighlightRules, TextHighlightRules);

exports.JadeHighlightRules = JadeHighlightRules;
});