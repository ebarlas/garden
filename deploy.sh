#!/bin/bash

aws s3 cp . s3://www.barlasgarden.com/ --recursive --exclude "*" --include "*.js" --include "*.svg" --include "*.html" --include "*/twilight.png"