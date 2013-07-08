(function() {
  var T;

  T = window.Templates = {};

  T.tableOfContents = "<div>\n  <ul>\n    <li><a href=\"#game\">Game</a></li>\n    <li><a href=\"https://github.com/benjaminjackman/space-blast\">GitHub Repo</a></li>\n    <li><a href=\"/cron.html\">Cron</a></li>\n  </ul>\n</div>";

  T.game = "<div id=\"cr-stage\">\n    <div id=\"interface\">\n        <div class=\"panel transparent bottom\"></div>\n        <div class=\"panel transparent\"></div>\n        <div class=\"lives text left\"></div>\n        <div class=\"level text center\"></div>\n        <div class=\"score text right\"></div>\n        <div class=\"bars bottom left\" >\n            <div id=\"hp\" ><span class=\"text\"></span></div>\n        </div>\n        <div class=\"bars bottom\"  style=\"left:50%;margin-left:-89px\">\n            <div id=\"shield\" ><span class=\"text\"></span></div>\n        </div>\n        <div class=\"bars bottom right\" >\n            <div id=\"heat\" ><span class=\"text\"></span></div>\n        </div>\n        <div class=\"alert\"></div>\n    </div>\n    <div id=\"loading\">\n         <div class=\"button\" >Play Game</div>\n\n        <div class=\"bars bottom\">\n            <div id=\"load\" ><span class=\"text\"></span></div>\n        </div>\n    </div>\n</div>";

}).call(this);
