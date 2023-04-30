import Joi from "joi"


export const signupSchema  = Joi.object({
    name : Joi.string(),

    email: Joi.string().email().required().messages({
        "string.base": "Email phai la kieu text",
        "string.email": "Email không đúng định dạng ",
        "string.empty": "Email không được để trống",
        "any.required": "Trường Email là bắt buộc",
    }),

    password: Joi.string().required().min(6).messages({
        "string.base": `"password" phai la kieu "text"`,
        "string.min": "Password phải có ít nhất {#limit} ký tự",
        "string.empty": "Password không được để trống",
        "any.required": "Trường Password là bắt buộc",
    }),

    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.required": "Trường confirmPassword là bắt buộc",
        "any.only": "Password không khớp",
    }),
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email phai la kieu text",
        "string.email": "Email không đúng định dạng ",
        "string.empty": "Email không được để trống",
        "any.required": "Trường Email là bắt buộc",
    }),

    password: Joi.string().required().messages({
        "string.base": `"password" phai la kieu "text"`,
        "string.min": "Password phải có ít nhất {#limit} ký tự",
        "string.empty": "Password không được để trống",
        "any.required": "Trường Password là bắt buộc",
    })
})