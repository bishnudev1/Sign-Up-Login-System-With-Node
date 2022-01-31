const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");


require("./db/conn");

const Register = require("./models/registers");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" )
const template_path = path.join(__dirname, "../templates/views" )
const partials_path = path.join(__dirname, "../templates/partials" )

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)

app.get("/",(req,res) => {
    res.render("index");
});

app.get("/register",(req,res) => {
    res.render("register");
});

app.get("/login",(req,res) => {
    res.render("login");
});

app.get("/forget",(req,res) => {
    res.render("forget");
});

app.post("/register", async (req,res) => {
    try {
        const registerUser = new Register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const registered = await registerUser.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login", async (req,res) => {
  try {
      const email = req.body.email;
      const password = req.body.password;

      const useremail = await Register.findOne({email:email});
      
      if(useremail.password === password) {
          console.log(useremail.password);
        //   res.send(201).render("index");
        res.render("index");
        // res.status(201).send("Logged in successfully");
      }
      else{
          res.send("Wrong Password Entered");
          console.log("Noob check the code again");
      }

  } catch (error) {
      res.status(400).send("Invalid user email");
  }
});

app.post("/forget", async (req,res) => {
    try {
        const email = req.body.email;
        const useremail = await Register.findOne({email:email});
        
        if(useremail.email === email){
            // console.log(useremail.email);
            res.status(201).send(`Your iBlog Password is : ${useremail.password}`);
        }
        else{
            res.send("Incorrect email");
        }
    } catch (error) {
        res.status(400).send("You are a noob");
    }
});
 
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});