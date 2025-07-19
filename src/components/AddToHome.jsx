import { CloseSquare } from "iconsax-reactjs";
import { useEffect, useState } from "react";

const AddToHomeScreen = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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

  const handleClose = () => {
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {showInstallPrompt && (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative text-center">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
          <p className="mb-4 text-[#100073] font-semibold text-lg">
            Add Realestway to your Home Screen
          </p>
          <button
            onClick={handleInstallClick}
            className="bg-[#00a256] text-white py-2 px-6 rounded-lg hover:bg-green-700"
          >
            📲 Add to Home Screen
          </button>
        </div>
      )}

      {isIOS && (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative text-center">
          <CloseSquare
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          />

          <p className="text-[#100073] text-sm">
            To add Realestway to your home screen:
            <br />
            Tap the <strong>Share</strong> icon and then{" "}
            <strong>Add to Home Screen</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToHomeScreen;
