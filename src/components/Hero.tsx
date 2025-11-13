import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroGreetingGif from "@/assets/hero_greeting_gif.mp4";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-20 sm:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-3 lg:grid-cols-2">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Plan events in seconds
            </h1>
            <p className="mb-8 text-xl text-white/90 sm:text-2xl">
              The easiest way to get your guests on the same page
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 justify-center lg:justify-start">
              <Link to="/download">
                <Button variant="secondary" size="lg" className="font-semibold">
                  Get the app
                </Button>
              </Link>
              <Button
                variant="default"
                size="lg"
                className="font-semibold"
                asChild
              >
                <Link to="/create-greeting-card">Create Greeting</Link>
              </Button>
            </div>
          </div>

          {/* Right phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <video
                src={heroGreetingGif}
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-lg rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
