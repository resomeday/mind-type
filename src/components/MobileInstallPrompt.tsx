import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, ArrowUpRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileInstallPromptProps {
  onOpenInstallModal: () => void;
}

export const MobileInstallPrompt: React.FC<MobileInstallPromptProps> = ({ onOpenInstallModal }) => {
  const { isInstalled, isInstallable, isIOS, isAndroid, triggerInstall } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Only show if not installed and not dismissed in current session
    const dismissed = sessionStorage.getItem('mindtype_install_prompt_dismissed') === 'true';
    if (!dismissed) {
      setIsDismissed(false);
    }
  }, []);

  // If already installed as PWA or user dismissed it, hide
  if (isInstalled || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('mindtype_install_prompt_dismissed', 'true');
  };

  const handleAction = async () => {
    if (isInstallable) {
      const outcome = await triggerInstall();
      if (outcome !== 'accepted') {
        onOpenInstallModal();
      }
    } else {
      onOpenInstallModal();
    }
  };

  return (
    <div className="fixed bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-auto sm:right-4 z-40 max-w-md mx-auto sm:mx-0 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-stone-900 text-white rounded-2xl p-3.5 shadow-2xl border border-stone-800/80 flex items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white text-stone-900 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            M
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
              <span>MIND:TYPE 스마트폰 앱</span>
              <span className="text-[10px] text-amber-300 font-mono font-medium">1초 설치</span>
            </div>
            <p className="text-[11px] text-stone-300 truncate mt-0.5">
              {isIOS ? 'Safari 공유 ➔ 홈 화면에 추가' : '홈 화면에 추가하여 전체 화면으로 실행'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleAction}
            className="px-3 py-1.5 bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-stone-900" />
            <span>{isInstallable ? '설치' : '설치 안내'}</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="w-7 h-7 rounded-lg text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
