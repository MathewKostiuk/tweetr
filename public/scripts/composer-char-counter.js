$(document).ready(function() {
  var text = $(".new-tweet textarea");
  var counter = $(".new-tweet span").html();

  text.on('keydown', function(event) {
    var totalText = $(this).val();
    var textSubtract = totalText.length;
    var maxCount = 140;

    $(this).parent().children('.counter').html(counter - textSubtract);

    if (textSubtract >= maxCount) {
      $(".new-tweet span").addClass('over-limit');
    } else if (textSubtract <= maxCount) {
      $(".new-tweet span").removeClass('over-limit');
    }
  });

  text.on('keyup', function(event) {
    var totalText = $(this).val();
    var textSubtract = totalText.length;

    $(this).parent().children('.counter').html(counter - textSubtract);
  });
});