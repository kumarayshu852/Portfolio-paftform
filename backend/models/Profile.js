const mongoose= require('mongoose');

const profileSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },
    photo:{type :String,default: " "},
    bio:{type:String,default: " "},
    techStack:[{
        name:{type:String},
        category:{type:String,enum:['Frontend','Backend','Database','Tools'],default:"Frontend"},
        percentage:{type:Number,default:80}
    }],
    email:{type:String,default:''},
    phone:{type: String, default: ''},
    github:{type:String, default: ""},
    linkedin:{type:String ,default: ""},
    youtube:{type:String, default:""},
    facebook:{type:String,default:""},
    instagram:{type:String,default:""},
    twitter:{type:String,default:""},
    website:{type:String,default:""},

},{timestamps:true});

module.exports=mongoose.model('Profile',profileSchema);