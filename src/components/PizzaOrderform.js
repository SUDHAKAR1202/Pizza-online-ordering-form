import React, { useState,  useEffect } from "react";

const PizzaOrderform = () => {
  const [order, setOrder] = useState({
    size: "Small",
    crust: "Thin",
    toppings: [],
    sides: [],
    quantity: 1,
  });

  const prices = {
    size: { Small: 100, Medium: 150, Large: 200 },
    toppings: { Cheese: 20, Paneer: 30, Olives: 25 },
    sides: { Coke: 40, Dip: 25 },
  };

  const [total, setTotal] = useState(0);

  useEffect(()=> {
    let cost = prices.size[order.size];

    order.toppings.forEach((t)=> (cost += prices.toppings[t]));
    order.sides.forEach((s) => (cost += prices.sides[s]));

    cost *= order.quantity;
    setTotal(cost);
  }, [order]);

  const toggleItem = (type, value) => {
    const list = order[type];
    setOrder({
        ...order,
        [type]: list.includes(value)
        ? list.filter((i) => i !== value)
        : [...list, value],
    });
  };
  return (
    <div className="p-4 border rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Mario's Pizza</h2>

        <select
        onChange={(e)=> setOrder({ ...order, size: e.target.value })}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
        </select>

        <select
        onChange={(e)=> setOrder({ ...order, crust: e.target.value})}>
            <option>Thin</option>
            <option>Cheese Burst</option>
        </select>

        <div>
        <p>Toppings:</p>
        {Object.keys(prices.toppings).map((t) => (
          <label key={t}>
            <input
              type="checkbox"
              onChange={() => toggleItem("toppings", t)}
            />
            {t}
          </label>
        ))}
      </div>

      <div>
        <p>Sides:</p>
        {Object.keys(prices.sides).map((s) => (
          <label key={s}>
            <input
              type="checkbox"
              onChange={() => toggleItem("sides", s)}
            />
            {s}
          </label>
        ))}
      </div>

      <input
        type="number"
        value={order.quantity}
        min="1"
        onChange={(e) =>
          setOrder({ ...order, quantity: Number(e.target.value) })
        }
      />

      <h3>Total: ₹{total}</h3>

      <div className="mt-3">
        <h4>Order Summary</h4>
        <p>Size: {order.size}</p>
        <p>Crust: {order.crust}</p>
        <p>Toppings: {order.toppings.join(", ")}</p>
        <p>Sides: {order.sides.join(", ")}</p>
        <p>Qty: {order.quantity}</p>
      </div>

      <button
        onClick={() => alert("Order Placed Successfully!")}
        className="bg-green-500 text-white px-3 py-1 mt-2"
      >
        Place Order
      </button>

      <button
        onClick={() =>
          setOrder({ size: "Small", crust: "Thin", toppings: [], sides: [], quantity: 1 })
        }
        className="ml-2 bg-gray-400 px-3 py-1"
      >
        Reset
      </button>

    </div>
  );
};

export default PizzaOrderform;
