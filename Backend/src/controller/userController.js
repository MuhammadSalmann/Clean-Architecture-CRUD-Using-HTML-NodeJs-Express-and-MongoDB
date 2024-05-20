const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = process.env.SECRET;
const SaltKey = parseInt(process.env.SALT);

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

        const hashedPassword = await bcrypt.hash(password, SaltKey);
        const result = await userModel.create({ username: username, email: email, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, SecretKey, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', result, token });
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

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ email: userExists.email, id: userExists._id }, SecretKey, { expiresIn: '1h' });
        res.status(200).json({ result: userExists, token });
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const register2 = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new userModel({ username, email, password });
        const result = await user.save();
        res.status(201).json({ message: 'User registered successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login2 = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const exisitingUser = await userModel.findOne({ email });
        if (!exisitingUser) {
            return res.status(400).json({ message: 'Invalid credentials1' });
        }
        if (exisitingUser.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials2' });
        }
        res.status(200).json({ message: 'User logged in successfully', result: exisitingUser});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { register, login, register2, login2};