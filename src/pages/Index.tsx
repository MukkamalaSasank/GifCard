import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TrendingECards from "@/components/TrendingECards";
import Explore from "@/components/Explore";
import ECardGallery from "@/components/ECardGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <TrendingECards />
        <Explore />
        <ECardGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
