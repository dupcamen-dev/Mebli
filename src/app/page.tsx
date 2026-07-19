import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Story } from "@/components/sections/Story";
import { Philosophy } from "@/components/sections/Philosophy";
import { Categories } from "@/components/sections/Categories";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Story />
      <Philosophy />
      <Categories />
      <Reviews />
      <CTA />
      <Contact />
    </>
  );
}
