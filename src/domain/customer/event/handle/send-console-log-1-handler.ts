import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created";

export  class SendConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log")
    } 
}