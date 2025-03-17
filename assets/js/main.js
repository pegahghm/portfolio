(function ($) {
  'use strict';

  /*
  |--------------------------------------------------------------------------
  | Template Name: Portm
  | Author: Laralink
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Isotop Initialize
  | 6. Modal Video
  | 7. Tabs
  | 8. Counter Animation
  | 9. Progress Bar
  | 10. Cursor Animation
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    $(window).trigger('scroll');
    $(window).trigger('resize');
    preloader();
    isotopInit();
  });

  $(function () {
    $(window).trigger('resize');
    mainNav();
    stickyHeader();
    dynamicBackground();
    isotopInit();
    modalVideo();
    tabs();
    counterInit();
    progressBar();
    if ($.exists('.wow')) {
      new WOW().init();
    }
  });

  $(window).on('scroll', function () {
    counterInit();
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs_preloader_in').fadeOut();
    $('.cs_preloader').delay(150).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs_menu_dropdown_toggle"></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list')
        .slideToggle();
    });
    $('.cs_menu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs_sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('cs_gescout_sticky');
      } else {
        $header.removeClass('cs_gescout_sticky');
        $header.removeClass('cs_gescout_show');
      }

      if ($header.hasClass('cs_gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs_gescout_show');
        } else {
          $header.removeClass('cs_gescout_show');
        }
      }

      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Isotop Initialize
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists('.cs_isotop')) {
      $('.cs_isotop').isotope({
        itemSelector: '.cs_isotop_item',
        transitionDuration: '0.60s',
        percentPosition: true,
        masonry: {
          columnWidth: '.cs_grid_sizer',
        },
      });
      /* Active Class of Portfolio*/
      $('.cs_isotop_filter ul li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });
      /*=== Portfolio filtering ===*/
      $('.cs_isotop_filter ul').on('click', 'a', function () {
        var filterElement = $(this).attr('data-filter');
        $('.cs_isotop').isotope({
          filter: filterElement,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    $(document).on('click', '.cs_video_open', function (e) {
      e.preventDefault();
      var video = $(this).attr('href');
      $('.cs_video_popup_container iframe').attr('src', video);
      $('.cs_video_popup').addClass('active');
    });
    $('.cs_video_popup_close, .cs_video_popup_layer').on('click', function (e) {
      $('.cs_video_popup').removeClass('active');
      $('html').removeClass('overflow_hidden');
      $('.cs_video_popup_container iframe').attr('src', 'about:blank');
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    7. Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $('.cs_tabs .cs_tab_links a').on('click', function (e) {
      var currentAttrValue = $(this).attr('href');
      $('.cs_tabs ' + `[data-id="${currentAttrValue}"]`)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      isotopInit();
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    8. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists('.odometer')) {
      function winScrollPosition() {
        var scrollPos = $(window).scrollTop(),
          winHeight = $(window).height();
        var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
        return scrollPosition;
      }

      $('.odometer').each(function () {
        var elemOffset = $(this).offset().top;
        if (elemOffset < winScrollPosition()) {
          $(this).html($(this).data('count-to'));
        }
      });
    }
  }

  /*--------------------------------------------------------------
    9. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    $('.cs_progress').each(function () {
      var progressPercentage = $(this).data('progress') + '%';
      $(this).find('.cs_progress_in').css('width', progressPercentage);
    });
  }

  /*--------------------------------------------------------------
    10. Cursor Animation
  --------------------------------------------------------------*/
  $(function () {
    $('body').append('<span class="cs_cursor_lg d"></span>');
    $('body').append('<span class="cs_cursor_sm"></span>');
    $('a, button').on('mouseenter', function () {
      $('.cs_cursor_lg').addClass('opacity-0');
      $('.cs_cursor_sm').addClass('opacity-0');
    });
    $('a, button').on('mouseleave', function () {
      $('.cs_cursor_lg').removeClass('opacity-0');
      $('.cs_cursor_sm').removeClass('opacity-0');
    });
  });
  function cursorMovingAnimation(event) {
    try {
      const timing = gsap.timeline({
        defaults: {
          x: event.clientX,
          y: event.clientY,
        },
      });

      timing
        .to('.cs_cursor_lg', {
          ease: 'power2.out',
        })
        .to(
          '.cs_cursor_sm',
          {
            ease: 'power2.out',
          },
          '-=0.4',
        );
    } catch (err) {
      console.log(err);
    }
  }
  document.addEventListener('mousemove', cursorMovingAnimation);
})(jQuery); 


document.addEventListener("DOMContentLoaded", function () {
  const workItems = document.querySelectorAll(".work-item");
  const workDetails = document.getElementById("work-details");
  const workTitle = document.getElementById("work-title");
  const workText = document.getElementById("work-text");

  const descriptions = {
    1: "At Brixel Education School, I played a key role in enhancing the website by implementing significant improvements that boosted user engagement and experience. Working closely with cross-functional teams, I optimized website content to ensure accuracy, relevance, and alignment with organizational goals. Additionally, I led website mapping initiatives to streamline navigation and enhance usability. My contributions extended to brainstorming and executing new features, fostering continuous improvement and innovation in the platform’s design and functionality.",
    2: "As a Full-Stack Developer at Bright Side Counselling Inc., I was responsible for developing and maintaining software applications that supported the organization’s operations and user needs. I diagnosed and resolved complex technical issues, ensuring smooth and efficient system performance. A key part of my role involved effectively communicating technical concepts to non-technical stakeholders, bridging the gap between development and business objectives. I also conducted rigorous testing and debugging to ensure software reliability and efficiency, ultimately contributing to the organization’s mission of providing seamless digital services to clients."
  };

  // Handle the click event on work items
  workItems.forEach(item => {
    item.addEventListener("click", function () {
      const index = this.getAttribute("data-index");

      workDetails.classList.remove("show"); // Remove the 'show' class to hide the details

      setTimeout(() => {
        // Set the title and text content for the selected work item
        workTitle.innerText = this.querySelector(".cs_iconbox_title").innerText;
        workText.innerText = descriptions[index];

        workDetails.style.display = "block"; // Show the description panel
        setTimeout(() => {
          workDetails.classList.add("show"); // Add the 'show' class to make it visible
        }, 10); 
      }, 300); 
    });
  });

  // Close button functionality
  const closeButton = document.querySelector('.close-btn');
  closeButton.addEventListener('click', () => {
    workDetails.style.display = 'none';  // Hide the work details panel when the close button is clicked
  });
});

