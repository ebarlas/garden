### Overview

Garden Explorer is a project for cataloging garden plants and presenting them in an interactive static website.

The central feature of the website is a graphical explorer that allows users to pan and zoom
around the garden and to display information about selected plant individuals.

Background property paths are sourced from an [SVG file](data/cambridge.svg) and all data related to plant species and individuals
is sources from a [JSON file](data/cambridge.json).

The website supports multiple garden properties, but at the time of this writing, only the `cambridge` property
is fully populated.

Garden data JSON files are organized as follows:
* Species, each with a unique identifier
* Plant individuals, each with a unique identifier and each with a species reference
* Events that outline the lifecycle of each individual

The state diagram below shows the valid states and transitions allowed by event entities:

```text
                            move,                                  
                            update,                                
                            observation                            
                              +-----+                              
                              |     |                              
                              |     |                              
                              |     |                              
+--------+     add,         +-+-----v-+                  +--------+
|        |     inherit      |         |      remove      |        |
|  init  +----------------->|  alive  +------------------+  dead  |
|        |                  |         |                  |        |
+--------+                  +---------+                  +--------+
```

