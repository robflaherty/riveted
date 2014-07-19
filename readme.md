# Riveted
Riveted is a Google Analytics plugin that tracks how much time users spend actively engaged on a page.

It has no dependencies and supports Universal Analytics, Classic Google Analytics, and Google Tag Manager.

All instructions and information can be found on the [project page](http://projects.parsnip.io/riveted/).

Background and more details can be found in this [blog post](http://parsnip.io/blog/riveted-measuring-active-time-in-google-analytics/).

There's also a blog post with information on [how to use the Google Analytics data that Riveted provides](https://medium.com/google-analytics/84d9981920da).

## WordPress Plugin
Riveted is also available as a [WordPress plugin](http://wordpress.org/plugins/riveted/).

1. Upload the `wp-plugin/riveted` directory into the `/wp-content/plugins/` directory on your server.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. If you'd like to modify the default settings, go to the Riveted panel under Settings.

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

0.4.0 (7/19/14): https://github.com/robflaherty/riveted/issues/10

0.3.2 (6/26/14): Fixed Google Tag Manager label.

0.3.1 (6/4/14): Fixed IE8 bug.

0.3 (2/17/14): Added WordPress plugin.

0.2.1 (2/13/14): Fixed Non-Interaction option.

0.2 (2/13/14): Fixed GTM double firing.

0.1 (2/9/14): Initial release.
