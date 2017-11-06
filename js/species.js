const GardenSpecies = {};

GardenSpecies.Exposure = {
    FULL_SUN: {
        description: "Full sun"
    },
    PARTIAL_TO_FULL_SUN: {
        description: "Partial to full sun"
    },
    SUN_OR_SHADE: {
        description: "Sun or shade"
    }
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
        evergreen: true,
        exposure: GardenSpecies.Exposure.FULL_SUN,
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
        commonName: "New Zealand Flax"
    },
    {
        id: "lom",
        scientificName: "Lomandra longifolia Breeze",
        commonName: "Dwarf Mat Rush"
    },
    {
        id: "pen",
        scientificName: "Penstemon 'Garnet'",
        commonName: "Beard Tongue"
    },
    {
        id: "lav",
        scientificName: "Lavandula angustifolia 'Hidcote'",
        commonName: "English Lavender"
    },
    {
        id: "mey",
        scientificName: "Citrus limon 'Improved Meyer'",
        commonName: "Dwarf Meyer Lemon"
    },
    {
        id: "ace",
        scientificName: "Acer palmatum 'Bloodgood'",
        commonName: "Japanese Maple 'Bloodgood'"
    },
    {
        id: "ros",
        scientificName: "Rosmarinus officinalis 'Tuscan Blue'",
        commonName: "Upright Rosemary"
    },
    {
        id: "tex",
        scientificName: "Ligustrum japonicum 'Texanum'",
        commonName: "Waxleaf Privet"
    },
    {
        id: "gum",
        scientificName: "Liquidambar styraciflua",
        commonName: "Sweet Gum"
    }
];