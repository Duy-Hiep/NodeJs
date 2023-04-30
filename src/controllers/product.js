import axios from "axios";
import dotenv from "dotenv";
import Joi from "joi";
import Product from "../models/product.js"
import { productSchema } from "../Schema/product.js";

dotenv.config();



export const getAll = async(req, res) => {
    try {
       const products = await Product.find();
        console.log(products);
        if(products.length === 0){
            return res.status(400).json({
                massage: "Khong co san pham nao!!!"
            });
        }

        return res.json({
            message: "Lay danh sach san pham thanh cong",
            products,
        })
    } catch (error) {
        return res.status(400).json({
            massage:error,
        });
    };
  
};

export const get = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId")
        // lay 1 san pham theo id va populate la lay tât ca categoryId ở bên bảng category
        if(!product){
            return res.json({
                message: "Khong tim thay san pham",
            });
        }
        return res.json({
            message: "Lay san pham thanh cong",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const create = async(req, res) => {
    try {
        // validate
        const {error} = productSchema.validate(req.body);
        
        if(error){
            return res.status(400).json({
                massage: error.details[0].message,
            });
        }
      
        const product = await Product.create(req.body)
            if(!product){
                return res.json({
                    massage: "them san pham khong thanh cong!!!"
                });
            }
            return res.json({
                message: "them san pham thanh cong",
                product,
            });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const update = async(req, res) => {
    
    try {
        // validate
        const {error} = productSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                massage: error.details[0].message,
            })
        }

        
        const product = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        if(!product){
            return res.json({
                message: "cap nhat san pham khong thanh cong"
            })
        }
        return res.json({
            message: "cap nhat san pham thanh cong",
            product,
        })
    } catch (error) {
        return res.json(400).json({
            message: error,
        })
    }
};

export const remove = async(req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id)
        res.json({
            message: "xoa san pham thanh cong",
            product,
        });
    } catch (error) {
        return res.json(400).json({
            message: error,
        });
    }
};