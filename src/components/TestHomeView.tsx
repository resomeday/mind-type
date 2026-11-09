import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Send,
  Compass,
  HeartHandshake,
  Smartphone,
  Download,
  Apple
} from 'lucide-react';
import { UserPersona } from '../types/personality';
import { DimensionKey, DIMENSIONS_META } from '../data/detailedQuestions';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO,
  DIMENSION_PALETTE
} from '../data/personalityData';
import { downloadAppleWebClipProfile, installAndroidDirect } from '../services/mobileInstallService';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { DirectInstallGuideModal } from './DirectInstallGuideModal';

interface TestHomeViewProps {
  user: UserPersona;
  onOpenFullTest: () => void;
  onOpenDirectPreset: () => void;
  onStartDimensionTest: (dim: DimensionKey) => void;
  onNavigateProfile: () => void;
  onNavigateMatches: () => void;
  onOpenInviteModal?: () => void;
  onNavigateFriends?: () => void;
  onOpenInstallModal?: () => void;
}

export const TestHomeView: React.FC<TestHomeViewProps> = ({
  user,
  onOpenFullTest,
  onOpenDirectPreset,
  onStartDimensionTest,
  onNavigateProfile,
  onNavigateMatches,
  onOpenInviteModal,
  onNavigateFriends,
  onOpenInstallModal
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, isInAppBrowser, triggerInstall } = usePWAInstall();
  const [directGuidePlatform, setDirectGuidePlatform] = React.useState<'ios' | 'android' | null>(null);
  const [installFeedback, setInstallFeedback] = React.useState<string | null>(null);
  const dimensionsList: DimensionKey[] = ['mbti', 'attachment', 'chronotype', 'stress', 'element', 'blood'];

  const getCurrentValueLabel = (key: DimensionKey) => {
    switch (key) {
      case 'mbti':
        return `${user.mbti} · ${MBTI_INFO[user.mbti].nameKr}`;
      case 'attachment':
        return `${ATTACHMENT_INFO[user.attachment].symbol} ${ATTACHMENT_INFO[user.attachment].badge}`;
      case 'chronotype':
        return `${CHRONOTYPE_INFO[user.chronotype].symbol} ${CHRONOTYPE_INFO[user.chronotype].badge}`;
      case 'stress':
        return `${STRESS_INFO[user.stress].symbol} ${STRESS_INFO[user.stress].badge}`;
      case 'element':
        return `${ELEMENT_INFO[user.element].symbol} ${ELEMENT_INFO[user.element].badge}`;
      case 'blood':
        return `${BLOOD_INFO[user.bloodType].symbol} ${user.bloodType}형 (${BLOOD_INFO[user.bloodType].badge})`;
    }
  };

  const getDimensionSummary = (key: DimensionKey) => {
    switch (key) {
      case 'mbti':
        return MBTI_INFO[user.mbti].summary;
      case 'attachment':
        return ATTACHMENT_INFO[user.attachment].summary;
      case 'chronotype':
        return CHRONOTYPE_INFO[user.chronotype].summary;
      case 'stress':
        return STRESS_INFO[user.stress].summary;
      case 'element':
        return ELEMENT_INFO[user.element].summary;
      case 'blood':
        return BLOOD_INFO[user.bloodType].summary;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero: Psychological Test App Identity (Focus, Clean, Warm Editorial) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-[0_2px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-100/40 via-rose-100/30 to-indigo-100/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 max-w-3xl space-y-4">
          {/* Metadata Discipline: Clean unboxed text with · separators */}
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
            <span>MIND:TYPE</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>6차원 성향 심층 심리테스트</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>132문항 정밀 프로파일링</span>
          </div>

          {/* Balanced Headline */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            나를 입체적으로 정의하는<br />
            <span className="underline decoration-stone-300 decoration-2 underline-offset-4">
              6차원 심층 심리테스트
            </span>
          </h1>

          <p className="text-xs sm:text-base text-stone-600 leading-relaxed max-w-2xl">
            단순한 MBTI를 넘어 <strong>혈액형, 애착유형, 크로노타입 생체시계, 스트레스 대처기제, 고대 4대 기질론</strong>을 결합하여 나의 무의식적 본질과 타인과의 케미스트리를 입체적으로 진단합니다.
          </p>

          {/* Focal Anchor Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onOpenFullTest}
              className="px-6 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>6차원 종합 정밀진단 시작 (132문항)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenDirectPreset}
              className="px-5 py-4 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-stone-200 transition-all active:scale-98 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-stone-600" />
              <span>⚡ 이미 내 성향을 알아요 (1분 빠른 설정)</span>
            </button>
          </div>

          {/* Value Proposition Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500 font-medium">
            <span>✓ 5점 리커트 척도 정밀 문항</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>✓ 한 문항씩 집중하는 스텝 인터랙션</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>✓ 실시간 6차원 거미줄(Radar) 차트 도출</span>
          </div>
        </div>
      </div>

      {/* 2. Social Chemistry Banner: 친구 초대 & 모임 케미 */}
      <div className="bg-stone-900 rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>친구와 함께 확인하는 실시간 1:1 케미 & 단체 모임 룸</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white">
            친구에게 초대장을 보내거나 성격 카드를 교환해 보세요
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
            링크 하나로 친구의 카드가 내 앱에 저장되고, 두 사람의 소울메이트 점수와 갈등 해결 팁을 동시에 확인할 수 있습니다.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          {onOpenInviteModal && (
            <button
              type="button"
              onClick={onOpenInviteModal}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-stone-800" />
              <span>초대장 보내기</span>
            </button>
          )}
          {onNavigateFriends && (
            <button
              type="button"
              onClick={onNavigateFriends}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-stone-700 flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>모임 케미 룸</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. 6 Individual Dimension Cards: "한 화면에 하나의 목적" */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
          <div>
            <div className="text-xs font-semibold text-stone-500 mb-0.5">
              모듈형 개별 진단
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              차원별 개별 진단 (궁금한 영역만 1개씩 선택)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              전체 132문항이 부담스러우시다면, 지금 가장 궁금한 영역 하나만 골라서 20~32문항으로 빠르게 진단해보세요.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {dimensionsList.map((dimKey, idx) => {
            const meta = DIMENSIONS_META[dimKey];
            const palette = DIMENSION_PALETTE[dimKey];
            const currentLabel = getCurrentValueLabel(dimKey);
            const currentSummary = getDimensionSummary(dimKey);

            return (
              <div
                key={dimKey}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-stone-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header with Dimension Symbol */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-base shrink-0">
                        {palette.symbol}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-stone-900">
                          {palette.nameKr}
                        </h3>
                        <div className="text-[10px] text-stone-400 font-medium">
                          {palette.kicker}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {meta.questionCount}문항
                    </span>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs text-stone-500 mt-2.5 leading-snug">
                    {palette.desc}
                  </p>

                  {/* Current Status Box with Palette Tint */}
                  <div className={`mt-3.5 p-3 rounded-2xl ${palette.lightBg} border ${palette.border}`}>
                    <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold uppercase tracking-wider mb-0.5">
                      <span>현재 나의 진단 결과</span>
                      <CheckCircle className="w-3.5 h-3.5 text-stone-700" />
                    </div>
                    <div className={`text-xs sm:text-sm font-bold ${palette.badgeText}`}>
                      {currentLabel}
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {currentSummary}
                    </p>
                  </div>
                </div>

                {/* Single Focused Button */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => onStartDimensionTest(dimKey)}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-98"
                  >
                    <span>{meta.titleKr.split(' ')[0]} 정밀 진단 시작</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile PWA App Install Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between gap-5 border border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
              <Smartphone className="w-6 h-6 text-amber-300" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <span>스마트폰 홈 화면 설치</span>
                <span className="text-white/40">·</span>
                <span>원클릭 다이렉트 설치</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                핸드폰 기종에 맞는 버튼을 누르면 바로 설치됩니다
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                브라우저 주소창 없이 전체 화면 앱으로 실행되며, 데이터 없이도 오프라인 캐시를 통해 빠르게 동작합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={async () => {
                if (isInstallable) {
                  const res = await triggerInstall();
                  if (res === 'accepted') {
                    setInstallFeedback('MIND:TYPE 앱 설치가 완료되었습니다! 홈 화면을 확인해 주세요.');
                    return;
                  }
                }
                setDirectGuidePlatform('android');
              }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-white" />
              <span>안드로이드 바로 설치</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDirectGuidePlatform('ios');
              }}
              className="px-4 py-2.5 bg-white text-stone-900 hover:bg-stone-100 active:scale-95 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Apple className="w-3.5 h-3.5 text-stone-900" />
              <span>Apple (아이폰) 바로 설치</span>
            </button>
          </div>
        </div>

        {installFeedback && (
          <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs text-amber-200 leading-relaxed animate-in fade-in duration-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <span>{installFeedback}</span>
          </div>
        )}
      </div>

      {/* Direct Interactive Install Modal */}
      <DirectInstallGuideModal
        isOpen={!!directGuidePlatform}
        onClose={() => setDirectGuidePlatform(null)}
        targetPlatform={directGuidePlatform || 'ios'}
        onTriggerAndroidInstall={triggerInstall}
        isInAppBrowser={isInAppBrowser}
      />

      {/* 4. Next Step Teaser: View Radar Chart & Best Matches */}
      <div className="bg-stone-100/70 rounded-3xl p-6 sm:p-7 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-stone-500">진단이 끝나셨나요?</div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-0.5">
            거미줄(Radar) 차트와 나만의 최적 인간관계 매칭을 확인해보세요
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            6차원 입체 성향 요약표, 우주 최강 찰떡궁합, 1:1 케미스트리 분석 리포트가 준비되어 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onNavigateProfile}
            className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors cursor-pointer shadow-2xs"
          >
            내 성향 분석 리포트
          </button>
          <button
            type="button"
            onClick={onNavigateMatches}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <span>최적 궁합 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
