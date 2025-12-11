import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Share2 } from "lucide-react";
import axios from "axios";

interface ECard {
  id: string;
  title: string;
  category: string;
  image: string;
  query?: string;
  likes: number;
  shares: number;
  views: number;
}

const initialHolidayECards: ECard[] = [
  {
    id: "1",
    title: "Merry Christmas",
    category: "Christmas",
    image: "/placeholder.svg",
    query: "christmas",
    likes: 1200,
    shares: 300,
    views: 5000,
  },
  {
    id: "2",
    title: "Happy Hanukkah",
    category: "Hanukkah",
    image: "/placeholder.svg",
    query: "hanukkah",
    likes: 800,
    shares: 150,
    views: 3000,
  },
  {
    id: "3",
    title: "Happy New Year",
    category: "New Year",
    image: "/placeholder.svg",
    query: "new year",
    likes: 1500,
    shares: 400,
    views: 6000,
  },
  {
    id: "4",
    title: "Happy Diwali",
    category: "Diwali",
    image: "/placeholder.svg",
    query: "diwali",
    likes: 700,
    shares: 100,
    views: 2500,
  },
  {
    id: "5",
    title: "Happy Halloween",
    category: "Halloween",
    image: "/placeholder.svg",
    query: "halloween",
    likes: 900,
    shares: 200,
    views: 4000,
  },
  {
    id: "6",
    title: "Happy Thanksgiving",
    category: "Thanksgiving",
    image: "/placeholder.svg",
    query: "thanksgiving",
    likes: 1100,
    shares: 250,
    views: 4500,
  },
  {
    id: "7",
    title: "Happy Valentine's Day",
    category: "Valentine's Day",
    image: "/placeholder.svg",
    query: "valentine's day",
    likes: 1300,
    shares: 350,
    views: 5500,
  },
  {
    id: "8",
    title: "Happy Easter",
    category: "Easter",
    image: "/placeholder.svg",
    query: "easter",
    likes: 1000,
    shares: 200,
    views: 4200,
  },
  {
    id: "9",
    title: "Happy Holi",
    category: "Holi",
    image: "/placeholder.svg",
    query: "holi",
    likes: 600,
    shares: 90,
    views: 2000,
  },
  {
    id: "10",
    title: "Joyous Kwanzaa",
    category: "Kwanzaa",
    image: "/placeholder.svg",
    query: "kwanzaa",
    likes: 500,
    shares: 80,
    views: 1800,
  },
];

const themes = ["Christmas", "New Year", "Thanksgiving", "Diwali", "Halloween"];

interface GiphyGif {
  id: string;
  title: string;
  images: {
    downsized_medium: {
      url: string;
    };
  };
}

interface TenorGif {
  id: string;
  content_description: string;
  media_formats: {
    gif: {
      url: string;
    };
  };
}

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [cards, setCards] = useState<ECard[]>(initialHolidayECards);
  const [loading, setLoading] = useState(true);

  const fetchGifsForTheme = async (theme: string) => {
    setLoading(true);
    try {
      const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const tenorApiKey = import.meta.env.VITE_TENOR_API_KEY;
      let fetchedCards: ECard[] = [];

      if (giphyApiKey) {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
            theme
          )}&limit=5&rating=g`
        );
        fetchedCards = [
          ...fetchedCards,
          ...response.data.data.map((gif: GiphyGif) => ({
            id: gif.id,
            title: gif.title,
            category: theme,
            image: gif.images.downsized_medium.url,
            likes: Math.floor(Math.random() * 1000),
            shares: Math.floor(Math.random() * 500),
            views: Math.floor(Math.random() * 2000),
          })),
        ];
      }

      if (tenorApiKey) {
        const response = await axios.get(
          `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
            theme
          )}&key=${tenorApiKey}&limit=5&contentfilter=medium`
        );
        fetchedCards = [
          ...fetchedCards,
          ...response.data.results.map((gif: TenorGif) => ({
            id: gif.id,
            title: gif.content_description,
            category: theme,
            image: gif.media_formats.gif.url,
            likes: Math.floor(Math.random() * 1000),
            shares: Math.floor(Math.random() * 500),
            views: Math.floor(Math.random() * 2000),
          })),
        ];
      }
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
        if (!apiKey) {
          setLoading(false);
          return;
        }
        const promises = initialHolidayECards.map(async (card) => {
          if (!card.query) return card;
          const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
              card.query
            )}&limit=1&rating=g`
          );
          const data = await response.json();
          return {
            ...card,
            image:
              data.data[0]?.images?.downsized_medium?.url || "/placeholder.svg",
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
    if (!selectedTheme) {
      fetchGifs();
    }
  }, [selectedTheme]);

  const filteredCards = cards.filter((card) => {
    const term = searchTerm.toLowerCase();
    const theme = selectedTheme ? selectedTheme.toLowerCase() : "";

    const matchesSearch =
      card.title.toLowerCase().includes(term) ||
      card.category.toLowerCase().includes(term);

    const matchesTheme = theme ? card.category.toLowerCase() === theme : true;

    return matchesSearch && matchesTheme;
  });

  const handleThemeClick = (theme: string) => {
    setSelectedTheme(theme);
    setSearchTerm("");
    fetchGifsForTheme(theme);
  };

  const handleAllClick = () => {
    setSelectedTheme(null);
    setCards(initialHolidayECards);
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Explore E-Cards
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find the perfect card for any occasion
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for cards..."
              className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {themes.map((theme) => (
            <button
              key={theme}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedTheme === theme
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              onClick={() => handleThemeClick(theme)}
            >
              {theme}
            </button>
          ))}
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              !selectedTheme
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            onClick={handleAllClick}
          >
            All
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading e-cards...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredCards.slice(0, 10).map((card) => (
              <Card
                key={card.id}
                className="group hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                <Link to="/create-greeting-card" className="flex-grow">
                  <CardContent className="p-0">
                    <div className="relative bg-muted aspect-[2/3]">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-semibold text-lg">
                          Create {card.title} Card
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Perfect for celebrating {card.category.toLowerCase()}
                      </p>
                    </div>
                  </CardContent>
                </Link>
                <div className="p-4 pt-0 mt-auto">
                  <div className="mt-4 flex w-full items-center justify-around text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Heart size={16} />
                      <span>{formatCount(card.likes)}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Share2 size={16} />
                      <span>{formatCount(card.shares)}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Eye size={16} />
                      <span>{formatCount(card.views)}</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Explore;
