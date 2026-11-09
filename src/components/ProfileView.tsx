import React from 'react';
import {
  Share2,
  Sparkles,
  HeartHandshake,
  Compass,
  Zap,
  Shield,
  Clock,
  Flame,
  Brain,
  Info,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Palette
} from 'lucide-react';
import { UserPersona } from '../types/personality';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO,
  generatePersonaCatchphrase
} from '../data/personalityData';
import { DesignTheme, THEMES } from '../types/theme';
import { PersonalityRadarChart } from './PersonalityRadarChart';
import { PersonalityKeywordCard } from './PersonalityKeywordCard';

interface ProfileViewProps {
  user: UserPersona;
  onOpenShareModal: () => void;
  onOpenPdfModal?: () => void;
  onOpenInstallModal?: () => void;
  onOpenCardExchangeModal?: (tab?: 'share' | 'request' | 'import') => void;
  currentTheme?: DesignTheme;
  onOpenThemeModal?: () => void;
  onNavigateMatches: () => void;
  onNavigateCompat: () => void;
  onNavigateDimensionHub: () => void;
  onTestDimension: (dimKey: 'mbti' | 'blood' | 'attachment' | 'chronotype' | 'stress' | 'element') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onOpenShareModal,
  onOpenPdfModal,
  onOpenInstallModal,
  onOpenCardExchangeModal,
  currentTheme = 'warm',
  onOpenThemeModal,
  onNavigateMatches,
  onNavigateCompat,
  onNavigateDimensionHub,
  onTestDimension
}) => {
  const mbti = MBTI_INFO[user.mbti];
  const blood = BLOOD_INFO[user.bloodType];
  const attachment = ATTACHMENT_INFO[user.attachment];
  const chrono = CHRONOTYPE_INFO[user.chronotype];
  const stress = STRESS_INFO[user.stress];
  const element = ELEMENT_INFO[user.element];

  const catchphrase = generatePersonaCatchphrase(user);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-[0_2px_14px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
                <span>MIND:TYPE 6차원 종합 프로필</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{user.name} 님의 고유 페르소나</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {user.customTitle || `${user.mbti} × ${blood.badge}`}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
                {catchphrase}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {onOpenThemeModal && (
                <button
                  onClick={onOpenThemeModal}
                  className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100/80 hover:bg-stone-200/70 border border-stone-200/80 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                  title="심플한 디자인 스타일 변경"
                >
                  <Palette className="w-3.5 h-3.5 text-stone-600" />
                  <span>디자인 스타일</span>
                </button>
              )}
              {onOpenInstallModal && (
                <button
                  onClick={onOpenInstallModal}
                  className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100/80 hover:bg-stone-200/70 border border-stone-200/80 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                  title="스마트폰 홈 화면에 앱 설치 및 출시 가이드"
                >
                  <Smartphone className="w-3.5 h-3.5 text-stone-600" />
                  <span>앱 설치</span>
                </button>
              )}
              <button
                onClick={onOpenShareModal}
                className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200/90 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
              >
                <Share2 className="w-3.5 h-3.5 text-stone-500" />
                <span>내 카드 공유</span>
              </button>
              {onOpenCardExchangeModal && (
                <button
                  type="button"
                  onClick={() => onOpenCardExchangeModal('request')}
                  className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200/90 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                >
                  <span>📢 친구에게 카드 요청</span>
                </button>
              )}
              <button
                onClick={onNavigateMatches}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-300" />
                <span>최적 관계 추천</span>
              </button>
            </div>
          </div>

          {/* 6 Dimension Clean Unboxed Summary (Natural clean layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
            <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/60 hover:border-stone-300 transition-colors">
              <div className="text-[11px] font-medium text-stone-400">01. 인지 스타일</div>
              <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                <span>{user.mbti}</span>
                <span className="text-xs font-normal text-stone-500">{mbti.nameKr.split(' ')[0]}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/60 hover:border-stone-300 transition-colors">
              <div className="text-[11px] font-medium text-stone-400">02. 혈액형 바이브</div>
              <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                <span>{user.bloodType}형</span>
                <span className="text-xs font-normal text-stone-500">
                  {user.bloodType === 'A' ? '배려' : user.bloodType === 'B' ? '자유' : user.bloodType === 'O' ? '의리' : '합리'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/60 hover:border-stone-300 transition-colors">
              <div className="text-[11px] font-medium text-stone-400">03. 애착 유형</div>
              <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                <span>{attachment.badge}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/60 hover:border-stone-300 transition-colors">
              <div className="text-[11px] font-medium text-stone-400">04. 생체 시계</div>
              <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                <span>{chrono.symbol} {chrono.badge}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/60 hover:border-stone-300 transition-colors">
              <div className="text-[11px] font-medium text-stone-400">05. 멘탈 회복</div>
              <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                <span>{stress.symbol} {stress.badge}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/60 hover:border-stone-300 transition-colors">
              <div className="text-[11px] font-medium text-stone-400">06. 4대 기질</div>
              <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                <span>{element.symbol} {element.badge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Dimensional Personality Core Keyword Card */}
      <PersonalityKeywordCard
        user={user}
        onOpenShareModal={onOpenShareModal}
        onOpenPdfModal={onOpenPdfModal}
      />

      {/* 6-Dimensional Radar Chart (Strengths & Growth Areas) */}
      <PersonalityRadarChart user={user} />

      {/* Deep-dive 6 Dimensions Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              6개 핵심 차원 입체 분석 리포트
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              각 차원별 카드의 "정밀 재진단" 버튼을 눌러 원하는 영역만 심층 5지선답으로 검사할 수 있습니다.
            </p>
          </div>
          <button
            onClick={onNavigateDimensionHub}
            className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100/90 hover:bg-stone-200/80 border border-stone-200/80 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            <span>차원별 개별 진단 센터</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. MBTI Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm">
                    {mbti.symbol}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-stone-500">차원 1 · 인지 스타일</div>
                    <h3 className="text-base font-bold text-stone-900">
                      {user.mbti} — {mbti.nameKr}
                    </h3>
                  </div>
                </div>
                <span className="text-xs text-stone-400 font-medium">{mbti.nameEn}</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3.5 leading-relaxed">
                {mbti.detailedDesc}
              </p>

              {/* Key traits */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {mbti.keyTraits.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>관계 속 강점:</strong> {mbti.relationshipStrength}</span>
                </div>
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600" />
                  <span><strong>주의할 점:</strong> {mbti.relationshipCaution}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTestDimension('mbti')}
              className="mt-5 w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200/70"
            >
              <span>MBTI 정밀 32문항 재진단하기</span>
            </button>
          </div>

          {/* 2. Blood Type Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm">
                    {blood.symbol}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-stone-500">차원 2 · 혈액형 바이브</div>
                    <h3 className="text-base font-bold text-stone-900">
                      {blood.nameKr}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-stone-400">문화적 해석</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3.5 leading-relaxed">
                {blood.detailedDesc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {blood.keyTraits.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-stone-400" />
                  <span><strong>관계 상호작용:</strong> {blood.relationshipStrength}</span>
                </div>
                <div className="text-[11px] text-stone-400 italic">
                  * 혈액형은 과학적 단정이 아닌 대중적 공감대와 스토리텔링을 위한 문화적 지표로 제공됩니다.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTestDimension('blood')}
              className="mt-5 w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200/70"
            >
              <span>혈액형 & 소셜 바이브 20문항 재진단하기</span>
            </button>
          </div>

          {/* 3. Attachment Style Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm">
                    {attachment.symbol}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-stone-500">차원 3 · 관계 심리학</div>
                    <h3 className="text-base font-bold text-stone-900">
                      {attachment.nameKr}
                    </h3>
                  </div>
                </div>
                <span className="text-xs text-stone-400 font-medium">{attachment.nameEn}</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3.5 leading-relaxed">
                {attachment.detailedDesc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {attachment.keyTraits.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>사랑의 매력:</strong> {attachment.relationshipStrength}</span>
                </div>
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-500" />
                  <span><strong>갈등 예방:</strong> {attachment.relationshipCaution}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTestDimension('attachment')}
              className="mt-5 w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200/70"
            >
              <span>애착유형 심층 20문항 재진단하기</span>
            </button>
          </div>

          {/* 4. Chronotype Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm">
                    {chrono.symbol}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-stone-500">차원 4 · 생체 바이오리듬</div>
                    <h3 className="text-base font-bold text-stone-900">
                      {chrono.nameKr}
                    </h3>
                  </div>
                </div>
                <span className="text-xs text-stone-400 font-medium">Chronotype</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3.5 leading-relaxed">
                {chrono.detailedDesc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {chrono.keyTraits.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600" />
                  <span><strong>일상 & 데이트 시너지:</strong> {chrono.relationshipStrength}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTestDimension('chronotype')}
              className="mt-5 w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200/70"
            >
              <span>크로노타입 생체시계 20문항 재진단하기</span>
            </button>
          </div>

          {/* 5. Stress Style Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm">
                    {stress.symbol}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-stone-500">차원 5 · 멘탈 방어기제</div>
                    <h3 className="text-base font-bold text-stone-900">
                      {stress.nameKr}
                    </h3>
                  </div>
                </div>
                <span className="text-xs text-stone-400 font-medium">Stress Coping</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3.5 leading-relaxed">
                {stress.detailedDesc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {stress.keyTraits.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-purple-600" />
                  <span><strong>멘탈 치유 처방전:</strong> {stress.relationshipStrength}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTestDimension('stress')}
              className="mt-5 w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200/70"
            >
              <span>스트레스 대처 & 방어기제 20문항 재진단하기</span>
            </button>
          </div>

          {/* 6. Element Temperament Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm">
                    {element.symbol}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-stone-500">차원 6 · 4대 기질론</div>
                    <h3 className="text-base font-bold text-stone-900">
                      {element.nameKr}
                    </h3>
                  </div>
                </div>
                <span className="text-xs text-stone-400 font-medium">4 Elements</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3.5 leading-relaxed">
                {element.detailedDesc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {element.keyTraits.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                  <Flame className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" />
                  <span><strong>고유 에너지 파동:</strong> {element.relationshipStrength}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTestDimension('element')}
              className="mt-5 w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200/70"
            >
              <span>고대 4대 기질론 20문항 재진단하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Strip (Clean Minimalist Tone) */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
        <div>
          <span className="text-[11px] text-stone-400 font-semibold tracking-wider">NEXT STEP</span>
          <h3 className="text-base sm:text-lg font-bold mt-0.5">
            이 페르소나와 가장 잘 맞는 "최적의 인간관계"는 누구일까요?
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            연애 소울메이트, 평생 갈 절친, 협업 파트너 4대 추천 모델을 확인하세요.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onNavigateMatches}
            className="px-4 py-2.5 bg-white text-stone-950 font-bold text-xs rounded-xl shadow-xs hover:bg-stone-100 transition-colors cursor-pointer"
          >
            최적 관계 추천 보기
          </button>
          <button
            onClick={onNavigateCompat}
            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-xl border border-stone-700 transition-colors cursor-pointer"
          >
            친구와 1:1 진단
          </button>
        </div>
      </div>
    </div>
  );
};
