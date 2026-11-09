import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Check,
  RotateCcw,
  BarChart3
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
  getMassiveQuestionsForDimension,
  LIKERT_OPTIONS,
  LikertQuestion
} from '../data/massiveQuestions';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO,
  generatePersonaTitle
} from '../data/personalityData';

interface DimensionTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  dimensionKey: DimensionKey;
  currentUser: UserPersona;
  onSaveDimensionResult: (updatedUser: UserPersona, completedDimension: DimensionKey) => void;
}

interface ScoreBreakdown {
  labels: { name: string; score: number; pct: number; color?: string }[];
  primaryValue: string;
}

export const DimensionTestModal: React.FC<DimensionTestModalProps> = ({
  isOpen,
  onClose,
  dimensionKey,
  currentUser,
  onSaveDimensionResult
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Intro, 1..N: Questions, N+1: Result
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [calculatedValue, setCalculatedValue] = useState<string | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);

  const meta = DIMENSIONS_META[dimensionKey];
  const questions: LikertQuestion[] = getMassiveQuestionsForDimension(dimensionKey);
  const totalQuestions = questions.length;

  useEffect(() => {
    setCurrentStep(0);
    setAnswers({});
    setCalculatedValue(null);
    setScoreBreakdown(null);
  }, [dimensionKey, isOpen]);

  // Keyboard shortcut listener (1..5)
  useEffect(() => {
    if (!isOpen || currentStep < 1 || currentStep > totalQuestions) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5) {
        const q = questions[currentStep - 1];
        handleSelectScore(q.id, num);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, totalQuestions, questions]);

  if (!isOpen) return null;

  const handleSelectScore = (questionId: string, score: number) => {
    const updated = { ...answers, [questionId]: score };
    setAnswers(updated);

    if (currentStep < totalQuestions) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 150);
    } else {
      finishAssessment(updated);
    }
  };

  const finishAssessment = (finalAnswers: Record<string, number>) => {
    let resultVal = '';
    let breakdown: ScoreBreakdown = { labels: [], primaryValue: '' };

    if (dimensionKey === 'mbti') {
      let scoreE = 0, scoreI = 0;
      let scoreS = 0, scoreN = 0;
      let scoreT = 0, scoreF = 0;
      let scoreJ = 0, scoreP = 0;

      questions.forEach(q => {
        const val = finalAnswers[q.id] || 3;
        if (q.weightKey === 'E') scoreE += val;
        if (q.weightKey === 'I') scoreI += val;
        if (q.weightKey === 'S') scoreS += val;
        if (q.weightKey === 'N') scoreN += val;
        if (q.weightKey === 'T') scoreT += val;
        if (q.weightKey === 'F') scoreF += val;
        if (q.weightKey === 'J') scoreJ += val;
        if (q.weightKey === 'P') scoreP += val;
      });

      const finalE = scoreE >= scoreI ? 'E' : 'I';
      const finalS = scoreS >= scoreN ? 'S' : 'N';
      const finalT = scoreT >= scoreF ? 'T' : 'F';
      const finalJ = scoreJ >= scoreP ? 'J' : 'P';
      resultVal = `${finalE}${finalS}${finalT}${finalJ}`;

      const totalEI = scoreE + scoreI;
      const totalSN = scoreS + scoreN;
      const totalTF = scoreT + scoreF;
      const totalJP = scoreJ + scoreP;

      breakdown = {
        primaryValue: resultVal,
        labels: [
          { name: `외향(E) vs 내향(I)`, score: scoreE, pct: Math.round((scoreE / totalEI) * 100), color: '#6366f1' },
          { name: `감각(S) vs 직관(N)`, score: scoreS, pct: Math.round((scoreS / totalSN) * 100), color: '#10b981' },
          { name: `사고(T) vs 감정(F)`, score: scoreT, pct: Math.round((scoreT / totalTF) * 100), color: '#f59e0b' },
          { name: `판단(J) vs 인식(P)`, score: scoreJ, pct: Math.round((scoreJ / totalJP) * 100), color: '#8b5cf6' }
        ]
      };
    } else if (dimensionKey === 'attachment') {
      let anxietyTotal = 0;
      let avoidanceTotal = 0;

      questions.forEach(q => {
        const val = finalAnswers[q.id] || 3;
        if (q.weightKey === 'anxiety') anxietyTotal += val;
        if (q.weightKey === 'avoidance') avoidanceTotal += val;
      });

      // Scale 10 ~ 50. Midpoint is 30
      const isHighAnxiety = anxietyTotal >= 28;
      const isHighAvoidance = avoidanceTotal >= 28;

      if (!isHighAnxiety && !isHighAvoidance) resultVal = 'secure';
      else if (isHighAnxiety && !isHighAvoidance) resultVal = 'anxious';
      else if (!isHighAnxiety && isHighAvoidance) resultVal = 'avoidant';
      else resultVal = 'fearful';

      breakdown = {
        primaryValue: resultVal,
        labels: [
          { name: '관계 불안 지수 (유기 불안/확인)', score: anxietyTotal, pct: Math.round((anxietyTotal / 50) * 100), color: '#f43f5e' },
          { name: '친밀감 회피 지수 (거리두기/자립)', score: avoidanceTotal, pct: Math.round((avoidanceTotal / 50) * 100), color: '#0284c7' }
        ]
      };
    } else if (dimensionKey === 'chronotype') {
      const scores: Record<string, number> = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };
      questions.forEach(q => {
        const val = finalAnswers[q.id] || 3;
        scores[q.weightKey] = (scores[q.weightKey] || 0) + val;
      });

      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      resultVal = sorted[0][0];

      const sum = Object.values(scores).reduce((a, b) => a + b, 0);
      breakdown = {
        primaryValue: resultVal,
        labels: [
          { name: '사자형 (Lion / 얼리버드)', score: scores.lion, pct: Math.round((scores.lion / sum) * 100), color: '#ea580c' },
          { name: '곰형 (Bear / 태양주기형)', score: scores.bear, pct: Math.round((scores.bear / sum) * 100), color: '#b45309' },
          { name: '늑대형 (Wolf / 심야야행성)', score: scores.wolf, pct: Math.round((scores.wolf / sum) * 100), color: '#6366f1' },
          { name: '돌고래형 (Dolphin / 예민형)', score: scores.dolphin, pct: Math.round((scores.dolphin / sum) * 100), color: '#0ea5e9' }
        ]
      };
    } else if (dimensionKey === 'stress') {
      const scores: Record<string, number> = { cave: 0, talk: 0, action: 0, logic: 0 };
      questions.forEach(q => {
        const val = finalAnswers[q.id] || 3;
        scores[q.weightKey] = (scores[q.weightKey] || 0) + val;
      });

      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      resultVal = sorted[0][0];

      const sum = Object.values(scores).reduce((a, b) => a + b, 0);
      breakdown = {
        primaryValue: resultVal,
        labels: [
          { name: '동굴잠수형 (Cave Diver)', score: scores.cave, pct: Math.round((scores.cave / sum) * 100), color: '#475569' },
          { name: '폭풍수다형 (Expressive Talk)', score: scores.talk, pct: Math.round((scores.talk / sum) * 100), color: '#ec4899' },
          { name: '행동폭주형 (Active Doer)', score: scores.action, pct: Math.round((scores.action / sum) * 100), color: '#f97316' },
          { name: '이성분석형 (Logical Analyzer)', score: scores.logic, pct: Math.round((scores.logic / sum) * 100), color: '#2563eb' }
        ]
      };
    } else if (dimensionKey === 'element') {
      const scores: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0 };
      questions.forEach(q => {
        const val = finalAnswers[q.id] || 3;
        scores[q.weightKey] = (scores[q.weightKey] || 0) + val;
      });

      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      resultVal = sorted[0][0];

      const sum = Object.values(scores).reduce((a, b) => a + b, 0);
      breakdown = {
        primaryValue: resultVal,
        labels: [
          { name: '불 (Fire / 열정과 추진)', score: scores.fire, pct: Math.round((scores.fire / sum) * 100), color: '#ef4444' },
          { name: '물 (Water / 공감과 정서)', score: scores.water, pct: Math.round((scores.water / sum) * 100), color: '#06b6d4' },
          { name: '흙 (Earth / 현실과 안정)', score: scores.earth, pct: Math.round((scores.earth / sum) * 100), color: '#15803d' },
          { name: '바람 (Air / 지성과 자유)', score: scores.air, pct: Math.round((scores.air / sum) * 100), color: '#64748b' }
        ]
      };
    } else if (dimensionKey === 'blood') {
      const scores: Record<string, number> = { A: 0, B: 0, O: 0, AB: 0 };
      questions.forEach(q => {
        const val = finalAnswers[q.id] || 3;
        scores[q.weightKey] = (scores[q.weightKey] || 0) + val;
      });

      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      resultVal = sorted[0][0];

      const sum = Object.values(scores).reduce((a, b) => a + b, 0);
      breakdown = {
        primaryValue: resultVal,
        labels: [
          { name: 'A형 소셜 바이브 (세심한 배려)', score: scores.A, pct: Math.round((scores.A / sum) * 100), color: '#3b82f6' },
          { name: 'B형 소셜 바이브 (자유 마이웨이)', score: scores.B, pct: Math.round((scores.B / sum) * 100), color: '#ec4899' },
          { name: 'O형 소셜 바이브 (열정적 의리)', score: scores.O, pct: Math.round((scores.O / sum) * 100), color: '#eab308' },
          { name: 'AB형 소셜 바이브 (다면적 합리)', score: scores.AB, pct: Math.round((scores.AB / sum) * 100), color: '#8b5cf6' }
        ]
      };
    }

    setCalculatedValue(resultVal);
    setScoreBreakdown(breakdown);
    setCurrentStep(totalQuestions + 1);
  };

  const handleApplyResult = () => {
    if (!calculatedValue) return;

    const updated: UserPersona = { ...currentUser };
    if (dimensionKey === 'mbti') updated.mbti = calculatedValue as MBTIType;
    if (dimensionKey === 'attachment') updated.attachment = calculatedValue as AttachmentStyle;
    if (dimensionKey === 'chronotype') updated.chronotype = calculatedValue as Chronotype;
    if (dimensionKey === 'stress') updated.stress = calculatedValue as StressStyle;
    if (dimensionKey === 'element') updated.element = calculatedValue as ElementTemperament;
    if (dimensionKey === 'blood') updated.bloodType = calculatedValue as BloodType;

    updated.customTitle = generatePersonaTitle(updated);
    onSaveDimensionResult(updated, dimensionKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{meta.symbol}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{meta.titleKr}</h3>
                <span className="text-[11px] text-indigo-600 font-semibold font-mono bg-indigo-50 px-2 py-0.5 rounded">
                  {meta.questionCount}문항 5지선답 ({meta.estimatedTime})
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{meta.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Step 0: Intro */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                  <Sparkles className="w-4 h-4" />
                  <span>세밀한 정밀 진단 안내</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {meta.description}
                </p>
                <div className="text-xs text-slate-600 pt-2 border-t border-slate-200/80">
                  <strong>핵심 측정 기준:</strong> {meta.whyMatters}
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-2 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <p className="font-semibold text-indigo-900">💡 편안한 검사 팁:</p>
                <p>• 총 <strong>{meta.questionCount}개의 5점 척도 문항</strong>으로 구성되어 더욱 세밀하고 정교한 백분율 분석이 제공됩니다.</p>
                <p>• 키보드의 <strong>[1], [2], [3], [4], [5] 키</strong>를 누르면 더욱 빠르게 응답할 수 있습니다.</p>
                <p>• 정답이 없으니 본인의 평소 모습과 가장 가까운 점수를 선택해 주세요.</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-sm active:scale-98 transition-all"
                >
                  <span>{meta.titleKr} 5지선답 진단 시작</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 1..totalQuestions: 5-Point Likert Question */}
          {currentStep >= 1 && currentStep <= totalQuestions && (() => {
            const q = questions[currentStep - 1];
            const currentSelected = answers[q.id];
            const progressPct = Math.round((currentStep / totalQuestions) * 100);

            return (
              <div key={currentStep} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                {/* Progress Bar & Subscale Indicator */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-indigo-600">{q.categoryLabel}</span>
                    <span className="tabular-nums font-mono text-slate-500 font-bold">
                      {currentStep} / {totalQuestions} 문항 ({progressPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Question Text */}
                <div className="py-2">
                  <span className="text-[11px] font-bold text-slate-400">
                    문항 {currentStep}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-1">
                    "{q.question}"
                  </h3>
                  {q.detailContext && (
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {q.detailContext}
                    </p>
                  )}
                </div>

                {/* 5-Choice Likert Options Grid */}
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                    {LIKERT_OPTIONS.map(opt => {
                      const isSelected = currentSelected === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelectScore(q.id, opt.value)}
                          className={`p-3 sm:p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[72px] sm:min-h-[82px] active:scale-95 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-600 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {opt.value}
                          </span>
                          <span className="text-[11px] font-semibold mt-1 leading-tight line-clamp-1">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 px-1 pt-1">
                    <span>← 전혀 그렇지 않음 (1점)</span>
                    <span className="hidden sm:inline text-slate-300">키보드 1~5 숫자키로 빠른 선택 가능</span>
                    <span>매우 그러함 (5점) →</span>
                  </div>
                </div>

                {/* Navigation Footer */}
                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>이전 문항</span>
                  </button>

                  {currentSelected && (
                    <button
                      type="button"
                      onClick={() => {
                        if (currentStep === totalQuestions) {
                          finishAssessment(answers);
                        } else {
                          setCurrentStep(prev => prev + 1);
                        }
                      }}
                      className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer hover:bg-slate-800"
                    >
                      <span>{currentStep === totalQuestions ? '정밀 진단 완료' : '다음 문항'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Step N+1: Deep Result Reveal with Breakdown Gauges */}
          {currentStep > totalQuestions && scoreBreakdown && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{meta.questionCount}문항 정밀 분석 완료!</span>
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {meta.titleKr} 상세 진단 리포트
                </h3>
              </div>

              {/* Archetype Hero Spotlight */}
              <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">최종 산출 유형</span>
                <div className="text-3xl font-black text-slate-900 mt-1 flex items-center justify-center gap-2">
                  <span>{scoreBreakdown.primaryValue}</span>
                </div>
              </div>

              {/* Granular Percentage Breakdown Meters */}
              <div className="space-y-3 p-4 bg-white rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>세부 영역별 점수 및 백분율 지표</span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {scoreBreakdown.labels.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700">{item.name}</span>
                        <span className="font-mono font-bold text-slate-900 tabular-nums">{item.pct}% ({item.score}점)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, Math.max(10, item.pct))}%`,
                            background: item.color || '#6366f1'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setAnswers({});
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>처음부터 다시 검사</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyResult}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>내 다면 프로필에 즉시 반영하기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
