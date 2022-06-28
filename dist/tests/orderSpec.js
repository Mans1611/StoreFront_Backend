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
const Order_1 = __importDefault(require("../models/Order"));
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
const order = new Order_1.default();
describe('Testing orders', () => {
    it("testing order defenition", () => {
        expect(order).toBeDefined();
    });
    it("create new order", () => __awaiter(void 0, void 0, void 0, function* () {
        let test_order = {
            user_id: '4',
            product_id: '7',
            product_quantity: 1,
            status: "Active"
        };
        // const server = await request.post('/orders/create/7');
        const res = yield order.createOrder(test_order);
        expect(res).toBe("Order is created ");
    }));
});
