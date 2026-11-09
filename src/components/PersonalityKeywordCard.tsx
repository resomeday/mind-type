import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  FileText,
  Zap,
  ShieldAlert,
  HeartHandshake,
  Hash,
  Download
} from 'lucide-react';
import { UserPersona } from '../types/personality';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO
} from '../data/personalityData';

interface PersonalityKeywordCardProps {
  user: UserPersona;
  onOpenShareModal: () => void;
  onOpenPdfModal?: () => void;
}

export interface KeywordAnalysis {
  hashtags: string[];
  superpowers: { title: string; desc: string }[];
  blindspot: { title: string; desc: string };
  vibePartnerKeyword: string;
  themeColor: string;
}

export function getPersonalityKeywordAnalysis(user: UserPersona): KeywordAnalysis {
  const mbti = user.mbti;
  const isE = mbti.startsWith('E');
  const isN = mbti[1] === 'N';
  const isF = mbti[2] === 'F';
  const isP = mbti[3] === 'P';

  // 1. Hashtags (6~8 core hashtags derived from all 6 dimensions)
  const hashtags: string[] = [
    isE ? '#에너지_치어리더' : '#고요한_내면의성채',
    isN ? '#직관적_비전가' : '#현실감각_팩트체커',
    isF ? '#따뜻한_공감스펀지' : '#냉철한_논리뇌',
    isP ? '#자유로운_즉흥러' : '#철두철미_플래너',
    {
      A: '#세심한_배려장인',
      B: '#마이웨이_개성파',
      O: '#열정의_의리보스',
      AB: '#다면적_합리주의'
    }[user.bloodType],
    {
      secure: '#흔들림없는_안정감',
      anxious: '#섬세한_애정바라기',
      avoidant: '#독립적인_자립러',
      fearful: '#속깊은_경계파'
    }[user.attachment],
    {
      lion: '#새벽_지휘관',
      bear: '#주간_프로적응러',
      wolf: '#심야_몰입러',
      dolphin: '#밤샘_완벽주의'
    }[user.chronotype],
    {
      fire: '#뜨거운_추진력',
      water: '#바다같은_포용력',
      earth: '#단단한_버팀목',
      air: '#자유로운_지성'
    }[user.element]
  ];

  // 2. 3 Superpowers
  const superpowers = [
    {
      title: isN ? '무한한 직관과 미래 비전' : '빈틈없는 오감 관찰과 현실 해결력',
      desc: isN
        ? '보이지 않는 가능성과 숨은 맥락을 누구보다 빠르게 감지합니다.'
        : '눈앞의 데이터와 구체적인 사실을 바탕으로 실질적인 결과를 만들어냅니다.'
    },
    {
      title: `${ELEMENT_INFO[user.element].badge}의 고유 기질 에너지`,
      desc: {
        fire: '가슴에 불이 붙으면 브레이크 없이 저돌적으로 목표를 향해 달려갑니다.',
        water: '타인의 감정선을 스펀지처럼 흡수하며 곁에 있는 사람에게 편안한 안식을 줍니다.',
        earth: '어떤 혼란 속에서도 묵묵히 자리를 지키며 주변 사람들의 든든한 버팀목이 됩니다.',
        air: '틀에 얽매이지 않고 유쾌한 위트와 객관적 시각으로 문제를 환기합니다.'
      }[user.element]
    },
    {
      title: `${CHRONOTYPE_INFO[user.chronotype].badge} × ${STRESS_INFO[user.stress].badge}`,
      desc: {
        wolf: '밤이 깊어질수록 영감과 창의력이 폭발하며, 감정을 솔직하게 표현할 때 개운해집니다.',
        lion: '아침의 맑은 뇌로 하루의 주도권을 쥐며, 명확한 논리로 문제를 매듭짓습니다.',
        bear: '사람들과의 자연스러운 생체 리듬을 맞추며, 유연하게 소통으로 회복합니다.',
        dolphin: '순간 집중력으로 난제를 돌파하며, 혼자만의 차분한 사색으로 재충전합니다.'
      }[user.chronotype]
    }
  ];

  // 3. Charming Blindspot
  const blindspot = {
    title: isE ? '에너지 방전 후의 갑작스러운 번아웃' : '속마음을 숨기다 쌓이는 침묵의 피로',
    desc: {
      anxious: '상대방의 사소한 연락 텀이나 말투 변화에 혼자 생각이 많아질 수 있어요.',
      avoidant: '갈등이 생기면 무의식적으로 동굴로 숨어 상대방을 당황하게 만들 수 있어요.',
      fearful: '가까워지고 싶으면서도 상처받을까 봐 선을 그어버릴 때가 있어요.',
      secure: '상대방도 나와 같을 거라 믿다가 상대의 서운함을 뒤늦게 알아챌 수 있어요.'
    }[user.attachment]
  };

  // 4. Soulmate Vibe Partner
  const vibePartnerKeyword = {
    fire: '흔들림 없이 묵직하게 중심을 잡아주는 흙(Earth) 성향의 안정적 파트너',
    water: '따뜻한 온기로 얼어붙은 마음을 녹여주는 불(Fire) 또는 든든한 흙(Earth) 파트너',
    earth: '틀에 갇힌 일상에 신선한 아이디어와 생기를 불어넣는 물(Water) & 바람(Air) 파트너',
    air: '공허한 생각을 손에 잡히는 현실로 실행해 주는 불(Fire) & 흙(Earth) 파트너'
  }[user.element];

  const themeColor = {
    fire: 'from-amber-500/10 via-rose-500/10 to-orange-500/10 border-orange-200',
    water: 'from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border-sky-200',
    earth: 'from-emerald-500/10 via-teal-500/10 to-stone-500/10 border-emerald-200',
    air: 'from-slate-500/10 via-indigo-500/10 to-stone-500/10 border-slate-200'
  }[user.element];

  return { hashtags, superpowers, blindspot, vibePartnerKeyword, themeColor };
}

