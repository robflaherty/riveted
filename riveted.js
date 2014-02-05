/*!
 * riveted.js | v0.1
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */

var riveted = (function() {
    
    var active = false;

    var started = false;

    var clock = 0;

    var setIdle = null;

    var startTime = new Date();

    var idleTimeout = 5000;



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

    function sendEvent(action, label, timing) {

      console.log('Ping');

        if (timing) {
          //User Timing ping
        }

        if (typeof(ga) !== "undefined") {
          //ga('send', 'event', 'Riveted', action, label, 1);
        }

        if (typeof(_gaq) !== "undefined") {
          //_gaq.push(['_trackEvent', 'Riveted', action, label, 1]);
        }

        if (typeof(dataLayer) !== "undefined") {
          //dataLayer.push({'event':'Riveted', 'eventCategory':'Riveted', 'eventAction': action, 'eventLabel': label, 'eventValue': 1});
        }

    }

    function checkIdle() {
      active = false;
      console.log('Setting to false');
    }



    function startRiveted(diff) {
      
      console.log(diff);

      // Set global
      started = true;

      // Send User Timing Event
      sendEvent('Riveted', 'First Interaction', diff);

      function ping() {
        
        if (active) {
          clock += 5;
          console.log('Total time: ' + clock);
          //sendEvent('Ping', currentCount);
          setTimeout(ping, idleTimeout)
        } else {
          console.log('idle');
          setTimeout(ping, idleTimeout)
        }
      }

      setTimeout(ping, idleTimeout);

    }


    function startTimer() {

    }

    function trigger() {

      //console.log('trigger');

      active = true;

      var currentTime = new Date();
      var diff = Math.floor((currentTime - startTime)/1000);  

      if (!started) {
        startRiveted(diff);
      }
      
      clearTimeout(setIdle);
      setIdle = setTimeout(checkIdle, 3000);
    }

    function init() {

      document.addEventListener('keypress', trigger, false);
      document.addEventListener('click', trigger, false);
      window.addEventListener('scroll', throttle(trigger, 500), false);

    }

    init();


  })();

