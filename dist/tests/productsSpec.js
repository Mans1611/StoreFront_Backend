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
describe("testing product end point", () => {
    it("testing main root of products", () => __awaiter(void 0, void 0, void 0, function* () {
        const status = yield App.get('/products/');
        expect(status.text).toBe("Products Section");
    }));
    it("testing sending request without a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.post('/products/create/');
        expect(res.text).toEqual("provide a token"); // as it just a requset 
    }));
    it("testing index of product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.get('/products/index');
        expect(res.status).toBe(400);
    }));
    it("testing show spec product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.get('/products/show/1');
        expect(res.text).toBe("provide a token");
    }));
    it("testing category endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.get('/products/category/games');
        expect(res.text).toBe("this category is not found");
    }));
    it("testing popularProducts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.get('/products/popularProducts');
        expect(res.status).toEqual(200);
    }));
    it("testing updating product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.put('/products/update/1');
        expect(res.status).toEqual(400);
    }));
    it("testing deleting product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield App.delete('/products/deleteProduct/1');
        expect(res.text).toEqual(" this product is not exist");
    }));
});
