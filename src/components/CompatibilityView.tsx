import React, { useState, useEffect } from 'react';
import {
  Heart,
  Users,
  Briefcase,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Send,
  Loader2,
  RefreshCw,
  Sliders,
  ChevronDown,
  MessageSquare,
  Share2,
  BookmarkCheck,
  UserPlus,
  Copy,
  Check,
  HeartHandshake
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
import { calculateCompatibility } from '../services/compatibilityEngine';
import {
  createMutualCompatUrl,
  generateMutualCompatText
} from '../services/inviteService';
import { MutualChemistryCardModal } from './MutualChemistryCardModal';
import {
  SAMPLE_PROFILES,
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO
} from '../data/personalityData';

interface CompatibilityViewProps {
  user: UserPersona;
  initialPartner?: UserPersona;
  savedFriends?: UserPersona[];
  onOpenInviteModal?: () => void;
  onOpenCardExchangeModal?: (tab?: 'share' | 'request' | 'import') => void;
  onSavePartnerToFriends?: (partner: UserPersona) => void;
  isMutualViewMode?: boolean;
}

export const CompatibilityView: React.FC<CompatibilityViewProps> = ({
  user,
  initialPartner,
  savedFriends = [],
  onOpenInviteModal,
  onOpenCardExchangeModal,
  onSavePartnerToFriends,
  isMutualViewMode = false
}) => {
  // Available partner selection candidates
  const allCandidates = [
    ...(initialPartner ? [initialPartner] : []),
    ...SAMPLE_PROFILES,
    ...savedFriends
  ];

  // Remove duplicates by ID
  const uniqueCandidates = allCandidates.filter(
    (c, idx, self) => self.findIndex(s => s.id === c.id) === idx
  );

  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(
    initialPartner?.id || SAMPLE_PROFILES[0].id
  );

  const [partner, setPartner] = useState<UserPersona>(
    initialPartner || SAMPLE_PROFILES[0]
  );

  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [isMutualModalOpen, setIsMutualModalOpen] = useState(false);
  const [copiedMutualLink, setCopiedMutualLink] = useState(false);
  const [justSavedPartner, setJustSavedPartner] = useState(false);

  // AI consultant state
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialPartner) {
      setPartner(initialPartner);
      setSelectedPartnerId(initialPartner.id);
    }
  }, [initialPartner]);

  const isPartnerAlreadySaved = savedFriends.some(f => f.id === partner.id) || partner.id === user.id;

  const handleCopyMutualLink = async () => {
    const compatUrl = createMutualCompatUrl(user, partner);
    const rep = calculateCompatibility(user, partner);
    const msg = generateMutualCompatText(user, partner, rep.overallScore, compatUrl);
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedMutualLink(true);
      setTimeout(() => setCopiedMutualLink(false), 2200);
    } catch {
      setCopiedMutualLink(true);
      setTimeout(() => setCopiedMutualLink(false), 2200);
    }
  };

  const handleSavePartner = () => {
    if (onSavePartnerToFriends) {
      onSavePartnerToFriends(partner);
      setJustSavedPartner(true);
      setTimeout(() => setJustSavedPartner(false), 2200);
    }
  };

  const handleSelectPartner = (id: string) => {
    setSelectedPartnerId(id);
    const found = uniqueCandidates.find(c => c.id === id);
    if (found) {
      setPartner(found);
      setAiAnswer(null);
    }
  };

  const report = calculateCompatibility(user, partner);

  // Gemini AI consultant query handler
  const handleAskConsultant = async (customPrompt?: string) => {
    const questionToAsk = customPrompt || aiQuestion;
    if (!questionToAsk.trim()) return;

    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const response = await fetch('/api/relationship-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user1: user,
          user2: partner,
          situation: questionToAsk
        })
      });

      const data = await response.json();
      setAiAnswer(data.advice || '심층 분석 결과를 불러올 수 없습니다.');
    } catch (err) {
      setAiAnswer(
        `두 사람의 관계는 ${user.mbti}와 ${partner.mbti}의 상호보완성과 ${ATTACHMENT_INFO[user.attachment].badge} & ${ATTACHMENT_INFO[partner.attachment].badge}의 애착 안정이 관건입니다. 서로의 회복 시간(${STRESS_INFO[user.stress].badge} / ${STRESS_INFO[partner.stress].badge})을 존중해 주시면 평생의 동반자가 될 수 있습니다.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* Simultaneous Mutual View Notification Banner */}
      {isMutualViewMode && (
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-stone-50 border border-rose-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                💞 {user.name} 님 & {partner.name} 님의 1:1 궁합 동시 확인 모드
              </span>
              <span className="text-[11px] text-stone-600 block">
                공유 링크를 통해 두 사람의 6차원 성향 데이터가 결합된 실시간 매칭 리포트입니다.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isPartnerAlreadySaved && (
              <button
                type="button"
                onClick={handleSavePartner}
                disabled={justSavedPartner}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                {justSavedPartner ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <BookmarkCheck className="w-3.5 h-3.5 text-amber-300" />}
                <span>{justSavedPartner ? '저장 완료!' : `내 친구 목록에 ${partner.name}님 저장`}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Selector Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>MIND:TYPE 1:1 정밀 궁합 진단서</span>
              <span aria-hidden="true">·</span>
              <span>6대 차원 다면 매칭</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {user.name} × {partner.name} 궁합 진단
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              두 사람의 성향 프로필을 대조하여 연애, 우정, 협업, 생활 주기별 상호작용 지수를 분석합니다.
            </p>
          </div>

          {/* Quick Partner Switcher & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
              상대방 선택:
            </label>
            <select
              value={selectedPartnerId}
              onChange={e => handleSelectPartner(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {uniqueCandidates.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.mbti} · {c.bloodType}형 · {ATTACHMENT_INFO[c.attachment]?.badge || ''})
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsEditingPartner(!isEditingPartner)}
              className="px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-stone-500" />
              <span>상대방 성향 커스텀 조정</span>
            </button>

            {!isPartnerAlreadySaved && (
              <button
                type="button"
                onClick={handleSavePartner}
                disabled={justSavedPartner}
                className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="상대방 카드를 내 친구 목록에 저장"
              >
                {justSavedPartner ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <UserPlus className="w-3.5 h-3.5 text-amber-700" />}
                <span>{justSavedPartner ? '저장됨' : '친구 저장'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dual Chemistry Sharing Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMutualModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs active:scale-98"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              <span>둘의 케미 동시 확인 카드</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMutualLink}
              className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="이 1:1 궁합 결과를 상대방과 함께 바로 보는 링크를 복사합니다"
            >
              {copiedMutualLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-stone-600" />}
              <span>{copiedMutualLink ? '결과 링크 복사됨!' : '우리 둘의 궁합 링크 복사 (동시 확인)'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenCardExchangeModal && (
              <button
                type="button"
                onClick={() => onOpenCardExchangeModal('share')}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
              >
                <span>📇 성격 카드 교환 / 요청</span>
              </button>
            )}

            {onOpenInviteModal && (
              <button
                onClick={onOpenInviteModal}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                title="친구에게 초대장 보내서 1:1 궁합 맞추기"
              >
                <Send className="w-3.5 h-3.5 text-stone-600" />
                <span>친구 초대장 보내기</span>
              </button>
            )}
          </div>
        </div>

        {/* Custom Partner Tuner (Accordion) */}
        {isEditingPartner && (
          <div className="pt-6 pb-2 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-slate-50/50 p-4 rounded-2xl mt-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">이름</label>
              <input
                type="text"
                value={partner.name}
                onChange={e => setPartner({ ...partner, name: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">MBTI</label>
              <select
                value={partner.mbti}
                onChange={e => setPartner({ ...partner, mbti: e.target.value as MBTIType })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium"
              >
                {Object.keys(MBTI_INFO).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">혈액형</label>
              <select
                value={partner.bloodType}
                onChange={e => setPartner({ ...partner, bloodType: e.target.value as BloodType })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium"
              >
                <option value="A">A형</option>
                <option value="B">B형</option>
                <option value="O">O형</option>
                <option value="AB">AB형</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">애착유형</label>
              <select
                value={partner.attachment}
                onChange={e => setPartner({ ...partner, attachment: e.target.value as AttachmentStyle })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium"
              >
                {Object.keys(ATTACHMENT_INFO).map(a => (
                  <option key={a} value={a}>{ATTACHMENT_INFO[a as AttachmentStyle].badge}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">크로노타입</label>
              <select
                value={partner.chronotype}
                onChange={e => setPartner({ ...partner, chronotype: e.target.value as Chronotype })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium"
              >
                {Object.keys(CHRONOTYPE_INFO).map(c => (
                  <option key={c} value={c}>{CHRONOTYPE_INFO[c as Chronotype].badge}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">스트레스 대처</label>
              <select
                value={partner.stress}
                onChange={e => setPartner({ ...partner, stress: e.target.value as StressStyle })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium"
              >
                {Object.keys(STRESS_INFO).map(s => (
                  <option key={s} value={s}>{STRESS_INFO[s as StressStyle].badge}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* 2-Person Profile Matchup Bar */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">나 (ME)</span>
              <div className="text-base font-extrabold text-indigo-950 mt-0.5">{user.name}</div>
              <div className="text-xs text-indigo-700 mt-1 flex flex-wrap gap-1.5 font-medium">
                <span>{user.mbti}</span>
                <span>·</span>
                <span>{user.bloodType}형</span>
                <span>·</span>
                <span>{ATTACHMENT_INFO[user.attachment].badge}</span>
                <span>·</span>
                <span>{CHRONOTYPE_INFO[user.chronotype].badge}</span>
              </div>
            </div>
            <div className="text-2xl">{ELEMENT_INFO[user.element].symbol}</div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">상대방 (PARTNER)</span>
              <div className="text-base font-extrabold text-rose-950 mt-0.5">{partner.name}</div>
              <div className="text-xs text-rose-700 mt-1 flex flex-wrap gap-1.5 font-medium">
                <span>{partner.mbti}</span>
                <span>·</span>
                <span>{partner.bloodType}형</span>
                <span>·</span>
                <span>{ATTACHMENT_INFO[partner.attachment].badge}</span>
                <span>·</span>
                <span>{CHRONOTYPE_INFO[partner.chronotype].badge}</span>
              </div>
            </div>
            <div className="text-2xl">{ELEMENT_INFO[partner.element].symbol}</div>
          </div>
        </div>
      </div>

      {/* Main Score & Headline Spotlight */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="text-center md:text-left">
            <span className="text-xs font-semibold text-indigo-600 tracking-wider">종합 다면 케미스트리</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              {report.headline}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {report.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center px-6 py-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white shadow-md">
              <span className="text-[11px] font-medium text-white/80 block">종합 궁합 지수</span>
              <span className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums">
                {report.overallScore}
              </span>
              <span className="text-sm font-bold text-white/80 ml-0.5">/100</span>
            </div>
          </div>
        </div>

        {/* 4 Domain Sub-Scores Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>연애 궁합</span>
              </span>
              <span className="text-sm font-bold text-rose-600 tabular-nums">{report.romanceScore}점</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${report.romanceScore}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">감정 표현 · 애착 신뢰도</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>우정 & 소통</span>
              </span>
              <span className="text-sm font-bold text-indigo-600 tabular-nums">{report.friendshipScore}점</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${report.friendshipScore}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">대화 코드 · 티키타카</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                <span>협업 & 팀워크</span>
              </span>
              <span className="text-sm font-bold text-emerald-600 tabular-nums">{report.teamworkScore}점</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${report.teamworkScore}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">실행력 · 역할 분담</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>생활 리듬 싱크</span>
              </span>
              <span className="text-sm font-bold text-amber-600 tabular-nums">{report.lifestyleScore}점</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${report.lifestyleScore}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">수면 주기 · 약속 시간대</span>
          </div>
        </div>
      </div>

      {/* 6 Dimension Breakdown Detail Cards */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            차원별 정밀 케미스트리 분석
          </h3>
          <p className="text-xs text-slate-500">
            MBTI, 혈액형, 애착유형, 크로노타입, 스트레스 대처, 4원소 기질이 만났을 때 생기는 화학작용입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* MBTI Chem */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-indigo-600">1. MBTI 인지 케미</span>
              <span className="text-xs font-bold text-slate-800 tabular-nums">{report.dimensionBreakdown.mbtiChem.score}점</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-2">
              {report.dimensionBreakdown.mbtiChem.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {report.dimensionBreakdown.mbtiChem.text}
            </p>
          </div>

          {/* Blood Type Chem */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-rose-600">2. 혈액형 바이브 케미</span>
              <span className="text-xs font-bold text-slate-800 tabular-nums">{report.dimensionBreakdown.bloodChem.score}점</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-2">
              {report.dimensionBreakdown.bloodChem.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {report.dimensionBreakdown.bloodChem.text}
            </p>
          </div>

          {/* Attachment Style Chem */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-600">3. 애착유형 정서 케미</span>
              <span className="text-xs font-bold text-slate-800 tabular-nums">{report.dimensionBreakdown.attachmentChem.score}점</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-2">
              {report.dimensionBreakdown.attachmentChem.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {report.dimensionBreakdown.attachmentChem.text}
            </p>
          </div>

          {/* Chronotype Chem */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-amber-600">4. 크로노타입 생체시계</span>
              <span className="text-xs font-bold text-slate-800 tabular-nums">{report.dimensionBreakdown.chronoChem.score}점</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-2">
              {report.dimensionBreakdown.chronoChem.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {report.dimensionBreakdown.chronoChem.text}
            </p>
          </div>

          {/* Stress Chem */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-purple-600">5. 스트레스 회복 케미</span>
              <span className="text-xs font-bold text-slate-800 tabular-nums">{report.dimensionBreakdown.stressChem.score}점</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-2">
              {report.dimensionBreakdown.stressChem.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {report.dimensionBreakdown.stressChem.text}
            </p>
          </div>

          {/* Element Chem */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-sky-600">6. 4대 기질 원소 케미</span>
              <span className="text-xs font-bold text-slate-800 tabular-nums">{report.dimensionBreakdown.elementChem.score}점</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-2">
              {report.dimensionBreakdown.elementChem.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {report.dimensionBreakdown.elementChem.text}
            </p>
          </div>
        </div>
      </div>

      {/* Practical Action Prescriptions (Dos & Donts, Conflict formula) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Communication Dos & Donts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🗣️ 소통의 골든 룰 (말 한마디의 차이)</span>
          </h3>

          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-emerald-800">
              ✅ 서로에게 큰 힘과 안도감을 주는 행동 (DO)
            </div>
            {report.communicationDos.map((doItem, idx) => (
              <div key={idx} className="p-3 bg-emerald-50/60 rounded-xl text-xs text-emerald-950 flex items-start gap-2 border border-emerald-100">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doItem}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-semibold text-rose-800">
              🚫 오해와 상처를 부르는 절대 금기 (DON'T)
            </div>
            {report.communicationDonts.map((dontItem, idx) => (
              <div key={idx} className="p-3 bg-rose-50/60 rounded-xl text-xs text-rose-950 flex items-start gap-2 border border-rose-100">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{dontItem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conflict Resolution & Hangouts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🗝️ 맞춤형 갈등 해독제 & 추천 활동</span>
          </h3>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-xs text-slate-700 leading-relaxed">
            <strong className="block text-slate-900 font-bold mb-1">위기 상황 시 관계 처방전</strong>
            {report.conflictResolutionGuide}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-indigo-900">
              ☕ 함께하면 호감도와 유대가 2배 깊어지는 추천 코스
            </div>
            {report.recommendedDatesOrHangouts.map((dateItem, idx) => (
              <div key={idx} className="p-2.5 bg-indigo-50/60 rounded-lg text-xs text-indigo-950 border border-indigo-100">
                • {dateItem}
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-1">
            <div className="text-xs font-semibold text-slate-800">
              💼 업무·스터디 협업 꿀팁
            </div>
            {report.workCollaborationTips.map((tip, idx) => (
              <div key={idx} className="p-2.5 bg-slate-100/70 rounded-lg text-xs text-slate-700">
                • {tip}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gemini AI Relationship Deep Consultant Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                MIND:TYPE AI 심리 상담소
              </h3>
              <p className="text-xs text-indigo-200">
                Gemini AI가 두 사람의 6대 다면 지표를 바탕으로 맞춤형 심층 솔루션을 답변해 드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Question Buttons */}
        <div className="pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setAiQuestion('우리 둘이 심각하게 싸웠을 때 어떻게 화해하면 좋을까요?');
              handleAskConsultant('우리 둘이 심각하게 싸웠을 때 어떻게 화해하면 좋을까요?');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white border border-white/15 transition-colors cursor-pointer"
          >
            💬 싸웠을 때 화해 솔루션은?
          </button>
          <button
            onClick={() => {
              setAiQuestion('서로에게 가장 큰 감동과 사랑을 주는 행동은 무엇인가요?');
              handleAskConsultant('서로에게 가장 큰 감동과 사랑을 주는 행동은 무엇인가요?');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white border border-white/15 transition-colors cursor-pointer"
          >
            💖 상대방의 마음을 녹이는 배려 포인트는?
          </button>
          <button
            onClick={() => {
              setAiQuestion('주말에 같이 떠나기 가장 좋은 1박 2일 여행 스타일과 주의점은?');
              handleAskConsultant('주말에 같이 떠나기 가장 좋은 1박 2일 여행 스타일과 주의점은?');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white border border-white/15 transition-colors cursor-pointer"
          >
            ✈️ 함께 갈 때 최고의 여행 스타일은?
          </button>
          <button
            onClick={() => {
              setAiQuestion('공동 프로젝트나 업무를 할 때 갈등 없이 시너지 내는 법은?');
              handleAskConsultant('공동 프로젝트나 업무를 할 때 갈등 없이 시너지 내는 법은?');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white border border-white/15 transition-colors cursor-pointer"
          >
            💼 함께 일할 때 시너지 극대화 방법은?
          </button>
        </div>

        {/* Custom Input */}
        <div className="pt-4 flex gap-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={e => setAiQuestion(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAskConsultant();
            }}
            placeholder="예: 상대방이 갑자기 연락이 뜸해졌을 때 어떻게 반응해야 할까요?"
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={() => handleAskConsultant()}
            disabled={isAiLoading}
            className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            {isAiLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>AI 상담</span>
          </button>
        </div>

        {/* AI Answer Box */}
        {isAiLoading && (
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-indigo-200">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            <span>두 사람의 성격과 애착 역학을 심층 분석하고 있습니다...</span>
          </div>
        )}

        {aiAnswer && !isAiLoading && (
          <div className="mt-4 p-5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-slate-100 whitespace-pre-line leading-relaxed animate-in fade-in">
            {aiAnswer}
          </div>
        )}
      </div>

      {/* Dual Chemistry Visual Modal */}
      <MutualChemistryCardModal
        isOpen={isMutualModalOpen}
        onClose={() => setIsMutualModalOpen(false)}
        user={user}
        partner={partner}
        report={report}
      />
    </div>
  );
};

