import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

interface SignaturePadProps {
  onSave: (signature: string) => void;
  onClose: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClose }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  // Helper: trim transparent edges from a canvas, return a new cropped canvas
  const trimCanvas = (sourceCanvas: HTMLCanvasElement) => {
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    const ctx = sourceCanvas.getContext("2d");
    if (!ctx) return sourceCanvas;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let top = null as number | null;
    let left = null as number | null;
    let right = null as number | null;
    let bottom = null as number | null;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        // alpha channel
        if (data[idx + 3] !== 0) {
          if (top === null) top = y;
          if (left === null || x < left) left = x;
          if (right === null || x > right) right = x;
          if (bottom === null || y > bottom) bottom = y;
        }
      }
    }

    // if nothing drawn, return original
    if (top === null || left === null || right === null || bottom === null) {
      return sourceCanvas;
    }

    const trimmedWidth = right - left + 1;
    const trimmedHeight = bottom - top + 1;

    const trimmed = document.createElement("canvas");
    trimmed.width = trimmedWidth;
    trimmed.height = trimmedHeight;
    const tctx = trimmed.getContext("2d");
    if (!tctx) return sourceCanvas;

    tctx.drawImage(
      sourceCanvas,
      left,
      top,
      trimmedWidth,
      trimmedHeight,
      0,
      0,
      trimmedWidth,
      trimmedHeight
    );

    return trimmed;
  };

  const handleSave = () => {
    if (!sigCanvas.current) return;
    // `isEmpty()` is provided by react-signature-canvas
    if (sigCanvas.current.isEmpty()) {
      alert("Please draw your signature before saving.");
      return;
    }

    // getCanvas() returns the raw canvas element
    const rawCanvas: HTMLCanvasElement = sigCanvas.current.getCanvas();

    // trim transparent space (avoids relying on trim-canvas package)
    const trimmedCanvas = trimCanvas(rawCanvas);

    // convert to data URL PNG
    const signature = trimmedCanvas.toDataURL("image/png");

    onSave(signature);
  };

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Create your Signature</h2>
        <div className="border rounded-lg">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 600,
              height: 200,
              className: "sigCanvas",
            }}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;
