import { addToCart } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useAddToCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      menuId,
      size,
    }: {
      menuId: string;
      size: "small" | "medium" | "large";
    }) => addToCart(menuId, size),

    onSuccess: () => {
      // 🔥 Re-fetch cart after successful add
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
