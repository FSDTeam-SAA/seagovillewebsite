"use client";
import React, { useState } from "react";

import * as z from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Watch } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createContact } from "@/lib/api";

// In your form schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(25, "Phone number is too long"),
  message: z.string().min(1, "Message is required"),
});
const ContactMessage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationKey: ['contactmutation'],
    mutationFn: createContact, 
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      setLoading(false);
      form.reset(); 
    },
    onError: (error: Error) => {
      toast.error(`${error.message}`);
      setLoading(false);
    }
  });

  // 📌 Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    contactMutation.mutate(values);
  }

  return (
    <section>
      <div className="bg-gray-50 py-10" id="get-in-touch">
        <div className="container mx-auto bg-white rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2">
          
          {/* 📨 Right - Form */}
          <div className="p-10">
            <h2
              className="text-xl md:text-3xl text-primary font-bold mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Send Us a Message
            </h2>

            <p className="text-[#6C757D] mb-6 text-sm md:text-base">
              Fill out the form below and our team will get back to you soon.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Name */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input 
                            className="py-3 rounded-md" 
                            placeholder="Your First Name" 
                            {...field} 
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            className="py-3 rounded-md" 
                            placeholder="Your Last Name" 
                            {...field} 
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            className="py-3 rounded-md" 
                            placeholder="hello@example.com" 
                            {...field} 
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            className="py-3 rounded-md" 
                            placeholder="+1234567890" 
                            {...field} 
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="h-[150px] rounded-md" 
                          placeholder="Write your message here..." 
                          {...field} 
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <div className="flex justify-center w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="border border-yellow-500 cursor-pointer text-white px-6 py-3 rounded-md font-semibold w-full sm:w-auto cursor-pointer transition-all duration-300 bg-[#D62828] hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </Form>
          </div>

          {/* 🗺️ Left Side - Map + Hours */}
          <div className="relative h-96 md:h-auto rounded-l-2xl overflow-hidden space-y-5 p-5">

            {/* Business Hours */}
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-lg shadow">
              <p className="flex items-center gap-2 font-semibold text-lg">
                <Watch className="w-5 h-5" /> Hours of Operation
              </p>

              <div className="mt-3 space-y-2">
                <p className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>11:00 AM - 9:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span>11:00 AM - 10:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday</span>
                  <span>12:00 PM - 8:00 PM</span>
                </p>
              </div>
            </div>

            {/* Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.074548093923!2d-96.56435802369951!3d32.6574602900853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864eb1c92145bb5d%3A0xbac5539819d38cb8!2sStarwood%20Cafe%20-%20Seagoville!5e0!3m2!1sen!2sbd!4v1763161454303!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMessage;