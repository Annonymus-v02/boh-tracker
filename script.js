'use strict';

const aspects = ['lantern', 'heart', 'forge', 'moth', 'grail', 'moon', 'sky', 'edge', 'winter', 'nectar',
                 'scale',
                 'memory', 'sound', 'material', 'omen', 'mark', 'persistent', 'leaf', 'flower', 'beverage',
                 'sustenance', 'ink', 'pigment', 'glass', 'stone', 'metal', 'soul', 'skill'];

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
     * @param {string} description
     * @param {string} result
     */
    constructor({description, result}) {
        this.description = description;
        this.result = result;
    }
}

/** @type [Item] */
let items = [new Item('Refulgin', '', {lantern: 2, material: 1, pigment: 1})];
/** @type [Recipe] */
let recipes = [];

document.getElementById('search').addEventListener('change', (ev) => {
    /** @type string */
    let query = ev.target.value;
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

    let matches = items.filter(i => {
        let valid = true;
        for (let req in reqs) {
            valid = valid && i.aspects[req] >= reqs[req];
        }
        return valid;
    });

    let resultTable = document.getElementById('result');
    while (resultTable.childElementCount > 0) resultTable.removeChild(resultTable.lastChild);
    for (let match of matches) {
        document.getElementById('result').appendChild(makeItemRow(match));
        console.log('matched item', match)
    }
})

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
            elem.textContent = `${aspect} ${item.aspects[aspect]}`
            row.appendChild(elem);
        }
    }
    let desc = document.createElement('span');
    desc.textContent = item.notes;
    row.appendChild(desc);

    return row;
}
