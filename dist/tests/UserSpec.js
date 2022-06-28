"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const user = new Users_1.default();
// describe("testing users routes",()=>{
//     it("defenition",()=>{
//         expect(user).toBeDefined();
//     })
//     it("testing index",async ()=>{
//         const index = await user.index(); 
//         expect(index).toEqual([]);    
//     })
//     it('testing creating new user ',async ()=>{
//         const newUser = await user.create({
//             firstname:"ahmed",
//             lastname:"Ali",
//             password: "mansour"
//         })
//         expect(newUser).toEqual('user is created');
//     })
// })
