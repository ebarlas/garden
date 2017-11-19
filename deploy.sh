#!/bin/bash

aws s3 cp . s3://www.barlasgarden.com/v2/ --recursive --exclude "*" --include "*.js" --include "*.svg" --include "*.html"