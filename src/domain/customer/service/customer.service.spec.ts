
import customerService from "./customer.service";
import Address from "../value-object/address";
import { SendConsoleLog1Handler } from "../event/handle/send-console-log-1-handler";
import { SendConsoleLog2Handler } from "../event/handle/send-console-log-2-handler";
import { SendCustomerAddressHandler } from "../event/handle/send-customer-address-handler";
import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";

describe("Order service unit tets", () => {

    it("should created a customer",()=>{
        const service = new customerService();
        const customer = service.createCustomer('Customer1');
        expect(customer.name).toBe("Customer1");
    });

    it("should change the customer address ",()=>{
        const service = new customerService();

        const customer = new Customer(uuid(),'Customer1');
        const address =  new Address(
            "street 1", 1, '30000-000','City1'
        )

        customer.Address = address; 

        const address2 =  new Address(
            "street 2", 2, '32000-000','City2'
        )

        service.changeClientAddress(customer,address2);

        expect(customer.Address).toBe(address2)
    });

});