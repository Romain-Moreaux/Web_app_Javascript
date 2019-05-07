/* global $ */

var appInit = function() {
  function scrollHandler() {
    var lastScrollPosition = 0;
    var ticking = false;
    var headerEl = document.querySelector('.header-website');

    if (headerEl) {
      var toggleClassOnScroll = function(scrollPos) {
        if (scrollPos > 60) {
          headerEl.classList.add('is-scrolled');
          headerEl.classList.remove('is-fixed');
        } else if (scrollPos < 20) {
          if(headerEl.classList.contains("is-scrolled")){
            headerEl.classList.add('is-fixed');
            headerEl.classList.remove('is-scrolled');
          }
        }
      }

      // bind event on {window object}
      window.addEventListener(
        'scroll',
        function() {
          lastScrollPosition = window.scrollY;

          if (!ticking) {
            // requestAnimationFrame for good performances
            window.requestAnimationFrame(function() {
              toggleClassOnScroll(lastScrollPosition);
              ticking = false;
            })
            ticking = true;
          }
        },
        false
      )
    }
  }

  function formsHandler() {
    // this {object} contains your logic, whatever you wanna do on hubspot form events
    var formInit = {
      modalOnSubmit: function() {
        let modalContent = document.querySelectorAll('.modal-form');

        modalContent.forEach(function(element) {
          // your modal element
          let modalBtn = createElementWithClass('button', 'modal-close');
          element.append(modalBtn);
          // .submitted-message is the default hubspot class after form submitted

          // Attach click event on close button
          modalBtn.addEventListener(
            'click',
            function(e) {
              e.target.closest('.submitted-message').style.display = 'none';
            },
            false
          )
        })
      }
    }

    // Attach event on hubspot form submitted binding your {object} above
    window.addEventListener(
      'message',
      function(e) {
        if (e.data.type === 'hsFormCallback' && e.data.eventName === 'onFormSubmitted') {
          console.log(e.target + 'submitted');
          this.modalOnSubmit();
        }
      }.bind(formInit),
      false
    )
  }

  function tabsHandler() {
    var btns = document.querySelectorAll('.section-3--buttons button');
    var tabs = document.querySelectorAll('.tabcontent');

    if (btns.length > 0 && tabs.length > 0) {
      tabs.forEach(function(element, index) {
        element.dataset.tabIndex = index;
      })

      btns.forEach(function(element, index) {
        element.dataset.buttonIndex = index;
        // bind argument = this
        element.addEventListener('click', matchingElements.bind(element), false);
      })

      btns[0].click();
    }

    function matchingElements() {
      let currBtn = document.querySelector('.section-3--buttons button.is-active');
      let currTab = document.querySelector('.tabcontent.is-show');

      // for each tab
      tabs.forEach(
        function(element) {
          // do someting only if the tab element match with the clicked button
          if (element.dataset.tabIndex === this.dataset.buttonIndex) {
            // if on mobile
            if (isMobile()) {
              // if clicked on the active button
              if (this.classList.contains('is-active')) {
                btns.forEach(function(element) {
                  if (!element.classList.contains('is-active')) {
                    // show all buttons if menu closed
                    if (element.style.display === 'none') {
                      element.style.display = 'flex';
                      // hide all buttons if menu opened
                    } else {
                      element.style.display = 'none';
                    }
                  }
                })
                // if NOT clicked on the active button
              } else {
                // remove current active classes if they exist
                if (currBtn) currBtn.classList.remove('is-active');
                if (currTab) currTab.classList.remove('is-show');
                // add active classes on matched tab and button
                element.classList.add('is-show');
                this.classList.add('is-active');
                // then hide all not active buttons
                btns.forEach(function(element) {
                  if (!element.classList.contains('is-active')) element.style.display = 'none';
                })
              }
              // if NOT on mobile
            } else {
              // if not clicked on the active button
              if (!this.classList.contains('is-active')) {
                // remove current active classes if they exist
                if (currBtn) currBtn.classList.remove('is-active');
                if (currTab) currTab.classList.remove('is-show');
                // add active classes on matched tab and button
                element.classList.add('is-show');
                this.classList.add('is-active');
              }
            }
          }
        }.bind(this)
      )
    }
  }

  function createElementWithClass(htmlTag, className) {
    let element = document.createElement(htmlTag);
    if (className) element.setAttribute('class', className);

    return element;
  }

  function videosHandler() {
    var videoBtns = document.querySelectorAll('.btn-play');

    videoBtns.forEach(function(element) {
      element.addEventListener(
        'click',
        function() {
          let videoTag = this.closest('div').querySelector('video');

          if (videoTag.paused) {
            videoTag.play();
            this.classList.remove('is-show');
          } else {
            videoTag.pause();
            this.classList.add('is-show');
          }
        }.bind(element),
        false
      )

      element.classList.add('is-show');
    })
  }

  function isMobile(portraitWidth = 600, landscapeWidth = 750) {
    return (
      /Mobi/i.test(navigator.userAgent) &&
      ((window.innerWidth < portraitWidth && window.matchMedia('(orientation: portrait)').matches) ||
        (window.innerWidth < landscapeWidth && window.matchMedia('(orientation: landscape)').matches))
    );
  }

  function mobileTrigger() {
    if (isMobile(900)){
      var menuMobile = document.querySelector('.mobile-trigger');
      var navigation = document.querySelector('.header-website');

      menuMobile.addEventListener('click', function() {
        navigation.classList.contains('is-close')
          ? navigation.classList.replace('is-close', 'is-open')
        : navigation.classList.replace('is-open', 'is-close');
      })
      navigation.classList.add('is-close');
    }
  }

  // only return functions that you need
  return {
    scrollHandler: scrollHandler(),
    tabsHandler: tabsHandler(),
    videosHandler: videosHandler(),
    mobileTrigger: mobileTrigger(),
    formsHandler: formsHandler()
  }
}

// execute your function as callback when DOM is ready
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', appInit)
  : appInit();
