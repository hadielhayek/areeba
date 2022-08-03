const customer = require('../models/customer')
class controller {

    getAllCustomers(req, res, next) {
        customer.find((err, response) => {
            if (err) return next(err);
            res.status(200).json(response)
        })
    }

    findOne(req, res, next) {
        let { id } = req.params;
        customer.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).json(response)
        })
    }

    add(req, res, next) {
        let body = req.body;
        let doc = new customer(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).json({ response, message: "Your Customer was inserted", success: true });
        })
    }


    async update(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        customer.updateOne({ _id: id }, { $set: body }, (err, response) => {
            if (err) return next(err);
            res.status(200).json(response)
        })
    }


    delete(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        customer.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).json({ response, message: "Customer was deleted successfully", success: true })
        })
    }
}


const Customercontroller = new controller();
module.exports = Customercontroller;
