const express = require("express");

const { PostModel } = require("../model/post.model");
const PostRouter = express.Router();
PostRouter.get("/add", async (req,res)=>{
   try {
    const alldata = await PostModel.find()
    res.json(alldata)
   } catch (error) {
    console.log(error)
   }
  })
  
  

  
  PostRouter.post("/add", async (req, res) => {
      const payload = req.body;
      try {
        const posts = new PostModel(payload);
        // await posts.save()
        res.status(200).send(await posts.save());
      } catch (err) {
        res.status(400).send({ msg: "Post is not created", err: err.message });
        
      }
      
    });
  
  
  
  
  
    PostRouter.patch("/update/:id", async (req,res) =>{
      const { id } = req.params;
      const payload = req.body;
      try {
        const update=  await PostModel.findByIdAndUpdate({ _id: id }, payload);
        await update.save()
          res.status(200).send({ msg: " data updated successfully!",update })
      } catch (error) {
        console.error('Error deleting card:', error);
          res.status(500).send({ msg: error.message })
      }

  })
  
  
  
  
  
  PostRouter.delete("/delete/:id", async (req,res) =>{
    const Id = req.params.id;
    try {
        await PostModel.findByIdAndDelete(Id);
        res.json({ success: true, message: 'Card deleted successfully.' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ success: false, error: 'An error occurred while deleting card.' });
    }
  })

    //maximum no. of Comment keep the route as /posts/top
    PostRouter.get('/top', async (req, res) => {
      try {
        
      
        const posts = await PostModel.find({});
        
        const sorted = posts.sort((a, b) => b.no_of_comments - a.no_of_comments);
    
      //**here if want to show the 1 result than put this over res res.send(sorted[i]);
        res.send(sorted);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
      //   console.log(err);
      }
    });


    PostRouter.put('/complete/:id',async(req,res)=>{
      try {
        const task = await PostModel.findById(req.params.id);
        task.completed = true;
        await task.save();
        res.json({ message: 'Task marked as complete' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });


module.exports = {
  PostRouter,
};
