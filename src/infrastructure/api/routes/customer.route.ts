import express, { Request, Response } from 'express';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CustomerCreateUseCase from '../../../usecase/customer/create/create.customer.usecase';
import ListCustomerUeCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res:Response)=>{

    const useCase =  new CustomerCreateUseCase(new CustomerRepository);

    try{

        const customerDto = {
            name: req.body.name,
            address:{
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip,
            }
        }

        const output = await useCase.execute(customerDto);
        res.send(output);
    }
    catch(err){
        res.status(500).send(err);
    }
});

customerRoute.get("/", async (req: Request, res:Response)=>{
    const useCase =  new ListCustomerUeCase(new CustomerRepository);

    try{
        const output = await useCase.execute({});
        res.send(output);

    }catch(err){
        res.status(500).send(err);
    }
});



