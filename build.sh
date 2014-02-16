#!/bin/bash
uglifyjs riveted.js -c -m --comments -o riveted.min.js

cp riveted.min.js wp-plugin/Riveted/js/riveted.min.js
cat wp-plugin/Riveted/js/riveted.min.js wp-plugin/Riveted/js/init.js > wp-plugin/Riveted/js/riveted.min.js