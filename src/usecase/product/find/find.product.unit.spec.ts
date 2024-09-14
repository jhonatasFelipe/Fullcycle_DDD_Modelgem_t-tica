import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product =  ProductFactory.create("a", "Produto 1", 50.00);

const MockProductRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

const input = {
    id: product.id
}


describe("United find product use case",()=>{

    it("Should find a product ", async ()=>{
        const productRepository =  MockProductRepository();

        const useCase  = new FindProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });

    });
});
