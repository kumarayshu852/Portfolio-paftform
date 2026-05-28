const User =require('../models/User');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');

// Register
exports.register= async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const userExists =await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"Email already resgistered"});
        }

        const role =email === process.env.ADMIN_EMAIL ?'admin':"user";

        const user =await User.create({name,email,password,role});

        const token=jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.status(201).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.login =async (req,res)=>{
    try{
        const {email,password}=req.body;

        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Email and password is wrong"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Email and password is wrong"});
        }
        
        const token = jwt.sign(
         {id:user._id, role:user.role},
         process.env.JWT_SECRET,
         {expiresIn:"7d"}
    );

    res.json({
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    });
}catch(err){
    res.status(500).json({message:err.message});
}

}