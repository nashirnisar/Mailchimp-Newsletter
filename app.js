const express = require("express");
const bodyParser = require("body-Parser");
const request = require("request");
const https = require ("https");
const { post } = require("request");
const { json } = require("body-Parser");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("static"));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/", function(req,res)
{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    let data = {
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }

      }]
    }
    const url = "https://us18.api.mailchimp.com/3.0/lists/14c9f18d1d";
    const options = {
        method:"POST",
        auth: "nashir:20313be8d7a55f59482a7f191551c003-us18",
        headers: {
            "Content-type": "application/json"
        }
    }
    let jsonData = JSON.stringify(data);
    const request = https.request(url, options, function(response)
    {
       
         if (response.statusCode === 200) {
            
            res.sendFile(__dirname + "/success.html");
        } 
        else {
          
            res.sendFile(__dirname + "/failure.html");
        }
    });

    request.on("error", function(error) {
        console.error(error);
          
    console.log(response.statusCode);

        response.on("data", function(data)
        {
            console.log(JSON.parse(data));
        })
    
    })
    request.write(jsonData);
    request.end();

})
app.post("/failure",function(req,res){
    res.redirect("/");
})


const portNum = 3009;
app.listen(process.env.PORT || portNum,function(req,res)
{
    console.log("Server is listening");
})
