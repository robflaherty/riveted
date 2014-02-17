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

/* Puts code on Wordpress pages */
//add_action('wp_footer', 'crazyegg_tracking_code');

/* Runs when plugin is activated */
register_activation_hook(__FILE__, 'riveted_install');

/* Runs on plugin deactivation*/
register_deactivation_hook(__FILE__, 'riveted_remove' );

function riveted_install() {
  /* Creates new database field */
  add_option("riveted_report_interval", '', '', 'yes');
  add_option("riveted_idle_timeout", '', '', 'yes');
  add_option("riveted_noninteraction", '', '', 'yes');
}

function riveted_remove() {
  /* Deletes the database field */
  delete_option("riveted_report_interval");
  delete_option("riveted_idle_timeout");
  delete_option("riveted_noninteraction");
}

if (is_admin()) {
  /* Call the html code */
  add_action('admin_menu', 'riveted_admin');

  function riveted_admin() {
    add_options_page('Riveted', 'Riveted', 'administrator', 'riveted', 'riveted_admin_html');
  }
}



function riveted_admin_html() { ?>
<div class="wrap">
  <div id="icon-plugins" class="icon32"></div>
  <h2>Riveted</h2>
  <form method="POST" action="options.php">
    <?php wp_nonce_field('update-options'); ?>
    <table class="form-table">
      <tr valign="top">
        <th scope="row">
          <label for="">Report Interval</label>
        </th>
        <td>
          <input id="rivete_report_interval" name="riveted_report_interval" value="<?php echo get_option('riveted_report_interval'); ?>" class="regular-text" />
          <span class="description">(Default is 10)</span>
        </td>
      </tr>
      <tr valign="top">
        <th scope="row">
          <label for="">Idle Timeout</label>
        </th>
        <td>
          <input id="riveted_idle_timeout" name="riveted_idle_timeout" value="<?php echo get_option('riveted_idle_timeout'); ?>" class="regular-text" />
          <span class="description">(Default is 30)</span>
        </td>
      </tr>
      <tr valign="top">
        <th scope="row">
          <label for="">Non-Interaction</label>
        </th>
        <td>
          <input id="riveted_noninteraction" name="riveted_noninteraction" value="<?php echo get_option('riveted_noninteraction'); ?>" class="regular-text" />
          <span class="description">(Default is True)</span>
        </td>
      </tr>
    </table>
    <p>Riveted settings</p>
    <input type="hidden" name="action" value="update" />
    <input type="hidden" name="page_options" value="riveted_report_interval,riveted_idle_timeout,riveted_noninteraction" />

    <p class="submit">
      <input class="button-primary" type="submit" name="Save" value="<?php _e('Save'); ?>" />
    </p>
  </form>
</div>
<?php }


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

  wp_enqueue_script( 'riveted', plugins_url() . '/riveted/js/riveted.min.js', array(), '0.3', true );
  wp_localize_script( 'riveted', 'riveted_options',
    /*array(
      'reportInterval' => REPORT_INTERVAL,
      'idleTimeout' => IDLE_TIMEOUT,
      'nonInteraction' => NON_INTERACTION
    )
    */
    $options
  );
}

add_action('wp_enqueue_scripts', 'load_riveted');
