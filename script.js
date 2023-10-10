'use strict';

const aspects = ['lantern', 'heart', 'forge', 'moth', 'grail', 'moon', 'sky', 'edge', 'winter', 'nectar',
                 'scale', 'knock', 'rose',
                 'memory', 'sound', 'material', 'omen', 'mark', 'persistent', 'leaf', 'flower', 'beverage',
                 'sustenance', 'ink', 'pigment', 'glass', 'stone', 'metal', 'soul', 'skill', 'liquid', 'remains',
                 'fabric', 'assistance', 'unknown', 'weather', 'fruit', 'root', 'tool', 'device', 'lens', 'wood',
                 'fuel'];
const nonBinaryAspects = [
    'lantern', 'heart', 'forge', 'moth', 'grail', 'moon', 'sky', 'edge', 'winter', 'nectar',
    'scale', 'knock', 'rose'
]

class Item {
    /**
     * An item.
     * @param {string} name
     * @param {string} notes
     * @param {Object.<string, number>} itemAspects
     */
    constructor(name, notes, itemAspects = {}) {
        this.name = name;
        this.notes = notes;
        this.aspects = Object.fromEntries(aspects.map(a => [a, itemAspects[a] || 0]));
    }
}

class Recipe {
    /**
     * A recipe
     * @param {string} result
     * @param {string} description
     */
    constructor(result, description) {
        this.result = result;
        this.description = description;
    }
}

class CraftingRecipe extends Recipe {
    constructor(result, skill, aspect, quantity, extra = '') {
        super(result, `${skill} with :${aspect}: ${quantity}${extra ? ' ' + extra : ''}`);
        this.skill = skill;
        this.aspect = aspect.toLowerCase();
        this.quantity = quantity;
        this.extra = extra;
    }
}

