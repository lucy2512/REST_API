const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//GET Requests

router.get('/ninjas',function(req,res,next){
   /* Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    })*/
    Ninja.aggregate([
        { 
            $geoNear: { 
                near: {
                    type: 'Point', 
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]}, 
                    spherical: true, 
                    maxDistance: 100000, 
                    distanceField: "dist.calculated" } }])
    .then(function(ninjas){ res.send(ninjas); });
});

//POST Requests

router.post('/ninjas',function(req,res,next){
    //Method 1
    // var ninja = new Ninja(req.body);
    // ninja.save();
    //Method 2
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

//PUT Requests

router.put('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
                res.send(ninja);
        });
    });
});

//DELETE Requests

router.delete('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
                res.send(ninja);
        
    });
});


module.exports=router;