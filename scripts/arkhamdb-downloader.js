const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const URL = 'https://arkhamdb.com/api/public/cards/';
const OUTPUT_DIR = path.join(__dirname, '../public/assets');

async function run() {

    const response = await fetch(URL);
    const cards = await response.json();

    const basicWeaknesses = cards
        .filter(card => card.subtype_code === 'basicweakness')
        .filter(card => card.code != '01000') // filter random weakness
        .filter(card => card.pack_code != 'rcore') // filter revisded core
        .sort((a, b) => a.code.localeCompare(b.code));

    // JSON 1: basic_weaknesses.json with selected fields and split traits
    const filtered = basicWeaknesses.map(card => ({
        pack_code: card.pack_code,
        imagesrc: "https://arkhamdb.com/" + card.imagesrc,
        name: card.name,
        position: card.position,
        traits: card.traits
            ? card.traits.split('.').map(t => t.trim()).filter(Boolean)
            : []
    }));

    console.log('found ', filtered.length, ' weaknesses');


    const packsMap = {};
    for (const card of basicWeaknesses) {
        if (card.pack_name && card.pack_code && !packsMap[card.pack_code]) {
            packsMap[card.pack_code] = card.pack_name;
        }
    }

    // JSON 3: traits.json using the already-parsed `traits` arrays
    const traitSet = new Set();
    filtered.forEach(entry => {
        entry.traits.forEach(trait => traitSet.add(trait));
    });

    const traitArray = Array.from(traitSet).sort();

    // Write the output files
    fs.writeFileSync(path.join(OUTPUT_DIR, 'basic_weaknesses.json'), JSON.stringify(filtered, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'packs.json'), JSON.stringify(packsMap, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'traits.json'), JSON.stringify(traitArray, null, 2));

    console.log('✅ All JSON files have been written to /src/assets');
}

console.log('Start download');

run().catch(err => {
    console.error('❌ Error during build:', err);
    process.exit(1);
});
