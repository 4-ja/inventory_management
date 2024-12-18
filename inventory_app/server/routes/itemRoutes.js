const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.addItem); 
router.get('/', itemController.getAllItem); 
router.get('/:id', itemController.getItem);
router.put('/:id', itemController.updateItem); 
router.delete('/:id', itemController.deleteItem); 

module.exports = router;
