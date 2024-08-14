
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{
 
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {

    let orderModel = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    });

    await OrderItemModel.destroy({
      where : { order_id : entity.id}
    });

    const items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));

 
    await OrderItemModel.bulkCreate(items);

    orderModel = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    });


    await orderModel.update(
      { total: entity.total() },
      { where: { id: entity.id }}
    );

  }

  async find (id: string): Promise<Order> {
    
    let orderModel = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
    });

    let items = orderModel.items.map((item)=>(
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    ));

    return new Order(orderModel.id, orderModel.customer_id,items);
  }


  async findAll(): Promise<Order[]> {
    const foundOrders = await OrderModel.findAll();
     const orders = await Promise.all(foundOrders.map(async (order)=>{
      let orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });

      let items = orderModel.items.map((item)=>(
        new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      ));

      return new Order(order.id, order.customer_id, items);
    }));

    return orders;

  }
}
