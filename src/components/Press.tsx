const pressQuotes = [
  {
    quote: "I'd Rather Send a Partiful Invite",
    source: "The New York Times",
  },
  {
    quote: "best solution to the party-invitation problem",
    source: "The Atlantic",
  },
  {
    quote: "Evites are so last decade",
    source: "The Wall Street Journal",
  },
  {
    quote: "This is where my social calendar exists",
    source: "The Washington Post",
  },
  {
    quote: "Partiful is a mainstay of my social life",
    source: "USA Today",
  },
  {
    quote: "the primary party platform",
    source: "The New York Times",
  },
];

const Press = () => {
  return (
    <section className="border-t border-border py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-8">
            {[...pressQuotes, ...pressQuotes].map((item, index) => (
              <div
                key={index}
                className="flex min-w-[300px] flex-col items-start rounded-xl border border-border bg-card p-6"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">
                  "{item.quote}"
                </p>
                <p className="text-xs text-muted-foreground">{item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Press;
