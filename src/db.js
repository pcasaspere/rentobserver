
module.exports = class DB {
    constructor() {
        this.db = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: "./db.sqlite3"
            },
            migrations: {
                tableName: 'migrations',
            }
        });
    }

    /**
     * @param String provider
     * @param String link
     * @returns bolean
    */
    async rentHasLink(provider, link) {
        const result = await this.db('rents').where({
            provider,
            link
        });
        return result.length > 0;
    }

    /**
     * @params Object
     */
    rentInsert({ provider, link, name, price }) {
        return this.db('rents').insert({
            provider,
            link,
            name,
            price,
        });
    }
}