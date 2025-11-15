/**
 * Pizza Builder - Multi-step wizard for creating custom pizza
 */

"use client";

import { useState } from "react";
import Link from "next/link";

import { ChevronLeft, ShoppingCart, X } from "lucide-react";
import { usePizzaBuilder } from "@/hooks/use-pizza-builder";
import { useCart } from "@/hooks/use-cart";

import { StepIndicator } from "@/components/step-indicator";
import { SelectionGrid } from "@/components/selection-grid";
import { Button } from "@/components/ui/button";
import { PizzaBuilderPreview } from "@/components/pizza/pizza-builder-preview";
import { Footer } from "@/components/shared/footer";
import { CHEESES, CRUSTS, SAUCES, SIZES, TOPPINGS } from "@/lib/constants";

const STEPS = ["Size", "Crust", "Sauce", "Cheese", "Toppings", "Review"];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    state,
    setSize,
    setCrust,
    setSauce,
    setCheese,
    addTopping,
    removeTopping,
  } = usePizzaBuilder();
  const { addItem } = useCart();

  const isStepValid = () => {
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
        return true; // Toppings are optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddToCart = () => {
    if (!state.size || !state.crust || !state.sauce || !state.cheese) {
      return;
    }

    const pizzaName = [state.size.name, state.crust.name, state.cheese.name]
      .filter(Boolean)
      .join(" - ");

    const basePrice = 12.99;
    const totalPrice =
      basePrice +
      state.size.priceModifier +
      state.crust.priceModifier +
      state.sauce.priceModifier +
      state.cheese.priceModifier +
      state.toppings.reduce((sum, t) => sum + t.price, 0);

    addItem({
      id: `custom-pizza-${Date.now()}`,
      name: pizzaName,
      price: totalPrice,
      quantity: 1,
      customizations: state,
      time: "50",
    });

    // Redirect to cart
    window.location.href = "/cart";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium text-[#D62828] bg-transparent border py-2 px-4 rounded-sm  inline-block border-[#F2BCBC]  tracking-wider leading-[150%]">
              🎨 Unlimited Combinations
            </p>
            <h1 className="text-2xl md:text-4xl mt-2 md:mt-5 mb-2 font-bold font-lobster text-secondary">
              Create Your Own Pizza
            </h1>
            <p className="text-gray text-xs md:text-sm leading-tight  mt-2">
              Customize your pizza just the way you like it
            </p>
          </div>

          <StepIndicator steps={STEPS} currentStep={currentStep} />

          <div className="flex flex-col-reverse justify-between lg:flex-row-reverse gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-[60%]">
              <div className="bg-card rounded-lg border border-border p-6 md:p-8">
                {/* Step 0: Size */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Choose Your Size
                    </h2>
                    <SelectionGrid
                      items={SIZES}
                      selectedId={state.size?.id}
                      onSelect={setSize}
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
                      items={CRUSTS}
                      selectedId={state.crust?.id}
                      onSelect={setCrust}
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
                      items={SAUCES}
                      selectedId={state.sauce?.id}
                      onSelect={setSauce}
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
                      items={CHEESES}
                      selectedId={state.cheese?.id}
                      onSelect={setCheese}
                    />
                  </div>
                )}

                {/* Step 4: Toppings */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Add Toppings</h2>
                    <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Add up to 10 toppings to your pizza. Toppings are
                        optional.
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      <h3 className="font-semibold text-lg">Meat Toppings</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {TOPPINGS.filter((t) => t.category === "meat").map(
                          (topping) => (
                            <button
                              key={topping.id}
                              onClick={() => {
                                const isSelected = state.toppings.some(
                                  (t) => t.id === topping.id
                                );
                                if (isSelected) {
                                  removeTopping(topping.id);
                                } else if (state.toppings.length < 10) {
                                  addTopping(topping);
                                }
                              }}
                              disabled={
                                !state.toppings.some(
                                  (t) => t.id === topping.id
                                ) && state.toppings.length >= 10
                              }
                              className={`
                              p-3 rounded-lg border-2 transition-all text-left text-sm
                              ${
                                state.toppings.some((t) => t.id === topping.id)
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              }
                              ${
                                !state.toppings.some(
                                  (t) => t.id === topping.id
                                ) && state.toppings.length >= 10
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }
                            `}
                            >
                              <p className="font-semibold">{topping.name}</p>
                              <p className="text-xs text-primary">
                                +${topping.price.toFixed(2)}
                              </p>
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <h3 className="font-semibold text-lg">
                        Vegetable Toppings
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {TOPPINGS.filter((t) => t.category === "vegetable").map(
                          (topping) => (
                            <button
                              key={topping.id}
                              onClick={() => {
                                const isSelected = state.toppings.some(
                                  (t) => t.id === topping.id
                                );
                                if (isSelected) {
                                  removeTopping(topping.id);
                                } else if (state.toppings.length < 10) {
                                  addTopping(topping);
                                }
                              }}
                              disabled={
                                !state.toppings.some(
                                  (t) => t.id === topping.id
                                ) && state.toppings.length >= 10
                              }
                              className={`
                              p-3 rounded-lg border-2 transition-all text-left text-sm
                              ${
                                state.toppings.some((t) => t.id === topping.id)
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              }
                              ${
                                !state.toppings.some(
                                  (t) => t.id === topping.id
                                ) && state.toppings.length >= 10
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }
                            `}
                            >
                              <p className="font-semibold">{topping.name}</p>
                              <p className="text-xs text-primary">
                                +${topping.price.toFixed(2)}
                              </p>
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {state.toppings.length > 0 && (
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p className="text-sm font-semibold mb-3">
                          Selected Toppings:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {state.toppings.map((topping) => (
                            <div
                              key={topping.id}
                              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                            >
                              {topping.name}
                              <button
                                onClick={() => removeTopping(topping.id)}
                                className="hover:opacity-75"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
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
                            <span className="text-muted-foreground">Size:</span>
                            <span className="font-medium">
                              {state.size?.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Crust:
                            </span>
                            <span className="font-medium">
                              {state.crust?.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Sauce:
                            </span>
                            <span className="font-medium">
                              {state.sauce?.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Cheese:
                            </span>
                            <span className="font-medium">
                              {state.cheese?.name}
                            </span>
                          </div>
                          {state.toppings.length > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Toppings:
                              </span>
                              <span className="font-medium">
                                {state.toppings.length}
                              </span>
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
                  className="flex-1 cursor-pointer text-primary border-[#D62828]"
                >
                  Previous
                </Button>

                {currentStep < STEPS.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex-1 bg-[#D62828] hover:bg-[#d62828fd] cursor-pointer"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#D62828] hover:bg-[#d62828fd] cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
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
