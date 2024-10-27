const Item = require('../models/Inventory');

const addItem = async (req, res) => {
    const { itemName, category, amountInStore, manufacturer, pricePHP, serialNumber, supplier } = req.body;
    try {
        const newItem = new Item({
            itemName,
            category,
            amountInStore,
            manufacturer,
            pricePHP,
            serialNumber,
            supplier
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to add item" });
    }
};

const getAllItem = async (req, res) => {
    try {
        const items = await Item.find(); 
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch item" });
    }
};

const updateItem = async (req, res) => {
    const { itemName, category, amountInStore, manufacturer, pricePHP, serialNumber, supplier } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { itemName, category, amountInStore, manufacturer, pricePHP, serialNumber, supplier },
            { new: true } 
        );
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to update item" });
    }
};

const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete item" });
    }
};

module.exports = {
    addItem,
    getAllItem,
    getItem,
    updateItem,
    deleteItem
};
