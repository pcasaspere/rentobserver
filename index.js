const DB = require('./src/db');
const Idealista = require('./providers/idealista');
const Habitaclia = require('./providers/habitaclia');
const Fotocasa = require('./providers/fotocasa');

const Telegram = require('./src/telegram');

const bot = new Telegram();
const db = new DB();

async function start(provider) {

    let results = [];

    if (provider === 'idealista') {

        results = await Idealista.getRentData();

    } else if (provider === 'habitaclia') {

        results = await Habitaclia.getRentData();

    } else if (provider === 'fotocasa') {

        results = await Fotocasa.getRentData();

    } else {

        console.error(`Provider ${provider} no correcte`);
        process.exit();

    }

    for ({ data } of results) {

        const { link } = data;

        const link_exists = await db.rentHasLink(provider, link);
        if (!link_exists) {
            console.log(`Bimbo! New link: ${link}`);
            try {
                // primer bot
                await bot.send(link);
                // despres DB
                await db.rentInsert(data);
            } catch (e) {
                console.error(e.message);
            }
        }
    }
    process.exit();
}

const provider = process.argv.slice(2)[0];
start(provider);