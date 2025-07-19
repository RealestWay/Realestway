import { useEffect, useState } from "react";

const AddToHomeScreen = () => {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (!prompt) return;
    prompt.prompt();
    prompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted");
      }
      setPrompt(null);
      setVisible(false);
    });
  };

  return visible ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg text-center max-w-sm w-full">
        <p className="mb-4">Install Realestway to your home screen?</p>
        <button
          onClick={handleInstall}
          className="bg-[#00a256] text-white px-4 py-2 rounded"
        >
          📲 Add to Home Screen
        </button>
      </div>
    </div>
  ) : null;
};

export default AddToHomeScreen;
