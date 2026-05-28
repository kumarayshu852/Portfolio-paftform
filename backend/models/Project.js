const mongoose =require('mongoose');
const { create } = require('./User');

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    technologies:[String],
    githubLink:{
        type:String,
        default:''
    },
    liveLink:{
        type:String,
        default:''
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});

module.exports=mongoose.model('Project',projectSchema);