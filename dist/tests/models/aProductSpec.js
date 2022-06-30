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
const Products_1 = __importDefault(require("../../models/Products"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const product = new Products_1.default();
const request = (0, supertest_1.default)(server_1.default);
describe("Testing products model ", () => {
    it('testing defeinition of products', () => {
        expect(product).toBeDefined();
    });
    it("testing index", () => __awaiter(void 0, void 0, void 0, function* () {
        const products_test = yield product.index();
        expect(products_test).toEqual([]);
    }));
    it("Testing add new Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield product.create({
            name: "rice",
            category: "food",
            price: 17.5
        });
        expect(newProduct).toBe("done");
    }));
    it("updating product test", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete('/products/deleteProduct/6');
        expect(res.status).toEqual(200);
    }));
    it("test deleting product", () => __awaiter(void 0, void 0, void 0, function* () {
        const delete_test = yield product.deleteProduct("1");
        expect(delete_test).toBe("The product is deleted");
    }));
});
