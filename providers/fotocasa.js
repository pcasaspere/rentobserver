const Browser = require('../src/browser');
const CONFIG = require('../config/providers');
const Rent = require('../Models/Rent');

module.exports = class Fotocasa {

    /** */
    static async getRentData() {

        const { rent } = CONFIG.fotocasa;
        const browser = new Browser();
        const result = [];

        // Allow cookies and more
        await browser.goto(CONFIG.fotocasa.base_url);
        await browser.waitForSelector('button.sui-AtomButton--primary');
        await browser.click('button.sui-AtomButton--primary', button => button.click() );
        await browser.page.waitFor(1523);

        for (const link of rent) {
            await browser.goto(link);
            const items = await browser.selectorAll('div.re-Searchresult-itemRow');

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
            item.$eval('a.re-Card-link', (e) => e.getAttribute('href')),
            item.$eval('h3.re-Card-title', (e) => e.textContent),
            item.$eval('.re-Card-price', (e) => e.innerText.split(' €')[0]),
        ]);
        const rent = new Rent();
        rent.fill({
            link: asset_link,
            name: asset_name,
            price: asset_price,
            provider: 'fotocasa',
        });
        return rent;
    }
}