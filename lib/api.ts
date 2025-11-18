
import { CartItem, MenuItem } from "@/lib/types";
import { toast } from "sonner";
import { CustomizationItem } from "./cusomizetype";
import { da } from "zod/v4/locales";
const api=process.env.NEXT_PUBLIC_API_URL

export async function getFacilities(category: string, page: number) {
  try {
    const queryParams = new URLSearchParams();

    if (category !== "all") {
      queryParams.append("category", category);
    }

    queryParams.append("page", String(page));
    // queryParams.append("limit", String(limit));

    const url = `${api}/menu/all-menus?${queryParams.toString()}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      items: data?.data ?? [],
      meta: data?.meta ?? {},
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching menus: ${error.message}`);
    }
    throw error;
  }
}

export async function fetchPizzaById(id: string) {
  try {
    const res = await fetch(`${api}/menu/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log('fuc',res)

    // if (!res.ok) {
    //   throw new Error("Failed to fetch pizza");
    // }

    const data = await res.json();


    return data || null;
  } catch (error) {
    console.error("Error fetching pizza:", error);
    toast.error("Failed to load pizza details");
    return null;
  }
}


export async function createReview(data: {
  rating: number;
  name: string;
  comment: string;
}) {
  try {
    const res = await fetch(`${api}/review/new-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to submit review (${res.status})`);
    }

    const result = await res.json();
    return result.data ?? [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating review: ${error.message}`);
    }
    throw error;
  }
}


//cart all api




// Get cart items
export const getCartItems = async () => {
  try {
    const res = await fetch(`${api}/add-cart/get-cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    toast.error("Failed to load cart items");
    return [];
  }
};

// Add item to cart
export const addToCart = async (menuId: string, types: "small" | "medium" | "large"): Promise<CartItem | null> => {
  try {
    const res = await fetch(`${api}/add-cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: { menuId, types } }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add to cart");
    }

    const data = await res.json();
    toast.success("Added to cart successfully!");
    return data.item;
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error(error instanceof Error ? error.message : "Failed to add to cart");
    return null;
  }
};

// Increment item quantity
export const incrementCartItem = async (itemId: string): Promise<CartItem | null> => {
  try {
    const res = await fetch(`${api}/add-cart/increment/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to increment item");
    }

    const data = await res.json();
    return data.item;
  } catch (error) {
    console.error("Error incrementing item:", error);
    toast.error("Failed to update quantity");
    return null;
  }
};

// Decrement item quantity
export const decrementCartItem = async (itemId: string): Promise<CartItem | null> => {
  try {
    const res = await fetch(`${api}/add-cart/decrement/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to decrement item");
    }

    const data = await res.json();
    return data.item;
  } catch (error) {
    console.error("Error decrementing item:", error);
    toast.error("Failed to update quantity");
    return null;
  }
};

// Remove item from cart
export const removeCartItem = async (itemId: string): Promise<boolean> => {
  try {
    const res = await fetch(`${api}/add-cart/delete/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to remove item");
    }

    toast.success("Item removed from cart");
    return true;
  } catch (error) {
    console.error("Error removing item:", error);
    toast.error("Failed to remove item");
    return false;
  }
};

// // Clear entire cart
// export const clearCart = async (): Promise<boolean> => {
//   try {
//     // If you have a clear cart endpoint, use it here
//     // Otherwise, we'll handle it client-side by removing all items
//     const cartItems = await getCartItems();
    
//     // Delete all items one by one
//     const deletePromises = cartItems.map(item => removeCartItem(item._id));
//     await Promise.all(deletePromises);
    
//     toast.success("Cart cleared successfully");
//     return true;
//   } catch (error) {
//     console.error("Error clearing cart:", error);
//     toast.error("Failed to clear cart");
//     return false;
//   }
// };



//customize 


export const fetchCustomizationData = async (category: string): Promise<CustomizationItem[]> => {
  try {
    const res = await fetch(`${api}/toppings?category=${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${category}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
};

export const fetchSizes = () => fetchCustomizationData("size");
export const fetchCrusts = () => fetchCustomizationData("crust");
export const fetchSauces = () => fetchCustomizationData("sauce");
export const fetchCheeses = () => fetchCustomizationData("cheese");
export const fetchToppings = () => fetchCustomizationData("topping");


export const fetchToppingsCatagory = async ()=> {
  try {
    const res = await fetch(`${api}/toppings?category=toppings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
 console.log('1',res)
    if (!res.ok) {
      throw new Error(`Failed to fetch `);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching :`, error);
    return [];
  }
};

export const fetchToppingsCategoryFilter = async (type:string) => {
  try {
    const res = await fetch(
      `${api}/toppings?category=toppings&toppingCategory=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch toppings`);
    }

    const data = await res.json();
    console.log('3',data)
    return data?.data ?? [];
  } catch (error) {
    console.error("Error fetching toppings:", error);
    return [];
  }
};



//subscription

export async function subscription(email:string) {
  try{
    const res=await fetch(`${api}/subscription/new-subscription`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email})
    })
    const data= res.json()
    return data;
  }catch(error){
    if(error instanceof Error ){
      throw new Error(`${error}`)
    }
  }
}
