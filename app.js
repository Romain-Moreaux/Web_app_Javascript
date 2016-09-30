
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

  function cookieBar() {
    $.cookieBar({
      fixed: true,
      zindex: 9999,
      message: 'En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation de cookies pour réaliser des statistiques de visites anonymes.',
      acceptText: 'OK',
      policyButton: true,
      policyText: 'En savoir plus',
      policyURL: '/mentions#cookies',
    });
  }


  function counterUp() {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    })
  }


  function skyform() {
    // Validation
    $("#sky-form3").validate({
        // Rules for form validation
        rules:
        {
            name:
            {
                required: true
            },
            email:
            {
                required: true,
                email: true
            },
            message:
            {
                required: true,
                minlength: 10
            },
            captcha:
            {
                required: true,
                remote: 'public/plugins/sky-forms-pro/skyforms/captcha/process.php'
            }
        },

        // Messages for form validation
        messages:
        {
            name:
            {
                required: 'Veuillez entrer un nom',
            },
            email:
            {
                required: 'Veuillez entrer un email',
                email: 'Veuillez renseigner un email valide'
            },
            message:
            {
                required: 'Veuillez taper votre message'
            },
            captcha:
            {
                required: 'Veuillez tapper les caractères',
                remote: 'Captcha valide requis'
            }
        },

        // Ajax form submition
        submitHandler: function(form)
        {
            $(form).ajaxSubmit(
            {
                beforeSend: function()
                {
                    $('#sky-form3').find('button[type="submit"]').attr('disabled', true);
                },
                success: function()
                {
                    $("#sky-form3").addClass('submited');
                }
            });
        },

        // Do not change code below
        errorPlacement: function(error, element)
        {
            error.insertAfter(element.parent());
        }
    });
  }// End skyform


  function googleMap() {
    var map;
    map = new GMaps({
    zoom: 16,
  	div: '#map',
  	scrollwheel: false,
  	lat: 48.841948,
  	lng: 2.327562,
    draggable: false,
    dragend: function(e) {
      //Re-center map on marker after dragend
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
        },5000);
      }
    });

    var marker = map.addMarker({
  		lat: 48.841948,
  		lng: 2.327562,
      title: 'Informatique Montparnasse'
    });
  }



  function mixitUp() {
      $('.sorting-grid').mixitup();
  }


  function timeAgo() {
    $("time.timeago").timeago();
  }



  function owlSlider() {

      $(".owl-slider-sponsors").owlCarousel({
      		items : 6,
      		loop: true,
      		autoplay: true,
      		autoplayTimeout: 1450,
      		smartSpeed: 600,
      		responsive: {
      			300:{
      				items:2
      			},
      			500:{
      				items:3
      			},
      			768:{
      				items:4
      			},
      			980:{
      				items:6
      			},
      		},
      });

      $('.owl-carousel-support').owlCarousel({
        items: 4,
        margin: 30,
        loop: true,
        nav: true,
        navText: ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"],
        navContainerClass: 'owl-buttons-support',
        responsive: {
          300:{
            items: 1
          },
          768:{
            items: 2
          },
          992:{
            items: 3
          },
          1200:{
            items: 4
          },
        },
      });

  } // End function slider

  function socialPopup() {
    var popupCenter = function (url, title, width, height){
      var popupWidth =  width || 640;
      var popupHeight = height || 320;
      var windowLeft = window.screenLeft || window.screenX;
      var windowTop = window.screenTop || window.screenY;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2;
      var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
      var popup = window.open(url, title, 'scrollbars=yes, width='+ popupWidth +', height='+ popupHeight +', top=' + popupTop +', left=' + popupLeft +'');
      popup.focus();
      return true;
    }

    var elTwitter = document.querySelector('.share-twitter');
    if (elTwitter) {
      elTwitter.addEventListener('click', function(e){
      e.preventDefault();
      var url = this.getAttribute('data-url');
      var shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) + "&via=informatique_75" +
      "&url=" + encodeURIComponent(url);
      popupCenter(shareUrl, "Partager sur Twitter");
      });
    }

    var elFacebook = document.querySelector('.share-facebook');
    if (elFacebook) {
      elFacebook.addEventListener('click', function(e){
        e.preventDefault();
        var url = this.getAttribute('data-url');
        var shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
        popupCenter(shareUrl, "Partager sur Facebook");
      });
    }
  } // End function social popup

  function revSlider() {
    var revapi104;
    if(jQuery("#slider1").revolution == undefined){
      revslider_showDoubleJqueryError("#slider1");
    }else {
      revapi104 = jQuery("#slider1").show().revolution({
      sliderType:"standard",
      sliderLayout:"fullscreen",
      responsiveLevels:[1240,1024,778,480],
      gridwidth:[1240,1024,778,480],
      gridheight:[868,768,960,720],
      lazyType:"single",
      parallax: {
        type:"mouse",
        origo:"slidercenter",
        speed:2000,
        levels:[2,3,4,5,6,7,12,16,10,50],
        disable_onmobile:"on"
        },
        navigation: {
          keyboardNavigation:"off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation:"off",
          onHoverStop:"off",
          touch:{
            touchenabled:"on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          },
          bullets: {
            enable:true,
            hide_onmobile:true,
            hide_under:480,
            style:"zeus",
            hide_onleave:false,
            direction:"horizontal",
            h_align:"right",
            v_align:"bottom",
            h_offset:80,
            v_offset:50,
            space:5,
            tmp:'<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
          }
        },
        shadow:0,
        spinner:"off",
        stopLoop:"off",
				stopAfterLoops:0,
				stopAtSlide:-1,
        shuffle:"off",
        autoHeight:"off",
        fullScreenAlignForce:"off",
        fullScreenOffset: "195",
        hideThumbsOnMobile:"off",
        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        debugMode:false,
        fallbacks: {
          simplifyAll:"off",
          nextSlideOnWindowFocus:"off",
          disableFocusListener:false,
        }
      });
    }
  }

  handleHeader();
  handleBootstrap();
  handleSmothScrolling();
  handleEqualHeightColumns();
  handleActiveClass();
  cookieBar();
  timeAgo();
  socialPopup();
  if (document.getElementById('slider1')) {
    counterUp();
    revSlider();
  }
  else if (document.getElementById('boutique')) {
    owlSlider();
    mixitUp();
  }
  else if (document.getElementById('support')) {
    owlSlider();
  }
  else if (document.getElementById('map')) {
    googleMap();
    skyform();
  }
}();
