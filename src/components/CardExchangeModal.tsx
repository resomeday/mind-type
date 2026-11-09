import React, { useState } from 'react';
import {
  X,
  Share2,
  Send,
  Download,
  Copy,
  Check,
  Sparkles,
  HeartHandshake,
  QrCode,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { UserPersona } from '../types/personality';
import {
  createCardShareUrl,
  createCardRequestUrl,
  generateCardShareText,
  generateCardRequestText,
  parseCardFromCodeOrUrl
} from '../services/inviteService';
import {
  MBTI_INFO,
  BLOOD_INFO,
  CHRONOTYPE_INFO,
  ELEMENT_INFO,
  ATTACHMENT_INFO
} from '../data/personalityData';
import { getPersonalityKeywordAnalysis } from './PersonalityKeywordCard';

interface CardExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserPersona;
  initialTab?: 'share' | 'request' | 'import';
  onSaveImportedFriend: (friend: UserPersona, openCompat?: boolean) => void;
}

export const CardExchangeModal: React.FC<CardExchangeModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  initialTab = 'share',
  onSaveImportedFriend
}) => {
  const [activeTab, setActiveTab] = useState<'share' | 'request' | 'import'>(initialTab);

  // Copy states
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [copiedShareMsg, setCopiedShareMsg] = useState(false);
  const [copiedRequestLink, setCopiedRequestLink] = useState(false);
  const [copiedRequestMsg, setCopiedRequestMsg] = useState(false);

  // Import states
  const [importInput, setImportInput] = useState('');
  const [parsedFriend, setParsedFriend] = useState<UserPersona | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const mbti = MBTI_INFO[currentUser.mbti];
  const blood = BLOOD_INFO[currentUser.bloodType];
  const chrono = CHRONOTYPE_INFO[currentUser.chronotype];
  const elem = ELEMENT_INFO[currentUser.element];
  const attach = ATTACHMENT_INFO[currentUser.attachment];
  const analysis = getPersonalityKeywordAnalysis(currentUser);

  // URLs & Texts
  const shareUrl = createCardShareUrl(currentUser);
  const shareMsg = generateCardShareText(currentUser, shareUrl);

  const requestUrl = createCardRequestUrl(currentUser);
  const requestMsg = generateCardRequestText(currentUser, requestUrl);

  const handleCopy = async (text: string, type: 'shareLink' | 'shareMsg' | 'reqLink' | 'reqMsg') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
    }

    if (type === 'shareLink') {
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2000);
    } else if (type === 'shareMsg') {
      setCopiedShareMsg(true);
      setTimeout(() => setCopiedShareMsg(false), 2000);
    } else if (type === 'reqLink') {
      setCopiedRequestLink(true);
      setTimeout(() => setCopiedRequestLink(false), 2000);
    } else if (type === 'reqMsg') {
      setCopiedRequestMsg(true);
      setTimeout(() => setCopiedRequestMsg(false), 2000);
    }
  };

  const handleNativeShare = async (title: string, text: string, url: string) => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, text, url });
      } catch {}
    } else {
      handleCopy(text, 'shareMsg');
    }
  };

  const handleParseImport = () => {
    setImportError(null);
    setParsedFriend(null);

    if (!importInput.trim()) {
      setImportError('친구에게 받은 카드 링크나 코드를 입력해주세요.');
      return;
    }

    const found = parseCardFromCodeOrUrl(importInput.trim());
    if (found) {
      setParsedFriend(found);
    } else {
      setImportError('올바른 성격 카드 링크나 형식이 아닙니다. 링크를 다시 확인해주세요.');
    }
  };

  const handleAcceptImported = (openCompat: boolean) => {
    if (!parsedFriend) return;
    onSaveImportedFriend(parsedFriend, openCompat);
    setParsedFriend(null);
    setImportInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
            <h2 className="text-base font-bold text-stone-900">
              성격 카드 교환 & 1:1 케미 센터
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

        {/* 3 Tabs */}
        <div className="px-4 sm:px-5 pt-3 border-b border-stone-100 flex gap-1 sm:gap-2 bg-stone-50/40">
          <button
            type="button"
            onClick={() => setActiveTab('share')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'share'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>내 카드 공유하기</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('request')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'request'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>친구에게 카드 요청하기</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'import'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>받은 카드 등록</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 max-h-[75vh]">
          {/* TAB 1: Share My Card */}
          {activeTab === 'share' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  내 성격 카드를 친구에게 공유하세요
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  친구가 이 링크를 열면 <strong>내 카드가 친구 앱에 즉시 저장</strong>되며, 곧바로 <strong>1:1 궁합 점수와 케미 리포트</strong>를 함께 확인할 수 있습니다.
                </p>
              </div>

              {/* Card Mini Preview */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold">
                  <span>공유될 내 성격 카드</span>
                  <span className="text-stone-700 font-bold">{currentUser.name}</span>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-stone-900">{currentUser.name}</span>
                    <span className="text-xs font-bold text-stone-600">{currentUser.mbti} · {currentUser.bloodType}형</span>
                  </div>
                  <div className="text-xs text-stone-700 font-medium">
                    "{currentUser.customTitle}"
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {analysis.hashtags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(shareUrl, 'shareLink')}
                    className="py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedShareLink ? '카드 링크 복사 완료!' : '내 카드 링크 복사'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(shareMsg, 'shareMsg')}
                    className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedShareMsg ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <MessageCircle className="w-3.5 h-3.5" />}
                    <span>{copiedShareMsg ? '카톡 문구 복사 완료!' : '카톡 공유 문구 복사'}</span>
                  </button>
                </div>

                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    type="button"
                    onClick={() =>
                      handleNativeShare(
                        `[MIND:TYPE] ${currentUser.name}님의 성격 카드`,
                        shareMsg,
                        shareUrl
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-200"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>카카오톡 / 스마트폰 메신저로 바로 공유</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Request Friend To Share Card */}
          {activeTab === 'request' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  친구에게 성격 카드 공유 요청하기
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  "친구야, 너의 성격 카드를 나한테 공유해줘! 우리 궁합 바로 보자!" 요청 메시지를 친구에게 보냅니다.
                </p>
              </div>

              {/* Request Text Preview */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-indigo-600" />
                  <span>친구에게 전송될 요청 메시지 미리보기</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-indigo-100 text-xs text-stone-700 leading-relaxed font-medium">
                  "📢 [{currentUser.name}]님의 성격 카드 공유 요청!<br />
                  '친구야, 너의 6차원 성격 카드를 나한테 공유해줘! 우리의 MBTI, 생체시계, 애착유형, 스트레스 케미 점수를 맞춰보고 1:1 궁합 리포트를 같이 확인하자!'"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(requestUrl, 'reqLink')}
                    className="py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedRequestLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedRequestLink ? '요청 링크 복사됨!' : '카드 요청 링크 복사'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(requestMsg, 'reqMsg')}
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedRequestMsg ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <MessageCircle className="w-3.5 h-3.5" />}
                    <span>{copiedRequestMsg ? '카톡 요청문 복사됨!' : '카톡 요청 문구 전체 복사'}</span>
                  </button>
                </div>

                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    type="button"
                    onClick={() =>
                      handleNativeShare(
                        `[MIND:TYPE] ${currentUser.name}님의 성격 카드 공유 요청`,
                        requestMsg,
                        requestUrl
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-indigo-200"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>카카오톡으로 친구에게 요청 보내기</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Import Received Card */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  친구에게 받은 카드 링크/코드 등록
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  카카오톡이나 문자로 받은 친구의 카드 링크나 코드를 아래에 붙여넣으면 내 친구 목록에 즉시 등록됩니다.
                </p>
              </div>

              {/* Input Area */}
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={importInput}
                  onChange={e => setImportInput(e.target.value)}
                  placeholder="친구에게 받은 카드 링크(https://...?card=...) 또는 전체 문구를 여기에 붙여넣으세요"
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-500 leading-relaxed font-mono resize-none"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleParseImport}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>카드 분석 & 불러오기</span>
                  </button>
                </div>

                {importError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                    {importError}
                  </div>
                )}
              </div>

              {/* Parsed Friend Preview */}
              {parsedFriend && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>카드가 성공적으로 분석되었습니다!</span>
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-stone-900">{parsedFriend.name}</span>
                      <span className="text-xs font-bold text-stone-600">{parsedFriend.mbti} · {parsedFriend.bloodType}형</span>
                    </div>
                    <div className="text-xs text-stone-700 font-medium">
                      "{parsedFriend.customTitle}"
                    </div>
                    <div className="text-[11px] text-stone-500 pt-1">
                      생체시계: {CHRONOTYPE_INFO[parsedFriend.chronotype]?.badge} · 기질: {ELEMENT_INFO[parsedFriend.element]?.badge}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleAcceptImported(true)}
                      className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                      <span>저장 & 1:1 궁합 바로 보기</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAcceptImported(false)}
                      className="py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-semibold border border-stone-200 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>친구 목록에만 저장</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
