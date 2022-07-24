const router = require(`express`).Router();
const User=require(`../models/user.model`);
router.get('/', (req,res)=>{
    User.find()
    .then((data)=>{
        console.log(data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(400).json(` error in connection `+err);
    })
})
router.post('/add',(req,res)=>{
    const username=req.body.username
    const newUser=new User({username});
    newUser.save().then(()=>{res.json("added successfully... ")})
    .catch((err)=>{res.status(400).json(err)})
})


module.exports = router;