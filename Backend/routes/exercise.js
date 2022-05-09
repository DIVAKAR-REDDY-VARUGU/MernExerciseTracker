const router = require(`express`).Router();
const Exercise=require(`../models/exercise.model`)
console.clear();
router.get(`/`,(req,res)=>{
    Exercise.find().then((data)=>{res.json(data)})
    .catch((err)=>{res.status(400).json(err)})
})

router.post('/add',(req,res)=>{
    const newExercise=new Exercise(
        {
            username:req.body.username,
            description:req.body.description,
            duration:Number(req.body.duration),
            date:Date(req.body.data)
        }
    );
    newExercise.save().then(()=>{res.json("added successfully ")})
    .catch((err)=>{res.status(400).json(err)})
})

router.get('/:id',(req,res)=>{
    Exercise.findOne({"id":req.params.id})
    .then((data)=>res.json(data))
    .catch((err)=>res.status(400).json(err))
})

router.delete('/:id',(req,res)=>{
    Exercise.deleteOne({"_id":req.params.id})
    .then(()=>res.json("successfully deleted "))
    .catch((err)=>res.status(400).json(err))
})





// router.route("/update/:id").post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then((exercise) => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise
//         .save()
//         .then(() => res.json("Exercise updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });


//   or 


router.post('/update/:id',(req,res)=>{
    Exercise.find({"_id":req.params.id})
    .then((d)=>{
        console.log("we are in update with id ",req.params.id);
        let data={};
        data.username=req.body.username;
        data.description=req.body.description;
        data.duration=Number(req.body.duration);
        //data.date=Date.parse(req.body.date);
        data.date=new Date().toISOString();
        Exercise.updateOne({'_id':req.params.id},data,(err)=>{
                if(err){
                    res.status(400).json(err);
                    // res.status(400).json(err);
                }
                else{
                    res.json("updated sucessfully ...")
                }
                console.log("update is saved with id ",req.params.id);
        })
    })
    .catch((err)=>{res.status(404).json(err)})
})

module.exports = router;