/** @type [Item] */
let items = [
    new Item('Taste', '', {grail: 1, memory: 1}),
    new Item('Touch', '', {forge: 1, memory: 1}),
    new Item('Scent', '', {nectar: 1, memory: 1}),
    new Item('Solace', '', {heart: 2, sky: 1, memory: 1}),
    new Item('Salt', '', {knock: 1, moon: 1, winter: 1, memory: 1}),
    new Item('Regret', '', {winter: 2, forge: 1, memory: 1}),
    new Item('Hindsight', '', {winter: 2, scale: 1, memory: 1}),
    new Item('Foresight', '', {forge: 2, lantern: 1, memory: 1}),
    new Item('Memory: Storm', '', {heart: 2, sky: 2, memory: 1}),
    new Item('Gossip', '', {rose: 2, grail: 1, memory: 1}),
    new Item('Intuition', '', {moon: 2, rose: 2, memory: 1}),
    new Item('Contradiction', '', {edge: 2, moon: 1, memory: 1}),
    new Item('Impulse', '', {moth: 2, nectar: 1, memory: 1}),
    new Item('A Stolen Secret', '', {moon: 2, knock: 1, memory: 1}),
    new Item('Revelation', '', {lantern: 2, memory: 1}),
    new Item('Fear', '', {scale: 2, edge: 1, memory: 1}),
    new Item('Savage Hymn', '', {scale: 2, sky: 2 , memory: 1, sound: 1}),
    new Item('Coffinmaker', 'Can use :wood: wood', {winter: 2, sky: 1, assistance: 1}),
    new Item('Midwife', '', {grail: 2, heart: 1, assistance: 1}),
    new Item('Rector', 'Can use :light: light?', {lantern: 2, knock: 1, assistance: 1}),
    new Item('Blacksmith', 'Can use :metal: metal', {edge: 2, forge: 2, assistance: 1}),
    new Item('Sunny', '', {lantern: 2, sky: 2, memory: 1, weather: 1}),
    new Item('Rain', '', {grail: 2, nectar: 2, memory: 1, weather: 1}),
    new Item('Clouds', '', {moth: 1, moon: 1, memory: 1, weather: 1}),
    new Item('Hail', '', {edge: 3, sky: 3, memory: 1, weather: 1}),
    new Item('Fog', '', {moon: 3, knock: 3, memory: 1, weather: 1}),
    new Item('Storm', '', {heart: 4, sky: 4, memory: 1, weather: 1}),
    new Item('Snow', '', {winter: 3, sky: 3, memory: 1, weather: 1}),
    new Item('Gale', '', {heart: 3, sky: 3, memory: 1, weather: 1}),
    new Item('Eigengrau', '', {moon: 1, winter: 1 , beverage: 1}),
    new Item('Regensburg Balm', '', {heart: 2, nectar: 2 , liquid: 1}),
    new Item('Cheerful Ditty', '', {heart: 2, sky: 1 , memory: 1, sound: 1}),
    new Item('Thunderskin\'s Paean', '', {heart: 4, scale: 1, grail: 1 , memory: 1, sound: 1}),
    new Item('Bittersweet Certainty', '', {winter: 2, lantern: 1 , memory: 1, sound: 1}),
    new Item('Westcott\'s Compounds', '', {nectar: 1, moth: 1, lantern: 1, grail: 1, forge: 2 , material: 1}),
    new Item('Awakened Feather', '', {sky: 2, scale: 1 , material: 1, remains: 1}),
    new Item('Witching Tisane', '', {grail: 2, heart: 1 , beverage: 1, liquid: 1}),
    new Item('Bitterblack Salts', '', {forge: 1 , material: 1, pigment: 1}),
    new Item('Wistful Air', '', {rose: 2, sky: 2 , memory: 1, sound: 1}),
    new Item('Bisclavret\'s Knot', '', {scale: 2, moth: 1 , mark: 1}),
    new Item('Tanglebrag', '', {moth: 2, nectar: 1, lantern: 1, scale: 1 , material: 1}),
    new Item('Perhibiate', '', {heart: 2, lantern: 2, scale: 2, winter: 1 , liquid: 1, ink: 1}),
    new Item('Frith-Weft', 'makes Swaddled Thunder', {heart: 3 , fabric: 1}),
    new Item('Refulgin', '', {lantern: 2 , material: 1, pigment: 1}),
    new Item('Ichor Vitreous', ' makes Ashartine', {lantern: 4 , material: 1, pigment: 1}),
    new Item('Earth-Sign', '', {scale: 2, nectar: 2, memory: 1, omen: 1, persistent: 1}),
    new Item('Pattern', '', {knock: 2, forge: 1, memory: 1}),
    new Item('Yewgall Ink', '', {nectar: 2, liquid: 1, ink: 1}),
    new Item('Pyrus Auricalcinus', 'Precursor to Sacrament Malachite', {nectar: 4, forge: 4, sustenance: 1, fruit: 1}),
    new Item('Beguiling Melody', '', {grail: 2, sky: 2 , memory: 1, sound: 1}),
    new Item('Old Wound', '', {winter: 3, moon: 2, edge: 1, memory: 1, persistent: 1}),
    new Item('Secret Threshold', '', {knock: 2, rose: 1, memory: 1}),
    new Item('Torgue\'s Cleansing', '', {edge: 2, memory: 1}),
    new Item('Confounding Parable', '', {moon: 2, rose: 2, sky: 2, memory: 1}),
    new Item('Satisfaction', '', {grail: 2, heart: 1, memory: 1}),
    new Item('Ascendant Harmony', '', {lantern: 2, sky: 4, sound: 1, memory: 1}),
    new Item('Wind-Rumour', '', {sky: 2, heart: 4, omen: 1, memory: 1}),
    new Item('Old Moment', 'used for Earthquake Name with 15 :scale: scale', {lantern: 2, scale: 4, moth: 2, memory: 1}),

    new Item('Salt-Sign', '', {moon: 2, rose: 2, mark: 1}),
    new Item('Essential Periost', 'Precursor to Year-Tally', {moon: 2, nectar: 4, scale: 4, winter: 4, remains: 1}),
    new Item('Year-Tally', '', {winter: 6, mark: 1}),
    new Item('Labhitic Tincture', '', {edge: 2, lantern: 1, material: 1}),
    new Item('Catwink', '', {moon: 2, scale: 2, liquid: 1, ink: 1}),
    new Item('Midnight Mark', '', {moon: 2, moth: 1, mark: 1}),
    new Item('Catsclaw', '', {edge: 2, heart: 1, nectar: 1, leaf: 1}),
    new Item('Trumpeter\'s Lily', '', {sky: 2, heart: 1, nectar: 1, flower: 1, fuel: 1}),
    new Item('Sea Holly', '', {moon: 1, winter: 1, nectar: 1, flower: 1}),
    new Item('Blue Crown', '', {sky: 2, winter: 2, nectar: 1, flower: 1}),
    new Item('Bowl of Sea-Blest Pears', '', {moon: 1, grail: 1, nectar: 1, fruit: 1, sustenance: 1}),
    new Item('Honeyscar Jasmine', '', {forge: 2, nectar: 2, rose: 1, flower: 1}),
    new Item('Moth Orchids', '', {knock: 2, nectar: 1, moth: 1, flower: 1}),
    new Item('Fragrant Chalice', '', {grail: 2, nectar: 1, flower: 1}),
    new Item('Moth-Gold', '', {moth: 2, liquid: 1, pigment: 1}),
    new Item('Isle-Water', '', {heart: 1, moon: 1, winter: 1, liquid: 1, beverage: 1}),
    new Item('Solomon\'s Preparation', 'Precursor to Nillycant', {winter: 4, moon: 1, moth: 1, liquid: 1, beverage: 1}),
    new Item('Amethyst Ampoule', '', {heart: 2, knock: 2, liquid: 1, glass: 1}),
    new Item('Gideon\'s Soaks', '', {heart: 4, nectar: 3, winter: 2, forge: 2, liquid: 1}),
    new Item('Mist-Kissed Water', '', {knock: 2, moon: 2, winter: 1, heart: 1, liquid: 1, beverage: 1}),
    new Item('Moly', '', {heart: 1, nectar: 1, moon: 2, moth: 2, scale: 2, sustenance: 1, root: 1}),
    new Item('Aglaophotis', '', {heart: 2, knock: 2, lantern: 2, rose: 2, nectar: 1, flower: 1}),
    new Item('Dearday Lens', '', {sky: 2, lantern: 2, forge: 1, edge: 1, tool: 1, device: 1, lens: 1, glass: 1}),
    new Item('Hen\'s Egg', '', {heart: 1, scale: 1, sustenance: 1, egg: 1}),
    new Item('Bunch of Grapes', '', {nectar: 1, sustenance: 1, fruit: 1}),
    new Item('Beeswax', '', {moth: 1, scale: 1, material: 1, fuel: 1}),
    new Item('Honey', '', {moth: 1, heart: 1, nectar: 1, sustenance: 1, liquid: 1}),
    new Item('Cuckoo-Honey', '', {moth: 3, heart: 1, nectar: 2, scale: 3, edge: 2, sustenance: 1, liquid: 1}),
    new Item('Sack of Vegetables', '', {heart: 1, nectar: 1, sustenance: 1}),
    new Item('Xanthotic Essence', 'precursor to the Great Ink Uzult', {forge: 2, knock: 2, lantern: 5, liquid: 1, pigment: 1}),
    new Item('Leathy', 'precursor to a great ink', {grail: 2, nectar: 2, moth: 4, scale: 2, liquid: 1, beverage: 1}),
    new Item('Perinculate', 'precursor to Serpent-Milk', {edge: 4, scale: 4, liquid: 1, ink: 1}),
    new Item('Lenten Rose', '', {grail: 1, nectar: 1, rose: 2, flower: 1}),
    new Item('Uzult', '', {lantern: 7, moth: 7, sky: 7, liquid: 1, ink: 1, encaustum: 1}),
    new Item('Glassfinger Toxin', 'precursor to Sacrament Ascite with 15 :moon: moon and Serpents & Venoms', {lantern: 2, knock: 4, forge: 2, liquid: 1}),
    new Item('Rubywise Ruin', 'precursor to Sacrament Calicite', {grail: 4, heart: 2, moth: 2, nectar: 2, rose: 2, liquid: 1, beverage: 1}),
    new Item('Asimel', '', {knock: 3, moon: 5, liquid: 1, ink: 1}),
    new Item('Ichor Auroral', 'Precursor to Porphyrine with :rose: 15', {lantern: 4, rose: 2, liquid: 1, pigment: 1}),
    new Item('Curious Hunch', '', {heart: 3, knock: 4, lantern: 3, moth: 3, memory: 1, omen: 1}),
    new Item('Nameday Riddle', '', {moth: 3, knock: 2, memory: 1}),
    new Item('Beeswax Candle', '', {lantern: 1, candle: 1, light: 1, fuel: 1}),
    new Item('Moth-Orchid-Scented Candle', '', {knock: 2, moth: 1, candle: 1, light: 1, fuel: 1}),
    new Item('Honeyscar-Scented Candle', '', {forge: 2, rose: 1, candle: 1, light: 1, fuel: 1}),
    new Item('Aglaphotis-Scented Candle', '', {knock: 2, lantern: 2, heart: 2, rose: 2, candle: 1, light: 1, fuel: 1}),
    new Item('Nillycant', '', {edge: 7, scale: 7, winter: 7, liquid: 1, ink: 1, encaustum: 1}),
    new Item('Winning Move', 'precursor to Invincible Audacity', {edge: 3, memory: 1}),
    new Item('Enduring Reflection', '', {rose: 3, knock: 1, heart: 1, memory: 1}),
    new Item('Orchard-Keeper', '', {nectar: 2, heart: 1, assistance: 1}),
    new Item('Elegiac Poet', 'Can use :flower: flowers', {moth: 4, sky: 4, winter: 4, assistance: 1}),
    new Item('Consulting Engineer', 'Can use :fuel: fuels', {forge: 4, sky: 4, lantern: 4, assistance: 1}),
    new Item('Sister of the Triple Knot', 'Can use :omen: omens', {knock: 4, moon: 4, grail: 4, assistance: 1}),
    new Item('Musician', '', {sky: 4, rose: 4, nectar: 4, assistance: 1}),
    new Item('Surrealist Painter', 'Can use :pigment: pigments', {grail: 4, moth: 4, rose: 4, assistance: 1}),
    new Item('Fugitive', '', {scale: 4, edge: 4, heart: 4, assistance: 1}),
    new Item('Gervinite', '', {knock: 4, rose: 2, material: 1, metal: 1}),
    new Item('Orichalcum', '', {forge: 4, lantern: 1, material: 1, metal: 1}),
    new Item('Wormwood Dream', 'has "evolve with nyctodromy" and "evolve with skolekosophy"', {winter: 6, moon: 6, edge: 3, memory: 1, omen: 1}),
    new Item('Horizon-Sight', 'evolves Hushery', {rose: 4, memory: 1, persistent: 1}),
    new Item('Phosphorescent Scrapings', '', {moon: 2, nectar: 2, remains: 1, material: 1}),
    new Item('Sea-Glass', '', {moon: 1, lantern: 1, glass: 1, material: 1}),
    new Item('Perilous Imago', '', {knock: 2, moon: 2, moth: 6, scale: 2, beast: 1}),
    new Item('Hive\'s Lament', 'evolves Bosk', {moth: 2, nectar: 4, winter: 2, memory: 1, persistent: 1, sound: 1}),
];
for (let item of items) {
    for (let aspect in item.aspects) {
        console.assert(aspects.includes(aspect));
    }
}

