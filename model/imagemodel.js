const mongoose = require('mongoose');

const imagemodelschema = new mongoose.Schema ({
    imagetype: Array,
    image : Array
});

module.exports = mongoose.model('imagemodel', imagemodelschema);