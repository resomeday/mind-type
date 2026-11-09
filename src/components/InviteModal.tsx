import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Send,
  Users,
  UserPlus,
  Sparkles,
  Share2,
  HeartHandshake,
  MessageCircle,
  Plus,
  ArrowRight
} from 'lucide-react';
import { UserPersona, GroupRoom } from '../types/personality';
import {
  create1on1InviteUrl,
  createGroupInviteUrl,
  generate1on1InviteText,
  generateGroupInviteText
} from '../services/inviteService';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  ELEMENT_INFO
} from '../data/personalityData';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserPersona;
  groupRooms: GroupRoom[];
  onCreateGroupRoom: (roomName: string) => GroupRoom;
  activeRoomId?: string;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  user,
  groupRooms,
  onCreateGroupRoom,
  activeRoomId
}) => {
  const [activeTab, setActiveTab] = useState<'1on1' | 'group'>('1on1');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Group room creation state
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    activeRoomId || (groupRooms[0]?.id ?? '')
  );
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  if (!isOpen) return null;

  // 1:1 Invite Data
  const inviteUrl1on1 = create1on1InviteUrl(user);
  const inviteMessage1on1 = generate1on1InviteText(user, inviteUrl1on1);

  // Group Invite Data
  const selectedRoom = groupRooms.find(r => r.id === selectedRoomId) || groupRooms[0];
  const groupInviteUrl = selectedRoom ? createGroupInviteUrl(selectedRoom) : '';
  const groupInviteMessage = selectedRoom ? generateGroupInviteText(selectedRoom, groupInviteUrl) : '';

  const handleCopy = async (text: string, isLink: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isLink) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      }
    } catch {
      if (isLink) setCopiedLink(true);
      else setCopiedMessage(true);
      setTimeout(() => {
        setCopiedLink(false);
        setCopiedMessage(false);
      }, 2000);
    }
  };

  const handleNativeShare = async (title: string, text: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {}
    } else {
      handleCopy(text, false);
    }
  };

  const handleCreateRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    const newRoom = onCreateGroupRoom(newRoomName.trim());
    setSelectedRoomId(newRoom.id);
    setNewRoomName('');
    setIsCreatingRoom(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-900" />
            <h2 className="text-base font-bold text-stone-900">
              친구 초대장 & 모임 케미 룸
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: 1:1 친구 초대 vs 단체 모임 룸 초대 */}
        <div className="px-5 pt-3 border-b border-stone-100 flex gap-2 bg-stone-50/40">
          <button
            type="button"
            onClick={() => setActiveTab('1on1')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === '1on1'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>1:1 친구 궁합 초대장</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('group')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'group'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>단체/모임 케미 룸 초대</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 max-h-[78vh]">
          {activeTab === '1on1' ? (
            /* TAB 1: 1:1 Friend Invite */
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  친구에게 내 성향 초대장을 보내보세요
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  친구가 링크를 열면 내 성향을 확인하고, 테스트 후 둘만의 <strong>1:1 궁합 점수와 케미 리포트</strong>를 즉시 확인할 수 있습니다.
                </p>
              </div>

              {/* Preview Card */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">💌 초대장 미리보기</span>
                  <span>발신자: {user.name}</span>
                </div>
                <div className="bg-white rounded-xl p-3.5 border border-stone-200">
                  <div className="text-xs font-bold text-stone-900">
                    {user.name} 님의 페르소나
                  </div>
                  <div className="text-xs text-stone-600 mt-1 font-medium">
                    {user.customTitle}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2 text-[10px]">
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 font-semibold">
                      {user.mbti} ({MBTI_INFO[user.mbti].nameKr})
                    </span>
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 font-semibold">
                      {user.bloodType}형
                    </span>
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 font-semibold">
                      {CHRONOTYPE_INFO[user.chronotype].symbol} {CHRONOTYPE_INFO[user.chronotype].badge}
                    </span>
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 font-semibold">
                      {ELEMENT_INFO[user.element].symbol} {ELEMENT_INFO[user.element].badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(inviteUrl1on1, true)}
                    className="py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? '초대 링크 복사 완료!' : '초대 링크 복사'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(inviteMessage1on1, false)}
                    className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <MessageCircle className="w-3.5 h-3.5" />}
                    <span>{copiedMessage ? '카톡 문구 복사 완료!' : '카톡/문자 문구 전체 복사'}</span>
                  </button>
                </div>

                {/* Web Share API support */}
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    type="button"
                    onClick={() =>
                      handleNativeShare(
                        `[MIND:TYPE] ${user.name}님의 성향 궁합 초대장`,
                        inviteMessage1on1,
                        inviteUrl1on1
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-200"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>카카오톡 / 스마트폰 메신저로 바로 공유</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* TAB 2: Multi-person Group Room Invite */
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  모임 / 팀 단톡방에 케미 룸 초대하기
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  단톡방이나 모임에 링크를 보내면 여러 친구들이 각자의 성향으로 입장하여 <strong>팀 컬러, 최적 모임 시간, 최고 찰떡 콤비</strong>를 다 같이 볼 수 있습니다.
                </p>
              </div>

              {/* Room Selector or Create */}
              {!isCreatingRoom ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">초대할 모임 룸 선택</span>
                    <button
                      type="button"
                      onClick={() => setIsCreatingRoom(true)}
                      className="text-stone-900 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>새 모임 룸 만들기</span>
                    </button>
                  </div>

                  {groupRooms.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {groupRooms.map(room => (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => setSelectedRoomId(room.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            selectedRoomId === room.id
                              ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{room.name}</div>
                            <div className={`text-[11px] mt-0.5 ${selectedRoomId === room.id ? 'text-stone-300' : 'text-stone-500'}`}>
                              참여자: {room.members.map(m => m.name).join(', ')} ({room.members.length}명)
                            </div>
                          </div>
                          {selectedRoomId === room.id && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
                      아직 생성된 모임 룸이 없습니다. 아래 버튼으로 첫 모임 룸을 만들어보세요!
                    </div>
                  )}
                </div>
              ) : (
                /* Create Room Form */
                <form onSubmit={handleCreateRoomSubmit} className="p-3.5 rounded-xl border border-stone-300 bg-stone-50 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                    <span>새 모임/팀 룸 만들기</span>
                    <button
                      type="button"
                      onClick={() => setIsCreatingRoom(false)}
                      className="text-stone-400 hover:text-stone-600 text-[11px]"
                    >
                      취소
                    </button>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      모임 이름
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: 주말 보드게임 모임, 룸메이트 3인방, 기획팀"
                      value={newRoomName}
                      onChange={e => setNewRoomName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    룸 생성하고 초대장 만들기
                  </button>
                </form>
              )}

              {/* Action Buttons for Group Room */}
              {selectedRoom && (
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(groupInviteUrl, true)}
                      className="py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? '링크 복사 완료!' : '모임 링크 복사'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(groupInviteMessage, false)}
                      className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{copiedMessage ? '단톡방 문구 복사 완료!' : '단톡방 초대 문구 전체 복사'}</span>
                    </button>
                  </div>

                  {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                      type="button"
                      onClick={() =>
                        handleNativeShare(
                          `[MIND:TYPE] ${selectedRoom.name} 모임 케미 룸 초대`,
                          groupInviteMessage,
                          groupInviteUrl
                        )
                      }
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-200"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>단톡방에 바로 링크 공유</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
