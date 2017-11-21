const GardenConfig = {
    svgs: [
        {
            id: "cambridge",
            label: "Cambridge"
        },
        {
            id: "barlaslane",
            label: "Barlas Lane"
        }
    ]
};

GardenConfig.findLabel = function(id) {
    for (let i=0; i<GardenConfig.svgs.length; i++) {
        if (GardenConfig.svgs[i].id === id) {
            return GardenConfig.svgs[i].label;
        }
    }
};