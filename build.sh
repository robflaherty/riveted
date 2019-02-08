#!/bin/bash

# Minify
uglifyjs riveted.js -c -m --comments -o riveted.min.js

# Update WordPress plugin
cp ./riveted.min.js ./wp-plugin/riveted/js/riveted-wp.js
cat ./wp-plugin/riveted/js/init.js >> ./wp-plugin/riveted/js/riveted-wp.js
