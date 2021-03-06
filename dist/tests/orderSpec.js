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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const App = (0, supertest_1.default)(server_1.default);
describe("testing orders route", () => {
    it("testing first endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.get('/orders');
        expect(res.status).toBe(200);
    }));
    // testing current order
    it("testing ocurrent order", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.get('/orders/currentOrder/?user_id=1');
        expect(res.text).toEqual("provide a token");
    }));
    // testing creating order
    it("testing creating endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.post('/orders/create/1');
        expect(res.text).toEqual("provide a token");
    }));
    it("testing deleting end point", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.delete('/orders/deleteOrder/18');
        expect(res.status).toBe(400);
    }));
});
