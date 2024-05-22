#!/bin/bash

aws s3 cp . s3://barlasgarden/garden/ --recursive \
--exclude "*" \
--include "favicon*" \
--include "*.js" \
--include "*.json" \
--include "*.svg" \
--include "*.html" \
--include "*/twilight.png"  \
--include "*/moon-phase*.png"

aws cloudfront create-invalidation \
--distribution-id E55WEWI99JZUV \
--paths /garden/*