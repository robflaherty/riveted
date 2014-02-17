#!/bin/bash

# Minify
uglifyjs riveted.js -c -m --comments -o riveted.min.js

# Update WordPress plugin
cp ./riveted.min.js ./wp-plugin/Riveted/js/riveted-wp.js
cat ./wp-plugin/Riveted/js/init.js >> ./wp-plugin/Riveted/js/riveted-wp.js