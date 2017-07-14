/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */
$(document).ready(function() {

  // Using jQuery to create DOM elements, then return a jQuery object with the data
  function createTweetElement(tweetData) {
    var $timeSince = moment(tweetData.created_at).fromNow();
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
      $('<time/>', {'class': 'timeago', text: $timeSince})).append($icons);


    var $tweet = $('<article/>', {'class': 'tweet-article'}).append($header).append($body).append($footer);
    return $tweet;
  }

  // Popoulate page with tweets, reverse chronological order
  function renderTweets(tweets) {
    $('#tweets-container').empty();

    tweets.sort(function(a, b) {
      return b.created_at - a.created_at;
    });

    tweets.forEach(function(tweetData) {
      var $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    });
  }

  // GET request to /tweets
  function loadTweets() {
    $.getJSON('/tweets')
      .done(renderTweets);
  }

  // Handles new tweet, checking for errors before making POST request
  function handleNewTweet(event) {
    event.preventDefault();
    var form = $(this).serialize();
    var formLength = $('.text-area').val().length;

    if (formLength === 0) {
      return $.notify('Empty form field, please tweet!', 'error');
    }

    if (formLength > 140) {
      return $.notify('Tweet has exceeded the allowed character count. Please revise your tweet', 'warn');
    }

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: form
    })
      .done(function() {
        $('.text-area').val('');
        $('.counter').html('140');
      })
      .done(loadTweets);
  }

  // Form submit click event handler
  var $form = $('#post-tweet');

  $form.on('submit', handleNewTweet);


  // Compose button click handler
  $('#compose-button').click(function() {
    if ($('.new-tweet').is(':hidden')) {
      $('.new-tweet').show('fast');
      $('.text-area').focus();
      $('body').scrollTop(0);
    } else {
      $('.new-tweet').slideUp();
    }
  });


  loadTweets();

});