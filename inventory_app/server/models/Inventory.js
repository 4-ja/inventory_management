const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  amountInStore: { type: Number, required: true },
  manufacturer: { type: String, required: true },
  pricePHP: { type: Number, required: true },
  serialNumber: { type: String, required: true, unique: true },
  supplier: { type: String, required: true },
});

const Item = mongoose.model('Inventory', itemSchema, 'Inventory');

module.exports = Item;
