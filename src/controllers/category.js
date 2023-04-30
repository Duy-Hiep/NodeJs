import dotenv from 'dotenv';
import Joi from 'joi';
import Product from '../models/product';
import Category from '../models/category';
import { categorySchema } from '../Schema/category'

dotenv.config();

export const getAll = async(req, res) => {
        try {
            const categories = await Category.find({});
            if(!categories){
                return res.status(400).json({
                    message: "Không tìm thấy  san phẩm nào!!!"
                })
            }

            return res.json({
                message: "Lấy sản phẩm thành công",
                categories
            })
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
}

export const get = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        //lay id cua categories
        // console.log('category:', category);
       

        if(!category){
            return res.status(400).json({
                message: "Khong tìm thấy danh mục!!!"
            })
        }
        
        const products = await Product.find({categoryId: req.params.id});
        // lay tat ca categoryId ở bên models cua product 
        // console.log(Product)
        // return

        // console.log(products);
        return res.json({
            message: "Lấy danh mục thành công",
            category: {
                ...category.toObject(),
                // lay tat ca category va nhung cai minh can la toObject()
                products,
            }
        })

    } catch (error) {
        return res.status(400).json({
            message:error,
        })
    }
}

export const create = async(req, res) => {
    try {
        //validate cua them san pham
        const {error} = categorySchema.validate(req.body);

        if(error){
            return res.status(400).json({
                message: error.details[0].message
            });
        };

        const category = await Category.create(req.body);
        if(!category){
            return res.status(400).json({
                message: "Thêm danh mục không thành công!!!"
            })
        };

        return res.json({
            message: "Thêm danh mục thành công",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}

export const update = async(req, res) => {
    
    try {
        // validate
        const {error} = categorySchema.validate(req.body);
        if(error){
            return res.status(400).json({
                massage: error.details[0].message,
            })
        }

        
        const categories = await Category.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        if(!categories){
            return res.json({
                message: "cap nhat danh muc khong thanh cong"
            })
        }
        return res.json({
            message: "cap nhat danh muc thanh cong",
            categories,
        })
    } catch (error) {
        return res.json(400).json({
            message: error,
        })
    }
};

export const remove = async(req, res) => {
    try {
        const categories = await Category.findByIdAndDelete(req.params.id)
        res.json({
            message: "xoa san pham thanh cong",
            categories,
        });
    } catch (error) {
        return res.json(400).json({
            message: error,
        });
    }
};