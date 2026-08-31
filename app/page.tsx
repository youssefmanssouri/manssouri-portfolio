import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { WhyWorkWithMe } from "@/components/sections/why-work-with-me";
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
      <WhyWorkWithMe />
      <Process />
      <FAQ />
      <About />
      <Contact />
    </>
  );
}

