import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  HeartHandshake,
  Sparkles,
  Flame,
  Clock,
  Shield,
  Layers,
  Check,
  Send,
  UserPlus,
  UserCheck,
  Compass,
  ArrowRight,
  Smile,
  Crown,
  Pencil,
  X,
  RotateCcw
} from 'lucide-react';
import {
  UserPersona,
  GroupRoom,
  MBTIType,
  BloodType,
  AttachmentStyle,
  Chronotype,
  StressStyle,
  ElementTemperament
} from '../types/personality';
import {
  SAMPLE_PROFILES,
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO,
  generatePersonaTitle
} from '../data/personalityData';
import { calculateCompatibility } from '../services/compatibilityEngine';

interface FriendsDirectoryProps {
  user: UserPersona;
  friends: UserPersona[];
  onAddFriend: (friend: UserPersona) => void;
  onUpdateFriend?: (friend: UserPersona) => void;
  onDeleteFriend: (id: string) => void;
  onResetSampleFriends?: () => void;
  onSelectForCompat: (friend: UserPersona) => void;
  groupRooms: GroupRoom[];
  onCreateGroupRoom: (roomName: string) => GroupRoom;
  onOpenInviteModal: () => void;
  onOpenCardExchangeModal?: (tab?: 'share' | 'request' | 'import') => void;
  onUpdateGroupRoomMembers?: (roomId: string, members: UserPersona[]) => void;
}

