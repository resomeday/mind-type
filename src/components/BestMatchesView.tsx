import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Users2,
  Briefcase,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { UserPersona, BestMatchRecommendation } from '../types/personality';
import { findBestMatches } from '../services/compatibilityEngine';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO
} from '../data/personalityData';

interface BestMatchesViewProps {
  user: UserPersona;
  onSelectForCompat: (partner: UserPersona) => void;
}

export const BestMatchesView: React.FC<BestMatchesViewProps> = ({
  user,
  onSelectForCompat
}) => {
  const recommendations = findBestMatches(user);
  const [activeCategory, setActiveCategory] = useState<'all' | 'romance' | 'friendship' | 'teamwork' | 'growth'>('all');

  const filteredMatches = activeCategory === 'all'
    ? recommendations
    : recommendations.filter(r => r.type === activeCategory);

  const handleTestCompatibility = (match: BestMatchRecommendation) => {
    const p = match.matchPersona;
    const partnerPersona: UserPersona = {
      id: `match-${match.type}-${Date.now()}`,
      name: `추천 ${match.type === 'romance' ? '연애' : match.type === 'friendship' ? '우정' : match.type === 'teamwork' ? '협업' : '성장'} 파트너`,
      mbti: p.mbti || 'INFJ',
      bloodType: p.bloodType || 'A',
      attachment: p.attachment || 'secure',
      chronotype: p.chronotype || 'bear',
      stress: p.stress || 'talk',
      element: p.element || 'water',
      customTitle: p.title || '최적의 소울메이트'
    };
    onSelectForCompat(partnerPersona);
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
              <span>MIND:TYPE 관계 추천 알고리즘</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{user.name} 님 맞춤형</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {user.name} 님을 위한 최적의 인간관계 추천
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              MBTI, 혈액형, 애착유형, 크로노타입, 스트레스 대처, 4원소 기질의 상호작용 공식을 분석하여
              가장 높은 행복도와 시너지를 보장하는 4대 파트너 페르소나를 도출했습니다.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setActiveCategory('romance')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'romance'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              연애
            </button>
            <button
              onClick={() => setActiveCategory('friendship')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'friendship'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              우정
            </button>
            <button
              onClick={() => setActiveCategory('teamwork')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'teamwork'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              협업
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Match Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map(match => {
          const p = match.matchPersona;
          const mbti = p.mbti ? MBTI_INFO[p.mbti] : null;
          const blood = p.bloodType ? BLOOD_INFO[p.bloodType] : null;
          const attachment = p.attachment ? ATTACHMENT_INFO[p.attachment] : null;
          const chrono = p.chronotype ? CHRONOTYPE_INFO[p.chronotype] : null;
          const stress = p.stress ? STRESS_INFO[p.stress] : null;
          const element = p.element ? ELEMENT_INFO[p.element] : null;

          const isRomance = match.type === 'romance';
          const isFriendship = match.type === 'friendship';
          const isTeam = match.type === 'teamwork';

          return (
            <div
              key={match.type}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category kicker */}
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                  <div className="text-xs font-bold tracking-tight text-stone-800 flex items-center gap-1.5">
                    {match.categoryTitle}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-extrabold text-stone-900 tabular-nums bg-stone-100 px-2.5 py-1 rounded-full">
                    <span className="text-[10px] text-stone-500 font-semibold">적합도</span>
                    <span className="text-sm font-black">{p.matchScore}점</span>
                  </div>
                </div>

                {/* Match title & archetype */}
                <div className="mt-4">
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* 6 Dimension Spec Table */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 p-3.5 bg-stone-50/70 rounded-2xl border border-stone-200/60 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">MBTI</span>
                    <span className="font-bold text-stone-800">{p.mbti} ({mbti?.nameKr.split(' ')[0]})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">혈액형</span>
                    <span className="font-bold text-stone-800">{p.bloodType}형 ({blood?.nameKr.split(' ')[1]})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">애착유형</span>
                    <span className="font-bold text-stone-800">{attachment?.badge}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">크로노타입</span>
                    <span className="font-bold text-stone-800">{chrono?.symbol} {chrono?.badge}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">스트레스 대처</span>
                    <span className="font-bold text-stone-800">{stress?.badge}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">4대 기질</span>
                    <span className="font-bold text-stone-800">{element?.symbol} {element?.badge}</span>
                  </div>
                </div>

                {/* Why Best insight callout */}
                <div className="mt-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 text-stone-800 text-xs leading-relaxed flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">왜 나에게 가장 최적일까요?</strong>
                    <span className="text-stone-600">{p.whyBest}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  {isRomance ? '심리적 안정감 + 로맨틱 시너지' : isFriendship ? '생활 리듬 일치 + 깊은 대화' : '빈틈없는 실행력과 보완'}
                </span>
                <button
                  type="button"
                  onClick={() => handleTestCompatibility(match)}
                  className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98 transition-all"
                >
                  <span>1:1 궁합 진단</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Insight: How multi-dimensional relationship formula works */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>MIND:TYPE 다면 인간관계 추천 알고리즘의 원리</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <h4 className="font-bold text-slate-800 mb-1">1. 애착유형의 상처 치유 메커니즘</h4>
            <p>
              불안형은 안정형의 일관된 연락과 신뢰를 통해 불안이 치유되며,
              회피형은 강요하지 않는 온화한 안정형 곁에서 비로소 동굴 밖으로 나옵니다.
              불안과 회피가 만날 때 발생하는 파괴적 추격 사이클을 사전에 방지합니다.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <h4 className="font-bold text-slate-800 mb-1">2. 크로노타입 생체 리듬의 일치</h4>
            <p>
              수면 주기와 가장 활발한 활동 시간이 어긋나면 주말 데이트나 일상 연락에서
              자연스러운 피로와 오해가 누적됩니다. 같은 시간대에 에너지를 쓰는 파트너를 우선 추천합니다.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <h4 className="font-bold text-slate-800 mb-1">3. 스트레스 대처의 화학작용</h4>
            <p>
              갈등이나 위기 시 동굴로 들어가는 사람과 지금 당장 수다로 풀어야 하는 사람이 만나면
              극심한 2차 갈등이 발생합니다. 서로의 회복 방식을 온전히 품어줄 수 있는 상호작용을 매칭합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
