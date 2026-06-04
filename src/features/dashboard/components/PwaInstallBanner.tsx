import { useState, useEffect } from "react";
import { X, Share, MoreVertical } from "lucide-react";

export default function PwaInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // 1. Check if the app is already running in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      return; // Already installed, do not show the banner
    }

    // 2. Detect the platform/OS
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Accurate iOS detection (including iPad in desktop-mode)
    const isIOSDevice = 
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      
    const isAndroidDevice = /android/i.test(userAgent);

    if (isIOSDevice) {
      setPlatform("ios");
    } else if (isAndroidDevice) {
      setPlatform("android");
    } else {
      setPlatform("other");
    }

    setShowBanner(true); // Always display the banner by default for all platforms if not standalone

    // 3. Listen for Chrome / Android beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Prevent native mini-infobar from showing
      setDeferredPrompt(e); // Store event to trigger it later
      setPlatform("android");
      setShowBanner(true); // Ensure banner is visible
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the native browser install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA install prompt outcome: ${outcome}`);

      // Clear the deferred prompt
      setDeferredPrompt(null);
      setShowBanner(false);
    } else {
      // Toggle instructions for platforms that don't support direct programmatic prompt (like iOS Safari)
      setShowInstructions((prev) => !prev);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (!showBanner || isDismissed) return null;

  return (
    <div className="mx-4 sm:mx-6 mb-4 animate-in slide-in-from-top-4 duration-300">
      <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1 text-left">
            <p className="text-xs font-bold text-slate-800 leading-snug">
              Pasang Aplikasi Presensi
            </p>
            <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
              Install di HP agar lebih cepat absen & menerima notifikasi realtime
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleInstallClick}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[10.5px] font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-blue-500/10 transition-all whitespace-nowrap"
            >
              Install
            </button>

            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expanded manual instructions for iOS and custom configurations */}
        {showInstructions && (
          <div className="mt-2.5 pt-2 border-t border-blue-100/50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
            {platform === "ios" ? (
              <p className="text-[10.5px] text-slate-600 flex items-center flex-wrap gap-1 leading-relaxed">
                <span>Ketuk ikon bagikan</span>
                <Share className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" />
                <span>lalu pilih</span>
                <strong className="text-slate-700 font-semibold">"Add to Home Screen"</strong>
              </p>
            ) : platform === "android" ? (
              <p className="text-[10.5px] text-slate-600 flex items-center flex-wrap gap-1 leading-relaxed">
                <span>Ketuk ikon titik tiga</span>
                <MoreVertical className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" />
                <span>di Chrome lalu pilih</span>
                <strong className="text-slate-700 font-semibold">"Add to Home Screen"</strong>
              </p>
            ) : (
              <p className="text-[10.5px] text-slate-600 leading-relaxed">
                Ketuk ikon pasang di kolom URL browser Anda untuk install aplikasi desktop
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
