//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-anshum:saket@123@cluster0-k7dse.mongodb.net/schoolUpdatesDB",{ useNewUrlParser: true ,useUnifiedTopology: true });

const schoolUpdatesSchema=({
  title:String,
  content:String
});

const SchoolUpdates=mongoose.model("Update",schoolUpdatesSchema);

app.get("/", function(req, res){
  SchoolUpdates.find({},function(err,updates){
    if(!err){
      res.render("home",{
        updates:updates
      });
    }
  })

});

app.get("/updates",function(req,res){
  res.render("updates");
});

app.get("/contact",function(req,res){
  res.render("contact");
})

app.post("/updates",function(req,res){
  const updateBody= req.body.updateBody;
  const updateTitle=req.body.updateTitle;
  const newUpdate=new SchoolUpdates({
    title:updateTitle,
    content:updateBody
  });
  newUpdate.save();
  res.redirect("/updates");
})



// app.set( 'port', ( process.env.PORT || 3000 ));
//
// // Start node server
// app.listen( app.get( 'port' ), function() {
//   console.log( 'Node server is running on port ' + app.get( 'port' ));
//   });

app.listen(process.env.PORT||3000, function(){
  console.log("Server started on port 3000.");
});
