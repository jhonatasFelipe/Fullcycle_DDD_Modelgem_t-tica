import CreateProductUseCase from "./create.product.usecase";


const MockProductRepository = () =>{
    return{
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

const input  = {
    type: "a",
    name: "Produto 1",
    price: 20.00 
}

describe("Unit test to create products",  ()=>{
    it("Should to create a product", async ()=>{
        const productRepository = MockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id : expect.any(String),
            name: input.name,
            price: input.price
        });

    });
});