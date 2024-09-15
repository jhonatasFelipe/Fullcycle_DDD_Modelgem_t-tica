import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUeCase from '../../../usecase/product/list/list.product.usecase';

export const productRoutes =  express.Router();


productRoutes.post("/", async (req:Request, res:Response)=>{

    try{
        const useCase = new CreateProductUseCase( new ProductRepository());

        const createProductDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        }
    
        const output  = await  useCase.execute(createProductDto);
    
        res.send(output);
    }catch(err){
        res.status(500).send(err);
    }
   


});


productRoutes.get("/", async (req:Request, res:Response)=>{
    try{
        const useCase = new ListProductUeCase( new ProductRepository());
        const output  = await  useCase.execute({});
    
        res.send(output);
    }catch(err){
        res.status(500).send(err);
    }
});