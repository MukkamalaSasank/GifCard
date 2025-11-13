interface GreetingCardPreviewProps {
  recipient: string;
  message: string;
  sender: string;
  selectedGif: string | null;
}

const GreetingCardPreview = ({
  recipient,
  message,
  sender,
  selectedGif,
}: GreetingCardPreviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      {selectedGif && (
        <img
          src={selectedGif}
          alt="Selected GIF"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          To: {recipient || "Recipient"}
        </h2>
        <p className="text-gray-600 mb-4">{message || "Your message here..."}</p>
        <p className="text-right text-gray-800 font-semibold">
          From: {sender || "Sender"}
        </p>
      </div>
    </div>
  );
};

export default GreetingCardPreview;
