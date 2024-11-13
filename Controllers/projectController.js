const projects = require("../model/projectModel");


exports.addProjectController = async (req, res) => {
    console.log('Inside add project controller');

    const { title, language, github, Website, overview } = req.body
    console.log(title, language, github, Website, overview);

    const projectImage = req.file.filename
    console.log(projectImage);

    const userId = req.payload

    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json('Project already exist')
        }
        else {
            const newProject = new projects({
                title, language, github, Website, overview, projectImage, userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }
    } catch (error) {
         res.status(401).json('Project adding failed due to ', error)
    }

}

//get all projects
exports.getAllProjectController = async(req,res)=>{
  //path parameter = req.params
  //query parameter = req.query
  const searchkey = req.query.search 
  console.log(searchkey);

  const query = {
    language:{
        $regex:searchkey,$options:"i"
    }
  }
  
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
  }

  //get home projects
  exports.getHomeProjectController = async(req,res)=>{
  
    try {
        const allProject = await projects.find().limit(3)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
  }

  

  //get user projects

  exports.getUserProjectController = async(req,res)=>{
     
    const userId = req.payload
    try {
        const allProject = await projects.find({userId})
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
  }

//remove user projects
exports.removeUserProjectController= async(req,res)=>{
    const {id} = req.params

    try {
      await projects.findByIdAndDelete({_id:id})  
      res.status(200).json('Deleted successfully')
    } catch (error) {
       res.status(401).json(error) 
    }
}


//
  exports.editProjectController = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload

    const {title , language , github , Website , overview , projectImage} =req.body

    const uploadedImage = req.file?req.file.filename:projectImage

    try {
        //findByIdAndUpdate()
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            Website,
            overview,
            projectImage:uploadedImage,
            userId
            },{new:true})

            await existingProject.save()
            res.status(200).json(existingProject)
            
    } catch (error) {
       res.status(401).json(error) 
    }
  }