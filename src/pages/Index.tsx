import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Press from "@/components/Press";
import TrendingECards from "@/components/TrendingECards";
import ECardGallery from "@/components/ECardGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Press />
        <TrendingECards />
        <ECardGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
