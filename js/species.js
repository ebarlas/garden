const GardenSpecies = {};

GardenSpecies.Exposure = {
    FullSun: "Full sun",
    PartialSun: "Partial to full sun"
};

GardenSpecies.Type = {
    Shrub: "Shrub",
    Perennial: "Perennial",
    Grass: "Grass",
    Tree: "Tree"
};

GardenSpecies.WaterNeeds = {
    Low: "Low",
    Medium: "Medium",
    High: "High"
};

GardenSpecies.Catalog = [
    {
        id: "teu",
        scientificName: "Teucrium Chamaedrys",
        commonName: "Germander",
        width: {
            min: 2,
            max: 3
        },
        height: {
            min: 1,
            max: 2
        },
        zone: {
            min: 5,
            max: 10
        },
        type: GardenSpecies.Type.Shrub,
        evergreen: true,
        exposure: GardenSpecies.Exposure.FullSun,
        waterNeeds: GardenSpecies.WaterNeeds.Low,
        images: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb/Teucrium_chamaedrys.jpg"
            },
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb2/Teucrium_chamaedrys2.jpg"
            }
        ],
        references: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=1539"
            },
            {
                name: "Missouri Botanical Garden",
                url: "http://www.missouribotanicalgarden.org/PlantFinder/PlantFinderDetails.aspx?kempercode=f910"
            },
            {
                name: "Wikipedia",
                url: "https://en.wikipedia.org/wiki/Teucrium_chamaedrys"
            }
        ]
    },
    {
        id: "pho",
        scientificName: "Phormium 'Yellow Wave'",
        commonName: "New Zealand Flax",
        width: {
            min: 3,
            max: 4
        },
        height: {
            min: 3,
            max: 4
        },
        zone: {
            min: 8,
            max: 11
        },
        type: GardenSpecies.Type.Perennial,
        evergreen: true,
        exposure: GardenSpecies.Exposure.FullSun,
        waterNeeds: GardenSpecies.WaterNeeds.Medium,
        images: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb/phormiumyellowwave.jpg"
            },
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb2/Phormium_YellowWave2.jpg"
            }
        ],
        references: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=1274"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/plant-catalog/plants/767/yellow-wave-new-zealand-flax/"
            }
        ]
    },
    {
        id: "lom",
        scientificName: "Lomandra longifolia Breeze",
        commonName: "Dwarf Mat Rush",
        width: {
            min: 2,
            max: 4
        },
        height: {
            min: 2,
            max: 3
        },
        zone: {
            min: 8,
            max: 11
        },
        type: GardenSpecies.Type.Grass,
        evergreen: true,
        exposure: GardenSpecies.Exposure.PartialSun,
        waterNeeds: GardenSpecies.WaterNeeds.Medium,
        images: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb/Lomandra_Tankika.jpg"
            },
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb2/Lomandra_Tankika2.jpg"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/2872.jpg"
            }
        ],
        references: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=2763"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/plant-catalog/plants/2344/breeze-dwarf-mat-rush/"
            }
        ]
    },
    {
        id: "pen",
        scientificName: "Penstemon 'Garnet'",
        commonName: "Beard Tongue",
        width: {
            min: 1,
            max: 2
        },
        height: {
            min: 1,
            max: 2
        },
        type: GardenSpecies.Type.Perennial,
        evergreen: true,
        exposure: GardenSpecies.Exposure.PartialSun,
        waterNeeds: GardenSpecies.WaterNeeds.Medium,
        images: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb/PenstemonGarnet.jpg"
            }
        ],
        references: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=1218"
            }
        ]
    },
    {
        id: "lav",
        scientificName: "Lavandula angustifolia 'Hidcote'",
        commonName: "English Lavender",
        width: {
            min: 1,
            max: 2
        },
        height: {
            min: 1,
            max: 2
        },
        zone: {
            min: 5,
            max: 9
        },
        type: GardenSpecies.Type.Shrub,
        evergreen: true,
        exposure: GardenSpecies.Exposure.FullSun,
        waterNeeds: GardenSpecies.WaterNeeds.Low,
        images: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb/Lavandula_Hidcote.jpg"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/10466.jpg"
            }
        ],
        references: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=933"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/plant-catalog/plants/261/hidcote-blue-english-lavender/"
            }
        ]
    },
    {
        id: "mey",
        scientificName: "Citrus limon 'Improved Meyer'",
        commonName: "Dwarf Meyer Lemon",
        width: {
            min: 12,
            max: 12
        },
        height: {
            min: 8,
            max: 10
        },
        zone: {
            min: 9,
            max: 10
        },
        type: GardenSpecies.Type.Tree,
        evergreen: true,
        exposure: GardenSpecies.Exposure.FullSun,
        waterNeeds: GardenSpecies.WaterNeeds.Medium,
        images: [
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/770.jpg"
            }
        ],
        references: [
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/plant-catalog/plants/852/improved-meyer-lemon/"
            }
        ]
    },
    {
        id: "ace",
        scientificName: "Acer palmatum 'Bloodgood'",
        commonName: "Japanese Maple 'Bloodgood'",
        width: {
            min: 15,
            max: 15
        },
        height: {
            min: 15,
            max: 20
        },
        zone: {
            min: 5,
            max: 8
        },
        type: GardenSpecies.Type.Tree,
        evergreen: false,
        exposure: GardenSpecies.Exposure.PartialSun,
        waterNeeds: GardenSpecies.WaterNeeds.Medium,
        images: [
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/12617.jpg"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/3817.jpg"
            }
        ],
        references: [
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/plant-catalog/plants/26/bloodgood-japanese-maple/"
            }
        ]
    },
    {
        id: "ros",
        scientificName: "Rosmarinus officinalis 'Tuscan Blue'",
        commonName: "Upright Rosemary",
        width: {
            min: 4,
            max: 5
        },
        height: {
            min: 4,
            max: 6
        },
        zone: {
            min: 8,
            max: 11
        },
        type: GardenSpecies.Type.Shrub,
        evergreen: true,
        exposure: GardenSpecies.Exposure.FullSun,
        waterNeeds: GardenSpecies.WaterNeeds.Low,
        images: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/imagedb/Rosmarinus_Tuscan_Blue.jpg"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/7553.jpg"
            }
        ],
        references: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?strSearchText=rosmarinus&plant_id=1397"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/plant-catalog/plants/2068/tuscan-blue-rosemary/"
            }
        ]
    },
    {
        id: "tex",
        scientificName: "Ligustrum japonicum 'Texanum'",
        commonName: "Waxleaf Privet",
        width: {
            min: 4,
            max: 6
        },
        height: {
            min: 6,
            max: 8
        },
        zone: {
            min: 7,
            max: 11
        },
        type: GardenSpecies.Type.Shrub,
        evergreen: true,
        exposure: GardenSpecies.Exposure.PartialSun,
        waterNeeds: GardenSpecies.WaterNeeds.Medium,
        images: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=994"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/5678.jpg"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/wp-content/uploads/plants/details/5679.jpg"
            }
        ],
        references: [
            {
                name: "San Marcos Growers",
                url: "https://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=994"
            },
            {
                name: "Monrovia",
                url: "http://www.monrovia.com/plant-catalog/plants/1794/waxleaf-privet/"
            }
        ]
    },
    {
        id: "gum",
        scientificName: "Liquidambar styraciflua",
        commonName: "Sweet Gum"
    }
];