import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define a proper type for e-card objects
interface ECard {
  id: number;
  title: string;
  category: string;
  image?: string; // optional since it’s added later
}

const trendingECards: ECard[] = [
  { id: 1, title: "Happy Birthday", category: "Birthday" },
  { id: 2, title: "Congratulations", category: "Celebration" },
  { id: 3, title: "Thank You", category: "Gratitude" },
  { id: 4, title: "Get Well Soon", category: "Wellness" },
  { id: 5, title: "Happy Anniversary", category: "Anniversary" },
  { id: 6, title: "New Baby", category: "New Baby" },
];

const TrendingECards = () => {
  const [cards, setCards] = useState<ECard[]>(trendingECards);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
        if (!apiKey) {
          console.error("GIPHY API key not found in environment variables");
          setLoading(false);
          return;
        }
        const promises = trendingECards.map(async (card) => {
          const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
              card.category
            )}&limit=1&rating=g`
          );
          const data = await response.json();
          return {
            ...card,
            image: data.data[0]?.images?.downsized_medium?.url || "",
          };
        });

        const results = await Promise.all(promises);
        setCards(results);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGifs();
  }, []);

  return (
    <section className="border-t border-border py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Trending E-Cards
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover popular greeting cards loved by our community
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading trending e-cards...
          </p>
        ) : (
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-6">
              {[...cards, ...cards].map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className="flex min-w-[250px] flex-col items-center rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-3 aspect-[5/3] w-full overflow-hidden rounded-lg">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg" />
                    )}
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {card.category}
                  </p>
                  <Link
                    to="/create-greeting-card"
                    className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Create Similar
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingECards;
