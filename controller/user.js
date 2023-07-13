var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform, Expose } from "class-transformer";
export class user {
    constructor(p1, p2, p3, p4) {
        this.NOM = p1;
        this.MAIL = p2;
        this.MAILVERI = p3;
        this.STATE = p4;
    }
}
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => {
        let data = /^[a-zA-Z]+$/.test(value);
        if (data && typeof value == "string") {
            return String(value);
        }
        else {
            throw { status: 401, message: "Mira bien el tipo de dato o la sintaxis, error en el nombre" };
        }
    }),
    __metadata("design:type", String)
], user.prototype, "NOM", void 0);
__decorate([
    Expose({ name: "email" }),
    Transform(({ value }) => {
        let data = /^[\w\-]+(\.[\w\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/.test(value);
        if (data && typeof value == "string") {
            return String(value);
        }
        else {
            throw { status: 402, message: "Mira bien el tipo de dato o la sintaxis, error en el email" };
        }
    }),
    __metadata("design:type", String)
], user.prototype, "MAIL", void 0);
__decorate([
    Expose({ name: "email_verified_at" }),
    Transform(({ value }) => {
        let data = /^[\w\-]+(\.[\w\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/.test(value);
        if (data && typeof value == "string") {
            return String(value);
        }
        else if (value == null) {
            return null;
        }
        else {
            throw { status: 403, message: "Mira bien el tipo de dato o la sintaxis, error en el Verificacion del Email" };
        }
    }),
    __metadata("design:type", String)
], user.prototype, "MAILVERI", void 0);
__decorate([
    Expose({ name: "estado" }),
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number") {
            return Number(value);
        }
        else {
            throw { status: 404, message: "Mira bien el tipo de dato o la sintaxis, error en el estado" };
        }
    }),
    __metadata("design:type", Number)
], user.prototype, "STATE", void 0);
