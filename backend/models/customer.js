const { Schema, model } = require('mongoose')

const CustomerSchema = new Schema({

    name: {
        type: String,
        required:true
    },
    adress: {
        type: String,
        required:true

    },
    mobile: {
        type: String,
        required:true

    },
   

},)
const customer = model("customer", CustomerSchema);
module.exports = customer;
