'use strict';

// Initialize commonly used variables
// ----------------------------------------------------------------------
var $windowWidth = $(window).width();

// Elements
var $resumeDownloadWrapper = $('#resume-download-wrapper');
var $envelopeBottom = $('#envelope-bottom');
var $resumeTrigger = $('.resume-trigger');
var $resumeButtonDownload = $('.resume-button-download');
var $submitButton = $('.submit-button');
var $submitButtonIcon = $('.submit-button i');

// Heights of elements
var $navHeight = $('.nav-trigger').outerHeight(true);
var $aboutHeight = $('#about').outerHeight(true);
var $developerHeight = $('#developer').outerHeight(true);
var $designerHeight = $('#designer').outerHeight(true);
var $resumeHeight = $('#resume').innerHeight();
var $contactHeight = $('#contact').outerHeight(true);
var $designerElementHeight = $('#browser-designer-element').height();
var $resumeElementHeight = $('#resume-element').height();
var $envelopeTopHeight = $('#envelope-top').height();

var $resumeTriggerHeight =  $envelopeTopHeight * 1.25;

var resumeTriggerOffset = $envelopeTopHeight - $resumeElementHeight + ($resumeElementHeight / 10);


// AJAX Contact Form Submission Handler
// ----------------------------------------------------------------------
$('#contact-form').submit(function(event){

  $submitButton.text(' SENDING');
  $submitButtonIcon.removeClass('fa-paper-plane').addClass('fa-cog').addClass('fa-spin');

  event.preventDefault();
  var postData = $(this).serializeArray();

  $.ajax({
    url: '/',
    type: 'POST',
    datatype: 'JSON',
    data: postData,
    success: function() {
      $submitButton.text(' SENT!');
      $submitButtonIcon.removeClass('fa-cog').removeClass('.fa-spin').addClass('fa-check');
      document.getElementById('contact-form').reset();
    },
    error: function() {
      $submitButton.text(' ERROR SENDING');
      $submitButtonIcon.removeClass('fa-cog').removeClass('.fa-spin').addClass('fa-times');
      document.getElementById('contact-form').reset();
    }
  });
});

// AJAX Resume Download Handler
// ----------------------------------------------------------------------
$resumeButtonDownload.click(function() {
  $.ajax({
    url: '/resume',
    type: 'GET'
  });
});

// GSAP - Moves linear gradient behind developer-overlay (translate3D - hardware accelerated)
// ----------------------------------------------------------------------
TweenMax.to('.developer-gradient', 10, {x: $windowWidth + 600, repeat: -1, yoyo: true, ease:Linear.easeNone});

// Makes all the fun js effects completely responsive, YAY FUTUREZ!
// ----------------------------------------------------------------------

// Super janky, will find way to refactor later
var positionElements = function() {
  $envelopeTopHeight = $('#envelope-top').height();
  $resumeElementHeight = $('#resume-element').height();

  var $wrapperPosition = $envelopeTopHeight / 2 - $resumeDownloadWrapper.height() / 2;
  $resumeDownloadWrapper.css('bottom', $wrapperPosition);

  var $bottomPosition = $envelopeTopHeight - $envelopeBottom.height() / 3.5;
  $envelopeBottom.css('bottom', $bottomPosition);

  // Resize resume-trigger based on current height of the envelope
  $resumeTriggerHeight = $envelopeTopHeight *  1.25;
  $resumeTrigger.css('height', $resumeTriggerHeight);

  // Position the resume-trigger margin based on the envelope-bottom height
  resumeTriggerOffset = $envelopeTopHeight - $resumeElementHeight + ($resumeElementHeight / 10);
  $resumeTrigger.css('margin-bottom', resumeTriggerOffset);


};

// Smooth Scrolling to all 'a' tags
// ----------------------------------------------------------------------
$('a').smoothScroll({offset: -$navHeight});

// Dynamic resize of textarea based on content
// ----------------------------------------------------------------------
autosize($('textarea'));

// ScrollMagic - Navigation
// ----------------------------------------------------------------------
var navigationController = new ScrollMagic.Controller();
var navigationScrollMagic = function (time, element, link) {
  new ScrollMagic.Scene({
    duration: time - $navHeight,
    offset: -($navHeight+1),
    reverse: true,
    triggerHook: 0,
    triggerElement: element
  })
    .setClassToggle(link, 'highlight')
    .addTo(navigationController);
};

// Set navbar to appear above about section
new ScrollMagic.Scene({
  triggerElement: '#about',
  triggerHook: 0,
  offset: -$navHeight,
  reverse: true
})
  .setClassToggle('.nav-trigger', 'nav-trigger-in')
  .addTo(navigationController);

// Initialize for about link
navigationScrollMagic($aboutHeight + $developerHeight + $designerHeight - $navHeight, '#about', '.about-link');
// Initialize for resume link
navigationScrollMagic($resumeHeight, '#resume-header', '.resume-link');
// Initialize for contact link
navigationScrollMagic($contactHeight, '#contact', '.contact-link');

// ScrollMagic - Browser wipe effect
// ----------------------------------------------------------------------
// Scene that controls the developer pin effect
var browserDeveloperController = new ScrollMagic.Controller();

var developerTweenTimeline = new TimelineMax()
  .add(TweenMax.to('#browser-developer-element', 1, {y:1000, ease:Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '#browser-developer-trigger',
  duration: 1000,
  offset: -$navHeight - 50,
  triggerHook: 'onLeave'
})
  .setTween(developerTweenTimeline)
  .addTo(browserDeveloperController);

// Scene that controls the designer pin effect
var browserDesignerController = new ScrollMagic.Controller();

var designerTweenTimeline = new TimelineMax()
  .add(TweenMax.to('#browser-designer-element', 1, {y:2100, ease:Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '#browser-designer-trigger',
  duration: 2100,
  offset: -$navHeight - 50 - $designerElementHeight,
  triggerHook: 'onLeave'
})
  .setTween(designerTweenTimeline)
  .addTo(browserDesignerController);

// Scene that controls the resume pin effect
var resumeController = new ScrollMagic.Controller();

var resumeTweenTimeline = new TimelineMax()
  .add(TweenLite.to('#resume-element', 1, {y: $resumeTriggerHeight, ease: Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '.resume-trigger',
  duration: $resumeTriggerHeight,
  offset: -$navHeight - 50 - $resumeElementHeight,
  triggerHook: 'onLeave'
})
  .setTween(resumeTweenTimeline)
  .addTo(resumeController);

// On document ready align elements
// ----------------------------------------------------------------------
$(document).on('ready', function() {
  positionElements();
    $('#resume-element').css('top', -$resumeElementHeight);
    $('#browser-designer-element').css('top', -$designerElementHeight);
});


// Debounce for resize event
// ----------------------------------------------------------------------
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); }
  };
}

// Tests against width since iOS safari is evil and calls onOrientationChange
// ----------------------------------------------------------------------
$(window).on('resize',
  debounce (function() {
    if ($(window).width() !== $windowWidth) {

      positionElements();
    }
  }, 100)
);
