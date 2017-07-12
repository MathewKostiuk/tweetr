/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function fetchTweets() {
    $.getJSON('/tweets')
    .done(function(tweets) {
      renderTweets(tweets);
    })
  }

  function handleNewTweet(event) {
    event.preventDefault();
    var $form = $(this);

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $form.serialize()
    })
      .done(fetchTweets);
  }

  var $form = $('#post-tweet');

  $form.on('submit', handleNewTweet);

  function renderTweets(tweets) {
    $('#tweets-container').empty();
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

    $('.timeago').text($.timeago(timeSince));

    var $tweet = $('<article/>', {'class': 'tweet-article'}).append($header).append($body).append($footer);
    return $tweet;
  }

fetchTweets();
});
