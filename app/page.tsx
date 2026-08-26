import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <Process />
      <FAQ />
      <About />
      <Contact />
    </>
  );
}
