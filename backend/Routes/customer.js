const express=require('express')
const Customercontroller=require ('../controllers/customer')
const router = express.Router();

router.get('/',Customercontroller.getAllCustomers)
router.get('/:id',Customercontroller.findOne)
router.post('/',Customercontroller.add)
router.put('/:id',Customercontroller.update)
router.delete('/:id',Customercontroller.delete)

module.exports=router