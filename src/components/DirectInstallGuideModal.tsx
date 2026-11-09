import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Apple, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle,
  Sparkles,
  ArrowDown,
  Compass
} from 'lucide-react';
import { downloadAppleWebClipProfile } from '../services/mobileInstallService';

export interface DirectInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPlatform: 'ios' | 'android' | 'inapp' | 'general';
  onTriggerAndroidInstall?: () => Promise<'accepted' | 'dismissed' | 'unsupported'>;
  isInAppBrowser?: boolean;
}

export const DirectInstallGuideModal: React.FC<DirectInstallGuideModalProps> = ({
  isOpen,
  onClose,
  targetPlatform,
  onTriggerAndroidInstall,
  isInAppBrowser = false
}) => {
  const [copied, setCopied] = useState(false);
  const [profileDownloaded, setProfileDownloaded] = useState(false);
  const [androidTriggered, setAndroidTriggered] = useState(false);
  const [platformView, setPlatformView] = useState<'ios' | 'android'>(
    targetPlatform === 'android' ? 'android' : 'ios'
  );

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-g5rc6dgojhiu7nte2qwhf7-633738735601.asia-east1.run.app';
  const cleanUrl = currentUrl.replace(/^https?:\/\//, '');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenExternal = () => {
    if (platformView === 'android') {
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      if (/kakaotalk/i.test(navigator.userAgent)) {
        window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(currentUrl)}`;
      } else {
        handleCopyLink();
      }
    }
  };

  const handleAndroidPromptClick = async () => {
    if (onTriggerAndroidInstall) {
      setAndroidTriggered(true);
      const res = await onTriggerAndroidInstall();
      if (res === 'accepted') {
        onClose();
      }
    } else {
      // Launch chrome intent
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    }
  };

  const handleDownloadProfile = () => {
    downloadAppleWebClipProfile(currentUrl);
    setProfileDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-stone-900 flex items-center justify-center font-black text-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  스마트폰 홈 화면 바로 설치
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                  1초 완벽 가이드
                </span>
              </div>
              <p className="text-[11px] text-stone-300">
                다운로드 기다림 없이 스마트폰 홈 화면에 바로 설치됩니다
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* In-App Browser (Kakao / Naver) Critical Notice */}
        {isInAppBrowser && (
          <div className="px-4 py-3 bg-rose-50 border-b border-rose-200 text-rose-950 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-bold text-rose-900">
                ⚠️ 카카오톡 / 네이버 인앱 브라우저로 접속 중입니다
              </p>
              <p className="text-[11px] text-rose-800 leading-snug">
                카카오톡 내부 브라우저는 보안상 홈 화면 설치를 차단합니다. 
                아래 <strong>[기본 브라우저로 열기]</strong>를 누르시거나 우측 하단 <strong>[⋯] ➔ [다른 브라우저로 열기]</strong>를 선택해 주세요.
              </p>
              <button
                type="button"
                onClick={handleOpenExternal}
                className="mt-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>기본 브라우저(Safari / Chrome)로 열기</span>
              </button>
            </div>
          </div>
        )}

        {/* Platform Selector Switch */}
        <div className="grid grid-cols-2 p-2 bg-stone-100 border-b border-stone-200 gap-2">
          <button
            type="button"
            onClick={() => setPlatformView('ios')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              platformView === 'ios'
                ? 'bg-white text-stone-900 shadow-sm border border-stone-300/80'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>Apple (아이폰 / 아이패드)</span>
          </button>

          <button
            type="button"
            onClick={() => setPlatformView('android')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              platformView === 'android'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android (갤럭시 / 크롬)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 max-h-[60vh]">
          {/* ===================== IOS VIEW ===================== */}
          {platformView === 'ios' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Apple className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    애플 사파리(Safari) 브라우저 3초 간편 설치
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                    애플 정책상 아이폰은 사파리 브라우저에서 아래 3단계를 누르면 즉시 홈 화면에 앱 아이콘이 등록됩니다.
                  </p>
                </div>
              </div>

              {/* Step 1, 2, 3 Visual Cards */}
              <div className="space-y-2.5 text-xs">
                {/* Step 1 */}
                <div className="p-3.5 rounded-2xl bg-white border-2 border-stone-200 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div>
                      <div className="font-bold text-stone-900">
                        사파리 화면 맨 아래 가운데 <span className="text-indigo-600 font-extrabold">[공유 버튼 ⎋]</span> 터치
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        화면 하단 툴바의 네모 상자 위로 화살표 아이콘을 터치합니다.
                      </div>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 shrink-0">
                    <Share2 className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-2xl bg-white border-2 border-stone-200 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div>
                      <div className="font-bold text-stone-900">
                        메뉴를 조금 아래로 올려 <span className="text-indigo-600 font-extrabold">['홈 화면에 추가' ➕]</span> 터치
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        공유 메뉴 목록 중간에 위치한 '홈 화면에 추가'를 누릅니다.
                      </div>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 shrink-0">
                    <PlusSquare className="w-5 h-5" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-2xl bg-white border-2 border-stone-200 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div>
                      <div className="font-bold text-stone-900">
                        우측 상단 <span className="text-emerald-600 font-extrabold">['추가']</span> 버튼 터치 ➔ 완료!
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        아이폰 바탕화면에 MIND:TYPE 앱 아이콘이 바로 생성됩니다.
                      </div>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Animated Pointer for Safari Bar */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200/80 flex items-center justify-between text-xs text-indigo-900">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold">지금 사파리 맨 아래를 확인해 보세요!</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 animate-bounce">
                  <span>아래 공유 아이콘 [⎋]</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Alternative .mobileconfig download option */}
              <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                <div className="text-[11px] text-stone-500 font-medium text-center">
                  또는 다른 방법으로 설치하고 싶으신가요?
                </div>
                <button
                  type="button"
                  onClick={handleDownloadProfile}
                  className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-stone-200 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Apple 기기 설치 프로파일(.mobileconfig) 직접 받기</span>
                </button>
                {profileDownloaded && (
                  <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg text-center font-medium">
                    프로파일이 다운로드되었습니다. 아이폰 [설정] 상단의 [프로파일이 다운로드됨 ➔ 설치]를 완료해 주세요.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ===================== ANDROID VIEW ===================== */}
          {platformView === 'android' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-emerald-950">
                    안드로이드 (Chrome / 삼성 인터넷) 즉시 설치
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                    크롬 또는 삼성 인터넷 브라우저에서 클릭 한 번으로 홈 화면에 독립 앱으로 설치됩니다.
                  </p>
                </div>
              </div>

              {/* Direct Trigger Button */}
              <button
                type="button"
                onClick={handleAndroidPromptClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>안드로이드 홈 화면에 지금 즉시 설치하기</span>
              </button>

              {androidTriggered && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium text-center">
                  브라우저 설치 팝업이 뜨지 않는다면 아래 수동 2단계를 확인해 주세요!
                </div>
              )}

              {/* 2-Step Fallback Guide for Chrome / Samsung Internet */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>설치 창이 바로 안 뜰 때 2초 수동 설치법:</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <div className="font-bold text-stone-900">
                      Chrome 우측 상단 더보기 <span className="text-emerald-700 font-extrabold">(⋮)</span> 메뉴 터치
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      (삼성 인터넷은 우측 하단의 줄 3개 ≡ 메뉴 터치)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <div className="font-bold text-stone-900">
                      메뉴에서 <span className="text-emerald-700 font-extrabold">['앱 설치']</span> 또는 <span className="text-emerald-700 font-extrabold">['홈 화면에 추가']</span> 선택
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      스마트폰 바탕화면에 즉시 MIND:TYPE 앱 아이콘이 추가됩니다.
                    </div>
                  </div>
                </div>
              </div>

              {/* Open in Chrome button via Intent */}
              <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
                  }}
                  className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-stone-200 transition cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-stone-600" />
                  <span>Google Chrome 브라우저로 직접 실행하기</span>
                </button>
              </div>
            </div>
          )}

          {/* Copy Current App URL */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-[11px] font-mono text-stone-600 truncate">
              {currentUrl}
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨!' : '링크 복사'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            주소창 없는 전체 화면 · 오프라인 캐시 지원
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
