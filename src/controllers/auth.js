import bcrypt from 'bcryptjs'
import User from '../models/auth';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { signupSchema, signInSchema } from '../Schema/auth'; 

// dung để đọc các biến môi trường từ tệp .env và gắn giá trị thành process.env
 dotenv.config();

export const signup = async(req, res) => {
    
    try {
        const{name, email, password, confirmPassword} = req.body
        const {error} = signupSchema.validate(req.body, {abortEarly: false});

        if(error){
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors,
            })
        }

        //kiem tra ton tai email trong User(mongo) không

        const userExits = await User.findOne({email})
        if(userExits){
            return res.status(400).json({
                message: "Email da duoc dang ky"
            })
        }
        
        // ma hoa mat khau truoc khi dua vao mongoDb level10
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name, 
            email,
            password: hashedPassword
        });

        // khi tao xong khong hien thi ra ngoai 
        user.password = undefined;

        const token = jwt.sign({_id: user.id}, process.env.SECRET_KEY, {expiresIn: 60 * 60});

        return res.status(201).json({
            message: "Dang ky thanh cong",
            accessToken: token,
            user,
        });


    } catch (error) {
        console.log(error);
    }
};

export const signIn = async(req, res) => {
    try {
        const{ email, password} = req.body
        const {error} = signInSchema.validate(req.body, {abortEarly: false});

        if(error){
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors,
            })
        }

        //kiem tra ton tai email trong User(mongo) không

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Tai khoan khong ton tai!!!"
            })
        }
        
        // ma hoa mat khau truoc khi dua vao mongoDb level10
        const hashedPassword = await bcrypt.hash(password, user.password)

        if(!hashedPassword){
            return res.status(400).json({
                message: "Mat khau khong khop"
            });
        }
        

        // khi tao xong khong hien thi ra ngoai 
        user.password = undefined;

        const token = jwt.sign({_id: user.id}, process.env.SECRET_KEY, {expiresIn: 60 * 60});

        return res.status(201).json({
            message: "Dang nhap thanh cong",
            accessToken: token,
            user,
        });


    } catch (error) {
        console.log(error);
    }
}

/**
 * Bước 1: Nhận request từ client gửi lên
 * Bước 2: Kiểm tra cú pháp của request
 * Bước 3: Kiểm tra xem email đã tồn tại trong db chưa? nếu tồn tại thì trả về thông báo
 * Bước 4: So sánh mật khẩu từ client gửi lên với mật khẩu trong db
 * Bước 5: Nếu mật khẩu không khớp thì trả về thông báo
 * Bước 6: Tạo token và trả về client bao gồm thông tin user và token
 */