const { nanoid } = require('nanoid');

class Task {

    id = '';
    desc = '';
    completedOn = null;

    constructor(desc){
        this.id = nanoid(12)
        this.desc = desc;
    }
}

module.exports = Task