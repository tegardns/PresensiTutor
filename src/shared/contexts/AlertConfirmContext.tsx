import React, { createContext, useContext, useState, useEffect } from "react";

interface AlertConfirmContextType {
  showAlert: (message: string, type?: "success" | "error" | "info") => void;
  showConfirm: (message: string) => Promise<boolean>;
}

const AlertConfirmContext = createContext<AlertConfirmContextType | undefined>(undefined);

export const useAlertConfirm = () => {
  const context = useContext(AlertConfirmContext);
  if (!context) {
    throw new Error("useAlertConfirm must be used within an AlertConfirmProvider");
  }
  return context;
};

export const AlertConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertState, setAlertState] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const [confirmState, setConfirmState] = useState<{
    message: string;
    resolve: (val: boolean) => void;
  } | null>(null);

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (alertState) {
      const timer = setTimeout(() => {
        setAlertState(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertState]);

  const showAlert = (message: string, type: "success" | "error" | "info" = "info") => {
    setAlertState({ message, type });
  };

  const showConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({ message, resolve });
    });
  };

  const handleConfirm = () => {
    confirmState?.resolve(true);
    setConfirmState(null);
  };

  const handleCancel = () => {
    confirmState?.resolve(false);
    setConfirmState(null);
  };

  return (
    <AlertConfirmContext.Provider value={{ showAlert, showConfirm }}>
      {children}

      {/* Modern, Clean Minimalist Top-Middle Alert */}
      {alertState && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-xs bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-4 py-3 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          {alertState.type === "success" && (
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          )}
          {alertState.type === "error" && (
            <div className="size-2 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
          )}
          {alertState.type === "info" && (
            <div className="size-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
          )}
          <span className="text-xs font-semibold text-slate-700 select-none text-left">
            {alertState.message}
          </span>
        </div>
      )}

      {/* Modern, Clean Minimalist Confirm Modal */}
      {confirmState && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1.5px] z-[90] flex items-center justify-center p-5 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)] max-w-[280px] w-full p-5 text-center animate-in zoom-in-95 duration-200">
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">
              {confirmState.message}
            </p>
            <div className="flex gap-2.5 mt-5">
              <button
                onClick={handleCancel}
                className="flex-1 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all"
              >
                Ya, Yakin
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertConfirmContext.Provider>
  );
};
