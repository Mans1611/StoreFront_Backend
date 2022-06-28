import User ,{user_type} from "../models/Users"

const user = new User();

describe("testing users routes",()=>{
    it("defenition",()=>{
        expect(user).toBeDefined();
    })

    it("testing index",async ()=>{
        const index = await user.index(); 
        expect(index).toEqual(index);    
    })

    it('testing creating new user ',async ()=>{
        const newUser = await user.create({
            firstname:"ahmed",
            lastname:"Ali",
            password: "mansour"
        })
        expect(newUser).toEqual('user is created');
    })
   
})