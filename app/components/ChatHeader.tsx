import { Button } from "./ui/button";
import { Share2, X } from "lucide-react";
import { useState } from "react";

interface ChatHeaderProps {
  onShare: () => void;
  shareLink: string | null;
  messageCount: number;
}

export default function ChatHeader({
  onShare,
  shareLink,
  messageCount,
}: ChatHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = () => {
    onShare();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold font-grand-hotel ${messageCount <= 1 ? 'w-full text-center' : ''}`}>
        Lakshmanan Family Christmas Letter
      </h1>
      {messageCount > 1 && (
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-2 border-black bg-transparent hover:bg-transparent text-black transition-all duration-200 px-4 py-2 rounded-full shadow-sm hover:shadow-[inset_0_0_0_2px_#000000]"
        >
          <Share2 className="h-4 w-4" />
          <span className="font-semibold">Share</span>
        </Button>
      )}
      {shareLink && isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md relative">
            <Button
              onClick={handleCloseModal}
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
            <p>Share this link:</p>
            <input
              type="text"
              value={`${window.location.origin}${shareLink}`}
              readOnly
              className="border p-2 w-full mt-2"
            />
            <Button
              onClick={(event) => {
                navigator.clipboard.writeText(
                  `${window.location.origin}${shareLink}`
                );
                const button = event.currentTarget as HTMLButtonElement;
                const originalText = button.textContent || "Copy Link";
                button.textContent = "Copied!";
                button.disabled = true;
                setTimeout(() => {
                  button.textContent = originalText;
                  button.disabled = false;
                }, 5000);
              }}
              className="mt-2"
            >
              Copy Link
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
