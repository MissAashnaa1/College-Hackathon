// const express = require('express');
// const router = express.Router();
const fs = require('fs');
const verificaltionConfirmationEmail = require('./verificationConfirmationMail');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"

const verifyMail = (req,res)=>{

    const token = req.params.token;
    console.log(token," <<<<")

    let flag = false;

    fs.readFile(__dir+"/data.json",'utf-8',(error,data)=>{
        let theFile;
        if(data.length === 0) theFile = [];
        else theFile = JSON.parse(data);
        
        for(let i = 0 ; i < theFile.length;i++){
            if(theFile[i].mailToken == token){
                flag = true;

                theFile[i].isVerified = true;
                req.session.is_logged_in = true;
                req.session.email = theFile[i].email;
                req.session.username = theFile.username;

                verificaltionConfirmationEmail(theFile[i].email);

                fs.writeFile(__dir +'/data.json',JSON.stringify(theFile),(err)=>{
                    console.log('data.json updated->"verifyEmailFSwrite", verifyMail.js')
                })
                // res.redirect("/home");
                res.end();
            }
        }
        if(!flag){
            res.render('root', { loggedOut:-1, msg:"Error occured!"});
        }
    })
}

module.exports = verifyMail;