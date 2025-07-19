import { useEffect, useState } from "react";

const AddToHomeScreen = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isInStandaloneMode =
      "standalone" in window.navigator && window.navigator.standalone;

    setIsIOS(isIosDevice && !isInStandaloneMode);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    if (!isIosDevice) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {showInstallPrompt && (
        <button
          onClick={handleInstallClick}
          className="bg-[#00a256] text-white py-2 px-4 rounded-lg shadow-lg"
        >
          📲 Add Realestway to Home Screen
        </button>
      )}

      {isIOS && (
        <div className="bg-[#100073] text-white py-2 px-4 rounded-lg shadow-lg max-w-xs">
          <p className="text-sm">
            To add Realestway to your home screen: tap the{" "}
            <strong>Share</strong> button and then{" "}
            <strong>Add to Home Screen</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToHomeScreen;
