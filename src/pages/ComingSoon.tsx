import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ComingSoon = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-background">
        <h1 className="text-4xl font-bold text-foreground mb-4">Coming Soon</h1>
        <p className="text-lg text-muted-foreground">
          We're working hard to bring you this feature. Stay tuned!
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