export const FriendsDirectory: React.FC<FriendsDirectoryProps> = ({
  user,
  friends,
  onAddFriend,
  onUpdateFriend,
  onDeleteFriend,
  onResetSampleFriends,
  onSelectForCompat,
  groupRooms,
  onCreateGroupRoom,
  onOpenInviteModal,
  onOpenCardExchangeModal,
  onUpdateGroupRoomMembers
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'rooms' | 'list'>('rooms');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    groupRooms[0]?.id || ''
  );

  // New room modal state
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');

  // Add friend state
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newMBTI, setNewMBTI] = useState<MBTIType>('ISFP');
  const [newBlood, setNewBlood] = useState<BloodType>('A');
  const [newAttachment, setNewAttachment] = useState<AttachmentStyle>('secure');
  const [newChrono, setNewChrono] = useState<Chronotype>('bear');
  const [newStress, setNewStress] = useState<StressStyle>('cave');
  const [newElement, setNewElement] = useState<ElementTemperament>('water');

  const allPeople = [user, ...friends];

  // Active room
  const currentRoom = groupRooms.find(r => r.id === selectedRoomId) || groupRooms[0];
  const roomMembers = currentRoom?.members || [user];

  // Simulator toggle selection inside room
  const [simulatorSelectedIds, setSimulatorSelectedIds] = useState<string[]>(
    roomMembers.map(m => m.id)
  );

  const teamMembers = allPeople.filter(p =>
    (simulatorSelectedIds.length > 0 ? simulatorSelectedIds : roomMembers.map(m => m.id)).includes(p.id)
  );

  const handleCreateFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;

    const newPerson: UserPersona = {
      id: `friend-${Date.now()}`,
      name: newFriendName.trim(),
      mbti: newMBTI,
      bloodType: newBlood,
      attachment: newAttachment,
      chronotype: newChrono,
      stress: newStress,
      element: newElement,
      customTitle: generatePersonaTitle({
        mbti: newMBTI,
        bloodType: newBlood,
        attachment: newAttachment,
        chronotype: newChrono,
        stress: newStress,
        element: newElement
      })
    };

    onAddFriend(newPerson);
    setNewFriendName('');
    setIsAddingFriend(false);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomTitle.trim()) return;
    const room = onCreateGroupRoom(newRoomTitle.trim());
    setSelectedRoomId(room.id);
    setSimulatorSelectedIds(room.members.map(m => m.id));
    setNewRoomTitle('');
    setIsCreatingRoom(false);
  };

  const toggleSimulatorSelect = (id: string) => {
    if (simulatorSelectedIds.includes(id)) {
      if (simulatorSelectedIds.length > 1) {
        setSimulatorSelectedIds(simulatorSelectedIds.filter(i => i !== id));
      }
    } else {
      if (simulatorSelectedIds.length < 8) {
        setSimulatorSelectedIds([...simulatorSelectedIds, id]);
      }
    }
  };

  // Editing friend name state
  const [editingFriendId, setEditingFriendId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  // Delete friend modal confirmation state
  const [friendToDelete, setFriendToDelete] = useState<UserPersona | null>(null);

  // Toast notification feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleStartEditName = (friend: UserPersona) => {
    setEditingFriendId(friend.id);
    setEditingName(friend.name);
  };

  const handleCancelEditName = () => {
    setEditingFriendId(null);
    setEditingName('');
  };

  const handleSaveEditedName = (friend: UserPersona) => {
    const trimmed = editingName.trim();
    if (!trimmed) return;
    if (trimmed === friend.name) {
      setEditingFriendId(null);
      return;
    }

    const updated: UserPersona = {
      ...friend,
      name: trimmed,
      customTitle: generatePersonaTitle({
        mbti: friend.mbti,
        bloodType: friend.bloodType,
        attachment: friend.attachment,
        chronotype: friend.chronotype,
        stress: friend.stress,
        element: friend.element
      })
    };

    if (onUpdateFriend) {
      onUpdateFriend(updated);
    }
    setEditingFriendId(null);
    setEditingName('');
    showToast(`친구 이름이 '${trimmed}'(으)로 변경되었습니다.`);
  };

  const handleConfirmDelete = () => {
    if (!friendToDelete) return;
    const targetName = friendToDelete.name;
    onDeleteFriend(friendToDelete.id);
    setFriendToDelete(null);
    showToast(`'${targetName}' 님이 친구 목록에서 삭제되었습니다.`);
  };

  // Group metrics
  const elementCounts = teamMembers.reduce((acc, p) => {
    acc[p.element] = (acc[p.element] || 0) + 1;
    return acc;
  }, {} as Record<ElementTemperament, number>);

  const chronoCounts = teamMembers.reduce((acc, p) => {
    acc[p.chronotype] = (acc[p.chronotype] || 0) + 1;
    return acc;
  }, {} as Record<Chronotype, number>);

  const stressCounts = teamMembers.reduce((acc, p) => {
    acc[p.stress] = (acc[p.stress] || 0) + 1;
    return acc;
  }, {} as Record<StressStyle, number>);

  // Find Best Pair in the group
  let bestPair: { p1: UserPersona; p2: UserPersona; score: number } | null = null;
  for (let i = 0; i < teamMembers.length; i++) {
    for (let j = i + 1; j < teamMembers.length; j++) {
      const rep = calculateCompatibility(teamMembers[i], teamMembers[j]);
      if (!bestPair || rep.overallScore > bestPair.score) {
        bestPair = { p1: teamMembers[i], p2: teamMembers[j], score: rep.overallScore };
      }
    }
  }

  // Find Team Facilitator/Peacekeeper (Water, Earth, or Secure attachment)
  const peacekeeper = teamMembers.find(
    p => p.element === 'water' || p.attachment === 'secure' || p.element === 'earth'
  ) || teamMembers[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span>MIND:TYPE 소셜 허브</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>친구 초대 & 다자간 그룹 케미 룸</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              단체 모임 케미 룸 & 친구 관리
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              친구들을 초대해 1:1 궁합을 확인하거나, 단톡방/프로젝트 팀/룸메이트를 위한 <strong>다자간 모임 케미 룸</strong>을 만들어 여러 명의 팀 컬러와 최고 찰떡 콤비를 시뮬레이션해보세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onOpenCardExchangeModal && (
              <>
                <button
                  type="button"
                  onClick={() => onOpenCardExchangeModal('share')}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>내 카드 공유 / 요청</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCardExchangeModal('import')}
                  className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                >
                  <span>📥 받은 카드 등록</span>
                </button>
              </>
            )}
            <button
              onClick={onOpenInviteModal}
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
            >
              <Send className="w-3.5 h-3.5 text-stone-600" />
              <span>초대장 생성</span>
            </button>
            <button
              onClick={() => setIsAddingFriend(true)}
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
            >
              <Plus className="w-3.5 h-3.5 text-stone-600" />
              <span>직접 입력</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation: Rooms vs List */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-stone-100">
          <button
            onClick={() => setActiveSubTab('rooms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'rooms'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>단체/모임 케미 룸 ({groupRooms.length}개)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'list'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>등록된 친구 목록 ({allPeople.length}명)</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Group Rooms & Multi-person Chemistry */}
      {activeSubTab === 'rooms' && (
        <div className="space-y-6">
          {/* Room Selector Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-700 mr-1">모임 룸 선택:</span>
              {groupRooms.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRoomId(r.id);
                    setSimulatorSelectedIds(r.members.map(m => m.id));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    (selectedRoomId === r.id || (!selectedRoomId && r.id === groupRooms[0]?.id))
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {r.name} ({r.members.length}명)
                </button>
              ))}
              <button
                onClick={() => setIsCreatingRoom(true)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>새 룸</span>
              </button>
            </div>

            <button
              onClick={onOpenInviteModal}
              className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              <Send className="w-3 h-3" />
              <span>이 모임에 친구들 초대하기 (단톡방 링크)</span>
            </button>
          </div>

          {/* Create Room Form Modal-in-place */}
          {isCreatingRoom && (
            <form onSubmit={handleCreateRoom} className="bg-stone-50 rounded-2xl p-4 border border-stone-300 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                <span>새 모임 케미 룸 생성</span>
                <button type="button" onClick={() => setIsCreatingRoom(false)} className="text-stone-400 hover:text-stone-600">
                  취소
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="모임 이름 (예: 룸메이트 3인방, 주말 등산팀, 스터디 조)"
                  value={newRoomTitle}
                  onChange={e => setNewRoomTitle(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  생성
                </button>
              </div>
            </form>
          )}

          {/* Multi-Person Group Chemistry Dashboard */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold">
                  <Layers className="w-4 h-4 text-stone-700" />
                  <span>[{currentRoom?.name || '모임'}] 6차원 그룹 케미 종합 분석</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mt-1">
                  참여 멤버 ({teamMembers.length}명): {teamMembers.map(m => m.name).join(', ')}
                </h3>
              </div>
              <span className="text-xs text-stone-400">
                멤버 카드를 클릭하여 자유롭게 그룹 시뮬레이션을 해보세요
              </span>
            </div>

            {/* 3 Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* 1. Element Balance */}
              <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
                <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>4원소 기질 밸런스</span>
                </h4>
                <div className="grid grid-cols-4 gap-1 text-center py-1">
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">불(추진)</div>
                    <div className="text-xs font-bold text-rose-600">{elementCounts.fire || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">물(공감)</div>
                    <div className="text-xs font-bold text-cyan-600">{elementCounts.water || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">흙(안정)</div>
                    <div className="text-xs font-bold text-emerald-600">{elementCounts.earth || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">바람(아이디어)</div>
                    <div className="text-xs font-bold text-stone-600">{elementCounts.air || 0}명</div>
                  </div>
                </div>
                <div className="text-[11px] text-stone-700 leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200">
                  {(elementCounts.fire || 0) > 0 && (elementCounts.earth || 0) > 0
                    ? '💡 불의 추진력과 흙의 리스크 관리가 완벽히 조화를 이루는 안정적 팀 구조입니다.'
                    : '💡 특정 기질로 쏠리지 않도록 역할 분담을 세분화하면 시너지가 극대화됩니다.'}
                </div>
              </div>

              {/* 2. Chronotype Harmony */}
              <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
                <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>생체 시계 & 모임 골든타임</span>
                </h4>
                <div className="grid grid-cols-4 gap-1 text-center py-1">
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">사자(오전)</div>
                    <div className="text-xs font-bold text-stone-800">{chronoCounts.lion || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">곰(주간)</div>
                    <div className="text-xs font-bold text-stone-800">{chronoCounts.bear || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">늑대(심야)</div>
                    <div className="text-xs font-bold text-stone-800">{chronoCounts.wolf || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">돌고래</div>
                    <div className="text-xs font-bold text-stone-800">{chronoCounts.dolphin || 0}명</div>
                  </div>
                </div>
                <div className="text-[11px] text-stone-700 leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200">
                  {(chronoCounts.lion || 0) > 0 && (chronoCounts.wolf || 0) > 0
                    ? '⚠️ 아침형과 심야형이 섞여 있으니 모임이나 약속은 오후 2시~5시가 골든타임입니다.'
                    : '💡 구성원의 바이오리듬이 고르게 맞춰져 있어 모임 일정 조율이 매우 수월합니다.'}
                </div>
              </div>

              {/* 3. Stress Protocol */}
              <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
                <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span>갈등 안전망 & 회복 프로토콜</span>
                </h4>
                <div className="grid grid-cols-4 gap-1 text-center py-1">
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">동굴잠수</div>
                    <div className="text-xs font-bold text-stone-800">{stressCounts.cave || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">폭풍수다</div>
                    <div className="text-xs font-bold text-stone-800">{stressCounts.talk || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">행동폭주</div>
                    <div className="text-xs font-bold text-stone-800">{stressCounts.action || 0}명</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-semibold">이성분석</div>
                    <div className="text-xs font-bold text-stone-800">{stressCounts.logic || 0}명</div>
                  </div>
                </div>
                <div className="text-[11px] text-stone-700 leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200">
                  {(stressCounts.cave || 0) > 0 && (stressCounts.talk || 0) > 0
                    ? '⚠️ 힘든 순간 동굴로 숨는 팀원에게 즉각적인 대화를 강요하지 않는 배려가 필요합니다.'
                    : '💡 스트레스 대처 양식이 자연스럽게 상호 보완되어 감정적 응어리가 적습니다.'}
                </div>
              </div>
            </div>

            {/* Special Highlights: Best Pair & Facilitator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {bestPair && (
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/60 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-amber-900">
                      🏆 모임 내 최고의 찰떡 콤비 ({bestPair.score}점)
                    </div>
                    <div className="text-sm font-extrabold text-stone-900 mt-0.5">
                      {bestPair.p1.name} & {bestPair.p2.name}
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">
                      {bestPair.p1.mbti}와 {bestPair.p2.mbti}의 상호 보완 시너지가 모임의 분위기를 밝게 이끕니다.
                    </p>
                  </div>
                </div>
              )}

              {peacekeeper && (
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 shrink-0">
                    <Smile className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-stone-700">
                      🕊️ 모임의 분위기 메이커 & 평화 중재자
                    </div>
                    <div className="text-sm font-extrabold text-stone-900 mt-0.5">
                      {peacekeeper.name} ({peacekeeper.mbti} · {ELEMENT_INFO[peacekeeper.element].badge})
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">
                      갈등이나 의견 대립이 생겼을 때 모난 곳 없이 유연하게 감정을 조율해 주는 든든한 중심축입니다.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Members Selector Grid */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">
                  모임 참여자 ({allPeople.length}명)
                </span>
                <span className="text-stone-400 text-[11px]">
                  클릭하여 시뮬레이션 참여/제외 토글
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allPeople.map(person => {
                  const isSelected = teamMembers.some(m => m.id === person.id);
                  const isMe = person.id === user.id;

                  return (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => toggleSimulatorSelect(person.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-stone-900 bg-white shadow-xs ring-1 ring-stone-900'
                          : 'border-stone-200 bg-stone-50/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900">{person.name}</span>
                          {isMe && <span className="text-[10px] px-1.5 py-0.2 bg-stone-100 rounded text-stone-600 font-semibold">나</span>}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {person.mbti} · {person.bloodType}형 · {ELEMENT_INFO[person.element].badge}
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Friends List & Manual Add */}
      {activeSubTab === 'list' && (
        <div className="space-y-6">
          {/* Add Friend Form */}
          {isAddingFriend && (
            <form onSubmit={handleCreateFriend} className="bg-white rounded-2xl p-6 border border-stone-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900">새 친구 프로필 직접 등록</h3>
                <button
                  type="button"
                  onClick={() => setIsAddingFriend(false)}
                  className="text-xs text-stone-400 hover:text-stone-600"
                >
                  닫기
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">친구 이름/별칭</label>
                  <input
                    type="text"
                    required
                    value={newFriendName}
                    onChange={e => setNewFriendName(e.target.value)}
                    placeholder="예: 지훈, 세은, 찰리"
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">MBTI</label>
                  <select
                    value={newMBTI}
                    onChange={e => setNewMBTI(e.target.value as MBTIType)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-medium"
                  >
                    {Object.keys(MBTI_INFO).map(m => (
                      <option key={m} value={m}>{m} ({MBTI_INFO[m as MBTIType].nameKr.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">혈액형</label>
                  <select
                    value={newBlood}
                    onChange={e => setNewBlood(e.target.value as BloodType)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-medium"
                  >
                    <option value="A">A형 (세심한 배려)</option>
                    <option value="B">B형 (자유로운 개성)</option>
                    <option value="O">O형 (열정적 의리)</option>
                    <option value="AB">AB형 (다면적 합리)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">애착 유형</label>
                  <select
                    value={newAttachment}
                    onChange={e => setNewAttachment(e.target.value as AttachmentStyle)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-medium"
                  >
                    {Object.keys(ATTACHMENT_INFO).map(a => (
                      <option key={a} value={a}>{ATTACHMENT_INFO[a as AttachmentStyle].badge}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">크로노타입</label>
                  <select
                    value={newChrono}
                    onChange={e => setNewChrono(e.target.value as Chronotype)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-medium"
                  >
                    {Object.keys(CHRONOTYPE_INFO).map(c => (
                      <option key={c} value={c}>{CHRONOTYPE_INFO[c as Chronotype].badge}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">4대 기질론</label>
                  <select
                    value={newElement}
                    onChange={e => setNewElement(e.target.value as ElementTemperament)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-medium"
                  >
                    {Object.keys(ELEMENT_INFO).map(e => (
                      <option key={e} value={e}>{ELEMENT_INFO[e as ElementTemperament].badge}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingFriend(false)}
                  className="px-3.5 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl"
                >
                  친구 등록 완료
                </button>
              </div>
            </form>
          )}

          {/* Friends List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPeople.map(person => {
              const isMe = person.id === user.id;
              const isEditingThis = editingFriendId === person.id;
              const mbti = MBTI_INFO[person.mbti];
              const blood = BLOOD_INFO[person.bloodType];
              const attachment = ATTACHMENT_INFO[person.attachment];
              const chrono = CHRONOTYPE_INFO[person.chronotype];
              const element = ELEMENT_INFO[person.element];

              return (
                <div
                  key={person.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-stone-300 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-full">
                        {isEditingThis ? (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleSaveEditedName(person);
                            }}
                            className="flex items-center gap-1.5 w-full mt-0.5"
                          >
                            <input
                              type="text"
                              required
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="flex-1 px-2.5 py-1 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-600 bg-white font-bold text-stone-900"
                              placeholder="새 친구 이름"
                              autoFocus
                            />
                            <button
                              type="submit"
                              className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                              title="이름 저장"
                            >
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>저장</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEditName}
                              className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 rounded-lg cursor-pointer"
                              title="취소"
                            >
                              취소
                            </button>
                          </form>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-extrabold text-stone-900">{person.name}</h3>
                              {isMe ? (
                                <span className="text-[10px] px-1.5 py-0.5 bg-stone-100 text-stone-700 font-bold rounded">
                                  나
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleStartEditName(person)}
                                  className="p-1 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                                  title="친구 이름 수정"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="text-xs text-stone-500 mt-1">{person.customTitle}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 mt-4 text-[11px]">
                      <div className="p-1.5 bg-stone-50 rounded-lg text-stone-700 font-semibold text-center">
                        {person.mbti}
                      </div>
                      <div className="p-1.5 bg-stone-50 rounded-lg text-stone-700 font-semibold text-center">
                        {person.bloodType}형
                      </div>
                      <div className="p-1.5 bg-stone-50 rounded-lg text-stone-700 font-semibold text-center">
                        {attachment.badge}
                      </div>
                      <div className="p-1.5 bg-stone-50 rounded-lg text-stone-700 font-semibold text-center">
                        {chrono.symbol} {chrono.badge}
                      </div>
                      <div className="p-1.5 bg-stone-50 rounded-lg text-stone-700 font-semibold text-center">
                        {STRESS_INFO[person.stress].badge}
                      </div>
                      <div className="p-1.5 bg-stone-50 rounded-lg text-stone-700 font-semibold text-center">
                        {element.symbol} {element.badge}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    {!isMe ? (
                      <button
                        type="button"
                        onClick={() => onSelectForCompat(person)}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>1:1 궁합 분석</span>
                      </button>
                    ) : (
                      <span className="text-xs text-stone-500 font-semibold">내 고유 프로필</span>
                    )}

                    {!isMe && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEditName(person)}
                          className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="친구 이름 수정"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFriendToDelete(person)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="친구 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state when no friends are registered */}
          {friends.length === 0 && (
            <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-4 shadow-2xs mt-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-stone-900">등록된 친구가 없습니다</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  친구에게 초대장을 보내거나 카드를 공유받아 친구를 등록하고 1:1 궁합을 확인해 보세요.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onOpenInviteModal}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>친구 초대장 생성</span>
                </button>
                {onResetSampleFriends && (
                  <button
                    type="button"
                    onClick={onResetSampleFriends}
                    className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                    <span>기본 샘플 친구 복원</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Friend Confirmation Modal */}
      {friendToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold text-stone-900">
                친구를 목록에서 삭제하시겠습니까?
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>'{friendToDelete.name}'</strong> 님의 프로필이 친구 목록 및 참여 중인 모임 케미 룸에서 모두 삭제됩니다.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFriendToDelete(null)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
