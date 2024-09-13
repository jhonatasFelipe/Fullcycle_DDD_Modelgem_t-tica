import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create('a',
    "Produto 1",
    20.00 
);

const MockProductRepository = () =>{
    return{
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

const input  = {
    id: product.id,
    name: "Produto 1 updated",
    price: 22.00 
}

describe("Unit test to update products", () =>{
    it("Should to update a product", async ()=>{
        const productRepository = MockProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);

    });
});