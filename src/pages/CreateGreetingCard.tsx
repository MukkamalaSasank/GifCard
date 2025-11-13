import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Palette, Type, Sparkles, ArrowRight, Search } from "lucide-react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GifData {
  id: string;
  url: string;
  title: string;
}

const CreateGreetingCard = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [gifQuery, setGifQuery] = useState("");
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const searchGifs = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const tenorApiKey = import.meta.env.VITE_TENOR_API_KEY;
      let allGifs: GifData[] = [];

      if (giphyApiKey) {
        const res = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
            query
          )}&limit=8`
        );
        allGifs = [
          ...allGifs,
          ...res.data.data.map((gif: any) => ({
            id: gif.id,
            url: gif.images.fixed_height.url,
            title: gif.title,
          })),
        ];
      }

      if (tenorApiKey && allGifs.length < 8) {
        const res = await axios.get(
          `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
            query
          )}&key=${tenorApiKey}&limit=${
            8 - allGifs.length
          }&contentfilter=medium`
        );
        allGifs = [
          ...allGifs,
          ...res.data.results.map((gif: any) => ({
            id: gif.id,
            url: gif.media_formats.gif.url,
            title: gif.content_description || gif.title,
          })),
        ];
      }

      setGifs(allGifs);
    } catch (err) {
      console.error("Error fetching GIFs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (gifQuery) searchGifs(gifQuery);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [gifQuery]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#111827] to-[#1e1b4b] relative overflow-hidden text-gray-100 flex items-center justify-center">
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-32 h-96 w-96 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-32 h-96 w-96 bg-blue-500/20 blur-3xl rounded-full" />
        </div>

        {/* Main Section */}
        <main className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-14 w-full max-w-6xl px-6 -mt-40 mb-8">
          {/* Card */}
          <div className="relative w-80 sm:w-96 h-72 bg-[#18181b]/70 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-700 overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(88,28,135,0.3)] p-4">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl -z-10" />

            {/* GIF Display */}
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              <img
                src={
                  selectedGif ||
                  "https://media.tenor.com/3bTxZ4Hd-3IAAAAd/cat-wave.gif"
                }
                alt="Selected GIF"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Choose GIF Button */}
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                setGifs([]);
                setGifQuery("");
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-4 right-4 text-sm bg-gray-800/70 text-gray-100 hover:bg-gray-700 border border-gray-600"
                >
                  Choose GIF
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl bg-[#1f1f2e]/95 backdrop-blur-xl rounded-2xl border border-gray-700 text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-100">
                    Choose a GIF
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={gifQuery}
                      onChange={(e) => setGifQuery(e.target.value)}
                      placeholder="Search GIFs..."
                      className="bg-[#2b2b3d] border-gray-600 text-gray-100 placeholder:text-gray-400"
                    />
                    <Button
                      onClick={() => searchGifs(gifQuery)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500"
                    >
                      <Search className="w-4 h-4 mr-1" /> Search
                    </Button>
                  </div>

                  {loading && (
                    <p className="text-center text-gray-400">Loading...</p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
                    {gifs.map((gif) => (
                      <div
                        key={gif.id}
                        className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all hover:scale-105 ${
                          selectedGif === gif.url
                            ? "border-purple-500"
                            : "border-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedGif(gif.url);
                          setIsDialogOpen(false);
                        }}
                      >
                        <img
                          src={gif.url}
                          alt={gif.title}
                          className="w-full h-24 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Inputs + Controls */}
          <div className="flex flex-col items-center lg:items-start gap-8 mt-2 lg:mt-0">
            {/* Input Fields */}
            <div className="space-y-6 w-full max-w-sm">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="bg-[#2b2b3d] border-gray-600 text-gray-100 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Note
                </label>
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter note"
                  className="bg-[#2b2b3d] border-gray-600 text-gray-100 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex gap-4 justify-center lg:justify-start mt-2">
              {[Palette, Type, Sparkles].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full bg-[#2b2b3d] hover:bg-[#3b3b4d] text-gray-200 border border-gray-600"
                >
                  <Icon className="w-6 h-6" />
                </Button>
              ))}
            </div>

            {/* Next Button */}
            <div className="mt-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CreateGreetingCard;
