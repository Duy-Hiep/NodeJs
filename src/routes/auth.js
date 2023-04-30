import  express from "express";
import { Router } from "express";
import {signup, signIn} from '../controllers/auth'

const router = Router();
router.post("/signup", signup);
router.post("/signin", signIn);


export default router