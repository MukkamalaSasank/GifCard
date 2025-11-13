import { Sparkles, Type, Wand2, Image as ImageIcon } from "lucide-react";

const features = [
  { icon: Sparkles, label: "Backgrounds" },
  { icon: Type, label: "Fonts" },
  { icon: Wand2, label: "Animations" },
  { icon: ImageIcon, label: "Posters" },
];

const Features = () => {
  return (
    <section className="bg-gradient-to-b from-background via-purple/5 to-background py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Fun, modern invites in 1-click
          </h2>
          <p className="mb-10 text-lg text-gray-700 sm:text-xl">
            100% free, no paywalls. Customize the perfect invite.
          </p>

          {/* Feature tabs */}
          <div className="mb-14 flex flex-wrap justify-center gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.label}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:border-purple-400 hover:bg-purple-50"
                >
                  <Icon className="h-4 w-4" />
                  {feature.label}
                </button>
              );
            })}
          </div>

          {/* E-card showcase */}
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-pink/20 to-purple/20 p-6 sm:p-10">
            <div className="aspect-[5/4] w-full rounded-2xl bg-gradient-to-br from-pink via-purple to-magenta shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
