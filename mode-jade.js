define('ace/mode/jade', function(require, exports, module) {

var oop = require("pilot/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var JadeHighlightRules = require("ace/mode/jade_highlight_rules").JadeHighlightRules;
var JavascriptMode = require("ace/mode/javascript").Mode;
// var CssMode = require("ace/mode/css").Mode;

var Mode = function() {
    var highlighter = new JadeHighlightRules();
    
    this.$tokenizer = new Tokenizer(highlighter.getRules());
    this.$embeds = highlighter.getEmbeds();
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
var JavaScriptHighlightRules = require("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules;
// var CssHighlightRules = require("ace/mode/css_highlight_rules").CssHighlightRules;

var JadeHighlightRules = function() {
    var stringfill = {
        token : "string",
        merge : true,
        regex : ".+"
    };

    // this.$rules = new TextHighlightRules().getRules();
    this.$rules = {
      start: [
        {
          token : "text",
          merge : true,
          regex : '"',
          next : "qqstring"
        }],
      qqstring: [
        {
          token : "string",
          regex : '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
          next : "start"
        }, stringfill]
      // {
      //   token: "keyword",
      //   regex: "=\\w*", // todo: match spans into next line if the previous contains only '-'
      //   next: "js-start"
      // },
      // {
      //   token: "keyword",
      //   regex: "-", // todo: match spans into next line if the previous contains only '-',
      //   next: "js-start"
      // }
      // , {
      //   token: "text",
      //   regex: "\\|.*$"
      // }, {
      //   token: ["keyword", "text"],
      //   regex: "((?:\\.|#)?[\\w-]+)(.*)$"
      // }
      
      // {
      //   token: "keyword",
      //   regex: "^\\s*?script\\s*$",
      //   next: "js-start"
      // } , {
      //   token: "keyword",
      //   regex: "^\\s*?style\\s*$",
      //   next: "css-start"
      // } 
      
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