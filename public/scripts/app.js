/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

  // Test / driver code (temporary)
 // console.log($tweet); // to see what it looks like
 // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  function renderTweets(tweets) {
    tweets.forEach(function(tweetData) {
      var $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    })
  }

  function createTweetElement(tweetData) {
    var timeSince = new Date(tweetData.created_at).toISOString();
    var $header = $('<header/>').append(
      $('<h1/>', {text: tweetData.user.name})).append(
      $('<img/>', {"class": 'tweet-avatar', src: tweetData.user.avatars.small})).append(
      $('<p/>', {'class': 'tweet-handle', text: tweetData.user.handle}));

    var $body = $('<p/>', {'class': 'tweet-body', text: tweetData.content.text});

    var $icons = $('<span/>', {'class': 'tweet-buttons'}).append(
      $('<img/>', {id: 'retweet', src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/27744-200.png'})).append(
      $('<img/>', {id: 'flag', src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/7676-200.png'})).append(
      $('<img/>', {id: 'love', src: 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/80-512.png'}));

    var $footer = $('<footer/>').append(
      $('<time/>', {'class': 'timeago', text: timeSince})).append($icons);

    var $tweet = $('<article/>', {'class': 'tweet-article'}).append($header).append($body).append($footer);
    return $tweet;
  }

renderTweets(data);
});
