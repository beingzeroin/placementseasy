var express = require('express');
var router = express.Router();
var User=require('../models/user');
var body=require('body-parser');
router.route('/api').post(function(req,res)
{
    if(req.body.username==null || req.body.username== '' || req.body.password==null || req.body.password=='' || req.body.email==null || req.body.email=='')
    {
        res.json({success:false, message:'ensure  username,email and password are provided'});
    }
    else
    {
        var user =new User();
    user.username=req.body.username;
        user.password=req.body.password;
        user.email=req.body.email;
    
        user.save(function(err)
         {
            if(err)
            {
                    res.json({success:false, message:'username or email already exists'});
            }
            else
            {
                res.json({success:true, message:'user created'});
            }
        })
    }
})
module.exports = router;