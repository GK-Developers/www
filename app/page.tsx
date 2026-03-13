import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import Security from "@/components/Security";
import Install from "@/components/Install";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Architecture />
        <Security />
        <Install />
      </main>
      <Footer />
    </>
  );
}