export const PersonalityKeywordCard: React.FC<PersonalityKeywordCardProps> = ({
  user,
  onOpenShareModal,
  onOpenPdfModal
}) => {
  const [copied, setCopied] = useState(false);
  const analysis = getPersonalityKeywordAnalysis(user);

  const handleCopyKeywords = async () => {
    const textToCopy = `✨ [MIND:TYPE] ${user.name} 님의 성격 핵심 키워드 카드 ✨
📌 타이틀: ${user.customTitle}
🏷️ 핵심 키워드: ${analysis.hashtags.join(' ')}

💪 나의 3대 초능력:
1. ${analysis.superpowers[0].title}
2. ${analysis.superpowers[1].title}
3. ${analysis.superpowers[2].title}

⚠️ 알아두면 좋은 매력 약점:
${analysis.blindspot.title} (${analysis.blindspot.desc})

🤝 환상의 케미 파트너:
${analysis.vibePartnerKeyword}

👉 나도 6차원 성향 진단해보기: ${window.location.origin}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.02)] space-y-6">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
            <Hash className="w-3.5 h-3.5 text-stone-700" />
            <span>MIND:TYPE 입체 프로파일링</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>성격 핵심 키워드 카드</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-2">
            <span>{user.name} 님의 6차원 성격 핵심 키워드</span>
            <span className="text-stone-300 font-normal select-none">·</span>
            <span className="text-xs font-mono font-medium text-stone-600 bg-stone-100/80 px-2 py-0.5 rounded-md border border-stone-200/60">
              {user.mbti} · {user.bloodType}형
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-1.5">
            소셜 미디어 공유 및 프로필 소개에 최적화된 6차원 통합 키워드 요약입니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyKeywords}
            className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-stone-200 shadow-2xs active:scale-98"
            title="키워드 텍스트 전체 복사"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-600" />}
            <span>{copied ? '복사 완료!' : '키워드 복사'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenShareModal}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
            title="인스타그램/카톡 공유 카드 열기"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-300" />
            <span>소셜 카드 공유</span>
          </button>

          {onOpenPdfModal && (
            <button
              type="button"
              onClick={onOpenPdfModal}
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
              title="앱 기능 및 설계 명세서 PDF 보기/인쇄"
            >
              <FileText className="w-3.5 h-3.5 text-stone-600" />
              <span>명세서 PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Hashtags Cloud Banner */}
      <div className={`p-5 rounded-2xl border bg-gradient-to-r ${analysis.themeColor} space-y-3`}>
        <div className="flex items-center justify-between text-xs font-bold text-stone-800">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>나를 정의하는 8가지 핵심 해시태그</span>
          </span>
          <span className="text-[11px] font-normal text-stone-500 font-mono">
            {user.customTitle}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {analysis.hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs text-xs font-extrabold text-stone-800 shadow-2xs border border-stone-200/70 hover:scale-105 transition-transform select-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3 Superpowers & Blindspot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Superpowers */}
        <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 pb-2 border-b border-stone-200/60">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>나의 3대 핵심 초능력 (Superpowers)</span>
          </div>
          <div className="space-y-2.5">
            {analysis.superpowers.map((sp, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  0{idx + 1}
                </span>
                <div>
                  <div className="font-bold text-stone-900">{sp.title}</div>
                  <div className="text-stone-500 mt-0.5 text-[11px] leading-relaxed">{sp.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blindspot & Vibe Partner */}
        <div className="space-y-4">
          {/* Charming Blindspot */}
          <div className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <ShieldAlert className="w-3.5 h-3.5 text-stone-500" />
              <span>알아두면 좋은 매력 약점 (Charming Blindspot)</span>
            </div>
            <div className="text-xs font-semibold text-stone-900">{analysis.blindspot.title}</div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              {analysis.blindspot.desc}
            </p>
          </div>

          {/* Vibe Partner */}
          <div className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
              <span>환상의 케미 키워드 (Soulmate Vibe)</span>
            </div>
            <p className="text-xs font-medium text-stone-700 leading-relaxed">
              👉 {analysis.vibePartnerKeyword}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
