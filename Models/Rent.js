const Model = require('./Model');

module.exports = class Rent extends Model {

    constructor() {
        super();
        this.data = {
            id:         null,
            link:       null,
            name:       null,
            price:      null,
            provider:   null,
            created_at: null,
            updated_at: null,
        };
    }
}