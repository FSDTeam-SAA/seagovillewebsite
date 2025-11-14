/**
 * Home page - Features hero section and featured pizzas
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Footer } from "@/components/sheard/footer";

import Image from "next/image";
import Navbar from "@/components/sheard/Navbar";
import Hero from "@/components/sheard/Hero";
import SingnaturePizza from "@/components/signaturepiczza/SingnaturePizza";
import CreateOwnPizza from "@/components/home/CreateOwnPizza";
import HotDealsCombos from "@/components/home/HotDealsCombos";
import FAQ from "@/components/sheard/FAQ";
import OurClientSay from "@/components/sheard/OurClientSay";
import Subscribe from "@/components/sheard/Subscribe";

export default function Home() {
  return (
    <div className="">
      
      <Hero />
      <SingnaturePizza />
      <CreateOwnPizza />
      <HotDealsCombos />
      <OurClientSay />
      <FAQ />
      <Subscribe />

    </div>
  );
}
