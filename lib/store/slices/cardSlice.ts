import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/lib/types";
import { toast } from "sonner";

const API_URL = "/add-cart/add-to-cart";

// Async thunk to add item to cart via API
export const addToCartApi = createAsyncThunk<
  CartItem, 
  { menuId: string; types: "small" | "medium" | "large" }, 
  { rejectValue: string }
>("cart/addToCartApi", async ({ menuId, types }, { rejectWithValue }) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ menu: { menuId, types } }),
    });

    if (!res.ok) {
      const data = await res.json();
      return rejectWithValue(data.message || "Failed to add to cart");
    }

    const data = await res.json();
    toast.success("Added to cart successfully!");
    return {
      _id: menuId,
      size: types,
      quantity: 1,
    } as CartItem;
  } catch (error) {
    return rejectWithValue("Network error");
  }
});

type CartState = {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToCartApi.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.loading = false;

          // If item already exists, increment quantity
          const index = state.cartItems.findIndex(
            (item) =>
              item._id === action.payload._id &&
              item.size === action.payload.size
          );
          if (index === -1) {
            state.cartItems.push(action.payload);
          } else {
            state.cartItems[index].quantity += 1;
          }
        }
      )
      .addCase(addToCartApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
