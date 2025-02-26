const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            const user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({ msg: "Email has already been registered" })
            }
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password should be of atleast 6 characters" })
            }

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({ name, email, password: passwordHash })

            await newUser.save()        //Saving the password
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            const userid= newUser._id

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            console.log(req.cookies)
            res.cookie('loginStatus', 'true', {
                httpOnly: false,
                path: '/',
            })

            res.json({ accesstoken, userid })

            // return res.json({msg:"Registration Successful"})
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }

    },
    refreshtoken: async (req, res) => {

        try {
            const rf_token = req.cookies.refreshtoken;

            if (!rf_token) {
                return res.status(400).json({ msg: "Please Login or Register" })
            }
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(400).json({ msg: "Please login or register" })
                }
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ user, accesstoken })
            })
        }


        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist" })

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) return res.status(400).json({ msg: "Password is not correct" })

            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.cookie('loginStatus', 'true', {
                httpOnly: false,
                path: '/',
            })

            res.json({ accesstoken, user_id: user._id })


        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged Out" })
        }
        catch (error) {
            return res.json({ msg: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            if (!user) {
                return res.status(400).json({ msg: "User Not Found" })
            }
            res.json(user)

        }
        catch (err) {
            res.json({ msg: "Unable" })
        }
    },
    adminlogin: async (req,res) => {
        try{
            const {email, password}=req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const match= await bcrypt.compare(password, user.password)

        
            if(match){
                if (user.role === 10) {
                    res.status(200).json({ msg: "Admin Verified" });
                } else {
                    res.status(403).json({ msg: "Not an Admin" });
                }
            }
            else{
                res.status(401).json({msg:"Password is Wrong"})
            }
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: "Some error occured"})
    }

    }
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}


const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl   