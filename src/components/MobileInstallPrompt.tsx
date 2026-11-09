import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Apple, Check, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { DirectInstallGuideModal } from './DirectInstallGuideModal';

interface MobileInstallPromptProps {
  onOpenInstallModal: () => void;
}

export const MobileInstallPrompt: React.FC<MobileInstallPromptProps> = ({ onOpenInstallModal }) => {
  const { isInstalled, isInstallable, isInAppBrowser, triggerInstall } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeGuidePlatform, setActiveGuidePlatform] = useState<'ios' | 'android' | null>(null);

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

  const handleAndroid = async () => {
    if (isInstallable) {
      const outcome = await triggerInstall();
      if (outcome === 'accepted') {
        setToastMsg('설치가 완료되었습니다! 홈 화면을 확인해 주세요.');
        setTimeout(() => setToastMsg(null), 4000);
        return;
      }
    }
    setActiveGuidePlatform('android');
  };

  const handleApple = () => {
    setActiveGuidePlatform('ios');
  };

  return (
    <div className="fixed bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-auto sm:right-4 z-40 max-w-lg mx-auto sm:mx-0 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-stone-900 text-white rounded-2xl p-3.5 shadow-2xl border border-stone-800 flex flex-col gap-2.5 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white text-stone-900 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              M
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                <span>핸드폰에 바로 설치하기</span>
                <span className="text-[10px] text-amber-300 font-mono">1초 완료</span>
              </div>
              <p className="text-[11px] text-stone-300 truncate">
                기기에 맞는 버튼을 누르면 즉시 설치가 시작됩니다
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="w-7 h-7 rounded-lg text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2 DIRECT BUTTONS */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            onClick={handleAndroid}
            className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <Smartphone className="w-3.5 h-3.5 text-white" />
            <span>안드로이드 설치</span>
          </button>

          <button
            type="button"
            onClick={handleApple}
            className="py-2 px-2.5 bg-stone-800 hover:bg-stone-700 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border border-stone-700 shadow-xs transition-all"
          >
            <Apple className="w-3.5 h-3.5 text-white" />
            <span>Apple(아이폰) 설치</span>
          </button>
        </div>

        {/* Feedback message */}
        {toastMsg && (
          <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-[11px] text-amber-200 leading-snug">
            {toastMsg}
          </div>
        )}
      </div>

      {/* Interactive Mobile Guide Modal */}
      <DirectInstallGuideModal
        isOpen={!!activeGuidePlatform}
        onClose={() => setActiveGuidePlatform(null)}
        targetPlatform={activeGuidePlatform || 'ios'}
        onTriggerAndroidInstall={triggerInstall}
        isInAppBrowser={isInAppBrowser}
      />
    </div>
  );
};
