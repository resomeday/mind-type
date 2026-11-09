import React from 'react';
import { Sparkles, User, HeartHandshake, Users, Compass, PlusCircle, Smartphone, Palette, Send } from 'lucide-react';
import { DesignTheme, THEMES } from '../types/theme';

interface HeaderProps {
  currentTab: 'tests' | 'profile' | 'matches' | 'compat' | 'friends';
  setCurrentTab: (tab: 'tests' | 'profile' | 'matches' | 'compat' | 'friends') => void;
  onOpenTest: () => void;
  onOpenInviteModal: () => void;
  onOpenInstallModal: () => void;
  onOpenCardExchangeModal?: (tab?: 'share' | 'request' | 'import') => void;
  currentTheme: DesignTheme;
  onOpenThemeModal: () => void;
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenTest,
  onOpenInviteModal,
  onOpenInstallModal,
  onOpenCardExchangeModal,
  currentTheme,
  onOpenThemeModal,
  userName
}) => {
  const theme = THEMES[currentTheme];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-stone-200/70 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentTab('tests')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white font-black text-xs shadow-2xs group-hover:bg-stone-800 transition-colors">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-stone-900 whitespace-nowrap">
                MIND:TYPE
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line prose, quiet and minimal) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-500">
          <button
            onClick={() => setCurrentTab('tests')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer py-1 ${
              currentTab === 'tests'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>심리테스트</span>
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer py-1 ${
              currentTab === 'profile'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>내 성향 리포트</span>
          </button>
          <button
            onClick={() => setCurrentTab('matches')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer py-1 ${
              currentTab === 'matches'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>최적 궁합</span>
          </button>
          <button
            onClick={() => setCurrentTab('compat')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer py-1 ${
              currentTab === 'compat'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>1:1 궁합</span>
          </button>
          <button
            onClick={() => setCurrentTab('friends')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer py-1 ${
              currentTab === 'friends'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>친구 케미</span>
          </button>
          <button
            type="button"
            onClick={onOpenInstallModal}
            className="whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer py-1 hover:text-stone-900 text-stone-600 font-medium"
            title="스마트폰에 앱 설치"
          >
            <Smartphone className="w-3.5 h-3.5 text-stone-700" />
            <span>앱 설치</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Card Exchange Button */}
          {onOpenCardExchangeModal && (
            <button
              onClick={() => onOpenCardExchangeModal('share')}
              className="px-2.5 py-1.5 text-xs font-semibold text-stone-800 hover:text-stone-950 hover:bg-stone-100 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-stone-200/90 shadow-2xs"
              title="내 성격 카드 공유 및 친구에게 카드 요청"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">카드 교환</span>
            </button>
          )}

          {/* Invite Button */}
          <button
            onClick={onOpenInviteModal}
            className="px-2.5 py-1.5 text-xs font-semibold text-stone-800 hover:text-stone-950 hover:bg-stone-100 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-stone-200/90 shadow-2xs"
            title="친구 초대장 및 단톡방 모임 룸 링크 생성"
          >
            <Send className="w-3.5 h-3.5 text-stone-700" />
            <span className="hidden sm:inline">초대장</span>
          </button>

          {/* Style Selector button */}
          <button
            onClick={onOpenThemeModal}
            className="px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-stone-200/80"
            title="심플한 디자인 스타일 변경"
          >
            <Palette className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">스타일</span>
          </button>

          {/* App Install button */}
          <button
            onClick={onOpenInstallModal}
            className="px-2.5 py-1.5 text-xs font-bold text-stone-900 bg-amber-50 hover:bg-amber-100/90 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-amber-200/90 shadow-2xs active:scale-98"
            title="스마트폰 홈 화면에 앱 설치 및 출시 가이드"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-700" />
            <span>앱 설치</span>
          </button>

          {/* Test / Setting primary button */}
          <button
            onClick={onOpenTest}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 active:scale-98 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>정밀 진단</span>
          </button>
        </div>
      </div>

      {/* Mobile sub navigation bar with App Install included */}
      <div className="flex md:hidden border-t border-stone-100 bg-stone-50/90 px-1 py-1 justify-around text-xs overflow-x-auto">
        <button
          onClick={() => setCurrentTab('tests')}
          className={`py-1.5 px-2 rounded-lg font-medium flex items-center gap-1 transition-all ${
            currentTab === 'tests' ? 'text-stone-900 bg-white shadow-2xs font-bold' : 'text-stone-500'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>테스트</span>
        </button>
        <button
          onClick={() => setCurrentTab('profile')}
          className={`py-1.5 px-2 rounded-lg font-medium flex items-center gap-1 transition-all ${
            currentTab === 'profile' ? 'text-stone-900 bg-white shadow-2xs font-bold' : 'text-stone-500'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>내 리포트</span>
        </button>
        <button
          onClick={() => setCurrentTab('matches')}
          className={`py-1.5 px-2 rounded-lg font-medium flex items-center gap-1 transition-all ${
            currentTab === 'matches' ? 'text-stone-900 bg-white shadow-2xs font-bold' : 'text-stone-500'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>최적 궁합</span>
        </button>
        <button
          onClick={() => setCurrentTab('compat')}
          className={`py-1.5 px-2 rounded-lg font-medium flex items-center gap-1 transition-all ${
            currentTab === 'compat' ? 'text-stone-900 bg-white shadow-2xs font-bold' : 'text-stone-500'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>1:1 궁합</span>
        </button>
        <button
          onClick={() => setCurrentTab('friends')}
          className={`py-1.5 px-2 rounded-lg font-medium flex items-center gap-1 transition-all ${
            currentTab === 'friends' ? 'text-stone-900 bg-white shadow-2xs font-bold' : 'text-stone-500'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>친구</span>
        </button>
        <button
          type="button"
          onClick={onOpenInstallModal}
          className="py-1.5 px-2 rounded-lg font-bold flex items-center gap-1 transition-all text-amber-800 bg-amber-100/70 border border-amber-200/60 shadow-2xs cursor-pointer"
          title="스마트폰에 앱 설치"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-700" />
          <span>앱 설치</span>
        </button>
      </div>
    </header>
  );
};
