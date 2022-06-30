import User,{user_type} from "../../models/Users";


const user = new User();

describe("test user model",()=>{
    
    it("defenition",()=>{
        expect(user).toBeDefined();
    })

    it("testing index",async ()=>{
        const index = await user.index(); 
        expect(index).toEqual(index);    
    })
    debugger
    it('testing creating new user ',async ()=>{
        const newUser = await user.create({
            firstname:"ahmed",
            lastname:"Ali",
            password: "mansour"
        })
        expect(newUser).toEqual('user is created');
    })
})
