/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileView } from './components/ProfileView';
import { TestHomeView } from './components/TestHomeView';
import { BestMatchesView } from './components/BestMatchesView';
import { CompatibilityView } from './components/CompatibilityView';
import { FriendsDirectory } from './components/FriendsDirectory';
import { AssessmentModal } from './components/AssessmentModal';
import { DimensionTestModal } from './components/DimensionTestModal';
import { ShareCardModal } from './components/ShareCardModal';
import { InstallAppModal } from './components/InstallAppModal';
import { MobileInstallPrompt } from './components/MobileInstallPrompt';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { InviteModal } from './components/InviteModal';
import { ReceivedInviteModal } from './components/ReceivedInviteModal';
import { PdfExportModal } from './components/PdfExportModal';
import { CardExchangeModal } from './components/CardExchangeModal';
import { UserPersona, GroupRoom, InvitePayload } from './types/personality';
import { SAMPLE_PROFILES, generatePersonaTitle } from './data/personalityData';
import { DimensionKey } from './data/detailedQuestions';
import { DesignTheme, THEMES } from './types/theme';
import { parseInviteFromUrl } from './services/inviteService';

const DEFAULT_USER: UserPersona = {
  id: 'me-primary',
  name: '민서',
  mbti: 'ENFP',
  bloodType: 'B',
  attachment: 'anxious',
  chronotype: 'wolf',
  stress: 'talk',
  element: 'fire',
  customTitle: '불꽃처럼 타오르는 ENFP 심야의 크리에이터',
  gender: 'female'
};

