import { useState, useEffect } from "react";
import { X, Download, Share, MoreVertical } from "lucide-react";

export default function PwaInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");

  useEffect(() => {
    // 1. Check if the app is already running in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      return; // Already installed, do not show the banner
    }

    // 2. Check if the user previously dismissed the banner in this browser
    const isDismissed = localStorage.getItem("pwa_install_banner_dismissed") === "true";
    if (isDismissed) {
      return;
    }

    // 3. Detect the platform/OS
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

    setShowBanner(true); // Always display the banner by default for all platforms if not standalone/dismissed

    // 4. Listen for Chrome / Android beforeinstallprompt event
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
    if (!deferredPrompt) return;

    // Show the native browser install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install prompt outcome: ${outcome}`);

    // Clear the deferred prompt, it can only be used once
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa_install_banner_dismissed", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="mx-4 sm:mx-6 mb-4 animate-in slide-in-from-top-4 duration-300">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3 relative overflow-hidden">
        {/* Decorative background pulse */}
        <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>

        <div className="flex items-center gap-3 min-w-0 flex-1 z-10">
          <div className="p-2 bg-blue-600 text-white rounded-xl flex-shrink-0 shadow-sm shadow-blue-500/10">
            <Download className="w-4 h-4" />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="text-xs font-bold text-slate-800 leading-snug">
              Pasang Aplikasi Presensi
            </p>
            {platform === "ios" ? (
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5 flex items-center flex-wrap gap-1">
                <span>Ketuk ikon bagikan</span>
                <Share className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" />
                <span>lalu pilih</span>
                <strong className="text-slate-700 font-semibold">"Add to Home Screen"</strong>
              </p>
            ) : platform === "android" && !deferredPrompt ? (
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5 flex items-center flex-wrap gap-1">
                <span>Ketuk ikon titik tiga</span>
                <MoreVertical className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" />
                <span>di Chrome lalu pilih</span>
                <strong className="text-slate-700 font-semibold">"Add to Home Screen"</strong>
              </p>
            ) : platform === "other" && !deferredPrompt ? (
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                Ketuk ikon pasang di kolom URL browser Anda untuk install aplikasi desktop
              </p>
            ) : (
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                Install di HP agar lebih cepat absen & menerima notifikasi realtime
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 z-10">
          {platform === "android" && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-blue-500/10 transition-all whitespace-nowrap"
            >
              Install
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
