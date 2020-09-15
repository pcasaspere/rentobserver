const Browser = require('../src/browser');
const CONFIG = require('../config/providers');
const Rent = require('../Models/Rent');

module.exports = class Habitaclia {

    /** */
    static async getRentData() {

        const { rent } = CONFIG.habitaclia;
        const browser = new Browser();
        const result = [];

        for (const link of rent) {
            await browser.goto(link);
            const items = await browser.selectorAll('.list-item-info');
            for (const item of items) {
                const model = await this._parseRent(item);
                result.push(model);
            }
        };

        await browser.close()
        return result;
    }


    /**
     * @returns <Rent> rent
     */
    static async _parseRent(item) {
        const [asset_link, asset_name, asset_price] = await Promise.all([
            item.$eval('.list-item-title a', (e) => e.getAttribute('href')),
            item.$eval('.list-item-title a', (e) => e.text),
            item.$eval('.list-item-price', (e) => e.innerText.split(' €')[0]),
        ]);
        const rent = new Rent();
        rent.fill({
            link: asset_link,
            name: asset_name,
            price: asset_price,
            provider: 'habitaclia',
        });
        return rent;
    }
}