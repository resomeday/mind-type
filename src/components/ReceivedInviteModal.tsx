import React, { useState } from 'react';
import {
  X,
  Sparkles,
  HeartHandshake,
  Users,
  ArrowRight,
  Zap,
  CheckCircle,
  BookmarkCheck,
  Send,
  Copy,
  Check,
  Share2
} from 'lucide-react';
import { UserPersona, GroupRoom, InvitePayload } from '../types/personality';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  ELEMENT_INFO,
  STRESS_INFO
} from '../data/personalityData';
import { calculateCompatibility } from '../services/compatibilityEngine';
import { createCardShareUrl, generateCardShareText } from '../services/inviteService';

interface ReceivedInviteModalProps {
  payload: InvitePayload | null;
  currentUser: UserPersona;
  onSaveFriendAndOpenCompat: (friend: UserPersona) => void;
  onSaveFriendOnly: (friend: UserPersona) => void;
  onOpenMutualCompat: (u1: UserPersona, u2: UserPersona) => void;
  onAccept1on1WithTest: (inviter: UserPersona) => void;
  onAccept1on1WithPreset: (inviter: UserPersona) => void;
  onAccept1on1WithCurrentProfile: (inviter: UserPersona) => void;
  onAcceptGroupRoom: (roomData: GroupRoom) => void;
  onDismiss: () => void;
}

