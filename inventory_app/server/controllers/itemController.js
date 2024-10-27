const Item = require('../models/Inventory');
const inventory = require('../models/Inventory');

// Add a new item
const addItem = async (req, res) => {
    const { name, category, amount, manufacturer, pricephp, serialnumber, supplier } = req.body;
    try {
        const newItem = new Item({
            name,
            category,
            amount,
            manufacturer,
            pricephp,
            serialnumber,
            supplier
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to add item" });
    }
};

// Get all items
const getAllItem = async (req, res) => {
    try {
        const items = await Item.find(); 
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

// Get a specific item by ID
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

// Update an item by ID
const updateItem = async (req, res) => {
    const { name, category, amount, manufacturer, pricephp, serialnumber, supplier } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, category, amount, manufacturer, pricephp, serialnumber, supplier },
            { new: true } // Return the updated document
        );
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to update item" });
    }
};

// Delete an item by ID
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
