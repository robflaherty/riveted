/*!
 * riveted.js | v0.1
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */

;(function ($,window,document,undefined) {
  
  var defaults = {
    elements: [],
    minHeight: 0,
    percentage: true,
    testing: false
  },

  $window = $(window),
  
  cache = [];

  /*
   * Plugin
   */

  $.riveted = function(options) {
    
    var startTime = Date.now();

    var active = false;

    options = $.extend({}, defaults, options);

    var setIdle;

    var startCount = 0;

    var started = false;

    /*
     * Functions
     */

    /*
     * Throttle function borrowed from:
     * Underscore.js 1.5.2
     * http://underscorejs.org
     * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Underscore may be freely distributed under the MIT license.
     */

    function throttle(func, wait) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      var later = function() {
        previous = new Date;
        timeout = null;
        result = func.apply(context, args);
      };
      return function() {
        var now = new Date;
        if (!previous) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }     

    function sendEvent(action, label) {

      console.log('Ping');

      if (!options.testing) {

        if (typeof(ga) !== "undefined") {
          //ga('send', 'event', 'Riveted', action, label, 1);
        }

        if (typeof(_gaq) !== "undefined") {
          //_gaq.push(['_trackEvent', 'Riveted', action, label, 1]);
        }

        if (typeof(dataLayer) !== "undefined") {
          //dataLayer.push({'event':'Riveted', 'eventCategory':'Riveted', 'eventAction': action, 'eventLabel': label, 'eventValue': 1});
        }

      } else {

        console.log('action: ' + action + '; label: ' + label);

      }
    }

    function checkIdle() {
      active = false;
      console.log('Setting to false');
    }



    function startRiveted() {
      
      started = true;
      lastTime = Date.now();

      setIdle = setTimeout(checkIdle, 3000);

      var pingCheck = setInterval(function() {
        if (active) {
          sendEvent('Ping', currentCount);
        } else {
          console.log('Idle');
        }
      }, 1000);




    }


    function resetActive() {

      console.log('reset');

      if (!started) {
        startRiveted();
      } else {
        active = true;
        clearTimeout(setIdle);
        setIdle = setTimeout(checkIdle, 3000);
      }
    }

    function init() {
      $(document).on('keypress click', resetActive);
      $(window).on('scroll', throttle(resetActive, 500));
    }

    init();


  };

})(jQuery,window,document);