const express =require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const app = express()
const UserModel = require("./models/Users")
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())
mongoose.connect('mongodb+srv://ezadinbadru55:esu0940715427@cluster0.qortey9.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');


mongoose.connect("mongodb://127.0.0.1:27017/crud")
app.get("/",(req,res)=>{
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.delete("/deleteUser/:id",(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(500).json(err));
})

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email, age: req.body.age },
      { new: true } // Return the updated document
    )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  });
  
app.get("/getUser/:id",(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server running");
})




