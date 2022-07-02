"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../models/Order"));
const Products_1 = __importDefault(require("../../models/Products"));
const Users_1 = __importDefault(require("../../models/Users"));
/*
some of models need to be in the same file in order to test
them correctly without sync with the other models files
*/
const order = new Order_1.default();
const user = new Users_1.default();
const product = new Products_1.default();
describe('Testing orders', () => {
    it("testing order defenition", () => {
        expect(order).toBeDefined();
    });
    it("testing index", () => __awaiter(void 0, void 0, void 0, function* () {
        const products_test = yield product.index();
        expect(products_test).toBeDefined();
    }));
    it("testing getting orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield order.getAll();
        expect(orders).toEqual([]);
    }));
    it('testing creating new user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield user.create({
            firstname: "mansour",
            lastname: "Ali",
            password: "123123"
        });
        expect(newUser).toEqual('user is created');
    }));
    it("Testing add new Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield product.create({
            name: "order",
            category: "model",
            price: 163.12
        });
        expect(newProduct).toBe("done");
    }));
    it("testing create order", () => __awaiter(void 0, void 0, void 0, function* () {
        let test_order = {
            user_id: "1",
            product_id: "2",
            product_quantity: "4",
            "status": "Active",
            order_id: "1"
        };
        const order_res = yield order.createOrder(test_order);
        expect(order_res).toBe("Order is created");
    }));
    it("deleting order test", () => __awaiter(void 0, void 0, void 0, function* () {
        const delete_order_test = yield order.deleteOrder("1", "1");
        expect(delete_order_test).toBeDefined();
    }));
    it("testing current order", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 1,
            }
        };
        const current_order = yield order.currentOrder(req);
        expect(current_order).toBe(' error in returnning current orders');
        // as i provide no token in the the header as well as no middleware beween them it just a model so it will catch that error.
    }));
    it("deleting a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const delete_res = yield product.deleteProduct("2");
        expect(delete_res).toBe("The product is deleted");
    }));
});
