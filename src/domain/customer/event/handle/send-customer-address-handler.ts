import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed";

export  class SendCustomerAddressHandler implements EventHandlerInterface<CustomerAddressChangedEvent>{
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente ${event.eventData.id},${event.eventData.name}
                    Alterado para ${event.eventData.Address}`);
    } 
}