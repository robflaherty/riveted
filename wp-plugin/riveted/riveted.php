<?php
/**
 * Plugin Name: Riveted
 * Plugin URI: http://projects.parsnip.io/riveted/
 * Description: A Google Analytics plugin for measuring active time
 * Version: 1.0
 * Author: Rob Flaherty
 * Author URI: http://parsnip.io
 * License: MIT
 */

/*
 * Admin Settings Menu
 */

if (is_admin()) {

  add_action('admin_menu', 'riveted_admin');
  add_action( 'admin_init', 'riveted_admin_init' );

  function riveted_admin() {
    add_options_page('Riveted', 'Riveted', 'administrator', 'riveted', 'riveted_admin_html');
  }

  function riveted_admin_init() {
    add_settings_section( 'riveted-main', 'Main Settings', 'main_callback', 'riveted' );

    add_settings_field( 'riveted_report_interval', 'Report Interval', 'riveted_report_callback', 'riveted', 'riveted-main' );
    add_settings_field( 'riveted_idle_timeout', 'Idle Timeout', 'riveted_idle_callback', 'riveted', 'riveted-main' );
    add_settings_field( 'riveted_noninteraction', 'Non-Interaction', 'riveted_noninteraction_callback', 'riveted', 'riveted-main' );

    register_setting( 'riveted-settings-group', 'riveted_report_interval' );
    register_setting( 'riveted-settings-group', 'riveted_idle_timeout' );
    register_setting( 'riveted-settings-group', 'riveted_noninteraction' );
  }

  function main_callback() {
    echo '<p>Visit the <a href="http://projects.parsnip.io/riveted/" target="_blank">Riveted site</a> for more information about the options.</p><p>If you have page caching enabled you\'ll probably need to clear the cache after making changes to these settings.</p>';
  }

  function riveted_report_callback() {
    $setting = esc_attr( get_option( 'riveted_report_interval' ) );
    echo "<input type='text' name='riveted_report_interval' value='$setting' /> (Default is 5)";
  }

  function riveted_idle_callback() {
    $setting = esc_attr( get_option( 'riveted_idle_timeout' ) );
    echo "<input type='text' name='riveted_idle_timeout' value='$setting' /> (Default is 30)";
  }

  function riveted_noninteraction_callback() {
    $setting = esc_attr( get_option( 'riveted_noninteraction' ) );
    echo "<input type='text' name='riveted_noninteraction' value='$setting' /> (Default is true)";
  }

  function riveted_admin_html() { ?>
    <div class="wrap">
      <h2>Riveted Options</h2>
      <form action="options.php" method="POST">
        <?php settings_fields( 'riveted-settings-group' ); ?>
        <?php do_settings_sections( 'riveted' ); ?>
        <?php submit_button(); ?>
      </form>
    </div>

  <?php }
}

/*
 * Load Riveted onto the page
 */

function load_riveted() {
  $report_interval = get_option("riveted_report_interval");
  $idle_timeout = get_option("riveted_idle_timeout");
  $noninteraction = get_option("riveted_noninteraction");

  $options = array();

  if (!empty($report_interval)) {
    $options['reportInterval'] = $report_interval;
  }
  if (!empty($idle_timeout)) {
    $options['idleTimeout'] = $idle_timeout;
  }
  if (!empty($noninteraction)) {
    $options['nonInteraction'] = $noninteraction;
  }

  //print_r($options);

  wp_enqueue_script( 'riveted', plugins_url() . '/riveted/js/riveted-wp.js', array(), '0.3', true );
  wp_localize_script( 'riveted', 'riveted_options', $options );
}

add_action('wp_enqueue_scripts', 'load_riveted');
