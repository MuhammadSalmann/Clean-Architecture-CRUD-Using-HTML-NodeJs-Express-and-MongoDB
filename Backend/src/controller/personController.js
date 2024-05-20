const personModel = require('../model/personModel');

// Create
const createPerson = async (req, res) => {
    // const { name, email, phone, address } = req.body;
    try {
        const newPerson = new personModel(req.body);
        const savedPerson = await newPerson.save();
        res.status(201).json({success:true, message:'Person Created',savedPerson});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Read
const getPersons = async (req, res) => {
    try {
        const persons = await personModel.find();
        res.status(200).json({success:true, message:'All Persons Fetched!!!',persons});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPerson = async (req, res) => {
    try {
        const person = await personModel.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json({success:true, message:'Person Fetched!!!',person});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update
const updatePerson = async (req, res) => {
    try {
        const updatedPerson = await personModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json({success:true, message:'Persons Updated!!!',updatedPerson});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete
const deletePerson = async (req, res) => {
    try {
        const deletedPerson = await personModel.findByIdAndDelete(req.params.id);
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json({ success:true, message: 'Person deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createPerson, getPersons, getPerson, updatePerson, deletePerson };
