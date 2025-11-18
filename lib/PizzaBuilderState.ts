import { Size, Crust, Sauce, Cheese, Topping } from "./types";


export interface PizzaBuilderState {
    size: Size | null;
    crust: Crust | null;
    sauce: Sauce | null;
    cheese: Cheese | null;
    toppings: Topping[];
}
