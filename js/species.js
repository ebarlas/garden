const GardenSpecies = {};

GardenSpecies.Type = {
    Shrub: "Shrub",
    Perennial: "Perennial",
    Grass: "Grass",
    Tree: "Tree",
    Succulent: "Succulent"
};

GardenSpecies.Catalog = [
    {
        id: "teu",
        scientificName: "Teucrium Chamaedrys",
        commonName: "Germander",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "pho",
        scientificName: "Phormium 'Yellow Wave'",
        commonName: "New Zealand Flax",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "lom",
        scientificName: "Lomandra longifolia Breeze",
        commonName: "Dwarf Mat Rush",
        type: GardenSpecies.Type.Grass
    },
    {
        id: "pen",
        scientificName: "Penstemon 'Garnet'",
        commonName: "Beard Tongue",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "lav",
        scientificName: "Lavandula angustifolia 'Hidcote'",
        commonName: "English Lavender",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "mey",
        scientificName: "Citrus limon 'Improved Meyer'",
        commonName: "Dwarf Meyer Lemon",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "ace",
        scientificName: "Acer palmatum 'Bloodgood'",
        commonName: "Japanese Maple 'Bloodgood'",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "ros",
        scientificName: "Rosmarinus officinalis 'Tuscan Blue'",
        commonName: "Upright Rosemary",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "tex",
        scientificName: "Ligustrum japonicum 'Texanum'",
        commonName: "Waxleaf Privet",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "gum",
        scientificName: "Liquidambar styraciflua",
        commonName: "Sweet Gum",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "ray",
        scientificName: "Fraxinus oxycarpa 'Raywood'",
        commonName: "Raywood Ash",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "icy",
        scientificName: "Cupressus sempervirens 'Glauca'",
        commonName: "Italian Cypress",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "lil",
        scientificName: "Hemerocallis",
        commonName: "Daylily",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "ses",
        scientificName: "Sesleria 'Greenlee'",
        commonName: "John Greenlee's Moor Grass",
        type: GardenSpecies.Type.Grass
    },
    {
        id: "ole",
        scientificName: "Olea europaea 'Montra'",
        commonName: "Little Olive",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "aga",
        scientificName: "Agave desmettiana 'Variegata'",
        commonName: "Variegated Dwarf Agave",
        type: GardenSpecies.Type.Succulent
    },
    {
        id: "rud",
        scientificName: "Rudbeckia fulgida sullivantii 'Goldsturm'",
        commonName: "Black-Eyed Susan",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "kar",
        scientificName: "Calamagrostis x acutiflora 'Karl Foerster'",
        commonName: "Feather Reed Grass",
        type: GardenSpecies.Type.Grass
    },
    {
        id: "eup",
        scientificName: "Euphorbia myrsinites",
        commonName: "Myrtle Spurge",
        type: GardenSpecies.Type.Succulent
    },
    {
        id: "zeb",
        scientificName: "Miscanthus sinensis 'Zebrinus'",
        commonName: "Zebra Grass",
        type: GardenSpecies.Type.Grass
    },
    {
        id: "ang",
        scientificName: "Angelicum Stonecrop",
        commonName: "Sedum angelicum",
        type: GardenSpecies.Type.Grass
    },
    {
        id: "cal",
        scientificName: "Eschscholzia californica",
        commonName: "California poppy",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "wen",
        scientificName: "Salvia 'Wendy's Wish'",
        commonName: "Wendy's Wish Sage",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "hea",
        scientificName: "Coleonema pulchellum 'Sunset Gold'",
        commonName: "Golden Breath of Heaven",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "pap",
        scientificName: "Achillea millefolium 'Paprika'",
        commonName: "Paprika Yarrow",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "ice",
        scientificName: "Delosperma nubigenum",
        commonName: "Hardy Yellow Ice Plant",
        type: GardenSpecies.Type.Succulent
    }
];

GardenSpecies.index = (function () {
    const index = {};
    for (let i = 0; i < GardenSpecies.Catalog.length; i++) {
        const s = GardenSpecies.Catalog[i];
        s.index = i;
        index[s.id] = s;
    }
    return index;
})();