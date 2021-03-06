(function() {
  var GitHubMentionHighlighter;

  GitHubMentionHighlighter = (function() {
    GitHubMentionHighlighter.prototype.userMentions = function() {
      var $mention, mention, mentions, _i, _len, _ref;
      mentions = [];
      _ref = $(".user-mention, .member-mention");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mention = _ref[_i];
        $mention = $(mention);
        if ($mention.text() === ("@" + (this.username()))) {
          mentions.push($mention);
        }
      }
      return mentions;
    };

    GitHubMentionHighlighter.prototype.teamMentions = function() {
      var $mention, members, mention, mentions, _i, _len, _ref;
      mentions = [];
      members = [];
      _ref = $(".team-mention");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mention = _ref[_i];
        $mention = $(mention);
        if ($mention.attr("aria-label")) {
          members = $mention.attr("aria-label").replace(" and ", " ").split(", ");
        } else if ($mention.data("url")) {
          $.ajax({
            url: $mention.data("url"),
            async: false,
            dataType: 'json',
            cache: true,
            success: (function(_this) {
              return function(data) {
                return members = data["members"];
              };
            })(this)
          });
        }
        if ($.inArray(this.username(), members) !== -1) {
          mentions.push($mention);
        }
      }
      return mentions;
    };

    GitHubMentionHighlighter.prototype.mentions = function() {
      return $.merge(this.userMentions(), this.teamMentions());
    };

    GitHubMentionHighlighter.prototype.username = function() {
      return this._username || (this._username = $(".supportocat a, #user-links .name, .header-right .logged-in a").text().trim().replace("@", ""));
    };

    function GitHubMentionHighlighter() {
      var $mention, _i, _len, _ref;
      _ref = this.mentions();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        $mention = _ref[_i];
        $mention.addClass("highlight");
        $mention.parents(".timeline-comment, .timeline-entry").addClass("highlight");
      }
    }

    return GitHubMentionHighlighter;

  })();

  $(function() {
    return new GitHubMentionHighlighter();
  });

}).call(this);

//# sourceMappingURL=script.js.map
