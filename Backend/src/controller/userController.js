const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = process.env.SECRET;
const SaltKey = parseInt(process.env.SALT);

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ message: `Hello ${req.user.username}, you are authorized!`, users });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await userModel.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, SaltKey);
        // Save in DB
        const result = await userModel.create({ username: username, email: email, password: hashedPassword });
        //OR
        // const user = new userModel({ username, email, password });
        // const result = await user.save();
        res.status(201).json({ message: 'User registered successfully', result });
    } 
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // Decrypt password
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate token
        const token = jwt.sign({ email: userExists.email, username: userExists.username, id: userExists._id }, SecretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'logged in successfully', result: userExists, token });
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getAllUsers, register, login };