import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test to find product",()=>{

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
    
    it("Should find a product", async ()=>{

        const  repository =  new ProductRepository();

        const product = ProductFactory.create('a',"Product 1", 20.00);
        await repository.create(product);

        const useCase = new FindProductUseCase(repository);
        const input = {
            id: product.id,
            name:"Product 1",
            price: 20.00
        }

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })
})