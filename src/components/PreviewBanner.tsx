import React from 'react';

interface PreviewBannerProps {
  exitPreviewMode: () => void;
}

const PreviewBanner: React.FC<PreviewBannerProps> = ({ exitPreviewMode }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-primary text-white py-2 px-4 z-50 flex justify-between items-center shadow-lg">
      <p className="text-sm font-medium">
        You are in preview mode - viewing unpublished content
      </p>
      <button
        onClick={exitPreviewMode}
        className="bg-white text-primary px-4 py-1 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
      >
        Exit Preview
      </button>
    </div>
  );
};

export default PreviewBanner;
