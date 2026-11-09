import React, { useState } from 'react';
import { X, Copy, Download, Share2, Check, Sparkles } from 'lucide-react';
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
import { getPersonalityKeywordAnalysis } from './PersonalityKeywordCard';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserPersona;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const mbti = MBTI_INFO[user.mbti];
  const blood = BLOOD_INFO[user.bloodType];
  const attachment = ATTACHMENT_INFO[user.attachment];
  const chrono = CHRONOTYPE_INFO[user.chronotype];
  const stress = STRESS_INFO[user.stress];
  const element = ELEMENT_INFO[user.element];

  const catchphrase = generatePersonaCatchphrase(user);
  const analysis = getPersonalityKeywordAnalysis(user);

  const shareText = `[MIND:TYPE 다면 성격 진단 결과]
👤 ${user.name} 님의 페르소나
✨ ${user.customTitle}
🏷️ ${analysis.hashtags.slice(0, 6).join(' ')}

🧬 MBTI: ${user.mbti} (${mbti.nameKr})
🩸 혈액형: ${user.bloodType}형
⚓ 애착유형: ${attachment.badge}
⏰ 크로노타입: ${chrono.symbol} ${chrono.badge}
🧘 스트레스 대처: ${stress.badge}
🔥 기질론: ${element.symbol} ${element.badge}

"${catchphrase}"

나와 최적의 연애·우정·협업 궁합을 확인해 보세요!
👉 ${window.location.origin}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSimulateDownload = () => {
    // Generate text blob or simulated image download
    const blob = new Blob([shareText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MIND_TYPE_${user.name}_${user.mbti}_${user.bloodType}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-800">
              인스타그램 스토리 공유 카드
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Card Visual Preview */}
        <div className="p-5 flex justify-center bg-slate-100/60">
          <div
            id="story-card"
            className="w-full max-w-[340px] rounded-3xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)`
            }}
          >
            {/* Ambient element glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ background: element.color }}
            />

            {/* Top brand tag */}
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-black tracking-widest text-indigo-300">
                MIND:TYPE
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                MULTI-DIMENSIONAL ID
              </span>
            </div>

            {/* Center: Hero Archetype */}
            <div className="relative z-10 py-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner mb-3">
                {element.symbol}
              </div>
              <span className="text-xs text-indigo-200 font-semibold tracking-wide">
                {user.name} 님의 다면 성격 프로필
              </span>
              <h3 className="text-xl font-black mt-1 leading-tight text-white tracking-tight">
                {user.customTitle}
              </h3>
              <p className="text-[11px] text-slate-300 mt-2 italic px-2">
                {catchphrase}
              </p>
            </div>

            {/* Core Hashtag Chips */}
            <div className="relative z-10 flex flex-wrap justify-center gap-1.5 pb-3">
              {analysis.hashtags.slice(0, 5).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-amber-200 font-semibold border border-white/15 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 6 Dimension Spec Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-2 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono">01 · MBTI</span>
                <span className="font-bold text-white text-[11px]">{user.mbti} ({mbti.nameKr.split(' ')[0]})</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono">02 · 혈액형</span>
                <span className="font-bold text-white text-[11px]">{user.bloodType}형 ({blood.badge})</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono">03 · 애착유형</span>
                <span className="font-bold text-white text-[11px]">{attachment.badge}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono">04 · 크로노타입</span>
                <span className="font-bold text-white text-[11px]">{chrono.symbol} {chrono.badge}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono">05 · 스트레스 대처</span>
                <span className="font-bold text-white text-[11px]">{stress.badge}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono">06 · 4대 기질</span>
                <span className="font-bold text-white text-[11px]">{element.badge}</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="relative z-10 pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>나와의 궁합 확인하기</span>
              <span className="text-indigo-300 font-semibold font-mono">mindtype.me</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 border-t border-slate-100 space-y-2 bg-white">
          <button
            onClick={handleCopyText}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '분석 요약 클립보드 복사 완료!' : '결과 문구 복사 (인스타/카톡 공유)'}</span>
          </button>

          <button
            onClick={handleSimulateDownload}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            {downloadSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4" />}
            <span>{downloadSuccess ? '프로필 카드 텍스트 저장 완료!' : '프로필 카드 파일로 저장하기'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
