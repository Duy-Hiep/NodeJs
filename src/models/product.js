import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        // ri phơ rừn ở bên bảng có tên la Category kieu la ket noi sang cai bảng có tên là Category
    }
});

export default mongoose.model("Products", productSchema);