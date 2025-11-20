
import { CartItem, MenuItem } from "@/lib/types";
import { toast } from "sonner";
import { CustomizationItem } from "./cusomizetype";


const api = process.env.NEXT_PUBLIC_API_URL

export async function getFacilities(category: string, page: number) {
  console.log('test ca',category)
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
export async function getallDataForCatagory() {
 
  try {
    
    const res = await fetch(`${api}/menu/all-menus`);
    const data = await res.json();

    return {
      items: data?.data ?? [],
     
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching menus: ${error.message}`);
    }

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


// review
export async function getAllReview() {
  try {
    const res = await fetch(`${api}/review`, {
      method: "GET",
      headers: {
        "content-Type": "application/json"
      }
    })
    const data = res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`)
    }
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
    return data.data || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    toast.error("Failed to load cart items");
    return [];
  }
};

// Add item to cart
export const addToCart = async (menuId: string, types: "small" | "medium" | "large"): Promise<CartItem | null> => {
  try {
    const type = 'menu';
    const res = await fetch(`${api}/add-cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menu: { menuId, types },
        type
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add to cart");
    }

    const data = await res.json();
    // toast.success("Added to cart successfully!");
    return data.item;
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error(error instanceof Error ? error.message : "Failed to add to cart");
    return null;
  }
};

// Custom order creation
export const customOrder = async (orderData: {
  size: string;
  crust: string;
  sauce: string;
  cheese: string;
  toppings: Array<{ toppingId: string; category: string }>;
}) => {
  try {
    const res = await fetch(`${api}/own-pizza/create-new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create custom pizza");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating custom pizza:", error);
    throw error;
  }
};

// Add custom pizza to cart
export const CustomaddToCart = async (ownPizzaId: string) => {
  try {
    const res = await fetch(`${api}/add-cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownPizzaId,
        type: "ownPizza"
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add to cart");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
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


export const fetchToppingsCatagory = async () => {
  try {
    const res = await fetch(`${api}/toppings?category=toppings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('1', res)
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

export const fetchToppingsCategoryFilter = async (type: string) => {
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
    console.log('3', data)
    return data?.data ?? [];
  } catch (error) {
    console.error("Error fetching toppings:", error);
    return [];
  }
};



//subscription

export async function subscription(email: string) {
  try {
    const res = await fetch(`${api}/subscription/new-subscription`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    })
    const data = res.json()
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`)
    }
  }
}

//contact 

export async function createContact({
  firstName,
  lastName,
  email,
  phone,
  message
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    const requestBody = {
      firstName,
      lastName,
      email,
      phone,
      message
    };

    console.log('Sending request body:', requestBody);
    const res = await fetch(`${api}/contact/send-message`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', res.status);


    if (!res.ok) {
      let errorMessage = `Request failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {

        errorMessage = res.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await res.json();
    console.log('Success response:', data);

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }
}


// copincode 

export async function getCopons() {
  try {
    const res = await fetch(`${api}/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      }
    })
    const data = res.json()
    return  data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`)
    }
  }

}


// order

// In your api.ts file
export interface NewOrderPayload {
  type: string;
  couponCode?: string;
  cart: Array<{
    cartId: string;
    quantity: number;
    totalPrice: number;
  }>;
  deliveryDetails: {
    fullName: string;
    email: string;
    address: string;
    phone: string;
    note: string;
  };
}

export async function newOrder(orderData: NewOrderPayload) {
  try {
    const res = await fetch(`${api}/order/new-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to place order");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
}

//payment  
export async function payment(orderId: string) {
  try {
    const res = await fetch(`${api}/payment/new-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to place order");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
}


// cupone 

export async function getCupone() {
  try {
    const res = await fetch(`${api}/coupons`, {
      method: "GET",
      headers: {
        'Content-Type': "aplication/json",
      },

    })
    const data = await res.json();
    return data?.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`)
    }
  }

}


// export async function claimCoupan(data) {
//   try {
//     const res = await fetch(`${api}/coupons/new-coupon`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     return await res.json();
//   } catch (error) {
//     throw error;
//   }
// }
