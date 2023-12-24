const fs = require('fs');
const slugify = require('slugify');
const productModel = require('../models/productModel');

const createProductController = async (req,res) => {
    try{
        const {name,company,RAM,ROM,front_camera,back_camera,screen,battery,processor} = req.fields;
        const {photo} = req.files;
        //switch
        switch(true){
            case !name :
                return res.status(500).send({
                    success: false,
                    message: "Name is Required"
                })
            case !company :
                return res.status(500).send({
                    success: false,
                    message: "company is Required"
                })
            case !front_camera :
                return res.status(500).send({
                    success: false,
                    message: "front_camera is Required"
                })
            case !back_camera :
                return res.status(500).send({
                    success: false,
                    message: "back_camera is Required"
                })
            case !screen :
                return res.status(500).send({
                    success: false,
                    message: "screen is Required"
                })
            case !battery :
                return res.status(500).send({
                    success: false,
                    message: "battery is Required"
                })
            case !processor :
                return res.status(500).send({
                    success: false,
                    message: "processor is Required"
                })
            case !RAM :
                return res.status(500).send({
                    success: false,
                    message: "RAM is Required"
                })
            case !ROM :
                return res.status(500).send({
                    success: false,
                    message: "ROM is Required"
                })
        }

        const product = new productModel({
            ...req.fields,
            slug: slugify(name),
        })
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save();
        console.log(product);
        res.status(200).send({
            success: true,
            message: "Product created successfully",
            product
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message:"Error while creating a product"
        })
    }
}

//get all products
const getProductController = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .select("-photo")
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "AllProducts ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };


  // get single product
const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo");

      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };

  // get photo
const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };


  // filters
  const productFiltersController = async (req, res) => {
    try {
      const { sort, selectedBrands, selectScreen, processor } = req.body;
      let args = {};

      let sortOption = {};
      if (sort === 'asc') {
        sortOption = { price: 1 }; 
      } else if (sort === 'desc') {
        sortOption = { price: -1 }; 
      }
  
      if (selectedBrands && selectedBrands.length > 0) {
        args.brand = { $in: selectedBrands }; 
      }
      if (selectScreen && selectScreen.length > 0) {
        args.brand = { $in: selectScreen }; 
      }
      if (processor && processor.length > 0) {
        args.brand = { $in: processor }; 
      }
      const products = await productModel.find(args).sort(sortOption);
  
      res.status(200).send({
        status: true,
        message: "Successfully filtered products",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error while filtering products",
        error,
      });
    }
  };
  

module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    productFiltersController
}