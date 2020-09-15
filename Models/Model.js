module.exports = class Model {
    constructor() {
        this.data = {};
    }

    /** */
    fill(params = {}) {
        Object.keys(params).forEach(key => {
            this.data[key] = params[key];
        })
    }
}