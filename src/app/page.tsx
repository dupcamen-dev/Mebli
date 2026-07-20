import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Story } from "@/components/sections/Story";
import { Categories } from "@/components/sections/Categories";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Story />
      <Categories />
      <Reviews />
      <Contact />
    </>
  );
}