export default function App() {
  // Theme state: defaults to 'warm' for clean, simple, warm-minimalist aesthetic
  const [currentTheme, setCurrentTheme] = useState<DesignTheme>(() => {
    try {
      const saved = localStorage.getItem('mindtype_theme');
      if (saved && (saved === 'warm' || saved === 'monochrome' || saved === 'pastel')) {
        return saved;
      }
    } catch {}
    return 'warm';
  });

  // Load saved user persona or default
  const [user, setUser] = useState<UserPersona>(() => {
    try {
      const saved = localStorage.getItem('mindtype_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USER;
  });

  // Load saved friends or sample profiles
  const [friends, setFriends] = useState<UserPersona[]>(() => {
    try {
      const saved = localStorage.getItem('mindtype_friends');
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_PROFILES;
  });

  // Group Rooms for multi-person team chemistry
  const [groupRooms, setGroupRooms] = useState<GroupRoom[]>(() => {
    try {
      const saved = localStorage.getItem('mindtype_group_rooms');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'room-default-1',
        name: '우리 모임 케미 룸',
        createdAt: new Date().toISOString(),
        creatorName: '민서',
        description: '친구들과 함께하는 6차원 성향 모임방',
        members: [DEFAULT_USER, SAMPLE_PROFILES[0], SAMPLE_PROFILES[1], SAMPLE_PROFILES[2]]
      }
    ];
  });

  // Active navigation tab: tests | profile | matches | compat | friends
  const [currentTab, setCurrentTab] = useState<'tests' | 'profile' | 'matches' | 'compat' | 'friends'>('tests');

  // Currently selected partner for 1:1 compatibility
  const [partnerForCompat, setPartnerForCompat] = useState<UserPersona>(SAMPLE_PROFILES[1]);

  // Modals
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [activeDimensionModal, setActiveDimensionModal] = useState<DimensionKey | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [isCardExchangeModalOpen, setIsCardExchangeModalOpen] = useState<boolean>(false);
  const [cardExchangeInitialTab, setCardExchangeInitialTab] = useState<'share' | 'request' | 'import'>('share');
  const [isMutualViewMode, setIsMutualViewMode] = useState<boolean>(false);
  const [receivedInvite, setReceivedInvite] = useState<InvitePayload | null>(null);

  // Parse invite from URL on mount
  useEffect(() => {
    const invite = parseInviteFromUrl();
    if (invite) {
      setReceivedInvite(invite);
      if (invite.type === 'compat_view') {
        setIsMutualViewMode(true);
      }
    }
  }, []);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mindtype_user_profile', JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('mindtype_friends', JSON.stringify(friends));
    } catch {}
  }, [friends]);

  useEffect(() => {
    try {
      localStorage.setItem('mindtype_group_rooms', JSON.stringify(groupRooms));
    } catch {}
  }, [groupRooms]);

  // Persist theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mindtype_theme', currentTheme);
    } catch {}
  }, [currentTheme]);

  const handleSaveProfile = (newProfile: UserPersona) => {
    setUser(newProfile);
    setCurrentTab('profile');
  };

  const handleSaveDimensionResult = (updatedUser: UserPersona, completedDim: DimensionKey) => {
    setUser(updatedUser);
  };

  const handleAddFriend = (newFriend: UserPersona) => {
    setFriends(prev => [newFriend, ...prev.filter(f => f.id !== newFriend.id)]);
  };

  const handleUpdateFriend = (updatedFriend: UserPersona) => {
    setFriends(prev => prev.map(f => f.id === updatedFriend.id ? updatedFriend : f));
    // Also update friend inside any group rooms they are members of
    setGroupRooms(prev => prev.map(room => ({
      ...room,
      members: room.members.map(m => m.id === updatedFriend.id ? updatedFriend : m)
    })));
    // Also update partnerForCompat if selected
    if (partnerForCompat?.id === updatedFriend.id) {
      setPartnerForCompat(updatedFriend);
    }
  };

  const handleDeleteFriend = (id: string) => {
    setFriends(prev => prev.filter(f => f.id !== id));
    // Also remove from all group rooms
    setGroupRooms(prev => prev.map(room => ({
      ...room,
      members: room.members.filter(m => m.id !== id)
    })));
    // If the deleted friend was selected in compat view, pick another friend or sample
    if (partnerForCompat?.id === id) {
      const remaining = friends.filter(f => f.id !== id);
      if (remaining.length > 0) {
        setPartnerForCompat(remaining[0]);
      } else {
        setPartnerForCompat(SAMPLE_PROFILES[0]);
      }
    }
  };

  const handleResetSampleFriends = () => {
    setFriends(SAMPLE_PROFILES);
  };

  const handleSelectPartnerForCompat = (partner: UserPersona) => {
    setPartnerForCompat(partner);
    setCurrentTab('compat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCardExchangeModal = (tab: 'share' | 'request' | 'import' = 'share') => {
    setCardExchangeInitialTab(tab);
    setIsCardExchangeModalOpen(true);
  };

  const handleSaveImportedFriend = (friend: UserPersona, openCompat: boolean = true) => {
    handleAddFriend(friend);
    if (openCompat) {
      setPartnerForCompat(friend);
      setCurrentTab('compat');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveFriendAndOpenCompat = (friend: UserPersona) => {
    handleAddFriend(friend);
    setPartnerForCompat(friend);
    setReceivedInvite(null);
    setCurrentTab('compat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveFriendOnly = (friend: UserPersona) => {
    handleAddFriend(friend);
  };

  const handleOpenMutualCompat = (u1: UserPersona, u2: UserPersona) => {
    // If current user is u1, partner is u2; otherwise partner is u1
    const isMeU1 = user.id === u1.id || user.name === u1.name;
    const targetPartner = isMeU1 ? u2 : u1;
    handleAddFriend(targetPartner);
    setPartnerForCompat(targetPartner);
    setIsMutualViewMode(true);
    setReceivedInvite(null);
    setCurrentTab('compat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateGroupRoom = (roomName: string): GroupRoom => {
    const newRoom: GroupRoom = {
      id: `room-${Date.now()}`,
      name: roomName,
      createdAt: new Date().toISOString(),
      creatorName: user.name,
      description: '함께 만든 6차원 성향 모임방',
      members: [user]
    };
    setGroupRooms(prev => [newRoom, ...prev]);
    return newRoom;
  };

  // Handlers for incoming invites
  const handleAccept1on1WithTest = (inviter: UserPersona) => {
    handleAddFriend(inviter);
    setPartnerForCompat(inviter);
    setReceivedInvite(null);
    setIsTestModalOpen(true);
  };

  const handleAccept1on1WithPreset = (inviter: UserPersona) => {
    handleAddFriend(inviter);
    setPartnerForCompat(inviter);
    setReceivedInvite(null);
    setIsTestModalOpen(true);
  };

  const handleAccept1on1WithCurrentProfile = (inviter: UserPersona) => {
    handleAddFriend(inviter);
    setPartnerForCompat(inviter);
    setReceivedInvite(null);
    setCurrentTab('compat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcceptGroupRoom = (roomData: GroupRoom) => {
    const updatedMembers = roomData.members.some(m => m.id === user.id)
      ? roomData.members
      : [user, ...roomData.members];
    const roomWithUser = { ...roomData, members: updatedMembers };

    setGroupRooms(prev => {
      const idx = prev.findIndex(r => r.id === roomData.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = roomWithUser;
        return copy;
      }
      return [roomWithUser, ...prev];
    });

    setFriends(prev => {
      const newPeeps = roomData.members.filter(m => m.id !== user.id && !prev.some(p => p.id === m.id));
      return [...newPeeps, ...prev];
    });

    setReceivedInvite(null);
    setCurrentTab('friends');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${THEMES[currentTheme].bgClass} ${THEMES[currentTheme].textPrimary} flex flex-col font-sans transition-colors duration-300 selection:bg-stone-800 selection:text-white`}>
      {/* Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenTest={() => setIsTestModalOpen(true)}
        onOpenInviteModal={() => setIsInviteModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenCardExchangeModal={handleOpenCardExchangeModal}
        currentTheme={currentTheme}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        userName={user.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-20">
        {/* Tab 1: 심리테스트 홈 (첫 진입 화면) */}
        {currentTab === 'tests' && (
          <TestHomeView
            user={user}
            onOpenFullTest={() => setIsTestModalOpen(true)}
            onOpenDirectPreset={() => setIsTestModalOpen(true)}
            onStartDimensionTest={(dimKey) => setActiveDimensionModal(dimKey)}
            onNavigateProfile={() => setCurrentTab('profile')}
            onNavigateMatches={() => setCurrentTab('matches')}
            onOpenInviteModal={() => setIsInviteModalOpen(true)}
            onNavigateFriends={() => setCurrentTab('friends')}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
        )}

        {/* Tab 2: 내 성향 리포트 & 거미줄 차트 */}
        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenCardExchangeModal={handleOpenCardExchangeModal}
            currentTheme={currentTheme}
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
            onNavigateMatches={() => setCurrentTab('matches')}
            onNavigateCompat={() => setCurrentTab('compat')}
            onNavigateDimensionHub={() => setCurrentTab('tests')}
            onTestDimension={(dimKey) => setActiveDimensionModal(dimKey)}
          />
        )}

        {currentTab === 'matches' && (
          <BestMatchesView
            user={user}
            onSelectForCompat={handleSelectPartnerForCompat}
          />
        )}

        {currentTab === 'compat' && (
          <CompatibilityView
            user={user}
            initialPartner={partnerForCompat}
            savedFriends={friends}
            onOpenInviteModal={() => setIsInviteModalOpen(true)}
            onOpenCardExchangeModal={handleOpenCardExchangeModal}
            onSavePartnerToFriends={handleAddFriend}
            isMutualViewMode={isMutualViewMode}
          />
        )}

        {currentTab === 'friends' && (
          <FriendsDirectory
            user={user}
            friends={friends}
            onAddFriend={handleAddFriend}
            onUpdateFriend={handleUpdateFriend}
            onDeleteFriend={handleDeleteFriend}
            onResetSampleFriends={handleResetSampleFriends}
            onSelectForCompat={handleSelectPartnerForCompat}
            groupRooms={groupRooms}
            onCreateGroupRoom={handleCreateGroupRoom}
            onOpenInviteModal={() => setIsInviteModalOpen(true)}
            onOpenCardExchangeModal={handleOpenCardExchangeModal}
          />
        )}
      </main>

      {/* Invite Modal for 1:1 and Group Rooms */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        user={user}
        groupRooms={groupRooms}
        onCreateGroupRoom={handleCreateGroupRoom}
      />

      {/* Card Exchange Modal (Share, Request, Import) */}
      <CardExchangeModal
        isOpen={isCardExchangeModalOpen}
        onClose={() => setIsCardExchangeModalOpen(false)}
        currentUser={user}
        initialTab={cardExchangeInitialTab}
        onSaveImportedFriend={handleSaveImportedFriend}
      />

      {/* Received Invite / Card Received / Request / Mutual Compat Modal */}
      {receivedInvite && (
        <ReceivedInviteModal
          payload={receivedInvite}
          currentUser={user}
          onSaveFriendAndOpenCompat={handleSaveFriendAndOpenCompat}
          onSaveFriendOnly={handleSaveFriendOnly}
          onOpenMutualCompat={handleOpenMutualCompat}
          onAccept1on1WithTest={handleAccept1on1WithTest}
          onAccept1on1WithPreset={handleAccept1on1WithPreset}
          onAccept1on1WithCurrentProfile={handleAccept1on1WithCurrentProfile}
          onAcceptGroupRoom={handleAcceptGroupRoom}
          onDismiss={() => setReceivedInvite(null)}
        />
      )}

      {/* Full Assessment / Fast Preset Modal */}
      <AssessmentModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        onSaveProfile={handleSaveProfile}
        initialProfile={user}
      />

      {/* Dedicated Individual Dimension Test Modal */}
      {activeDimensionModal && (
        <DimensionTestModal
          isOpen={true}
          onClose={() => setActiveDimensionModal(null)}
          dimensionKey={activeDimensionModal}
          currentUser={user}
          onSaveDimensionResult={handleSaveDimensionResult}
        />
      )}

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        user={user}
      />

      {/* Mobile App Install & Store Packaging Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Floating In-App Mobile Install Prompt */}
      <MobileInstallPrompt onOpenInstallModal={() => setIsInstallModalOpen(true)} />

      {/* Design Style Theme Selector Modal */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(t) => setCurrentTheme(t)}
      />

      {/* Specification PDF Export / Print Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200/70 bg-white/60 backdrop-blur-sm py-6 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-stone-900 tracking-tight">MIND:TYPE</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-600">6차원 다면 성격 분석 & 인간관계 추천 플랫폼</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="text-stone-700 hover:text-stone-950 underline font-semibold flex items-center gap-1 cursor-pointer text-xs"
            >
              <span>📄 앱 기능 명세서 PDF</span>
            </button>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="text-[11px] text-stone-400">
              심플 미니멀 디자인 · 132문항 리커트 정밀 검사
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
