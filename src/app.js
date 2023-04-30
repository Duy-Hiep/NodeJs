import express from 'express';
import productRouter from './routes/product.js';
import authRouter from './routes/auth.js';
import categoryRouter from './routes/category.js';
import mongoose from 'mongoose';
import cors from 'cors'

    const app = express();

    app.use(express.json()); 

    app.use(cors());

    app.use(productRouter);
    app.use(authRouter);
    app.use(categoryRouter);
    // đăng ký middleware" giải mã dữ liệu json

    mongoose.connect("mongodb://127.0.0.1:27017/we17302test_React");

    export const viteNodeApp = app;