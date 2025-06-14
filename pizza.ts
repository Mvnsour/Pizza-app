type Pizza = {
  id: number;
  name: string;
  price: number;
}

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
}

let nextPizzaId: number = 1;
let cashInRegister: number = 100;
let nextOrderId: number = 1;

const menu: Pizza[] = [
  { id: nextPizzaId++, name : "Margherita", price: 8 },
  { id: nextPizzaId++, name : "Salmon", price: 15 },
  { id: nextPizzaId++, name : "4 Cheeses", price: 14 },
  { id: nextPizzaId++, name : "Oriental", price: 13 },
  { id: nextPizzaId++, name : "Parisian", price: 10 },
]

const orderQueue: Order[] = [];

function addNewPizza(pizza: Pizza) {
  pizza.id = nextPizzaId++;
  menu.unshift(pizza);
}

function placeOrder(pizzaName: string) : Order | undefined { // added return type for clarity
  const selectedPizza = menu.find(pizza => pizza.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`)
    return;
  }
  cashInRegister+= selectedPizza.price;
  const newOrder: Order = { id: nextOrderId++ ,pizza: selectedPizza, status: "ordered" };
  orderQueue.push(newOrder);
  return newOrder
}

function completeOrder(orderId: number) : Order | undefined {
  const order = orderQueue.find(order => order.id === orderId);
  if (!order) {
    console.error(`Order with ID ${orderId} does not exist`);
    return;
  }
  order.status = "completed";
  return order;
}

function getPizzaDetail(identifier: number | string) : Pizza | undefined {
  if (typeof identifier === "number") {
    return menu.find(pizza => pizza.id === identifier);
  } else if (typeof identifier === "string") {
    return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase());
  } else {
    throw new TypeError(`${identifier} must be a number or a string`);
  }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "Queen", price: 13 })
// completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)