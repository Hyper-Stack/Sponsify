
$("#search-icon").click(function() {
    $(".nav").toggleClass("search");
    $(".nav").toggleClass("no-search");
    $(".search-input").toggleClass("search-active");
  });
  
  $('.menu-toggle').click(function(){
     $(".nav").toggleClass("mobile-nav");
     $(this).toggleClass("is-active");
  });

  $(function() {
   $('.material-card > .mc-btn-action').click(function () {
       var card = $(this).parent('.material-card');
       var icon = $(this).children('i');
       icon.addClass('fa-spin-fast');

       if (card.hasClass('mc-active')) {
           card.removeClass('mc-active');

           window.setTimeout(function() {
               icon
                   .removeClass('fa-arrow-left')
                   .removeClass('fa-spin-fast')
                   .addClass('fa-bars');

           }, 800);
       } else {
           card.addClass('mc-active');

           window.setTimeout(function() {
               icon
                   .removeClass('fa-bars')
                   .removeClass('fa-spin-fast')
                   .addClass('fa-arrow-left');

           }, 800);
       }
   });
});