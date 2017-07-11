var express = require('express');
var router = express.Router();
var User=require('../models/user');
var body=require('body-parser');
router.route('/api').post(function(req,res)
{
  // console.log("in login route");
   User.findOne({username:req.body.username}).select('email username password').exec(function(err,user)
   {
        if(err)
            throw err;
        if(!user)
        {
            res.json({success:false,message:'Could not authenticate user'});

        }
        else if(user)
        {
            if(req.body.password)
            {
                if(user.password==req.body.password)
                    res.json({success:true,message:'User authenticated'});

                else
                    res.json({success:false,message:'Could not authenticate password'});
            }
            else
                res.json({success:false,message:'No password provided'});       
        }


    });



});
module.exports = router;