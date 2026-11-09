import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Apple, 
  Download, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  Layers, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  QrCode
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

import { 
  downloadAppleWebClipProfile, 
  installAndroidDirect 
} from '../services/mobileInstallService';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabKey = 'instant_pwa' | 'android_store' | 'apple_store';

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, platformName, triggerInstall } = usePWAInstall();
  
  // Default tab based on user's device
  const [activeTab, setActiveTab] = useState<TabKey>('instant_pwa');

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [installStatus, setInstallStatus] = useState<string | null>(null);
  const [activePlatformFeedback, setActivePlatformFeedback] = useState<'android' | 'apple' | null>(null);

  if (!isOpen) return null;

  const currentAppUrl = typeof window !== 'undefined' && window.location.origin.startsWith('http')
    ? window.location.origin
    : 'https://ais-pre-g5rc6dgojhiu7nte2qwhf7-633738735601.asia-east1.run.app';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDirectAndroidClick = async () => {
    setActivePlatformFeedback('android');
    const msg = await installAndroidDirect(triggerInstall, currentAppUrl);
    setInstallStatus(msg);
  };

  const handleDirectAppleClick = () => {
    setActivePlatformFeedback('apple');
    const msg = downloadAppleWebClipProfile(currentAppUrl);
    setInstallStatus(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  모바일 앱 설치 & 출시 가이드
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  Android & iOS
                </span>
              </div>
              <p className="text-xs text-slate-500">
                스마트폰 홈 화면에서 앱스토어 없이 1초 설치하거나, 정식 스토어로 패키징하는 방법
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Device Detection Banner */}
        <div className="px-5 py-2.5 bg-indigo-50/60 border-b border-indigo-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-indigo-900 font-semibold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>
              현재 접속 기기:{' '}
              {isIOS ? 'Apple iPhone / iPad (iOS)' : isAndroid ? 'Android 스마트폰' : 'PC / 태블릿 데스크톱'}
            </span>
          </div>
          {isInstalled ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> 이미 앱으로 실행 중
            </span>
          ) : (
            <span className="text-[11px] text-slate-500">
              PWA 지원 완료 (오프라인 캐시 및 독립 실행)
            </span>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-5 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('instant_pwa')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'instant_pwa'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            1. 바로 설치 (홈 화면 PWA)
          </button>
          <button
            onClick={() => setActiveTab('android_store')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'android_store'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            2. Google Play 출시
          </button>
          <button
            onClick={() => setActiveTab('apple_store')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'apple_store'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Apple className="w-4 h-4 text-slate-800" />
            3. App Store (iOS) 출시
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* TAB 1: INSTANT PWA INSTALL */}
          {activeTab === 'instant_pwa' && (
            <div className="space-y-4">
              {/* TWO DIRECT ONE-CLICK INSTALL BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Android Direct Install Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/10 border-2 border-emerald-500/30 flex flex-col justify-between shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-sm text-stone-900">안드로이드 (갤럭시)</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        1초 즉시 설치
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      구글 크롬 / 삼성 인터넷 브라우저에서 홈 화면 바로가기 및 독립형 앱으로 즉시 설치됩니다.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDirectAndroidClick}
                    className="mt-3.5 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>안드로이드 바로 설치하기</span>
                  </button>
                </div>

                {/* 2. Apple Direct Install Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-900/10 via-stone-800/5 to-slate-900/10 border-2 border-stone-800/30 flex flex-col justify-between shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold">
                          <Apple className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-sm text-stone-900">Apple (아이폰/아이패드)</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800">
                        원클릭 프로파일
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      클릭 즉시 아이폰 설치 프로파일(.mobileconfig)이 생성되며, 홈 화면에 실제 앱 아이콘이 추가됩니다.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDirectAppleClick}
                    className="mt-3.5 w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-stone-900/20 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Apple (아이폰) 바로 설치하기</span>
                  </button>
                </div>
              </div>

              {/* Status Banner when user clicked install */}
              {installStatus && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>설치 진행 안내:</span>
                  </div>
                  <p className="font-medium leading-relaxed">{installStatus}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Download className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    앱스토어 다운로드 없이 1초 만에 스마트폰 홈 화면에 설치
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    MIND:TYPE은 최신 <strong>PWA(Progressive Web App)</strong> 규격을 완벽 지원합니다. 
                    설치 즉시 브라우저 상단 주소창이 사라지고 일반 네이티브 앱과 동일하게 전체 화면으로 실행됩니다.
                  </p>
                </div>
              </div>

              {/* QR Code & Mobile Direct Access Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-xs border border-indigo-100 shrink-0 flex flex-col items-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(currentAppUrl)}`}
                    alt="스마트폰 접속 QR 코드"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-semibold text-slate-500 mt-1 flex items-center gap-1">
                    <QrCode className="w-3 h-3 text-indigo-600" /> 카메라로 스캔
                  </span>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> 스마트폰으로 바로 열기
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    핸드폰 기본 카메라를 켜고 왼쪽 QR 코드를 비추세요!
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    별도의 앱 다운로드 필요 없이 바로 열립니다. 링크를 복사해 카카오톡 '나와의 채팅'에 붙여넣고 열어도 됩니다.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 bg-white px-2.5 py-1.5 rounded-lg border border-indigo-200 text-[11px] text-slate-700 font-mono truncate select-all">
                      {currentAppUrl}
                    </div>
                    <button
                      onClick={() => handleCopy(currentAppUrl, 'mobile-url')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition cursor-pointer shadow-xs"
                    >
                      {copiedCode === 'mobile-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'mobile-url' ? '복사됨!' : '링크 복사'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* iOS Safari Guide */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isIOS ? 'border-indigo-400 bg-indigo-50/30 ring-2 ring-indigo-200' : 'border-slate-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                      <Apple className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Apple iPhone / iPad (Safari) 설치 방법</h4>
                  </div>
                  {isIOS && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                      내 기기 맞춤
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs mb-2">
                        1
                      </div>
                      <p className="font-semibold text-slate-800">Safari 브라우저 하단</p>
                      <p className="text-slate-500 mt-0.5 text-[11px]">
                        하단 도구 모음의 <strong>공유(Share)</strong> 아이콘을 누릅니다.
                      </p>
                    </div>
                    <div className="mt-2.5 flex justify-center py-1 bg-white rounded-lg border border-slate-200 text-slate-500">
                      <Share2 className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs mb-2">
                        2
                      </div>
                      <p className="font-semibold text-slate-800">메뉴 스크롤</p>
                      <p className="text-slate-500 mt-0.5 text-[11px]">
                        공유 창에서 아래로 내려 <strong>'홈 화면에 추가'</strong>를 선택합니다.
                      </p>
                    </div>
                    <div className="mt-2.5 flex justify-center py-1 bg-white rounded-lg border border-slate-200 text-slate-500">
                      <PlusSquare className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs mb-2">
                        3
                      </div>
                      <p className="font-semibold text-slate-800">우측 상단 '추가' 완료</p>
                      <p className="text-slate-500 mt-0.5 text-[11px]">
                        홈 화면에 <strong>MIND:TYPE</strong> 앱 아이콘이 생성되고 독립 앱으로 실행됩니다.
                      </p>
                    </div>
                    <div className="mt-2.5 flex justify-center py-1 bg-white rounded-lg border border-slate-200 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Android Guide */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isAndroid ? 'border-emerald-400 bg-emerald-50/30 ring-2 ring-emerald-200' : 'border-slate-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Android (Chrome / Samsung Internet) 설치</h4>
                  </div>
                  {isAndroid && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      내 기기 맞춤
                    </span>
                  )}
                </div>

                {isInstallable ? (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600">
                      지금 바로 아래 버튼을 누르면 안드로이드 폰 홈 화면에 바로 설치됩니다!
                    </p>
                    <button
                      onClick={handleDirectAndroidClick}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      안드로이드 기기에 지금 즉시 설치하기
                    </button>
                    {installStatus && (
                      <p className="text-xs text-emerald-700 font-semibold text-center">{installStatus}</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0">1</span>
                      <div>
                        <strong>Chrome / 삼성 인터넷</strong> 우측 상단 더보기 <strong>(⋮)</strong> 메뉴를 누릅니다.
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0">2</span>
                      <div>
                        메뉴 항목 중 <strong>'앱 설치'</strong> 또는 <strong>'홈 화면에 추가'</strong>를 누릅니다.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Features of Installed App */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-indigo-600 font-black text-sm">전체 화면</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">상단 주소창 없는 몰입감</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-emerald-600 font-black text-sm">오프라인 캐시</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">데이터 없이 즉시 로딩</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-purple-600 font-black text-sm">홈 화면 아이콘</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">고화질 앱 아이콘 탑재</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-pink-600 font-black text-sm">무료 설치</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">용량 부담 없이 0.5초 실행</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE PLAY STORE PUBLISHING */}
          {activeTab === 'android_store' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  Google Play Store (Android) 정식 앱 출시 절차
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  구글 공식 <strong>TWA(Trusted Web Activity)</strong> 기술인 <strong>Bubblewrap</strong> 또는 
                  <strong>Capacitor</strong>를 사용하면, 현재 완성된 웹 코드를 단 5분 만에 안드로이드 정식 <code>.aab</code> 파일로 패키징할 수 있습니다.
                </p>
              </div>

              {/* Option A: Bubblewrap (Fastest, Official Google) */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">A</span>
                    방법 1: Google Bubblewrap CLI (가장 빠르고 권장됨)
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    코드 수정 0개
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  구글의 공식 TWA CLI 도구로 이미 배포된 웹 앱 주소만 입력하면 Google Play 등록용 App Bundle(.aab)을 자동 빌드합니다.
                </p>

                <div className="relative bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2 border-b border-slate-800 pb-1">
                    <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> 터미널 실행 명령어</span>
                    <button
                      onClick={() => handleCopy('npm install -g @bubblewrap/cli\nbubblewrap init --manifest=https://YOUR_DOMAIN/manifest.webmanifest\nbubblewrap build', 'bubblewrap')}
                      className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === 'bubblewrap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode === 'bubblewrap' ? '복사됨' : '복사'}
                    </button>
                  </div>
                  <code>
                    # 1. Bubblewrap CLI 설치<br />
                    npm install -g @bubblewrap/cli<br /><br />
                    # 2. 본 앱 매니페스트 URL로 안드로이드 프로젝트 자동 생성<br />
                    bubblewrap init --manifest=https://ais-pre-g5rc6dgojhiu7nte2qwhf7-633738735601.asia-east1.run.app/manifest.webmanifest<br /><br />
                    # 3. Google Play 제출용 .aab 파일 빌드<br />
                    bubblewrap build
                  </code>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p>• 생성된 <code>app-release-bundle.aab</code> 파일을 <strong>Google Play Console</strong>에 업로드하면 심사 후 플레이스토어에 게시됩니다.</p>
                </div>
              </div>

              {/* Option B: Capacitor */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">B</span>
                    방법 2: Capacitor (네이티브 플러그인 확장 가능)
                  </h4>
                </div>
                <div className="relative bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2 border-b border-slate-800 pb-1">
                    <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> 터미널 명령어</span>
                    <button
                      onClick={() => handleCopy('npm install @capacitor/core @capacitor/cli @capacitor/android\nnpx cap init "MIND:TYPE" "com.mindtype.app" --web-dir dist\nnpx cap add android\nnpx cap open android', 'cap-android')}
                      className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === 'cap-android' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode === 'cap-android' ? '복사됨' : '복사'}
                    </button>
                  </div>
                  <code>
                    npm install @capacitor/core @capacitor/cli @capacitor/android<br />
                    npx cap init "MIND:TYPE" "com.mindtype.app" --web-dir dist<br />
                    npm run build<br />
                    npx cap add android<br />
                    npx cap open android  # Android Studio에서 열림
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPLE APP STORE PUBLISHING */}
          {activeTab === 'apple_store' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Apple className="w-5 h-5" />
                  Apple App Store (iOS) 정식 앱 출시 절차
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  애플의 경우 Mac 환경에서 <strong>Capacitor (또는 Cordova)</strong>를 통해 Xcode 프로젝트로 변환 후,
                  Apple Developer 계정으로 서명하여 App Store Connect에 제출합니다.
                </p>
              </div>

              {/* Step by step Capacitor iOS */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  Capacitor iOS 빌드 4단계 (Mac 필요)
                </h4>

                <div className="relative bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2 border-b border-slate-800 pb-1">
                    <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> Xcode 프로젝트 생성 명령어</span>
                    <button
                      onClick={() => handleCopy('npm install @capacitor/core @capacitor/cli @capacitor/ios\nnpx cap init "MIND:TYPE" "com.mindtype.app" --web-dir dist\nnpm run build\nnpx cap add ios\nnpx cap open ios', 'cap-ios')}
                      className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === 'cap-ios' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode === 'cap-ios' ? '복사됨' : '복사'}
                    </button>
                  </div>
                  <code>
                    # 1. Capacitor iOS 의존성 설치<br />
                    npm install @capacitor/core @capacitor/cli @capacitor/ios<br /><br />
                    # 2. 웹 앱 최적화 빌드<br />
                    npm run build<br /><br />
                    # 3. iOS 네이티브 프로젝트 추가<br />
                    npx cap add ios<br /><br />
                    # 4. Mac의 Xcode에서 프로젝트 실행<br />
                    npx cap open ios
                  </code>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">1</span>
                    <div>
                      <strong>Xcode에서 서명(Signing)</strong>: Xcode 상단의 <code>Signing & Capabilities</code>에서 본인의 <strong>Apple Developer Team</strong>을 선택합니다.
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">2</span>
                    <div>
                      <strong>아카이브(Archive) 및 업로드</strong>: 상단 메뉴 <code>Product &gt; Archive</code> 선택 후 <code>Distribute App &gt; App Store Connect</code>를 클릭하여 애플 서버로 전송합니다.
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">3</span>
                    <div>
                      <strong>심사 및 출시</strong>: <a href="https://appstoreconnect.apple.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-semibold">App Store Connect</a>에서 스크린샷 및 설명 작성 후 심사 요청하면 전 세계 앱스토어에 출시됩니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PWA & 네이티브 하이브리드 표준 호환 완료</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
