import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignaturePad from "@/components/SignaturePad";
import {
  Search,
  Eye,
  Send,
  Sparkles,
  Palette,
  Type,
  MessageSquare,
  Copy,
  Signature,
  Users,
} from "lucide-react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface GifData {
  id: string;
  url: string;
  title: string;
}

interface GiphyGif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

interface TenorGif {
  id: string;
  content_description: string;
  title: string;
  media_formats: {
    gif: {
      url: string;
    };
  };
}

const quickMessages = [
  "Happy Birthday!",
  "Thinking of you!",
  "You're the best!",
  "Congrats!",
];

export default function CreateGreetingCard() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [title, setTitle] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [gifQuery, setGifQuery] = useState("");
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [trendingGifs, setTrendingGifs] = useState<GifData[]>([]);
  const [selectedGif, setSelectedGif] = useState<string | null>(
    "https://media.tenor.com/3bTxZ4Hd-3IAAAAd/cat-wave.gif"
  );
  const [loading, setLoading] = useState(false);
  const [isGifModalOpen, setIsGifModalOpen] = useState(false);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fetchTrendingGifs = async () => {
    setLoading(true);
    try {
      const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const tenorApiKey = import.meta.env.VITE_TENOR_API_KEY;
      let allGifs: GifData[] = [];

      if (giphyApiKey) {
        const res = await axios.get(
          `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=10`
        );
        allGifs = [
          ...allGifs,
          ...res.data.data.map((gif: GiphyGif) => ({
            id: gif.id,
            url: gif.images.fixed_height.url,
            title: gif.title,
          })),
        ];
      }

      if (tenorApiKey && allGifs.length < 20) {
        const res = await axios.get(
          `https://tenor.googleapis.com/v2/featured?key=${tenorApiKey}&limit=${
            20 - allGifs.length
          }&contentfilter=medium`
        );
        allGifs = [
          ...allGifs,
          ...res.data.results.map((gif: TenorGif) => ({
            id: gif.id,
            url: gif.media_formats.gif.url,
            title: gif.content_description || gif.title,
          })),
        ];
      }

      setTrendingGifs(allGifs);
    } catch (err) {
      console.error("Error fetching trending GIFs:", err);
    } finally {
      setLoading(false);
    }
  };

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
          )}&limit=10`
        );
        allGifs = [
          ...allGifs,
          ...res.data.data.map((gif: GiphyGif) => ({
            id: gif.id,
            url: gif.images.fixed_height.url,
            title: gif.title,
          })),
        ];
      }

      if (tenorApiKey && allGifs.length < 20) {
        const res = await axios.get(
          `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
            query
          )}&key=${tenorApiKey}&limit=${
            20 - allGifs.length
          }&contentfilter=medium`
        );
        allGifs = [
          ...allGifs,
          ...res.data.results.map((gif: TenorGif) => ({
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
    if (isGifModalOpen) {
      fetchTrendingGifs();
    }
  }, [isGifModalOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (gifQuery) {
        searchGifs(gifQuery);
      } else {
        // if query is cleared, show trending again
        setGifs([]);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [gifQuery]);

  const handleSend = () => {
    setIsPreviewOpen(true);
  };

  const handleSaveSignature = (signatureDataUrl: string) => {
    setSignature(signatureDataUrl);
    setIsSignaturePadOpen(false);
  };

  const handleCloseSignaturePad = () => {
    setIsSignaturePadOpen(false);
  };

  const handleCopy = () => {
    const cardContent = `Title: ${title}

Message: ${message}

GIF: ${selectedGif}
${signature ? `Signature: [Signature Image]` : ""}`;

    navigator.clipboard.writeText(cardContent).then(
      () => {
        toast("Card content copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast("Failed to copy card content.", {
          description: "Please try again.",
        });
      }
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              Create your Greeting Card
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Personalize your message, choose a GIF, and send it to a friend!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Preview */}
            <div className="flex-1 min-w-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden sticky top-8">
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700">
                  {selectedGif && (
                    <img
                      src={selectedGif}
                      alt="Selected GIF"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 truncate">
                    {title || "Card Title"}
                  </h2>
                  <h3 className="text-xl font-semibold truncate">
                    {recipient || "To: Recipient"}
                  </h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300 h-24 overflow-y-auto">
                    {message || "Your message will appear here..."}
                  </p>
                  {signature && (
                    <div className="mt-4 flex justify-end">
                      <img
                        src={signature}
                        alt="Signature"
                        className="h-16"
                        onClick={() => setIsSignaturePadOpen(true)}
                      />
                    </div>
                  )}
                  <div className="flex justify-end items-center mt-4">
                    <span className="text-right">
                      {sender || "From: Sender"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editor */}
            <div className="flex-1 min-w-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
              {/* GIF Selection */}
              <div>
                <label className="text-lg font-semibold">Choose a GIF</label>
                <Dialog open={isGifModalOpen} onOpenChange={setIsGifModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-2 flex items-center justify-center"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Browse GIFs
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Search for a GIF</DialogTitle>
                    </DialogHeader>
                    <div className="p-1">
                      <Input
                        value={gifQuery}
                        onChange={(e) => setGifQuery(e.target.value)}
                        placeholder="Search for any GIF..."
                        className="mb-4"
                      />
                      {loading ? (
                        <div className="text-center p-8">Loading...</div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
                          {(gifQuery ? gifs : trendingGifs).map((gif) => (
                            <div
                              key={gif.id}
                              className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500"
                              onClick={() => {
                                setSelectedGif(gif.url);
                                setIsGifModalOpen(false);
                              }}
                            >
                              <img
                                src={gif.url}
                                alt={gif.title}
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="font-semibold">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Card Title (e.g., Happy Birthday!)"
                  className="mt-1"
                />
              </div>

              {/* Message Area */}
              <div>
                <label
                  htmlFor="message"
                  className="text-lg font-semibold flex items-center"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Write your message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What do you want to say?"
                  className="mt-2 min-h-[120px]"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickMessages.map((qm) => (
                    <Button
                      key={qm}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setMessage(message ? `${message} ${qm}` : qm)
                      }
                    >
                      {qm}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> AI Assist
                  </Button>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsSignaturePadOpen(true)}
                  >
                    <Signature className="w-4 h-4 mr-2" /> Add Signature
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" /> Preview
                  </Button>
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label htmlFor="recipient" className="font-semibold">
                  To
                </label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Your friend's name"
                  className="mt-1"
                />
              </div>

              {/* Sender */}
              <div>
                <label htmlFor="sender" className="font-semibold">
                  From
                </label>
                <Input
                  id="sender"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Card
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {}}>
                  <Users className="w-4 h-4 mr-2" />
                  Get Co-Signers
                </Button>
                <Button
                  onClick={handleSend}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Greeting
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isSignaturePadOpen && (
        <SignaturePad
          onSave={handleSaveSignature}
          onClose={handleCloseSignaturePad}
        />
      )}

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview your Greeting Card</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {selectedGif && (
                <img
                  src={selectedGif}
                  alt="Selected GIF"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2 truncate">
                {title || "Card Title"}
              </h2>
              <h3 className="text-xl font-semibold">{recipient}</h3>
              <p className="mt-2 text-gray-600">{message}</p>
              {signature ? (
                <img
                  src={signature}
                  alt="Signature"
                  className="h-16 mt-4 ml-auto cursor-pointer"
                  onClick={() => setIsSignaturePadOpen(true)}
                />
              ) : (
                <p className="mt-4 text-right font-medium"></p>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  /* Implement actual send logic */
                  setIsPreviewOpen(false);
                }}
              >
                Confirm & Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
}
