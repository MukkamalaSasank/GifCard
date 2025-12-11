import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, Heart, Share2 } from "lucide-react";

interface GifData {
  id: string;
  url: string;
  title: string;
}

interface CategoryData {
  name: string;
  query: string;
  gif: GifData | null;
}

const categories: CategoryData[] = [
  { name: "Birthdays", query: "birthday celebration", gif: null },
  { name: "Weddings", query: "wedding celebration", gif: null },
  { name: "Anniversaries", query: "anniversary love", gif: null },
  { name: "Holidays", query: "holiday cheer", gif: null },
  { name: "Thank You", query: "thank you grateful", gif: null },
  { name: "Congratulations", query: "congratulations success", gif: null },
  { name: "Get Well Soon", query: "get well soon", gif: null },
  { name: "New Baby", query: "new baby congratulations", gif: null },
  { name: "Graduation", query: "graduation celebration", gif: null },
  { name: "Valentine's Day", query: "valentine's day love", gif: null },
  { name: "Mother's Day", query: "mother's day", gif: null },
  { name: "Father's Day", query: "father's day", gif: null },
];

const ECardGallery = () => {
  const [categoryGifs, setCategoryGifs] = useState<CategoryData[]>(categories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGifsForCategories = async () => {
      const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const tenorApiKey = import.meta.env.VITE_TENOR_API_KEY;

      if (!giphyApiKey && !tenorApiKey) {
        console.error("No API keys found for Giphy or Tenor.");
        setLoading(false);
        return;
      }

      const updatedCategories = await Promise.all(
        categories.map(async (category) => {
          try {
            let gif = null;

            // Try Giphy first
            if (giphyApiKey) {
              try {
                const response = await axios.get(
                  `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
                    category.query
                  )}&limit=1&rating=g`
                );
                const giphyGif = response.data.data[0];
                if (giphyGif) {
                  gif = {
                    id: giphyGif.id,
                    url: giphyGif.images.fixed_height.url,
                    title: giphyGif.title,
                  };
                }
              } catch (giphyError) {
                console.warn(`Giphy failed for ${category.name}:`, giphyError);
              }
            }

            // If Giphy failed or no key, try Tenor
            if (!gif && tenorApiKey) {
              try {
                const response = await axios.get(
                  `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
                    category.query
                  )}&key=${tenorApiKey}&limit=1&contentfilter=medium`
                );
                const tenorGif = response.data.results[0];
                if (tenorGif) {
                  gif = {
                    id: tenorGif.id,
                    url: tenorGif.media_formats.gif.url,
                    title: tenorGif.title || tenorGif.content_description,
                  };
                }
              } catch (tenorError) {
                console.warn(`Tenor failed for ${category.name}:`, tenorError);
              }
            }

            return {
              ...category,
              gif,
            };
          } catch (error) {
            console.error(`Error fetching GIF for ${category.name}:`, error);
            return category;
          }
        })
      );

      setCategoryGifs(updatedCategories);
      setLoading(false);
    };

    fetchGifsForCategories();
  }, []);

  if (loading) {
    return (
      <section className="border-t border-border py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Community Favorites
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what cards are trending in the community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryGifs.map((category) => (
            <Card
              key={category.name}
              className="group hover:shadow-lg transition-shadow overflow-hidden flex flex-col rounded-2xl"
            >
              <Link to="/create-greeting-card" className="flex-grow">
                <CardContent className="p-0">
                  <div className="relative bg-muted aspect-[2/3]">
                    {category.gif ? (
                      <img
                        src={category.gif.url}
                        alt={category.gif.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No GIF available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-semibold text-lg">
                        Create {category.name} Card
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Perfect for celebrating {category.name.toLowerCase()}
                    </p>
                  </div>
                </CardContent>
              </Link>
              <div className="p-4 pt-0 mt-auto">
                <div className="mt-4 flex w-full items-center justify-around text-xs text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart size={16} />
                    <span>1.2k</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Share2 size={16} />
                    <span>2.3k</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Eye size={16} />
                    <span>5.8k</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ECardGallery;