/** @type [Recipe] */
let recipes = [
    new Recipe('Solace', 'Talk with dog'),
    new Recipe('Solace', 'Talk with cat'),
    new Recipe('Old Moment', 'Talk with Living Relic'),
    new Recipe('Wind-Rumour', 'Talk with Gull'),
    new Recipe('Earth-Sign', 'Talk with snake'),
    new Recipe('Fear', 'Talk with Chimeric Larva'),
    new Recipe('Gossip', 'Talk with Cockatoo'),
    new Recipe('Horizon-Sight', 'Talk with Stymphling'),
    new Recipe('Hive\'s Lament', 'Talk with Perilous Imago'),
    new Recipe('Taste', 'Drink (or eat?)'),
    new Recipe('Touch', 'Inspect cat'),
    new Recipe('Touch', 'Analyze quartz'),
    new Recipe('Scent', 'Dissect some plants'),
    new Recipe('Salt', 'Analyze sand'),
    new Recipe('Regret', 'Read The Five Letters on Memory'),
    new Recipe('Hindsight', 'Read An Introduction to Histories'),
    new Recipe('Foresight', 'Read Vinzant\'s Minglings'),
    new Recipe('Memory: Storm', 'Read What does not Bark'),
    new Recipe('Gossip', 'Read Kerisham Portolam'),
    new Recipe('Intuition', 'Talk with midwife or coffinmaker'),
    new Recipe('Contradiction', 'Read Those Indignities Perpetrated by the Deceitful Fraternity of Obliviates'),
    new Recipe('Impulse', 'Read A True and Complete Accounting of the Asclepian Mysteries of the Roots of the House (a)'),
    new Recipe('A Stolen Secret', 'Talk with midwife'),
    new Recipe('Revelation', 'Read Letters to my Successor'),
    new Recipe('Savage Hymn', 'Read Singlefoot Songs'),
    new Recipe('Cheerful Ditty', 'Read Perugian Diaries'),
    new Recipe('Coffinmaker', 'Use :winter: at his house'),
    new Recipe('Midwife', 'Use :grail: at her house'),
    new Recipe('Rector', '1 Shilling'),
    new Recipe('Blacksmith', '1 Shilling'),
    new Recipe('Sunny', 'In Spring and Summer'),
    new Recipe('Rain', 'In Spring, Summer and Autumn'),
    new Recipe('Clouds', 'In Spring and Autumn'),
    new Recipe('Hail', 'In Autumn'),
    new Recipe('Fog', 'In Autumn and Winter'),
    new Recipe('Storm', 'In Autumn and Winter'),
    new Recipe('Snow', 'In Winter'),
    new Recipe('Gale', 'In Spring and Autumn'),
    new Recipe('Catsclaw', 'Physic Garden in Spring'),
    new Recipe('Trumpeter\'s Lily', 'Physic Garden in Summer'),
    new Recipe('Sea Holly', 'St. Brandan\'s Cloister Garden in Summer'),
    new Recipe('Blue Crown', 'St. Brandan\'s Cloister Garden in Winter'),
    new Recipe('Bowl of Sea-Blest Pears', 'Practic Garden in Summer and Autumn'),
    new Recipe('Honeyscar Jasmine', 'Scent Garden in Autumn'),
    new Recipe('Moth Orchids', 'Scent Garden in Spring and Summer'),
    new Recipe('Fragrant Chalice', 'Scent Garden in Summer'),
    new Recipe('Lenten Rose', 'Scent Garden in Winter'),
    new Recipe('Moly', 'Scent Garden in Numa'),
    new Recipe('Aglaophotis', 'Physic Garden in Numa'),
    new Recipe('Isle-Water', 'Draw from well'),
    new Recipe('Mist-Kissed Water', 'Draw from well in Numa'),
    new Recipe('Hen\'s Egg', 'Talk with Terrence or Tuppence'),
    new Recipe('Bunch of Grapes', 'Kitchen Garden in Spring and Summer'),
    new Recipe('Sack of Vegetables', 'Kitchen Garden in Summer and Autumn'),
    new Recipe('Beeswax', 'Beehive'),
    new Recipe('Honey', 'Beehive'),
    new Recipe('Cuckoo-Honey', 'Beehive in Numa'),
    new Recipe('Regret', 'Beehive in Winter'),
    new Recipe('Orchard-Keeper', '1 Shilling in Autumn'),
    new Recipe('Elegiac Poet', '2 Shillings'),
    new Recipe('Consulting Engineer', '2 Shillings'),
    new Recipe('Sister of the Triple Knot', '2 Shillings'),
    new Recipe('Pyrus Auricalcinus', 'Practic Garden in Numa'),
    new Recipe('Musician', '2 Shillings'),
    new Recipe('Surrealist Painter', '2 Shillings'),
    new Recipe('Phosphorescent Scrapings', 'Sea-Caves'),
    new Recipe('Sea-Glass', 'Sea-Caves'),
    
    new CraftingRecipe('Eigengrau', 'Quenchings & Quellings', 'winter', 5),
    new CraftingRecipe('Solomon\'s Preparation', 'Quenchings & Quellings', 'winter', 10, 'and a :flower: flower'),
    new CraftingRecipe('Regensburg Balm', 'Quenchings & Quellings', 'heart', 5),
    new CraftingRecipe('Gideon\'s Soaks', 'Quenchings & Quellings', 'heart', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Savage Hymn', 'Drums & Dances', 'nectar', 5),
    new CraftingRecipe('Cheerful Ditty', 'Drums & Dances', 'heart', 5),
    new CraftingRecipe('Thunderskin\'s Paean', 'Drums & Dances', 'heart', 10, 'at an :instrument: instrument'),
    new CraftingRecipe('Bittersweet Certainty', 'Rhyme & Remembrance', 'winter', 5),
    new CraftingRecipe('Westcott\'s Compounds', 'Sacra Limiae', 'moth', 5),
    new CraftingRecipe('Nameday Riddle', 'Sacra Limiae', 'moth', 10, 'and a :memory: memory'),
    new CraftingRecipe('Awakened Feather', 'Sacra Limiae', 'sky', 5),
    new CraftingRecipe('Witching Tisane', 'Sea Stories', 'grail', 5),
    new CraftingRecipe('Bitterblack Salts', 'Bells & Brazeries', 'forge', 5),
    new CraftingRecipe('Wistful Air', 'Bells & Brazeries', 'sky', 5),
    new CraftingRecipe('Ascendant Harmony', 'Bells & Brazieries', 'sky', 10, 'at an :instrument: instrument'),
    new CraftingRecipe('Wistful Air', 'Strings & Songs', 'sky', 5),
    new CraftingRecipe('Ascendant Harmony', 'Strings & Songs', 'sky', 10, 'at an :instrument: instrument, probably'),
    new CraftingRecipe('Cheerful Ditty', 'Strings & Songs', 'heart', 5),
    new CraftingRecipe('Thunderskin\'s Paean', 'Strings & Songs', 'heart', 10, 'at an :instrument: instrument'),
    new CraftingRecipe('Awakened Feather', 'Anbary & Lapidary', 'sky', 5),
    new CraftingRecipe('Awakened Feather', 'Furs & Feathers', 'sky', 5),
    new CraftingRecipe('Ascendant Harmony', 'Furs & Feathers', 'sky', 10, 'at an :instrument: instrument, probably'),
    new CraftingRecipe('Bisclavret\'s Knot', 'Furs & Feathers', 'scale', 5),
    new CraftingRecipe('Tanglebrag', 'Weaving & Knotworking', 'moth', 5),
    new CraftingRecipe('Nameday Riddle', 'Weaving & Knotworking', 'moth', 10, 'and a :memory: memory'),
    new CraftingRecipe('Perhibiate', 'Weaving & Knotworking', 'heart', 5),
    new CraftingRecipe('Frith-Weft', 'Weaving & Knotworking', 'heart', 10, 'and :fabric: fabric'),
    new CraftingRecipe('Regensburg Balm', 'Edicts Inviolable', 'heart', 5),
    new CraftingRecipe('Gideon\'s Soaks', 'Edicts Inviolable', 'heart', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Bisclavret\'s Knot', 'Wolf Stories', 'scale', 5),
    new CraftingRecipe('Old Moment', 'Wolf Stories', 'scale', 10, 'and a :memory: memory'),
    new CraftingRecipe('Regensburg Balm', 'Maggephene Mysteries', 'heart', 5),
    new CraftingRecipe('Gideon\'s Soaks', 'Maggephene Mysteries', 'heart', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Refulgin', 'Inks of Revelation', 'lantern', 5),
    new CraftingRecipe('Ichor Vitreous', 'Inks of Revelation', 'lantern', 10, 'and :glass: glass'),
    new CraftingRecipe('Uzult', 'Inks of Revelation', 'lantern', 15, 'and xanthotic essence'),
    new CraftingRecipe('Awakened Feather', 'Sights & Sensations', 'sky', 5),
    new CraftingRecipe('Ichor Auroral', 'Sights & Sensations', 'sky', 10, 'and a :light: light'),
    new CraftingRecipe('Yewgall Ink', 'Leaves & Thorns', 'nectar', 5),
    new CraftingRecipe('Pyrus Auricalcinus', 'Leaves & Thorns', 'nectar', 10, 'and :wood: wood'),
    new CraftingRecipe('Beguiling Melody', 'Resurgences & Emergences', 'grail', 5),
    new CraftingRecipe('Salt-Sign', 'Path & Pilgrim', 'rose', 5),
    new CraftingRecipe('Essential Periost', 'Rhyme & Remembrance', 'winter', 10, 'and :remains: remains'),
    new CraftingRecipe('Year-Tally', 'Rhyme & Remembrance', 'winter', 15, 'and Essential Periost'),
    new CraftingRecipe('Labhitic Tincture', 'Sickle & Eclipse', 'edge', 5),
    new CraftingRecipe('Catwink', 'Sickle & Eclipse', 'moon', 5),
    new CraftingRecipe('Essential Periost', 'Sickle & Eclipse', 'moon', 10, 'and :remains: remains'),
    new CraftingRecipe('Midnight Mark', 'Rhyme & Remembrance', 'moon', 5),
    new CraftingRecipe('Essential Periost', 'Rhyme & Remembrance', 'moon', 10, 'and :remains: remains'),
    new CraftingRecipe('Salt-Sign', 'Sea Stories', 'moon', 5),
    new CraftingRecipe('Asimel', 'Sea Stories', 'moon', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Moth-Gold', 'Inks of Revelation', 'moth', 5),
    new CraftingRecipe('Asimel', 'Inks of Revelation', 'moth', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Eigengrau', 'Maggephene Mysteries', 'moon', 5),
    new CraftingRecipe('Old Wound', 'Edicts Martial', 'moon', 5),
    new CraftingRecipe('Wormwood Dream', 'Edicts Martial', 'moon', 10, 'and a :memory: memory'),
    new CraftingRecipe('Labhitic Tincture', 'Edicts Martial', 'edge', 5),
    new CraftingRecipe('Catwink', 'Edicts Inviolable', 'moon', 5),
    new CraftingRecipe('Midnight Mark', 'Wolf Stories', 'moon', 5),
    new CraftingRecipe('Essential Periost', 'Wolf Stories', 'moon', 10, 'and :remains: remains'),
    new CraftingRecipe('Catwink', 'Putrefactions & Calcinations', 'moon', 5),
    new CraftingRecipe('Asimel', 'Putrefactions & Calcinations', 'moon', 10, 'and :liquid: liquid'),
    new CraftingRecipe('Yewgall Ink', 'Putrefactions & Calcinations', 'winter', 5),
    new CraftingRecipe('Perinculate', 'Putrefactions & Calcinations', 'winter', 10, 'and a :leaf: leaf'),
    new CraftingRecipe('Year-Tally', 'Putrefactions & Calcinations', 'winter', 15, 'and Essential Periost'),
    new CraftingRecipe('Salt-Sign', 'Pearl & Tide', 'rose', 5),
    new CraftingRecipe('Enduring Reflection', 'Pearl & Tide', 'rose', 10, 'and a :memory: memory'),
    new CraftingRecipe('Eigengrau', 'Pearl & Tide', 'moon', 5),
    new CraftingRecipe('Asimel', 'Pearl & Tide', 'moon', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Secret Threshold', 'Door & Wall', 'knock', 5),
    new CraftingRecipe('Glassfinger Toxin', 'Door & Wall', 'knock', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Bitterblack Salts', 'Door & Wall', 'forge', 5),
    new CraftingRecipe('Secret Threshold', 'Edicts Liminal', 'knock', 5),
    new CraftingRecipe('Glassfinger Toxin', 'Edicts Liminal', 'knock', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Tanglebrag', 'Edicts Liminal', 'moth', 5),
    new CraftingRecipe('Nameday Riddle', 'Edicts Liminal', 'moth', 10, 'and a :memory: memory'),
    new CraftingRecipe('Torgue\'s Cleansing', 'Auroral Contemplations', 'edge', 5),
    new CraftingRecipe('Winning Move', 'Auroral Contemplations', 'edge', 10, 'and a :memory: memory'),
    new CraftingRecipe('Eigengrau', 'Auroral Contemplations', 'lantern', 5),
    new CraftingRecipe('Tanglebrag', 'Watchman\'s Paradoxes', 'lantern', 5),
    new CraftingRecipe('Ichor Vitreous', 'Watchman\'s Paradoxes', 'lantern', 10, 'and :glass: glass'),
    new CraftingRecipe('Yewgall Ink', 'Rites of the Roots', 'nectar', 5),
    new CraftingRecipe('Tanglebrag', 'Rites of the Roots', 'moth', 5),
    new CraftingRecipe('Nameday Riddle', 'Rites of the Roots', 'moth', 10, 'and a :memory: memory'),
    new CraftingRecipe('...nothing?', 'Transformations & Liberations', 'moth', 5),
    new CraftingRecipe('Tanglebrag', 'Resurgences & Emergences', 'moth', 5),
    new CraftingRecipe('Secret Threshold', 'Horns & Ivories', 'knock', 5),
    new CraftingRecipe('Amethyst Ampoule', 'Surgeries & Exsanguinations', 'knock', 5),
    new CraftingRecipe('Glassfinger Toxin', 'Surgeries & Exsanguinations', 'knock', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Torgue\'s Cleansing', 'Meniscate Reflections', 'edge', 5),
    new CraftingRecipe('Torgue\'s Cleansing', 'Disciplines of the Scar', 'edge', 5),
    new CraftingRecipe('Labhitic Tincture', 'Ragged Crossroads', 'edge', 5),
    new CraftingRecipe('Winning Move', 'Ragged Crossroads', 'edge', 10, 'and a :memory: memory'),
    new CraftingRecipe('Bittersweet Certainty', 'Snow Stories', 'winter', 5),
    new CraftingRecipe('Essential Periost', 'Snow Stories', 'winter', 10, 'and :remains: remains'),
    new CraftingRecipe('Year-Tally', 'Snow Stories', 'winter', 15, 'and Essential Periost'),
    new CraftingRecipe('Bittersweet Certainty', 'Ragged Crossroads', 'winter', 5),
    new CraftingRecipe('Solomon\'s Preparation', 'Ragged Crossroads', 'winter', 10, 'and a :flower: flower'),
    new CraftingRecipe('Year-Tally', 'Ragged Crossroads', 'winter', 15, 'and Essential Periost'),
    new CraftingRecipe('Eigengrau', 'Sights & Sensations', 'winter', 5),
    new CraftingRecipe('Solomon\'s Preparation', 'Sights & Sensations', 'winter', 10, 'and a :flower: flower'),
    new CraftingRecipe('Nillycant', 'Sights & Sensations', 'winter', 15, 'and Solomon\'s Preparation'),
    new CraftingRecipe('Eigengrau', 'Inks of Containment', 'winter', 5),
    new CraftingRecipe('Solomon\'s Preparation', 'Inks of Containment', 'winter', 10, 'and a :flower: flower'),
    new CraftingRecipe('Nillycant', 'Inks of Containment', 'winter', 15, 'and Solomon\'s Preparation'),
    new CraftingRecipe('Midnight Mark', 'Snow Stories', 'moon', 5),
    new CraftingRecipe('Salt-Sign', 'Hill & Hollow', 'moon', 5),
    new CraftingRecipe('Catwink', 'Sand Stories', 'moon', 5),
    new CraftingRecipe('Midnight Mark', 'Serpents & Venoms', 'moon', 5),
    new CraftingRecipe('Catwink', 'Inks of Containment', 'moon', 5),
    new CraftingRecipe('Leathy', 'Inks of Contaiment', 'moon', 10, 'and a :beverage: beverage'),
    new CraftingRecipe('Bitterblack Salts', 'Anbary & Lapidary', 'forge', 5),
    new CraftingRecipe('Bitterblack Salts', 'Transformations & Liberations', 'forge', 5),
    new CraftingRecipe('Westcott\'s Compounds', 'Meniscate Reflections', 'forge', 5),
    new CraftingRecipe('Salt-Sign', 'Sand Stories', 'rose', 5),
    new CraftingRecipe('Regensburg Balm', 'Surgeries & Exsanguinations', 'heart', 5),
    new CraftingRecipe('Gideon\'s Soaks', 'Surgeries & Exsanguinations', 'heart', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Witching Tisane', 'Leaves & Thorns', 'grail', 5),
    new CraftingRecipe('Dearday Lens', 'Disciplines of the Scar', 'lantern', 5),
    new CraftingRecipe('Old Moment', 'Disciplines of the Scar', 'lantern', 10, 'and a :memory: memory'),
    new CraftingRecipe('Wistful Air', 'Watchman\'s Paradoxes', 'sky', 5),
    new CraftingRecipe('Ichor Auroral', 'Watchman\'s Paradoxes', 'sky', 10, 'and a :light: light'),
    new CraftingRecipe('Confounding Parable', 'Preliminal Meter', 'rose', 5),
    new CraftingRecipe('Secret Threshold', 'Preliminal Meter', 'knock', 5),
    new CraftingRecipe('Curious Hunch', 'Preliminal Meter', 'knock', 10, 'and a :memory: memory'),
    new CraftingRecipe('Bisclavret\'s Knot', 'Hill & Hollow', 'scale', 5),
    new CraftingRecipe('Bisclavret\'s Knot', 'Horns & Ivories', 'scale', 5),
    new CraftingRecipe('Old Moment', 'Horns & Ivories', 'scale', 10, 'and a :memory: memory'),
    new CraftingRecipe('Bisclavret\'s Knot', 'Path & Pilgrim', 'scale', 5),
    new CraftingRecipe('Old Moment', 'Path & Pilgrim', 'scale', 10, 'and a :memory: memory'),
    new CraftingRecipe('Xanthotic Essence', 'Auroral Contemplations', 'lantern', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Leathy', 'Rites of the Roots', 'nectar', 10, 'and a :beverage: beverage'),
    new CraftingRecipe('Salt-Sign', 'Inks of Power', 'rose', 5),
    new CraftingRecipe('Perhibiate', 'Inks of Power', 'scale', 5),
    new CraftingRecipe('Bisclavret\'s Knot', 'Coil & Chasm', 'scale', 5),
    new CraftingRecipe('Old Moment', 'Coil & Chasm', 'scale', 10, 'and a :memory: memory'),
    new CraftingRecipe('Bisclavret\'s Knot', 'Pentiments and Precursors', 'scale', 5),
    new CraftingRecipe('Perhibiate', 'Inks of Power', 'scale', 5),
    new CraftingRecipe('Bisclavret\'s Knot', 'Serpents & Venoms', 'scale', 5),
    new CraftingRecipe('Glassfinger Toxin', 'Serpents & Venoms', 'scale', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Witching Tisane', 'Desires & Dissolutions', 'grail', 5),
    new CraftingRecipe('Beguiling Melody', 'Pentiments & Precursors', 'grail', 5),
    new CraftingRecipe('Rubywise Ruin', 'Desires & Dissolutions', 'grail', 10, 'and a :flower: flower'),
    new CraftingRecipe('Ichor Vitreous', 'Watchman\'s Paradoxes', 'lantern', 10, 'and :glass: glass'),
    new CraftingRecipe('Regensburg Balm', 'Herbs & Infusions', 'heart', 5),
    new CraftingRecipe('Gideon\'s Soaks', 'Herbs & Infusions', 'heart', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Dearday Lens', 'Glassblowing & Vesselcrafting', 'sky', 5),
    new CraftingRecipe('...nothing?', 'Glassblowing & Vesselcrafting', 'sky', 10),
    new CraftingRecipe('Yewgall Ink', 'Insects & Nectars', 'nectar', 5),
    new CraftingRecipe('Midnight Mark', 'Insects & Nectars', 'moon', 5),
    new CraftingRecipe('Labhitic Tincture', 'Disciplines of the Hammer', 'edge', 5),
    new CraftingRecipe('Winning Move', 'Disciplines of the Hammer', 'edge', 10, 'and a :memory: memory'),
    new CraftingRecipe('Bitterblack Salts', 'Disciplines of the Hammer', 'forge', 5),
    new CraftingRecipe('Westcott\'s Compounds', 'Spices & Savours', 'forge', 5),
    new CraftingRecipe('Bisclavret\'s Knot', 'Coil & Chasm', 'scale', 5),
    new CraftingRecipe('Perhibiate', 'Inks of Power', 'scale', 5),
    new CraftingRecipe('Witching Tisane', 'The Great Signs and the Great Scars', 'grail', 5),
    new CraftingRecipe('Amethyst Ampoule', 'The Great Signs and the Great Scars', 'knock', 5),
    new CraftingRecipe('Curious Hunch', 'The Great Signs and the Great Scars', 'knock', 10, 'and a :memory: memory'),
    new CraftingRecipe('Amethyst Ampoule', 'Glassblowing & Vesselcrafting', 'knock', 5),
    new CraftingRecipe('Amethyst Ampoule', 'Solutions & Separations', 'knock', 5),
    new CraftingRecipe('Glassfinger Toxin', 'Solutions & Separations', 'knock', 10, 'and a :liquid: liquid'),
    new CraftingRecipe('Westcott\'s Compounds', 'Solutions & Separations', 'moth', 5),
    new CraftingRecipe('Nameday Riddle', 'Solutions & Separations', 'moth', 10, 'and a :memory: memory'),
    new CraftingRecipe('Confounding Parable', 'Tridesma Hiera', 'moon', 5),
    new CraftingRecipe('Dearday Lens', 'Glassblowing & Vesselcrafting', 'lantern', 5),
    new CraftingRecipe('Orichalcum', 'Glassblowing & Vesselcrafting', 'knock', 10, 'and :metal: metal'),
    new CraftingRecipe('Amethyst Ampoule', 'Lockworks & Clockworks', 'knock', 5),
    new CraftingRecipe('Gervinite', 'Lockworks & Clockworks', 'knock', 10, 'and :glass: glass'),
    new CraftingRecipe('Midnight Mark', 'Snow Stories', 'moon', 5),
    new CraftingRecipe('Midnight Mark', 'Sharps', 'moon', 5),
    new CraftingRecipe('Essential Periost', 'Sharps', 'moon', 10, 'and :remains: remains'),
    new CraftingRecipe('Midnight Mark', 'Desires & Dissolutions', 'moon', 5),
    new CraftingRecipe('Pyrus Auricalcinus', 'Desires & Dissolutions', 'moon', 10, 'and :wood: wood'),
    new CraftingRecipe('Beguiling Melody', 'Applebright Euphonies', 'grail', 5),
    new CraftingRecipe('Rubywise Ruin', 'Applebright Euphonies', 'grail', 10, 'and a :flower: flower'),
    new CraftingRecipe('Witching Tisane', 'Orchids & Narcotics', 'grail', 5),
    new CraftingRecipe('Rubywise Ruin', 'Orchids & Narcotics', 'grail', 10, 'and a :flower: flower'),
    new CraftingRecipe('Perilous Imago', 'Resurgences & Emergences', 'moth', 10, 'and a Chimeric Larva'),
    new CraftingRecipe('Perilous Imago', 'Transformations & Liberations', 'moth', 10, 'and a Chimeric Larva'),

    new Recipe('Fear', 'Read Exorcism for Girls'),
    new Recipe('Foresight', 'Read Journal of Walter Dewulf'),
    new Recipe('Foresight', 'Read The Six Letters on Necessity'),
    new Recipe('Hindsight', 'Read Oblations in Iron'),
    new Recipe('Impulse', 'Read Kitling Ripe and the Moldywarp\'s Grave (and Other Stories)'),
    new Recipe('Intuition', 'Read Collected Hush House Letters'),
    new Recipe('Regret', 'Read Chione at Abydos'),
    new Recipe('Foresight', 'Read War of the Roads'),
    new Recipe('Impulse', 'Read Ceaseless Tantra'),
    new Recipe('Fear', 'Read Leonine Tantra'),
    new Recipe('Memory: Storm', 'Read Apollo and Marsyas'),
    new Recipe('Regret', 'Read On the White'),
    new Recipe('Satisfaction', 'Read An Impertinent Vitulation'),
    new Recipe('Contradiction', 'Read De Horis Book 3'),
    new Recipe('Salt', 'Read A Pale Lady and a Prince of Wines'),
    new Recipe('Gossip', 'Read The Queens of the Rivers'),
    new Recipe('Pattern', 'Read Travelling at Night, Vol 3'),
    new Recipe('Fear', 'Read Viennese Conundra'),
    new Recipe('Hindsight', 'Read Operations of a Certain Finality'),
    new Recipe('Fear', 'Read Treatise on Underplaces'),
    new Recipe('Foresight', 'Read Old Coppernose and the Softer Metal'),
    new Recipe('Revelation', 'Read Rose of Waznei'),
    new Recipe('Intuition', 'Read Fire-Circle Tantra'),
    new Recipe('Regret', 'Read Barrowchild\'s Elegies'),
    new Recipe('Intuition', 'Read Book of the Centipedes'),
    new Recipe('Salt', 'Read The Sea Does Not Regret'),
    new Recipe('Impulse', 'Read De Horis Book I'),
    new Recipe('Pattern', 'Read Just Verse'),
    new Recipe('Hindsight', 'Read Exercises in the Continuity of Self'),
    new Recipe('Revelation', 'Read Prophecies of Glory'),
    new Recipe('Intuition', 'Read Three and the Three (Kerisham Manuscript)'),
    new Recipe('Pattern', 'Read Twin-Serpent Tantra'),
    new Recipe('Pattern', 'Read By Their Marks Shall Ye Know Them'),
    new Recipe('Pattern', 'Read Radical Measure'),
    new Recipe('Fear', 'Read Key of Night'),
    new Recipe('Solace', 'Read Orchid Transfigurations: Noon'),
    new Recipe('Revelation', 'Read A Light in the Inkwell'),
    new Recipe('Intuition', 'Read Republic of Teeth'),
    new Recipe('Revelation', 'Read Sunrise Awakenings'),
    new Recipe('Revelation', 'Read Known-Unknown Tantra'),
    new Recipe('Pattern', 'Read On the Winding Stair'),
    new Recipe('Contradiction', 'Read Honey: the Comprehensive Guide'),
    new Recipe('Foresight', 'Read Chandler\'s Wish'),
    new Recipe('Satisfaction', 'Read Orchid Transfigurations 2: Birth'),
    new Recipe('Foresight', 'Read De Horis: Book 2'),
    new Recipe('Beguiling Melody', 'Read Intimations of Skin'),
    new Recipe('Impulse', 'Read On Matthias and the Amethyst Imago: Transformation'),
    new Recipe('Impulse', 'Read Shadow in the Stair'),
    new Recipe('A Stolen Secret', 'Read On Matthias and the Amethyst Imago: Loss'),
    new Recipe('Foresight', 'Read Vinzant Inscriptions'),
    new Recipe('Impulse', 'Read Shaven Lock Tantra'),
    new Recipe('Hindsight', 'Read Hissing Key'),
    new Recipe('Contradiction', 'Read De Bellis Murorum'),
    new Recipe('Hindsight', 'Read Nyn\'s Cages (Bruges Text, Illuminated)'),
    new Recipe('Impulse', 'Read Beekeeper\'s Ends'),
    new Recipe('Confounding Parable', 'Read It Is Written'),
    new Recipe('Contradiction', 'Read An Exorcist\'s Field Manual'),
    new Recipe('Satisfaction', 'Read Fekri\'s Herbary'),
    new Recipe('Pattern', 'Read Raptures of Forculus'),
    new Recipe('Pattern', 'Read On Imperfections'),
    new Recipe('Impulse', 'Read Malachite Supplications'),
    new Recipe('A Stolen Secret', 'Read Gospel of Zacchaeus'),
    new Recipe('Satisfaction', 'Read A Journey to the Grove'),
    new Recipe('Cheerful Ditty', 'Read Instruments of the Heart'),
    new Recipe('Impulse', 'Read Damascene Traditions of the House of Lethe'),
    new Recipe('Revelation', 'Read Gospel of Nicodemus'),
    new Recipe('Beguiling Melody', 'Read Wind\'s Ruin'),
    new Recipe('Confounding Parable', 'Read Moon\'s Egg'),
    new Recipe('Impulse', 'Read Ascite Supplications'),
    new Recipe('Confounding Parable', 'Read Snare of the Tree: Collected Proverbs of Aunt Mopsy (eye)'),
    new Recipe('Solace', 'Read Notes on Bindings'),
    new Recipe('Solace', 'Read Rose of Hypatia'),
    new Recipe('Pattern', 'Read Elations of Limentinus'),
    new Recipe('Impulse', 'Read Debate of Seven Cups'),
    new Recipe('Bittersweet Certainty', 'Read Musgrave\'s Sketches'),
    new Recipe('Pattern', 'Read OGHKOR OGHKOR TISSILAK OGHKOR'),
    new Recipe('Satisfaction', 'Read Rose of Nuriel'),
    new Recipe('Fear', 'Read One Thousand Threads'),
    new Recipe('Pattern', 'Read Other Eye of the Serpent'),
    new Recipe('Secret Threshold', 'Read Almanac of Entrances'),
    new Recipe('Bittersweet Certainty', 'Read Black Book of Brittany'),
    new Recipe('Satisfaction', 'Read Red Book of Brittany'),
    new Recipe('Foresight', 'Watch Admonitory Automata Project'),
    new Recipe('Revelation', 'Watch Open Head'),
    new Recipe('Revelation', 'Watch Experiment Beyond Sight'),
    new Recipe('Contradiction', 'Read Victory of Crowns'),
    new Recipe('Salt', 'Read Journal of Thomas Dewulf'),
    new Recipe('Regret', 'Read Fallen Cross'),
    new Recipe('Pattern', 'Read On What is Contained by Silver'),
    new Recipe('Intuition', 'Read Three and the Three (Vatican Manuscript)'),
    new Recipe('Fear', 'Read Sun\'s Lament'),
    new Recipe('A Stolen Secret', 'Read Account of Kanishk at the Spider\'s Door'),
    new Recipe('Contradiction', 'Read As the Sun His Course'),
    new Recipe('Bittersweet Certainty', 'Read Glimmerings'),
    new Recipe('Impulse', 'Read On Thirstlies, Ivories and Lovelies'),
    new Recipe('Beguiling Melody', 'Read Skeleton Songs'),
    new Recipe('Fear', 'Read Tantra of Worms'),
    new Recipe('Foresight', 'Read Incandescent Tantra'),
    new Recipe('Cheerful Ditty', 'Hear Invisible Opera'),
    new Recipe('Cheerful Ditty', 'Hear Opening the Sky'),
    new Recipe('Fear', 'Read Encircling Tantra'),
    new Recipe('Fear', 'Read Hunting Journals of Bryan Dewulf'),
    new Recipe('Satisfaction', 'Read Wonderful Shape (3 knots)'),
    new Recipe('Revelation', 'Read Locksmith\'s Dream 1'),
    new Recipe('Confounding Parable', 'Read Locksmith\'s Dream 2'),
    new Recipe('Impulse', 'Read Locksmith\'s Dream 3'),
    new Recipe('Revelation', 'Read Locksmith\'s Dream 4'),
    new Recipe('Confounding Parable', 'Read Locksmith\'s Dream 5'),
    new Recipe('Earth-Sign', 'Read De Ratio Quercuum'),
    new Recipe('A Stolen Secret', 'Hear An Investigation of A Foundered Country'),
    new Recipe('A Stolen Secret', 'Hear Velletri Interviews'),
    new Recipe('Beguiling Melody', 'Hear Lake Fucino Recordings'),
    new Recipe('Intuition', 'Read History of Inks'),
    new Recipe('Gossip', 'Read On Matthias and the Amethyst Imago: Pursuit'),
    new Recipe('Impulse', 'Read Cucurbit Prisoner Records 1927'),
    new Recipe('Impulse', 'Read Most Sorrowful End of the Lady Nonna'),
    new Recipe('Impulse', 'Read Book of Masks'),
    new Recipe('Intuition', 'Read Tripled Heart'),

    new Recipe('Beeswax Candle', 'Chandlery with wax'),
    new Recipe('Moth-Orchid-Scented Candle', 'Chandlery with wax and moth orchid'),
];
const skills = recipes.filter(r => r instanceof CraftingRecipe).map(r => r.skill).filter((s, i, arr) => arr.indexOf(s) === i);

for (let recipe of recipes) {
    console.assert(items.map(i => i.name).includes(recipe.result), `${recipe.result} not in items`);
}

/**
 *
 * @param {string} query
 */
function doSearch (query) {
    let reqs = {};
    for (let aspect of aspects) {
        let re = new RegExp(`(?<neg>-?)\\b${aspect} ?(?<amount>[0-9]+)?\\b`, 'i');
        let res = query.match(re);
        let amount = 0;
        if (res !== null) {
            amount = res.groups.amount || 1;
            if (res.groups.neg !== '') {
                amount = -1;
            }
        }
        reqs[aspect] = amount;
    }

    let words = query.split(' ')
                     .filter(w => !w.startsWith('-'))
                     .filter(w => aspects.filter(a => a.includes(w.toLowerCase())).length === 0)
                     .filter(w => w !== '')
                     .filter(w => w.match(/^[0-9]+$/) === null);

    let matches = items.filter(i => {
        let valid = true;
        for (let req in reqs) {
            valid = valid && i.aspects[req] >= reqs[req];
            if (reqs[req] === -1) valid = valid && i.aspects[req] === 0;
        }
        for (let word of words) {
            valid = valid && i.name.toLowerCase().includes(word.toLowerCase());
        }
        return valid;
    });

    let resultTable = document.getElementById('result');
    while (resultTable.childElementCount > 0) resultTable.removeChild(resultTable.lastChild);
    for (let match of matches) {
        let row = makeItemRow(match);
        row.addEventListener('click', ev => {
            let allRecipes = recipes.filter(r => r.result === match.name);

            let recipeTable = document.getElementById('recipes');
            while (recipeTable.childElementCount > 0) recipeTable.removeChild(recipeTable.lastChild);
            for (let recipe of allRecipes) {
                recipeTable.appendChild(makeRecipeRow(recipe));
            }
            for (let elem of document.getElementsByClassName('selected')) {
                elem.classList.remove('selected');
            }
            ev.currentTarget.classList.add('selected');
        })
        document.getElementById('result').appendChild(row);
    }

    let skillTable = document.getElementById('skillrecipes')
    while (skillTable.childElementCount > 0) skillTable.removeChild(skillTable.lastChild);
    if (words.length > 0 || Object.keys(reqs).length > 0) {
        let skillMatches = skills.filter(s => words.map(w => s.toLowerCase().includes(w.toLowerCase()))
                                                   .reduce((a, b) => a && b, true));
        let skillRecipes = recipes.filter(r => r instanceof CraftingRecipe && skillMatches.includes(r.skill))
                                  .filter(r => !Object.keys(reqs).filter(k => reqs[k] > 0)
                                                      .map(a => a === r.aspect).some(b => b === false));
        skillRecipes.sort((/**CraftingRecipe*/a, /**CraftingRecipe*/ b) =>
                              a.skill < b.skill       ? -1 :
                              a.skill > b.skill       ?  1 :
                              a.aspect < b.aspect     ? -1 :
                              a.aspect > b.aspect     ?  1 :
                              a.quantity < b.quantity ? -1 :
                              a.quantity > b.quantity ?  1
                                                      :  0)

        for (let skillRecipe of skillRecipes) {
            // noinspection JSCheckFunctionSignatures
            skillTable.appendChild(makeCraftingRecipeRow(skillRecipe));
        }
    }
}
document.getElementById('search').addEventListener('input', ev => doSearch(ev.target.value))
doSearch(document.getElementById('search').value);

/**
 * Creates an HTMLElement displaying the given item.
 * @param {Item} item The item to display
 */
function makeItemRow(item) {
    let row = document.createElement('span');
    row.classList.add('itemrow');
    let name = document.createElement('span');
    name.textContent = item.name;
    row.appendChild(name);
    for (let aspect in item.aspects) {
        if (item.aspects[aspect] > 0) {
            let elem = document.createElement('span');
            elem.appendChild(makeIcon(aspect));
            if (nonBinaryAspects.includes(aspect)) {
                elem.appendChild(document.createTextNode(' ' + item.aspects[aspect]))
            }
            row.appendChild(elem);
        }
    }
    let desc = iconify(item.notes);
    // desc.style.display = 'inline-block'
    row.appendChild(desc);

    return row;
}

/**
 *
 * @param {CraftingRecipe} recipe
 */
function makeCraftingRecipeRow(recipe) {
    let row = document.createElement('span');
    row.classList.add('craftingrow');
    let name = document.createElement('span');
    name.textContent = recipe.skill;
    row.appendChild(name);
    let req = document.createElement('span');
    req.appendChild(document.createTextNode('with '))
    req.appendChild(makeIcon(recipe.aspect));
    req.appendChild(document.createTextNode(' ' + recipe.quantity))
    if (recipe.extra) {
        req.appendChild(document.createTextNode(' '));
        req.appendChild(iconify(recipe.extra));
    }
    row.appendChild(req);
    let res = document.createElement('span');
    res.textContent = recipe.result;
    row.appendChild(res);

    return row;
}

/**
 *
 * @param {Recipe} recipe
 */
function makeRecipeRow(recipe) {
    let row = document.createElement('span');
    row.classList.add('reciperow');
    row.appendChild(iconify(recipe.description));

    return row;
}

/**
 *
 * @param {string} text
 */
function iconify(text) {
    let lastEnd = -1;
    let acc = document.createElement('span');
    for (let match of text.matchAll(/:[a-zA-Z]*:/g)) {
        acc.appendChild(document.createTextNode(text.substring(lastEnd, match.index)));
        let name = match[0].replace(/:/g, '');
        acc.appendChild(makeIcon(name));
        lastEnd = match.index + match[0].length;
    }
    acc.appendChild(document.createTextNode(text.substring(lastEnd)));
    return acc;
}

function makeIcon(name) {
    let img = document.createElement('span');
    img.classList.add('icon');
    img.style.height = `4ex`;
    img.style.width = `4ex`;
    img.style.backgroundImage = `url(aspects/${name.toLowerCase()}.png)`;
    img.title = name;
    return img;
}
