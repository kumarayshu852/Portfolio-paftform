const Project =require('../models/Project');

// Get all projects- all show (public)

exports.getProjects=async(req,res)=>{
    try{
        const projects=await Project.find().sort({createdAt:-1});
        res.json(projects);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};
// GET single projects=detail page of live
exports.getProjectById = async(req,res)=>{
    try{
        const project=await Project.findByIdAndUpdate(
            req.params.id,
            {$inc:{views:1}},
            {new:true}
        );
        if(!project){
            return res.status(404).json({message:"Project not founded"});
        }
        res.json(project);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//Post add project- only admin
exports.addProject = async(req,res)=>{
    try{
        const {title,description, technologies,githubLink,liveLink}=req.body;

        

        // check image that will be uploaded and not 
        if(!req.file){
            return res.status(400).json({message:"Please upload an image"});
        }

        const imageUrl=req.file.path;// cloundinary url

        const project =await Project.create({
            title,
            description,
            imageUrl,
            technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
            githubLink,
            liveLink,
            createdBy:req.user.id

        });

        res.status(201).json(project);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.editProject = async(req,res)=>{
    try{
        const{title,description, technologies,githubLink,liveLink}=req.body;

        const updateData={
            title,
            description,
            technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
            githubLink,
            liveLink,
             
        };

        // if new image uploaded then update

        if(req.file){
            updateData.imageUrl=req.file.path;
        }
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new:true}
        );

        if (!project){
            return res.status(404).json({message:"project are not founded"});
        }
        
        res.json(project);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

// Delete project only admin
exports.deleteProject =async(req,res)=>{
    try{
        const project =await Project.findByIdAndDelete(req.params.id);

        if(!project){
            return res.status(404).json({message:"project are not founded"});

        }

        res.json({message:"Your Project are Deleted"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};