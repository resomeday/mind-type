import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  HeartHandshake,
  Download,
  Sparkles,
  Heart,
  Users,
  Briefcase,
  Clock
} from 'lucide-react';
import { UserPersona, CompatibilityReport } from '../types/personality';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ELEMENT_INFO,
  CHRONOTYPE_INFO,
  ATTACHMENT_INFO
} from '../data/personalityData';
import { createMutualCompatUrl, generateMutualCompatText } from '../services/inviteService';

interface MutualChemistryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserPersona;
  partner: UserPersona;
  report: CompatibilityReport;
}

export const MutualChemistryCardModal: React.FC<MutualChemistryCardModalProps> = ({
  isOpen,
  onClose,
  user,
  partner,
  report
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const compatUrl = createMutualCompatUrl(user, partner);
  const compatText = generateMutualCompatText(user, partner, report.overallScore, compatUrl);

  const u1Mbti = MBTI_INFO[user.mbti];
  const u2Mbti = MBTI_INFO[partner.mbti];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(compatUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(compatText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const handleSimulateDownload = () => {
    const fullText = `[MIND:TYPE 1:1 케미 궁합 동시 확인 리포트]
${user.name} × ${partner.name}

🏆 종합 케미 점수: ${report.overallScore}점
"${report.headline}"
${report.tagline}

❤️ 연애 케미: ${report.romanceScore}점
🤝 우정 케미: ${report.friendshipScore}점
💼 협업 케미: ${report.teamworkScore}점
⏰ 라이프스타일 케미: ${report.lifestyleScore}점

[주요 시너지]
${report.synergies.map(s => `• ${s}`).join('\n')}

[대화 꿀팁]
${report.communicationDos.map(d => `• ${d}`).join('\n')}

👉 두 사람의 동시 확인 링크: ${compatUrl}`;

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MIND_TYPE_케미_${user.name}_${partner.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold text-stone-900">
              둘만의 1:1 케미 동시 확인 카드
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Dual Chemistry Card */}
        <div className="p-5 bg-stone-100/70 flex justify-center overflow-y-auto max-h-[65vh]">
          <div
            id="dual-compat-card"
            className="w-full max-w-[420px] rounded-3xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between"
            style={{
              background: `linear-gradient(145deg, #18181b 0%, #27272a 50%, #09090b 100%)`
            }}
          >
            {/* Top Brand & Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-300 uppercase">
                MIND:TYPE · 케미 분석
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                1:1 MUTUAL PROFILE
              </span>
            </div>

            {/* Overall Score & Headline */}
            <div className="py-5 text-center relative z-10">
              <div className="w-22 h-22 mx-auto rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col items-center justify-center shadow-lg mb-3.5 relative">
                <span className="text-3xl font-black text-amber-300 tabular-nums tracking-tight">
                  {report.overallScore}
                </span>
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-stone-300">
                  POINTS
                </span>
              </div>

              <div className="text-xs text-rose-300 font-semibold tracking-wide flex items-center justify-center gap-1.5">
                <Heart className="w-3 h-3 fill-rose-300" />
                <span>{report.headline}</span>
              </div>
              <h3 className="text-xl font-serif font-bold mt-1 text-white">
                {user.name} × {partner.name}
              </h3>
              <p className="text-xs text-stone-300 mt-1.5 italic px-2 leading-relaxed">
                "{report.tagline}"
              </p>
            </div>

            {/* Side-by-Side Mini Personas */}
            <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 my-2">
              <div className="text-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs font-bold text-white">{user.name}</div>
                <div className="text-[10px] text-amber-200 font-mono font-medium mt-0.5">
                  {user.mbti} · {user.bloodType}형
                </div>
                <div className="text-[10px] text-stone-400 mt-1 truncate">
                  {user.customTitle}
                </div>
              </div>

              <div className="text-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs font-bold text-white">{partner.name}</div>
                <div className="text-[10px] text-amber-200 font-mono font-medium mt-0.5">
                  {partner.mbti} · {partner.bloodType}형
                </div>
                <div className="text-[10px] text-stone-400 mt-1 truncate">
                  {partner.customTitle}
                </div>
              </div>
            </div>

            {/* 4 Chemistry Sub-scores */}
            <div className="grid grid-cols-4 gap-1.5 py-2 text-center text-[10px]">
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-rose-300 block font-semibold">연애</span>
                <span className="font-bold text-white tabular-nums">{report.romanceScore}점</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-indigo-300 block font-semibold">우정</span>
                <span className="font-bold text-white tabular-nums">{report.friendshipScore}점</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-emerald-300 block font-semibold">협업</span>
                <span className="font-bold text-white tabular-nums">{report.teamworkScore}점</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-amber-300 block font-semibold">생활</span>
                <span className="font-bold text-white tabular-nums">{report.lifestyleScore}점</span>
              </div>
            </div>

            {/* Top Synergy Highlight */}
            {report.synergies[0] && (
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-stone-200 mt-2 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span className="leading-snug">{report.synergies[0]}</span>
              </div>
            )}

            {/* Footer */}
            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-400">
              <span>동시 확인 궁합 리포트</span>
              <span className="text-amber-300 font-mono font-semibold">mindtype.me</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 border-t border-stone-100 space-y-2 bg-white">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-300" />}
            <span>{copiedLink ? '동시 확인 링크 복사 완료!' : '우리 둘의 궁합 동시 확인 링크 복사'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? '결과 복사됨!' : '카톡 결과 문구 복사'}</span>
            </button>

            <button
              type="button"
              onClick={handleSimulateDownload}
              className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? '저장 완료!' : '리포트 파일 저장'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
