
var App = function(){

  function handleHeader() {
    //jQuery to collapse the navbar on scroll
    if ($('.navbar').offset().top > 150) {
      $('.navbar-fixed-top').addClass('top-nav-collapse');
    }
    $(window).scroll(function() {
      if ($('.navbar').offset().top > 150) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
      } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
      }
    });

    $(window).scroll(function() {
      $('.navbar-collapse.in').collapse('hide');
    });
  }

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  function handleSmothScrolling() {
    $('.page-scroll a').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top-53
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  }

  //Bootstrap Tooltips and Popovers
  function handleBootstrap() {
      /*Bootstrap Carousel*/
      $('.carousel').carousel({
          interval: 15000,
          pause: 'hover'
      });

      /*Tooltips*/
      $('.tooltips').tooltip();
      $('.tooltips-show').tooltip('show');
      $('.tooltips-hide').tooltip('hide');
      $('.tooltips-toggle').tooltip('toggle');
      $('.tooltips-destroy').tooltip('destroy');

      /*Popovers*/
      $('.popovers').popover();
      $('.popovers-show').popover('show');
      $('.popovers-hide').popover('hide');
      $('.popovers-toggle').popover('toggle');
      $('.popovers-destroy').popover('destroy');
  }

  //Equal Height Columns
  function handleEqualHeightColumns() {
      var EqualHeightColumns = function () {
          $(".equal-height-columns").each(function() {
              heights = [];
              $(".equal-height-column", this).each(function() {
                  $(this).removeAttr("style");
                  heights.push($(this).height()); // write column's heights to the array
              });
              $(".equal-height-column", this).height(Math.max.apply(Math, heights)); //find and set max
          });
      }

      EqualHeightColumns();
      $(window).resize(function() {
          EqualHeightColumns();
      });
      $(window).on("load", function() {
          EqualHeightColumns("img.equal-height-column");
      });
  }

  //JQuery for active class between pages
  function handleActiveClass() {
  var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/"));
    $("#nav").find("a").each(function(){
        if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
        $(this).parent().addClass("active");
    })
  }

  handleHeader();
  handleBootstrap();
  handleSmothScrolling();
  handleEqualHeightColumns();
  handleActiveClass();
	
}();
