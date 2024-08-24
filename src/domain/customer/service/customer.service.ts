

import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import { CustomerAddressChangedEvent } from "../event/customer-address-changed";
import { CustomerCreatedEvent } from "../event/customer-created";
import { SendConsoleLog1Handler } from "../event/handle/send-console-log-1-handler";
import { SendConsoleLog2Handler } from "../event/handle/send-console-log-2-handler";
import { SendCustomerAddressHandler } from "../event/handle/send-customer-address-handler";
import Address from "../value-object/address";
import { v4 as uuid } from "uuid";

export default class customerService{

 public  createCustomer(name:string): Customer{

    const handler = new SendConsoleLog1Handler();
    const handler2 = new SendConsoleLog2Handler();
    const dispatcher =  new EventDispatcher();

    const customer = new Customer(uuid(), name);
    const event = new CustomerCreatedEvent(customer);
    dispatcher.register("CustomerCreatedEvent", handler);
    dispatcher.register("CustomerCreatedEvent", handler2);
    dispatcher.notify(event);
    return customer;
 }


 public  changeClientAddress(customer: Customer, newAddress: Address): void {

    const handler = new SendCustomerAddressHandler();
    const dispatcher =  new EventDispatcher();

    customer.changeAddress(newAddress);
    const event = new CustomerAddressChangedEvent(customer);
    dispatcher.register("CustomerAddressChangedEvent", handler);
    dispatcher.notify(event);
 }

}