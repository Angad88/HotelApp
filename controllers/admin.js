const AdminModel = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAdmin = async (req, res) => {
    const incomingData = req.body;

    // Encrypting password
    const encryptPassword = await bcrypt.hash(incomingData.password, 10);

    try{
        let newAdmin = new AdminModel({
            name: incomingData.name,
            email: incomingData.email,
            description: incomingData.description,
            password: encryptPassword,
            city: incomingData.city,
            postalCode: incomingData.postalCode,
            province: incomingData.province,
            reviewStars: incomingData.reviewStars,
            address: incomingData.address

        })
        const response = await newAdmin.save();
        return res.status(201).json({
            message: "Admin Successfullly Created",
            data: response
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const updateAdmin = async (req, res) => {
    const id = req.params.id;
    const incomingData = req.body;

    try{
        const adminData = await AdminModel.findByIdAndUpdate(id, incomingData, {returnOriginal: false});
        return res.status(200).json({
            message: "Updated Admin Successfully",
            data: adminData
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getAllAdmin = async (req, res) => {
    try{
        const data = await AdminModel.find();
        return res.status(200).json({
            message: "Admins Fetched Succesfully",
            data
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getAdminById = async (req, res) => {
    const id = req.params.id;
    try {
        const adminData = await AdminModel.findById(id);

        if (adminData) {
            return res.status(200).json({
                message: `Successfuly Fetched the User ${adminData.name}`,
                data: adminData
            })
        }

        return res.status(404).json({
            message: "Admin Does Not Exist"
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}


const adminLogin = async (req, res) => {
    const incomingCredentials = req.body;
    let foundAdmin = await AdminModel.findOne({email: incomingCredentials.email});

    if (foundAdmin) {
        // Verify if this credentials is valid, decrypting using compare function
        const matchPassword = await bcrypt.compare(incomingCredentials.password, foundAdmin.password);

        if(matchPassword) {
            // let the user login

            const accessToken = jwt.sign({
                email: foundAdmin.email,
                name: foundAdmin.name
            }, process.env.SECRETKEY)

            return res.status(200).json({
                message: "Login Successfully",
                token: accessToken,
                admin: foundAdmin
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

const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    
    try {
        const adminData = await AdminModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: `Deleted User ${adminData.name} Successfully`,
            adminData
        })
    }catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

module.exports = {
    createAdmin,
    updateAdmin,
    getAllAdmin,
    getAdminById,
    deleteAdmin,
    adminLogin
}