'use strict';

const aspects = ['lantern', 'heart', 'forge', 'moth', 'grail', 'moon', 'sky', 'edge', 'winter', 'nectar',
                 'scale', 'knock', 'rose',
                 'memory', 'sound', 'material', 'omen', 'mark', 'persistent', 'leaf', 'flower', 'beverage',
                 'sustenance', 'ink', 'pigment', 'glass', 'stone', 'metal', 'soul', 'skill', 'liquid', 'remains',
                 'fabric', 'assistance', 'unknown', 'weather', 'fruit'];
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
    new Item('Salt-Sign', '', {moon: 2, rose: 2, mark: 1}),
    new Item('Essential Periost', 'Precursor to Year-Tally', {moon: 2, nectar: 4, scale: 4, winter: 4, remains: 1}),
    new Item('Year-Tally', '', {winter: 6, mark: 1}),
];
/** @type [Recipe] */
let recipes = [
    new Recipe('Solace', 'Talk with dog'),
    new Recipe('Solace', 'Talk with cat'),
    new Recipe('Earth-Sign', 'Talk with snake'),
    new Recipe('Fear', 'Talk with Chimeric Larva'),
    new Recipe('Taste', 'Drink (or eat?)'),
    new Recipe('Touch', 'Inspect cat'),
    new Recipe('Touch', 'Analyze quartz'),
    new Recipe('Scent', 'Dissect plant'),
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
    
    new CraftingRecipe('Eigengrau', 'Quenchings & Quellings', 'winter', 5),
    new CraftingRecipe('Regensburg Balm', 'Quenchings & Quellings', 'heart', 5),
    new CraftingRecipe('Savage Hymn', 'Drums & Dances', 'nectar', 5),
    new CraftingRecipe('Cheerful Ditty', 'Drums & Dances', 'heart', 5),
    new CraftingRecipe('Thunderskin\'s Paean', 'Drums & Dances', 'heart', 10, 'at an :instrument: instrument'),
    new CraftingRecipe('Bittersweet Certainty', 'Rhye & Remembrance', 'winter', 5),
    new CraftingRecipe('Westcott\'s Compounds', 'Sacra Limiae', 'moth', 5),
    new CraftingRecipe('Awakened Feather', 'Sacra Limiae', 'sky', 5),
    new CraftingRecipe('Witching Tisane', 'Sea Stories', 'grail', 5),
    new CraftingRecipe('Bitterblack Salts', 'Bells & Brazeries', 'forge', 5),
    new CraftingRecipe('Wistful Air', 'Bells & Brazeries', 'sky', 5),
    new CraftingRecipe('Wistful Air', 'Strings & Songs', 'sky', 5),
    new CraftingRecipe('Cheerful Ditty', 'Strings & Songs', 'heart', 5),
    new CraftingRecipe('Awakened Feather', 'Anbary & Lapidary', 'sky', 5),
    new CraftingRecipe('Awakened Feather', 'Furs & Feathers', 'sky', 5),
    new CraftingRecipe('Bisclavret\'s Knot', 'Furs & Feathers', 'scale', 5),
    new CraftingRecipe('Tanglebrag', 'Weaving & Knotworking', 'moth', 5),
    new CraftingRecipe('Perhibiate', 'Weaving & Knotworking', 'heart', 5),
    new CraftingRecipe('Frith-Weft', 'Weaving & Knotworking', 'heart', 10, 'and :fabric: fabric'),
    new CraftingRecipe('Regensburg Balm', 'Edicts Inviolable', 'heart', 5),
    new CraftingRecipe('Bisclavret\'s Knot', 'Wolf Stories', 'scale', 5),
    new CraftingRecipe('Regensburg Balm', 'Maggephene Mysteries', 'heart', 5),
    new CraftingRecipe('Refulgin', 'Inks of Revelation', 'lantern', 5),
    new CraftingRecipe('Ichor Vitreous', 'Inks of Revelation', 'lantern', 10, 'and :glass: glass'),
    new CraftingRecipe('Awakened Feather', 'Sights & Sensations', 'sky', 5),
    new CraftingRecipe('Yewgall Ink', 'Leaves & Thorns', 'nectar', 5),
    new CraftingRecipe('Pyrus Auricalcinus', 'Leaves & Thorns', 'nectar', 10, 'and :wood: wood'),
    new CraftingRecipe('Beguiling Melody', 'Resurgences & Emergences', 'grail', 5),
    new CraftingRecipe('Salt-Sign', 'Path & Pilgrim', 'rose', 5),
    new CraftingRecipe('Essential Periost', 'Rhyme & Remembrance', 'winter', 10, 'and :remains: remains'),

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
];
const skills = recipes.filter(r => r instanceof CraftingRecipe).map(r => r.skill).filter((s, i, arr) => arr.indexOf(s) === i);

/**
 *
 * @param {string} query
 */
function doSearch (query) {
    let reqs = {};
    for (let aspect of aspects) {
        let re = new RegExp(`${aspect} ?([0-9]+)`, 'i');
        let amount = (query.match(re) ?? [null, 0])[1];
        if (amount === 0) {
            let re = new RegExp(`${aspect}`, 'i');
            amount = query.match(re) === null ? 0 : 1;
        }
        reqs[aspect] = amount;
    }

    let words = query.split(' ')
                     .filter(w => aspects.filter(a => a.includes(w)).length === 0)
                     .filter(w => w !== '');

    let matches = items.filter(i => {
        let valid = true;
        for (let req in reqs) {
            valid = valid && i.aspects[req] >= reqs[req];
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
