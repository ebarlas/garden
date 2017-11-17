const GardenSpecies = {};

GardenSpecies.Type = {
    Shrub: "Shrub",
    Perennial: "Perennial",
    Grass: "Grass",
    Tree: "Tree",
    Succulent: "Succulent",
    Fern: "Fern",
    Vine: "Vine"
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
        id: "ray",
        scientificName: "Fraxinus oxycarpa 'Raywood'",
        commonName: "Raywood Ash",
        type: GardenSpecies.Type.Tree
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
    },
    {
        id: "sto",
        scientificName: "Sedum spathulifolium 'Cape Blanco'",
        commonName: "Cape Blanco Stonecrop",
        type: GardenSpecies.Type.Succulent
    },
    {
        id: "aco",
        scientificName: "Acorus gramineus 'Ogon'",
        commonName: "Yellow-leaved Calamus",
        type: GardenSpecies.Type.Grass
    },
    {
        id: "sun",
        scientificName: "Choisya ternata 'Sundance'",
        commonName: "Sundance Mexican Orange Blossom",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "pur",
        scientificName: "Heuchera 'Purple Mountain Majesty'",
        commonName: "Coral Bells",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "bir",
        scientificName: "Betula papyrifera",
        commonName: "Paper Birch",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "max",
        scientificName: "Heuchera maxima",
        commonName: "Island Alum Root",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "fer",
        scientificName: "Polystichum polyblepharum",
        commonName: "Tassel Fern",
        type: GardenSpecies.Type.Fern
    },
    {
        id: "pit",
        scientificName: "Pittosporum tenuifolium 'Gold Star'",
        commonName: "Gold Star Kohuhu",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "cam",
        scientificName: "Campanula 'Dickson's Gold'",
        commonName: "Bellflower",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "haw",
        scientificName: "Rhaphiolepis indica 'Ballerina'",
        commonName: "Ballerina Indian Hawthorn",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "fra",
        scientificName: "Photinia x fraseri",
        commonName: "Fraser's Photinia",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "mon",
        scientificName: "Monarda 'Balmy Rose'",
        commonName: "Bee Balm",
        type: GardenSpecies.Type.Perennial
    },
    {
        id: "mim",
        scientificName: "Mimulus 'Jelly Bean White'",
        commonName: "White Monkeyflower",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "nec",
        scientificName: "Prunus persica 'Independence'",
        commonName: "Independence Nectarine",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "cli",
        scientificName: "Rosa 'New Dawn'",
        commonName: "New Dawn Climbing Rose",
        type: GardenSpecies.Type.Vine
    },
    {
        id: "cot",
        scientificName: "Cotoneaster Horizontalis",
        commonName: "Rock Cotoneaster",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "oli",
        scientificName: "Olea europaea 'Fruitless'",
        commonName: "Wilson Fruitless Olive",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "pis",
        scientificName: "Pistacia chinensis",
        commonName: "Chinese Pistachio",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "yan",
        scientificName: "Ceanothus griseus horizontalis",
        commonName: "Yankee Point Ceanothus",
        type: GardenSpecies.Type.Shrub
    },
    {
        id: "ley",
        scientificName: "Cupressocyparis leylandii",
        commonName: "Leyland Cypress",
        type: GardenSpecies.Type.Tree
    },
    {
        id: "elm",
        scientificName: "Ulmus parvifolia",
        commonName: "Chinese Elm",
        type: GardenSpecies.Type.Tree
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