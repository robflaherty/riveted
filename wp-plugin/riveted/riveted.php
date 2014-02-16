<?php
/**
 * Plugin Name: Riveted
 * Plugin URI: http://projects.parsnip.io/riveted/
 * Description: A Google Analytics plugin for measuring active time
 * Version: 0.3
 * Author: Rob Flaherty
 * Author URI: http://parsnip.io
 * License: MIT
 */

/* 
 * Plugin options (You can edit this part)
 *
 * REPORT_INTERVAL: The default is 10 (seconds)
 * IDLE_TIMEOUT: The default is 30 (seconds)
 * NON_INTERACTION: The default is true
 *
 */

define('REPORT_INTERVAL', 5);
define('IDLE_TIMEOUT', 30);
define('NON_INTERACTION', true);

/*
 * DON'T EDIT BELOW THIS LINE
 */

function load_riveted() {
  wp_enqueue_script( 'riveted', plugins_url() . '/riveted/js/riveted.min.js', array(), '0.3', true );
  wp_localize_script( 'riveted', 'riveted_options', 
    array(
      'reportInterval' => REPORT_INTERVAL,
      'idleTimeout' => IDLE_TIMEOUT,
      'nonInteraction' => NON_INTERACTION
    )
  );
}

add_action('wp_enqueue_scripts', 'load_riveted');
