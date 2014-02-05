/*!
 * riveted.js | v0.1
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */

var riveted = (function() {
    
    var active = false,
      started = false,
      setIdle = null,
      clock = 0,
      startTime = new Date(),
      pingInterval = 2000,
      idleTimeout = 10000;

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

    /*
     * Send a User Timing event when active behavior begins
     */

    function sendUserTiming(timingVar, timingValue) {
      
      if (typeof(ga) !== "undefined") {
        ga('send', 'timing', 'Riveted', timingVar, timingValue);
      }
      
      if (typeof(_gaq) !== "undefined") {
        _gaq.push(['_trackTiming', 'Riveted', timingVar, timingValue, null, 100]);
      }

      if (typeof(dataLayer) !== "undefined") {
        dataLayer.push({'event':'RivetedTiming', 'eventCategory':'Riveted', 'timingVar': timingVar, 'timingValue': timingValue});
      }

    }

    /* 
     * Sending Event
     */

    function sendEvent(time) {

      console.log('Ping');

      if (typeof(ga) !== "undefined") {
        ga('send', 'event', 'Riveted', 'Time Spent', 'Seconds', time, {'nonInteraction': 1});
      }

      if (typeof(_gaq) !== "undefined") {
        _gaq.push(['_trackEvent', 'Riveted', 'Time Spent', 'Seconds', time, true]);
      }

      if (typeof(dataLayer) !== "undefined") {
        dataLayer.push({'event':'Riveted', 'eventCategory':'Riveted', 'eventAction': 'Time Spent', 'eventLabel': 'Seconds', 'eventValue': time, 'eventNonInteraction': true});
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
      sendUserTiming('First Interaction', null, diff);

      function ping() {
        
        if (active) {
          clock += pingInterval / 1000;
          console.log('Total time: ' + clock);
          //sendEvent('Ping', currentCount);
          setTimeout(ping, pingInterval)
        } else {
          console.log('idle');
          setTimeout(ping, pingInterval)
        }
      }

      setTimeout(ping, pingInterval);

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
      setIdle = setTimeout(checkIdle, idleTimeout);
    }

    function init() {

      document.addEventListener('keypress', trigger, false);
      document.addEventListener('click', trigger, false);
      window.addEventListener('scroll', throttle(trigger, 500), false);

    }

    init();


  })();

