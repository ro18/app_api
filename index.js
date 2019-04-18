
const express=require('express');

var app= express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

var mongoose=require("mongoose");




//app.use(urlencoded({extended : true}));

 mongoose.connect("mongodb://localhost:27017/track_app");

//var port=8000
var userSchema = new mongoose.Schema({
 email:String,
 pass:String
 });

 var User = mongoose.model("User",userSchema);

 
app.use("/user",function(req,res,next){

  var newUser=new User({
    email:"ro@gmail.com",
    pass:"rosh"
 
  }); 
 User.create(newUser,function(err,newlyCreated){
  if(err){
    console.log("not creating");
  }
  else{
   console.log("added");
  }
})

});

app.post("/verifyuser",function(req,res)
{

  var email=req.body.email;
   var pass=req.body.password;

  User.findOne({email:email,pass:pass},function(err,user){
    //console.log(err);
    //console.log(user);
    if(user==null){
      console.log("not found");
      res.send({'success':false,'message':'Invalid Credentials'})
      
    }
      else {
        
        console.log(user);
        res.send({'success':true,'user':email})
      }
  });
});


app.get("/",function(req,res,next)
{
  res.json([
    {id:1,username:"smbdy",
  id:2,username:'noone' }
  ]);
});

//module.exports
const server=app.listen(3001,()=>{
  const{address,port}=server.address();
  console.log('listening');

})
// app1.listen(port,function(req,rs)

