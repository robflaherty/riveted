/*!
 * riveted.js | v0.1
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */

//var riveted = (function() {

    var started = false,
      stopped = false,
      clockTime = 0,
      startTime = new Date(),
      reportInterval = 5,
      idleTimeout = 10,

      clockTimer = null,
      idleTimer = null;

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

    function setIdle() {
      stopClock();
      console.log('Setting to idle');
    }

    function visibilityChange() {
      if (document.hidden || document.webkitHidden) {
        console.log('hidden yo');
        stopClock();
      } else {
        console.log('ooh we back');
      }
    }

    function clock() {
      clockTime += 1;
      console.log(clockTime);
      if (clockTime > 0 && (clockTime % reportInterval == 0)) {
        console.log('Report Time: ' + clockTime);
      }

    }

    function stopClock() {
      stopped = true;
      clearTimeout(clockTimer);
      console.log('stopping: ' + clockTime);
    }

    function restartClock() {
      stopped = false;
      clearTimeout(clockTimer);
        clockTimer = setInterval(clock, 1000);
    }

    function startRiveted() {

      // Calculate seconds from start to first interaction
      var currentTime = new Date();
      var diff = Math.floor((currentTime - startTime)/1000);

      // Set global
      started = true;

      // Send User Timing Event
      sendUserTiming('First Interaction', null, diff);

      // Start clock
      clockTimer = setInterval(clock, 1000);

    }

    function trigger() {

      if (!started) {
        startRiveted();
      }

      if (stopped) {
        restartClock();
      }

      clearTimeout(idleTimer);
      idleTimer = setTimeout(setIdle, idleTimeout * 1000 + 100);
    }

    function init() {

      document.addEventListener('keydown', trigger, false);
      document.addEventListener('click', trigger, false);

      window.addEventListener('mousemove', throttle(trigger, 500), false);
      window.addEventListener('scroll', throttle(trigger, 500), false);

      document.addEventListener('visibilitychange', visibilityChange, false);
      document.addEventListener('webkitvisibilitychange', visibilityChange, false);


    }

    init();


  //})();

