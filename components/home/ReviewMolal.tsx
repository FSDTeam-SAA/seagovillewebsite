"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Star } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(3, "Your name must be at least 3 characters."),
  comment: z.string().min(5, "Message must be at least 5 characters."),
  rating: z.number().min(1, "Please select at least 1 star."),
});

const ReviewModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [rating, setRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      comment: "",
      rating: 0,
    },
  });

const onSubmit = async (data: z.infer<typeof formSchema>) => {
  try {
    await createReview(data);
    toast.success("Successfully created review!");
    setOpen(false);
    form.reset();
  } catch (error) {
    toast.error("Failed to submit review");
    console.error(error);
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Rating */}
          <div>
            <p className="mb-1 font-medium">Select Rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer ${
                    star <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setRating(star);
                    form.setValue("rating", star);
                  }}
                />
              ))}
            </div>
            {form.formState.errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.rating.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <Input placeholder="Your Name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <Textarea
              placeholder="Write your message..."
              {...form.register("comment")}
            />
            {form.formState.errors.comment && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.comment.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>

            <Button type="submit">Submit Review</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
