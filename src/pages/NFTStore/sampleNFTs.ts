const sampleNFTs = [
    {
        name: "Aqua Avian",
        description: "A graceful water bird with vibrant plumage, known for its elegant flight over tranquil waters.",
        image: "ipfs://QmNgXC98g5ZfSXGwq4r5GqcPaJemHeJmHBX7LufrRzE7an/AquaAvian.png",
        attributes: [
            { trait_type: "Type", value: "Water" },
            { trait_type: "Element", value: "Air" },
            { trait_type: "Rarity", value: "Common" },
            { trait_type: "Level", value: 4 },
            { trait_type: "HP", value: 80 },
            { trait_type: "Attack", value: 60 },
            { trait_type: "Defense", value: 70 },
            { trait_type: "Special Ability", value: "Aqua Glide" },
            { trait_type: "Generation", value: 1 },
            { trait_type: "Owner", value: "" } // Owner value can be updated as needed
        ]
    },
    {
        name: "Vampire Jelly",
        description: "A small and timid creature, mostly relying on its blood-sucking ability.",
        image: "ipfs://QmNgXC98g5ZfSXGwq4r5GqcPaJemHeJmHBX7LufrRzE7an/.png",
        attributes: [
            { trait_type: "Type", value: "Vampire" },
            { trait_type: "Element", value: "Air" },
            { trait_type: "Rarity", value: "Common" },
            { trait_type: "Level", value: 1 },
            { trait_type: "HP", value: 120 },
            { trait_type: "Attack", value: 90 },
            { trait_type: "Defense", value: 80 },
            { trait_type: "Special Ability", value: "Life Drain" },
            { trait_type: "Generation", value: 1 },
            { trait_type: "Owner", value: "" }
        ]
    },
    {
        name: "Skysoar Pterosaur",
        description: "A majestic winged dinosaur that soars through the skies, commanding both awe and fear.",
        image: "ipfs://QmNgXC98g5ZfSXGwq4r5GqcPaJemHeJmHBX7LufrRzE7an/SkysoarPterosaur.png",
        attributes: [
            { trait_type: "Type", value: "Dinosaur" },
            { trait_type: "Element", value: "Wind" },
            { trait_type: "Rarity", value: "Rare" },
            { trait_type: "Level", value: 7 },
            { trait_type: "HP", value: 120 },
            { trait_type: "Attack", value: 85 },
            { trait_type: "Defense", value: 90 },
            { trait_type: "Special Ability", value: "Gale Force Dive" },
            { trait_type: "Generation", value: 2 },
            { trait_type: "Owner", value: "" }
        ]
    }

];

export default sampleNFTs;
