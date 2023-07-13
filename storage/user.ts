import { Transform, Type, Expose } from "class-transformer";

export class user{
    @Expose({name: "nombre"})
    @Transform(({value})=>{
        let data= /^[a-zA-Z]+$/.test(value)
        if(data && typeof value =="string"){
            return String(value);
        } 
        else{
            throw {status:401, message:"Mira bien el tipo de dato o la sintaxis, error en el nombre"}
        }
    })
    NOM:string;
    @Expose({name: "email"})
    @Transform(({value})=>{
        let data= /^[\w\-]+(\.[\w\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/.test(value)
        if(data && typeof value =="string"){
            return String(value);
        } 
        else{
            throw {status:402, message:"Mira bien el tipo de dato o la sintaxis, error en el email"}
        }
    })
    MAIL:string;
    @Expose({name: "email_verified_at"})
    @Transform(({value})=>{
        let data= /^[\w\-]+(\.[\w\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/.test(value)
        if(data && typeof value =="string"){
            return String(value);
        }else if(value==null){
            return null;
        }else{
            throw {status:403, message:"Mira bien el tipo de dato o la sintaxis, error en el Verificacion del Email"}
        }
    })
    MAILVERI:string;
    @Expose({name: "estado"})
    @Transform(({value})=>{
        let data= /^[0-9]+$/g.test(value)
        if(data && typeof value =="number"){
            return Number(value);
        } 
        else{
            throw {status:404, message:"Mira bien el tipo de dato o la sintaxis, error en el estado"}
        }
    })
    STATE:Number;
    
    constructor(p1:string, p2:string, p3:string, p4:number){
        this.NOM = p1;
        this.MAIL = p2;
        this.MAILVERI = p3;
        this.STATE = p4;

    }
}