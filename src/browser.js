const puppeteer = require('puppeteer');

const CONFIG = require('../config/app');

module.exports = class Browser {

    constructor() {
        this.browser = null;
        this.page = null;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: CONFIG.debug ? false : true,
            args: [
                '--incognito',
            ],
        });
        this.page = await this.browser.newPage();
    }

    async goto(url) {
        if (!this.browser) {
            await this.init();
        }
        console.log(`Go to ${url}`);
        await this.page.goto(url, { waitUntil: 'networkidle2' });
    }

    selectorAll(selector) {
        return this.page.$$(selector);
    }

    click(selector) {
        this.page.click(selector);
    }

    waitForSelector(selector) {
        console.log('Start to wait selector');
        this.page.waitForSelector(selector);
        console.log('Selector found');
    }

    close() {
        if (!this.browser) {
            return;
        }
        console.log('Close browser');
        this.browser.close();
    }
}