const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const incomingData = req.body;

    // Encrypting password
    const encryptPassword = await bcrypt.hash(incomingData.password, 10);

    try{
        let newUser = new UserModel({
            name: incomingData.name,
            email: incomingData.email,
            password: encryptPassword
        })
        const response = await newUser.save();
        return res.status(201).json({
            message: "User Successfullly Created",
            data: response
        })
    } catch(error) {
        return res.status(500).json({
            message: "Email is already registered",
            error
        })
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const incomingData = req.body;

    try{
        const userData = await UserModel.findByIdAndUpdate(id, incomingData, {returnOriginal: false});
        return res.status(200).json({
            message: "Updated User Successfully",
            userData
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getAllUsers = async (req, res) => {
    try{
        const data = await UserModel.find();
        return res.status(200).json({
            message: "Users Fetched Succesfully",
            data
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const userData = await UserModel.findById(id);

        if (userData) {
            return res.status(200).json({
                message: `Successfuly Fetched the User ${userData.name}`,
                data: userData
            })
        }

        return res.status(404).json({
            message: "User Does Not Exist"
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}


const userLogin = async (req, res) => {
    const incomingCredentials = req.body;
    let foundUser = await UserModel.findOne({email: incomingCredentials.email});

    if (foundUser) {
        // Verify if this credentials is valid, decrypting using compare function
        const matchPassword = await bcrypt.compare(incomingCredentials.password, foundUser.password);

        if(matchPassword) {
            // let the user login

            const accessToken = jwt.sign({
                email: foundUser.email,
                name: foundUser.name
            }, process.env.SECRETKEY)

            return res.status(200).json({
                message: "Login Successfully",
                token: accessToken,
                user: foundUser
            })
        } else {
            res.status(401).json({
                message: "Password is incorrect"
            })
        }
    } else {
        res.status(404).json({
            message: "User doesn't exist"
        })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    
    try {
        const userData = await UserModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: `Deleted User ${userData.name} Successfully`,
            userData
        })
    }catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    userLogin
}