export const ReceivedInviteModal: React.FC<ReceivedInviteModalProps> = ({
  payload,
  currentUser,
  onSaveFriendAndOpenCompat,
  onSaveFriendOnly,
  onOpenMutualCompat,
  onAccept1on1WithTest,
  onAccept1on1WithPreset,
  onAccept1on1WithCurrentProfile,
  onAcceptGroupRoom,
  onDismiss
}) => {
  const [copiedReturnLink, setCopiedReturnLink] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  if (!payload) return null;

  const { type, inviter, partner, roomId, roomName, members } = payload;

  const mbti = MBTI_INFO[inviter.mbti] || MBTI_INFO.ENFP;
  const blood = BLOOD_INFO[inviter.bloodType] || BLOOD_INFO.A;
  const chrono = CHRONOTYPE_INFO[inviter.chronotype] || CHRONOTYPE_INFO.bear;
  const elem = ELEMENT_INFO[inviter.element] || ELEMENT_INFO.fire;
  const stress = STRESS_INFO[inviter.stress] || STRESS_INFO.talk;
  const attach = ATTACHMENT_INFO[inviter.attachment] || ATTACHMENT_INFO.secure;

  // Calculate preview chemistry between currentUser and inviter
  const previewReport = calculateCompatibility(currentUser, inviter);

  const getHeaderTitle = () => {
    switch (type) {
      case 'card_received':
        return '📇 친구의 성격 카드가 도착했습니다!';
      case 'request_card':
        return '📢 친구의 성격 카드 공유 요청!';
      case 'compat_view':
        return '💞 1:1 성향 케미 궁합 결과 동시 확인';
      case 'group':
        return '👥 단체 모임 케미 룸 초대장';
      case '1on1':
      default:
        return '💌 1:1 친구 궁합 초대장';
    }
  };

  const handleCopyReturnCard = async () => {
    const cardUrl = createCardShareUrl(currentUser);
    const msg = generateCardShareText(currentUser, cardUrl);
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedReturnLink(true);
      setTimeout(() => setCopiedReturnLink(false), 2000);
    } catch {
      setCopiedReturnLink(true);
      setTimeout(() => setCopiedReturnLink(false), 2000);
    }
  };

  const handleSaveOnly = () => {
    onSaveFriendOnly(inviter);
    setJustSaved(true);
    setTimeout(() => {
      onDismiss();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {getHeaderTitle()}
            </span>
          </div>
          <button
            onClick={onDismiss}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* CASE 1: Friend Shared Their Personality Card */}
          {type === 'card_received' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-2 text-stone-900">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  <span className="underline decoration-amber-400 decoration-2 underline-offset-4">{inviter.name}</span> 님이 성격 카드를 보냈습니다!
                </h3>
                <p className="text-xs text-stone-500">
                  {inviter.name}님의 카드를 내 앱 친구 목록에 저장하고, 우리 둘의 1:1 궁합을 즉시 확인해보세요.
                </p>
              </div>

              {/* Inviter's Detailed Card Preview */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold">
                  <span>도착한 친구 카드</span>
                  <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                    예상 케미 {previewReport.overallScore}점
                  </span>
                </div>

                <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-stone-900">{inviter.name}</span>
                      <span className="text-xs text-stone-500 ml-2">({inviter.mbti} · {inviter.bloodType}형)</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 font-bold text-stone-800">
                      {elem.symbol} {elem.badge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 font-medium bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    "{inviter.customTitle || `${inviter.mbti} 페르소나`}"
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <div className="p-1.5 rounded bg-stone-50 text-stone-700 font-medium text-center">
                      <span className="text-[10px] text-stone-400 block">애착유형</span>
                      {attach.badge}
                    </div>
                    <div className="p-1.5 rounded bg-stone-50 text-stone-700 font-medium text-center">
                      <span className="text-[10px] text-stone-400 block">생체시계</span>
                      {chrono.symbol} {chrono.badge}
                    </div>
                    <div className="p-1.5 rounded bg-stone-50 text-stone-700 font-medium text-center">
                      <span className="text-[10px] text-stone-400 block">스트레스</span>
                      {stress.badge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => onSaveFriendAndOpenCompat(inviter)}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  <HeartHandshake className="w-4 h-4 text-rose-400" />
                  <span>내 앱에 카드 저장하고 1:1 궁합 바로 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleSaveOnly}
                    disabled={justSaved}
                    className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                  >
                    {justSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <BookmarkCheck className="w-3.5 h-3.5 text-stone-600" />}
                    <span>{justSaved ? '친구 저장 완료!' : '친구 목록에만 저장'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyReturnCard}
                    className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-200"
                  >
                    {copiedReturnLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5 text-amber-700" />}
                    <span>{copiedReturnLink ? '답장 링크 복사됨!' : '내 카드 답장 보내기'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2: Friend Requested User To Share Their Card */}
          {type === 'request_card' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto mb-2 text-stone-900">
                  <Send className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  <span className="underline decoration-indigo-400 decoration-2 underline-offset-4">{inviter.name}</span> 님이 카드 공유를 요청했습니다!
                </h3>
                <p className="text-xs text-stone-500">
                  {inviter.name}님과 1:1 궁합을 확인하기 위해, 나의 6차원 성향 카드를 {inviter.name}님에게 보내보세요.
                </p>
              </div>

              {/* Request Message Box */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-[11px] font-semibold text-stone-500">요청자 프로필</div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-900">{inviter.name}</span>
                    <span className="text-xs text-stone-500 ml-1.5">({inviter.mbti} · {inviter.bloodType}형)</span>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    {elem.badge}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyReturnCard}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  {copiedReturnLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4 text-amber-300" />}
                  <span>{copiedReturnLink ? '내 성격 카드 복사 완료! (카톡에 붙여넣기)' : `현재 내 카드(${currentUser.name}) ${inviter.name}님에게 보내기`}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onAccept1on1WithTest(inviter)}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                  <span>새로 6차원 성향 진단 후 카드 보내기</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSaveFriendAndOpenCompat(inviter)}
                  className="w-full py-2 text-stone-500 hover:text-stone-900 text-xs font-medium cursor-pointer transition-colors"
                >
                  {inviter.name}님 카드를 내 친구 목록에 저장하고 1:1 궁합 바로 보기
                </button>
              </div>
            </div>
          )}

          {/* CASE 3: Simultaneous Mutual Compatibility View Link (?compat=...) */}
          {type === 'compat_view' && partner && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-2 text-stone-900">
                  <HeartHandshake className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  [{inviter.name} & {partner.name}] 1:1 궁합 동시 확인!
                </h3>
                <p className="text-xs text-stone-500">
                  두 사람의 성향 카드가 결합된 1:1 정밀 케미 리포트가 준비되었습니다.
                </p>
              </div>

              {/* Side-by-side Dual Card Preview */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-1">
                  <span className="text-xs font-black text-stone-900 block">{inviter.name}</span>
                  <span className="text-[11px] font-bold text-stone-600 block">{inviter.mbti} · {inviter.bloodType}형</span>
                  <span className="text-[10px] text-stone-500 block truncate">{inviter.customTitle}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-1">
                  <span className="text-xs font-black text-stone-900 block">{partner.name}</span>
                  <span className="text-[11px] font-bold text-stone-600 block">{partner.mbti} · {partner.bloodType}형</span>
                  <span className="text-[10px] text-stone-500 block truncate">{partner.customTitle}</span>
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenMutualCompat(inviter, partner)}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>두 사람의 1:1 궁합 리포트 즉시 열기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* CASE 4: Standard 1:1 Test Invite */}
          {type === '1on1' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-2 text-stone-900">
                  <HeartHandshake className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  <span className="underline decoration-rose-300 decoration-2 underline-offset-4">{inviter.name}</span> 님이 1:1 궁합 초대를 보냈습니다!
                </h3>
                <p className="text-xs text-stone-500">
                  나의 6대 성향을 진단하고, {inviter.name}님과의 1:1 소울메이트 점수와 정밀 궁합 리포트를 확인해보세요.
                </p>
              </div>

              {/* Inviter's Profile Card Preview */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                  초대한 친구의 성향 페르소나
                </div>
                <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-stone-900">{inviter.name}</span>
                    <span className="text-xs font-bold text-stone-600">{inviter.mbti} · {inviter.bloodType}형</span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1 font-medium">
                    {inviter.customTitle || `${inviter.mbti} 페르소나`}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold">
                      MBTI: {mbti.nameKr}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold">
                      생체시계: {chrono.symbol} {chrono.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold">
                      기질: {elem.symbol} {elem.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => onAccept1on1WithTest(inviter)}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>심리테스트 풀고 {inviter.name}님과 궁합 확인</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onAccept1on1WithPreset(inviter)}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-stone-200"
                >
                  <Zap className="w-3.5 h-3.5 text-stone-600" />
                  <span>⚡ 1분 빠른 프로필 설정 후 바로 궁합 보기</span>
                </button>

                <button
                  type="button"
                  onClick={() => onAccept1on1WithCurrentProfile(inviter)}
                  className="w-full py-2 text-stone-500 hover:text-stone-900 text-xs font-medium cursor-pointer transition-colors"
                >
                  현재 내 프로필({currentUser.name} · {currentUser.mbti})로 즉시 확인
                </button>
              </div>
            </div>
          )}

          {/* CASE 5: Group Room Invitation */}
          {type === 'group' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-2 text-stone-900">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  [{roomName || '모임'}] 6차원 케미 룸에 초대되었습니다!
                </h3>
                <p className="text-xs text-stone-500">
                  참여 멤버들의 성향을 바탕으로 팀 컬러와 최적의 만남 시간대, 모임 찰떡 콤비를 확인해보세요.
                </p>
              </div>

              {/* Members Preview */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>현재 룸 참여자 ({members?.length || 1}명)</span>
                  <span>개설자: {inviter.name}</span>
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {members?.map(m => (
                    <div key={m.id} className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">{m.name}</span>
                      <span className="text-stone-500">{m.mbti} · {m.bloodType}형 · {ELEMENT_INFO[m.element]?.badge || ''}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const newRoom: GroupRoom = {
                      id: roomId || `room-${Date.now()}`,
                      name: roomName || '초대된 모임',
                      createdAt: new Date().toISOString(),
                      creatorName: inviter.name,
                      members: members || [inviter]
                    };
                    onAcceptGroupRoom(newRoom);
                  }}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  <Users className="w-4 h-4" />
                  <span>내 성향({currentUser.name})으로 이 모임 입장하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
