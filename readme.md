# Riveted
Riveted is a Google Analytics plugin that tracks how much time users spend actively engaged on a page.

The plugin has no dependencies and supports Universal Analytics, Classic Google Analytics, and Google Tag Manager.

[View the Project Page](http://parsnip.io/scroll-depth/)

## Usage
```javascript
// Basic
riveted.init();

// With some options
riveted.init({
  reportInterval: 10,
  idleTimeout: 20,
  nonInteraction: false
});
```

## Google Tag Manager
If you'd like to integrate with Google Tag Manager, here are the dataLayer variable names:

* Riveted Event Name = Riveted
* Event Category = {{eventCategory}}
* Event Action = {{eventAction}}
* Event Label = {{eventLabel}}
* Event Value = {{eventValue}}
* Event Non-Interaction = {{eventNonInteraction}}
* User Timing Event Name = RivetedTiming
* Timing Variable = {{timingVar}}
* Timing Value = {{timingValue}}

## Browser Support
Tested in latest versions of Chrome, Firefox, Safari, and Opera. Internet Explorer 8-11. iOS and Android.

## Contact
If you have any questions you can find me on Twitter at [@robflaherty](https://twitter.com/robflaherty).

## Changelog
0.1 (2/9/14): Initial release.
