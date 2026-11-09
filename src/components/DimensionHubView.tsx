import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Brain,
  Shield,
  Flame,
  CheckCircle,
  HelpCircle,
  RotateCw
} from 'lucide-react';
import {
  UserPersona,
  MBTIType,
  BloodType,
  AttachmentStyle,
  Chronotype,
  StressStyle,
  ElementTemperament
} from '../types/personality';
import { DimensionKey, DIMENSIONS_META } from '../data/detailedQuestions';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO
} from '../data/personalityData';

interface DimensionHubViewProps {
  user: UserPersona;
  onStartDimensionTest: (dim: DimensionKey) => void;
  onUpdateUserDirectly: (updated: Partial<UserPersona>) => void;
}

export const DimensionHubView: React.FC<DimensionHubViewProps> = ({
  user,
  onStartDimensionTest,
  onUpdateUserDirectly
}) => {
  const dimensionsList: DimensionKey[] = ['mbti', 'attachment', 'chronotype', 'stress', 'element', 'blood'];

  const getCurrentValueLabel = (key: DimensionKey) => {
    switch (key) {
      case 'mbti':
        return `${user.mbti} · ${MBTI_INFO[user.mbti].nameKr}`;
      case 'attachment':
        return `${ATTACHMENT_INFO[user.attachment].symbol} ${ATTACHMENT_INFO[user.attachment].badge} (${ATTACHMENT_INFO[user.attachment].nameEn})`;
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
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
              <span>MIND:TYPE 진단 센터</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>6개 핵심 차원 개별 검사</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              차원별 개별 선택 정밀 검사
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              모든 문항을 한꺼번에 할 필요 없이, <strong>궁금한 차원만 하나씩 선택</strong>하여 
              5지선답(Likert 5점 척도)으로 정밀하게 진단받을 수 있습니다.
            </p>
          </div>

          <div className="text-xs p-3.5 bg-stone-50 border border-stone-200/80 rounded-2xl text-stone-900 shrink-0">
            <span className="font-bold block text-stone-500 text-[10px] uppercase mb-0.5 tracking-wider">현재 나의 통합 페르소나</span>
            <span className="font-semibold text-stone-800">{user.customTitle}</span>
          </div>
        </div>
      </div>

      {/* 6 Dimension Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dimensionsList.map(dimKey => {
          const meta = DIMENSIONS_META[dimKey];
          const currentLabel = getCurrentValueLabel(dimKey);
          const currentSummary = getDimensionSummary(dimKey);

          return (
            <div
              key={dimKey}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{meta.symbol}</span>
                    <h3 className="text-sm font-bold text-stone-900">
                      {meta.titleKr}
                    </h3>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {meta.questionCount}문항 · {meta.estimatedTime}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-stone-500 mt-2.5">
                  {meta.subtitle}
                </p>

                {/* Current Value Display Box */}
                <div className="mt-4 p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/60">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">
                    현재 나의 진단 결과
                  </span>
                  <div className="text-sm font-extrabold text-stone-900 mt-0.5 flex items-center justify-between">
                    <span>{currentLabel}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {currentSummary}
                  </p>
                </div>

                {/* Why it matters */}
                <div className="mt-3.5 text-[11px] text-stone-500 leading-relaxed">
                  <strong className="text-stone-700 font-semibold">관계 속 영향:</strong> {meta.whyMatters}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => onStartDimensionTest(dimKey)}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-98"
                >
                  <span>이 차원만 세밀하게 진단하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Strip */}
      <div className="bg-stone-50/80 rounded-2xl p-6 border border-stone-200/70 text-xs text-stone-600 leading-relaxed">
        <h3 className="font-bold text-stone-800 text-sm mb-2 flex items-center gap-1.5">
          <span>💡</span> 개별 진단 센터 활용 팁
        </h3>
        <p className="mb-1">
          • 특정 차원만 다시 검사해도, 전체 다면 성격 프로필과 최적의 소울메이트 추천, 1:1 궁합 진단 결과가 실시간으로 재계산됩니다.
        </p>
        <p>
          • 예를 들어 연인과의 연락 문제나 서운함이 잦을 때는 <strong>애착 유형</strong>을, 수면 패턴이나 만나는 시간이 다를 때는 <strong>크로노타입</strong>을 우선적으로 정밀 진단해 보세요.
        </p>
      </div>
    </div>
  );
};
