const express = require('express');
const imagerouter = express.Router();

const imagemodel = require('../model/imagemodel');

imagerouter.get('/', (req,res)=> {
	console.log("Image router default page calls");
	res.status(200).send("hello");
},(error) =>{
	console.log(error);
	res.status(500);
});

imagerouter
	.route('/uploadimage')
  		.post(function (request, response) {

    console.log('Upload images');
    console.log(request.body);
	
	var image = new imagemodel (request.body);
	
	image.save();
    response.status(201).send(image);
	});
	
imagerouter
	.route('/getimage')
		.get(function (request,response) {
			imagemodel.find({} ,(error,image) => {
				if(error){
					response.status(500).send(error);
				}
				console.log(image);
				response.status(200).json(image);
			})
	});
module.exports = imagerouter;