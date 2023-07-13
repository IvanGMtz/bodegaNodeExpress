import  express  from "express";
import { plainToClass } from "class-transformer";
import {user} from '../controller/user.js';
import 'reflect-metadata';

const appValidate = express();

appValidate.use(express.json());
appValidate.use("/", (req, res, next)=>{

    try{
        let data = plainToClass(user, req.body);
        console.log(data);
        next();
    }catch(error){
        res.send(error);
    }
    
})

export default appValidate;