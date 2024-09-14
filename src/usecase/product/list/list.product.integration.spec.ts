import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUeCase from "./list.product.usecase";

describe("Integration test to update product",()=>{

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
    
    it("Should update a product", async ()=>{

        const  repository =  new ProductRepository();

        const product1 = ProductFactory.create('a',"Product 1", 20.00);
        await repository.create(product1);

        const product2 = ProductFactory.create('b',"Product 2", 30.00);
        await repository.create(product2);

        const useCase = new ListProductUeCase(repository);

        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })
})