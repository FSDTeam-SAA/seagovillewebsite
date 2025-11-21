/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { usePizzaBuilder } from "@/hooks/use-pizza-builder";
import { useCustomizationData } from "@/hooks/use-customization-data";
import { StepIndicator } from "@/components/step-indicator";
import { SelectionGrid } from "@/components/selection-grid";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PizzaBuilderPreview } from "@/components/pizza/pizza-builder-preview";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CustomaddToCart,
  customOrder,
  fetchToppingsCatagory,
  fetchToppingsCategoryFilter,
} from "@/lib/api";
import { CustomizationItem } from "@/lib/cusomizetype";
import Image from "next/image";

const STEPS = ["Size", "Crust", "Sauce", "Cheese", "Toppings", "Review"];

export default function PizzaBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [orderId, setOrderId] = useState("");

  const {
    state,
    setSize,
    setCrust,
    setSauce,
    setCheese,
    addTopping,
    removeTopping,
  } = usePizzaBuilder();

  const { sizes, crusts, sauces, cheeses, loading, error } =
    useCustomizationData();

  // console.log("state data ", state);

  // Fetch topping categories
  const { data: toppingCategoriesData } = useQuery({
    queryKey: ["topping-categories"],
    queryFn: fetchToppingsCatagory,
  });

  // Fetch toppings by selected category
  const { data: toppingsData } = useQuery({
    queryKey: ["toppings", selectedCategory],
    queryFn: () => fetchToppingsCategoryFilter(selectedCategory),
    enabled: !!selectedCategory,
  });

  const toppingCategories = toppingCategoriesData?.categories || [];
  const toppings = toppingsData?.data || [];

  // Initialize selected category when data is available
  useEffect(() => {
    if (toppingCategories.length > 0 && !selectedCategory) {
      // Use setTimeout to avoid synchronous state update in effect
      const timer = setTimeout(() => {
        setSelectedCategory(toppingCategories[0]);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [toppingCategories, selectedCategory]);

  // Alternative approach: Initialize in state directly
  const initialSelectedCategory =
    toppingCategories.length > 0 ? toppingCategories[0] : "";
  const effectiveSelectedCategory = selectedCategory || initialSelectedCategory;

  // Custom order mutation
  const customOrderMutation = useMutation({
    mutationFn: customOrder,
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create custom pizza");
    },
    onSuccess: (data) => {
      setOrderId(data?.data?._id);
      // console.log("custorm order data", data?.data?._id);
      // console.log("custorm order data 2", data);
    },
  });

  // Custom cart mutation
  const customCartMutation = useMutation({
    mutationFn: CustomaddToCart,
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add to cart");
    },
    onSuccess: (data) => {
      toast.success("Added to cart successfully!");
      window.location.href = "/cart";
    },
  });

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0:
        return !!state.size;
      case 1:
        return !!state.crust;
      case 2:
        return !!state.sauce;
      case 3:
        return !!state.cheese;
      case 4:
        return true;
      case 5:
        return !!orderId;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep === 4) {
      // When moving from Toppings to Review, create the custom order
      if (!state.size || !state.crust || !state.sauce || !state.cheese) {
        toast.error("Please complete all required selections");
        return;
      }

      try {
        // Prepare the order data in the required format
        const orderData = {
          size: state.size._id,
          crust: state.crust._id,
          sauce: state.sauce._id,
          cheese: state.cheese._id,
          toppings: state.toppings.map((topping) => ({
            toppingId: topping._id,
            category: topping.category,
          })),
        };

        await customOrderMutation.mutateAsync(orderData);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        // Error is handled in the mutation
        return;
      }
    } else if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddToCart = () => {
    if (!orderId) {
      toast.error("Please complete your pizza customization first");
      return;
    }

    customCartMutation.mutate(orderId);
  };

  // Loading state for main customization data
  if (loading) {
    return (
      <div className="flex container mx-auto  flex-col min-h-screen bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Loading customization options...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium text-[#D62828] bg-transparent border py-2 px-4 rounded-sm inline-block border-[#F2BCBC] tracking-wider leading-[150%]">
              🎨 Unlimited Combinations
            </p>
            <h1 className="text-2xl md:text-4xl mt-2 md:mt-5 mb-2 font-bold text-[#D62828]">
              Create Your Own Pizza
            </h1>
            <p className="text-gray-600 text-xs md:text-sm leading-tight mt-2">
              Customize your pizza just the way you like it
            </p>
          </div>

          <StepIndicator steps={STEPS} currentStep={currentStep} />

          <div className="flex flex-col-reverse justify-between lg:flex-row-reverse gap-8">
            {/* Main Content */}
            <div className="w-[90%] mx-auto lg:w-[60%]">
              <div className="bg-card rounded-lg border border-border p-6 md:p-8">
                {/* Step 0: Size */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 font-lobster">
                      Choose Your Size
                    </h2>
                    <SelectionGrid
                      items={sizes}
                      selectedId={state.size?._id}
                      onSelect={(item) => setSize(item as any)}
                    />
                  </div>
                )}

                {/* Step 1: Crust */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Choose Your Crust
                    </h2>
                    <SelectionGrid
                      items={crusts}
                      selectedId={state.crust?._id}
                      onSelect={(item) => setCrust(item as any)}
                    />
                  </div>
                )}

                {/* Step 2: Sauce */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Choose Your Sauce
                    </h2>
                    <SelectionGrid
                      items={sauces}
                      selectedId={state.sauce?._id}
                      onSelect={(item) => setSauce(item as any)}
                    />
                  </div>
                )}

                {/* Step 3: Cheese */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Choose Your Cheese
                    </h2>
                    <SelectionGrid
                      items={cheeses}
                      selectedId={state.cheese?._id}
                      onSelect={(item) => setCheese(item as any)}
                    />
                  </div>
                )}

                {/* Step 4: Toppings */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Add Toppings</h2>

                    {/* Category Selection */}
                    <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                      <h3 className="font-semibold mb-3">
                        Choose Topping Category
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {toppingCategories.map((category: string) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                              px-4 py-2 rounded-full text-sm font-medium transition-all border
                              ${
                                effectiveSelectedCategory === category
                                  ? "bg-[#D62828] text-white border-[#D62828]"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-[#D62828] hover:text-[#D62828]"
                              }
                            `}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Toppings Grid */}
                    {effectiveSelectedCategory && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">
                          {effectiveSelectedCategory} Toppings
                        </h3>

                        {toppings.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            No toppings available in this category
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            {toppings?.map((topping: CustomizationItem) => {
                              const isSelected = state.toppings.some(
                                (t) => t._id === topping._id
                              );
                              const isDisabled =
                                !isSelected && state.toppings.length >= 10;

                              return (
                                <button
                                  key={topping._id}
                                  onClick={() => {
                                    if (isSelected) {
                                      removeTopping(topping._id);
                                    } else if (state.toppings.length < 10) {
                                      addTopping(topping as any);
                                    }
                                  }}
                                  disabled={isDisabled || !topping.isAvailable}
                                  className={`
                                    p-3  border-2 transition-all rounded-none text-left text-sm
                                    ${
                                      isSelected
                                        ? "border-[#D62828] bg-[#D62828]/10"
                                        : "border-gray-200 hover:border-[#D62828]/50"
                                    }
                                    ${
                                      isDisabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }
                                    ${
                                      !topping.isAvailable
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }
                                  `}
                                >
                                  {topping?.image?.url && (
                                    <Image
                                      src={topping?.image?.url}
                                      alt="topping image"
                                      width={60}
                                      height={60}
                                      className=" object-cover"
                                    />
                                  )}

                                  <p className="font-semibold">
                                    {topping.name}
                                  </p>
                                  <p className="text-xs text-[#D62828]">
                                    +${topping.price.toFixed(2)}
                                  </p>
                                  {!topping.isAvailable && (
                                    <p className="text-xs text-red-500">
                                      Out of Stock
                                    </p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Selected Toppings Display */}
                    {state.toppings.length > 0 && (
                      <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-sm font-semibold mb-3">
                          Selected Toppings ({state.toppings.length}/10):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {state.toppings.map((topping) => (
                            <div
                              key={topping._id}
                              className="inline-flex items-center gap-2 bg-[#D62828] text-white px-3 py-1 rounded-full text-sm"
                            >
                              {topping.name}
                              <button
                                onClick={() => removeTopping(topping._id)}
                                className="hover:opacity-75 transition-opacity"
                                aria-label={`Remove ${topping.name}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Instructions */}
                    {!effectiveSelectedCategory &&
                      toppingCategories.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Loading topping categories...
                        </div>
                      )}
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Review Your Pizza
                    </h2>
                    <div className="space-y-6">
                      <div className="p-6 bg-secondary/50 rounded-lg">
                        <h3 className="font-semibold mb-4">Your Selections</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <div className="flex gap-1">
                              <span className="text-muted-foreground">
                                Size:
                              </span>
                              <span className="font-medium">
                                {state.size?.name}
                              </span>
                            </div>
                            <div>
                              {state?.size?.price
                                ? `$${state.size.price.toFixed(2)}`
                                : "Include"}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex gap-1">
                              <span className="text-muted-foreground">
                                Crust:
                              </span>
                              <span className="font-medium">
                                {state?.crust?.name}
                              </span>
                            </div>
                            <div>
                              {state?.crust?.price
                                ? `$${state.crust.price.toFixed(2)}`
                                : "Include"}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex gap-1">
                              <span className="text-muted-foreground">
                                Sauce:
                              </span>
                              <span className="font-medium">
                                {state.sauce?.name}
                              </span>
                            </div>
                            <div>
                              {state?.sauce?.price
                                ? `$${state.sauce.price.toFixed(2)}`
                                : "Include"}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex gap-1">
                              <span className="text-muted-foreground">
                                Cheese:
                              </span>
                              <span className="font-medium">
                                {state.cheese?.name}
                              </span>
                            </div>
                            <div>
                              {state?.cheese?.price
                                ? `$${state.cheese.price.toFixed(2)}`
                                : "Include"}
                            </div>
                          </div>
                          {state.toppings.length > 0 && (
                            <div>
                              <div className="flex justify-between mb-2">
                                <div>
                                  <span className="text-muted-foreground">
                                    Toppings: (
                                    <span className="font-medium">
                                      {state.toppings.length}
                                    </span>
                                    )
                                  </span>
                                  <div className="text-xs text-muted-foreground">
                                    {state.toppings
                                      .map((t) => t.name)
                                      .join(", ")}
                                  </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  $
                                  {state.toppings
                                    .reduce(
                                      (total, topping) => total + topping.price,
                                      0
                                    )
                                    .toFixed(2)}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm">
                        Ready to add this pizza to your cart?
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="flex-1 text-[#D62828] rounded-none border-[#D62828] hover:bg-[#D62828]/5"
                >
                  Previous
                </Button>

                {currentStep < STEPS.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid() || customOrderMutation.isPending}
                    className="flex-1 bg-[#D62828] hover:bg-[#b81e1e] rounded-none text-white"
                  >
                    {customOrderMutation.isPending && currentStep === 4
                      ? "Creating..."
                      : "Next"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    disabled={customCartMutation.isPending}
                    className="flex-1 bg-[#D62828] rounded-none hover:bg-[#b81e1e] text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {customCartMutation.isPending ? "Adding..." : "Add to Cart"}
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar Preview */}
            <div className="lg:w-[30%] w-full">
              <div className="sticky top-24">
                <PizzaBuilderPreview state={state} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
