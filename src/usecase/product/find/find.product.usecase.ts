import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputCreateProductDto } from "../create/create.product.dto";
import { InputFindProductDto } from "./find.product.dto";

export default class UpdateProductUseCase{
    private productRepository: ProductRepositoryInterface

    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: InputFindProductDto): Promise<OutputCreateProductDto>{

        const product = await this.productRepository.find(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}