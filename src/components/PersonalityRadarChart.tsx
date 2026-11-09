import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import { UserPersona } from '../types/personality';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Layers,
  Zap,
  Heart,
  Smile,
  Compass
} from 'lucide-react';

interface PersonalityRadarChartProps {
  user: UserPersona;
}

interface DimensionRadarMetric {
  dimension: string;
  shortName: string;
  score: number;
  benchmark: number;
  fullMark: number;
  description: string;
  strengthSummary: string;
  growthSummary: string;
}

export const PersonalityRadarChart: React.FC<PersonalityRadarChartProps> = ({ user }) => {
  const [showBenchmark, setShowBenchmark] = useState(false);

  // 1. Calculate 6 dimensional scores based on persona attributes
  const calculateRadarMetrics = (u: UserPersona): DimensionRadarMetric[] => {
    // 1) 인지 직관 & 창의성 (MBTI 기반)
    let cognitiveScore = 75;
    if (u.mbti.includes('N')) cognitiveScore += 12;
    if (u.mbti.includes('P')) cognitiveScore += 8;
    if (u.mbti.includes('E')) cognitiveScore += 4;
    cognitiveScore = Math.min(96, Math.max(60, cognitiveScore));

    // 2) 관계 안정감 & 신뢰도 (애착유형 기반)
    let attachmentScore = 70;
    if (u.attachment === 'secure') attachmentScore = 95;
    else if (u.attachment === 'anxious') attachmentScore = 68; // 몰입 열정은 높으나 감정 변동
    else if (u.attachment === 'avoidant') attachmentScore = 72; // 자립심은 높으나 친밀감 거리두기
    else if (u.attachment === 'fearful') attachmentScore = 62;

    // 3) 생체 리듬 & 일상 실행력 (크로노타입 기반)
    let chronoScore = 70;
    if (u.chronotype === 'lion') chronoScore = 90; // 오전 집중 & 규칙성
    else if (u.chronotype === 'bear') chronoScore = 92; // 태양 주기 동기화 최고
    else if (u.chronotype === 'wolf') chronoScore = 78; // 심야 창의성 높으나 일상 조율 필요
    else if (u.chronotype === 'dolphin') chronoScore = 74; // 예민 & 유동적

    // 4) 멘탈 회복탄력성 (스트레스 대처 기반)
    let stressScore = 72;
    if (u.stress === 'action') stressScore = 88; // 즉각 행동 & 운동 해결
    else if (u.stress === 'talk') stressScore = 86; // 공감 소통 & 정서 정화
    else if (u.stress === 'logic') stressScore = 82; // 합리적 분석
    else if (u.stress === 'cave') stressScore = 75; // 내면 침잠 & 시간 필요

    // 5) 열정 & 추진 에너지 (4대 기질론 기반)
    let elementScore = 70;
    if (u.element === 'fire') elementScore = 94; // 담즙질의 돌파력
    else if (u.element === 'air') elementScore = 86; // 다혈질의 유연함
    else if (u.element === 'earth') elementScore = 84; // 끈기 & 현실성
    else if (u.element === 'water') elementScore = 80; // 공감 & 수용성

    // 6) 소셜 케미 & 조화도 (혈액형 & 소셜 바이브 기반)
    let socialScore = 75;
    if (u.bloodType === 'O') socialScore = 92; // 리더십 & 친화력
    else if (u.bloodType === 'A') socialScore = 88; // 세심한 배려 & 조화
    else if (u.bloodType === 'B') socialScore = 82; // 솔직함 & 개성
    else if (u.bloodType === 'AB') socialScore = 85; // 객관적 관찰자

    return [
      {
        dimension: '인지 직관 & 창의',
        shortName: '창의 직관',
        score: cognitiveScore,
        benchmark: 80,
        fullMark: 100,
        description: '사고 패턴과 발상 전환, 상상력과 유연한 수용도',
        strengthSummary: u.mbti.includes('N')
          ? '새로운 가능성을 상상하고 본질을 꿰뚫는 뛰어난 직관력'
          : '현실적인 감각과 구체적인 데이터를 바탕으로 한 신뢰성',
        growthSummary: u.mbti.includes('P')
          ? '즉흥성이 높아 약속이나 일정 관리에서 세부 체크리스트를 보완하면 좋습니다.'
          : '계획이 틀어졌을 때 유연하게 대처하는 마음의 여유가 필요합니다.'
      },
      {
        dimension: '관계 정서 안정감',
        shortName: '정서 안정',
        score: attachmentScore,
        benchmark: 80,
        fullMark: 100,
        description: '친밀한 관계에서의 신뢰도, 버림받을 두려움과 독립성의 균형',
        strengthSummary: u.attachment === 'secure'
          ? '상대방에게 심리적 안정감을 제공하는 흔들림 없는 정서적 지지력'
          : u.attachment === 'anxious'
          ? '관계에 온 마음을 다해 깊이 몰입하고 공감하는 헌신적인 사랑'
          : '자립심이 강하여 타인에게 의존하지 않고 문제를 스스로 해결하는 힘',
        growthSummary: u.attachment === 'anxious'
          ? '연락 지연이나 사소한 표정 변화에 과민하게 반응하지 않고 나만의 취미에 집중해보세요.'
          : u.attachment === 'avoidant'
          ? '갈등이 생겼을 때 회피하지 않고 솔직한 내면의 감정을 말로 표현하는 연습이 도움됩니다.'
          : '상대방의 감정 변화를 편안하게 수용하며 솔직한 대화를 유지하세요.'
      },
      {
        dimension: '일상 리듬 조화',
        shortName: '생체 리듬',
        score: chronoScore,
        benchmark: 80,
        fullMark: 100,
        description: '하루 24시간 일주기 생체시계의 동기화 및 데이트/활동 시너지',
        strengthSummary: u.chronotype === 'lion' || u.chronotype === 'bear'
          ? '사회 표준 리듬과 완벽히 동기화되어 주간 활동과 약속에서 높은 안정성 발휘'
          : '심야 시간대에 창의력과 집중력이 폭발하여 깊은 대화와 예술적 시너지 창출',
        growthSummary: u.chronotype === 'wolf'
          ? '아침 일찍 약속이 잡힐 경우 수면 부족으로 예민해질 수 있으니 저녁 데이트를 권장합니다.'
          : '상대방과 생체 시계가 다를 경우 서로의 골든 타임을 존중해주는 대화가 필요합니다.'
      },
      {
        dimension: '스트레스 회복탄력',
        shortName: '회복탄력',
        score: stressScore,
        benchmark: 80,
        fullMark: 100,
        description: '멘탈 위기 발생 시 감정을 정화하고 다시 일어서는 회복 속도',
        strengthSummary: u.stress === 'talk'
          ? '대화를 통해 솔직하게 감정을 털어놓고 즉시 카타르시스를 얻는 건강한 소통력'
          : u.stress === 'action'
          ? '좌절에 머무르지 않고 몸을 움직여 생산적으로 멘탈을 전환하는 활력'
          : u.stress === 'logic'
          ? '원인을 차분히 분석하여 객관적인 솔루션을 찾아내는 이성적 통찰'
          : '조용한 침묵 속에서 혼자만의 재충전을 통해 스스로를 치유하는 능력',
        growthSummary: u.stress === 'cave'
          ? '잠수 타기 전 "생각할 시간이 조금 필요해"라는 한마디를 미리 남겨주면 상대방이 안심합니다.'
          : u.stress === 'talk'
          ? '감정이 격해졌을 때는 상대방이 지치지 않도록 듣는 사람의 컨디션도 살펴주세요.'
          : '혼자 다 짊어지려 하지 말고 가까운 사람에게 가벼운 마음을 털어놓아 보세요.'
      },
      {
        dimension: '열정 & 추진 에너지',
        shortName: '추진 열정',
        score: elementScore,
        benchmark: 80,
        fullMark: 100,
        description: '목표를 향해 돌파하는 에너지의 강도와 열정의 지속성',
        strengthSummary: u.element === 'fire'
          ? '주변 사람들을 단숨에 매료시키는 폭발적인 행동력과 열정의 스파크'
          : u.element === 'water'
          ? '어떤 성격의 사람과도 자연스럽게 녹아드는 유연하고 따뜻한 포용력'
          : u.element === 'earth'
          ? '한번 맺은 신뢰를 끝까지 지켜내는 바위 같은 묵직함과 안정감'
          : '늘 신선한 아이디어와 재미를 선물하는 경쾌하고 지적인 바이브',
        growthSummary: u.element === 'fire'
          ? '의욕이 앞서 상대방의 페이스를 무시하기 쉬우니 한 템포 기다려주는 배려가 필요합니다.'
          : u.element === 'water'
          ? '타인의 감정 쓰레기통이 되지 않도록 건강한 심리적 경계선을 그어주세요.'
          : '너무 진지하거나 고집스러워 보이지 않도록 가끔은 즉흥적인 유희를 즐겨보세요.'
      },
      {
        dimension: '소셜 공감 & 화합력',
        shortName: '소셜 조화',
        score: socialScore,
        benchmark: 80,
        fullMark: 100,
        description: '다양한 사람들과의 관계 속에서 배려하고 갈등을 중재하는 친화력',
        strengthSummary: u.bloodType === 'A'
          ? '상대방의 불편함을 말하지 않아도 먼저 알아채는 세심하고 정성 어린 배려'
          : u.bloodType === 'O'
          ? '모임의 분위기를 편안하게 이끌고 편을 가르지 않는 넉넉한 친화력과 의리'
          : u.bloodType === 'B'
          ? '가식 없이 솔직하며 함께 있으면 지루할 틈이 없는 자유로운 매력'
          : '감정에 치우치지 않고 양쪽 입장을 공평하게 바라보는 지혜로운 중재력',
        growthSummary: u.bloodType === 'A'
          ? '남을 너무 배려하다가 정작 본인의 속마음을 억누르지 않도록 솔직해지세요.'
          : u.bloodType === 'B'
          ? '상대방이 서운해할 수 있는 직설적인 표현은 부드러운 쿠션어로 감싸주세요.'
          : '모두를 다 만족시키려 애쓰지 않아도 있는 그대로의 당신으로 충분합니다.'
      }
    ];
  };

  const metrics = calculateRadarMetrics(user);

  // Identify Top 2 Strengths (highest scores) and Top 2 Growth areas (lowest scores)
  const sortedMetrics = [...metrics].sort((a, b) => b.score - a.score);
  const topStrengths = sortedMetrics.slice(0, 2);
  const areasToGrow = sortedMetrics.slice(-2).reverse();

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: DimensionRadarMetric = payload[0].payload;
      return (
        <div className="bg-stone-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1 border border-stone-800">
          <div className="font-bold flex items-center justify-between gap-4">
            <span>{data.dimension}</span>
            <span className="text-indigo-400 font-mono text-sm">{data.score}점</span>
          </div>
          <p className="text-stone-300 text-[11px] leading-relaxed max-w-[200px]">
            {data.description}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-[0_2px_14px_rgba(0,0,0,0.02)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1 font-medium">
            <span>6차원 다면 성격 종합 매트릭스</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>거미줄 차트(Radar Chart) 분석</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <span>{user.name} 님의 6차원 성향 레이더 밸런스</span>
          </h2>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            MBTI · 혈액형 · 애착유형 · 생체시계 · 멘탈대처 · 4기질의 조화를 한눈에 비교하고 나의 강점과 보완점을 진단합니다.
          </p>
        </div>

        {/* Toggle benchmark */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowBenchmark(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showBenchmark
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showBenchmark ? '표준 기준선 숨기기' : '표준 밸런스 비교'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Chart on Left, Strengths & Growth on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Chart (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[380px]">
          <div className="w-full h-[320px] sm:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={metrics}>
                <PolarGrid stroke="#E7E5E4" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="shortName"
                  tick={{ fill: '#44403C', fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[40, 100]}
                  tick={{ fill: '#A8A29E', fontSize: 10 }}
                  stroke="#E7E5E4"
                />
                
                {/* Standard Benchmark Overlay */}
                {showBenchmark && (
                  <Radar
                    name="표준 균형 기준선"
                    dataKey="benchmark"
                    stroke="#A8A29E"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="#78716C"
                    fillOpacity={0.08}
                  />
                )}

                {/* User Personality Polygon */}
                <Radar
                  name={`${user.name} 님의 성향`}
                  dataKey="score"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="#6366F1"
                  fillOpacity={0.35}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500 mt-1 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              <span>{user.name} 님의 성향 다각형</span>
            </div>
            {showBenchmark && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-b border-dashed border-stone-500 inline-block" />
                <span>표준 균형치 (80점 기준)</span>
              </div>
            )}
          </div>
        </div>

        {/* Actionable Insights: Top Strengths & Growth Areas (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Strengths Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>나의 핵심 시너지 강점 TOP 2</span>
            </div>
            <div className="space-y-2.5">
              {topStrengths.map((item, idx) => (
                <div key={idx} className="bg-white/80 p-3 rounded-xl border border-emerald-100 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {item.dimension}
                    </span>
                    <span className="text-emerald-700 font-mono font-black">{item.score}점</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    {item.strengthSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Growth / Balance Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>관계 개선 & 케어 포인트</span>
            </div>
            <div className="space-y-2.5">
              {areasToGrow.map((item, idx) => (
                <div key={idx} className="bg-white/80 p-3 rounded-xl border border-amber-100 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] flex items-center justify-center font-bold">
                        Tip
                      </span>
                      {item.dimension}
                    </span>
                    <span className="text-amber-700 font-mono font-bold">{item.score}점</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    {item.growthSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
