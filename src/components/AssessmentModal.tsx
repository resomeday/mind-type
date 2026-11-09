import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  Save,
  RotateCcw,
  Info
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
import {
  MBTI_32_QUESTIONS,
  ATTACHMENT_20_QUESTIONS,
  CHRONOTYPE_20_QUESTIONS,
  STRESS_20_QUESTIONS,
  ELEMENT_20_QUESTIONS,
  BLOOD_20_QUESTIONS,
  LIKERT_OPTIONS,
  LikertQuestion
} from '../data/massiveQuestions';
import {
  MBTI_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO,
  generatePersonaTitle
} from '../data/personalityData';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserPersona) => void;
  initialProfile?: UserPersona;
}

interface ChapterMeta {
  index: number;
  key: string;
  title: string;
  shortTitle: string;
  count: number;
  startIndex: number;
  endIndex: number;
}

interface FullQuestion extends LikertQuestion {
  globalIndex: number;
  chapterIndex: number;
  chapterKey: string;
  chapterTitle: string;
  indexInChapter: number;
  totalInChapter: number;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  initialProfile
}) => {
  const [mode, setMode] = useState<'test' | 'direct'>('test');
  // currentStep: 0 is Basic Info, 1..132 are questions, 133 is completion/review screen
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Basic Info Form states
  const [name, setName] = useState(initialProfile?.name || '나의 페르소나');
  const [bloodType, setBloodType] = useState<BloodType>(initialProfile?.bloodType || 'B');
  const [gender, setGender] = useState<'female' | 'male' | 'none'>(initialProfile?.gender || 'none');

  // Direct edit states
  const [directMBTI, setDirectMBTI] = useState<MBTIType>(initialProfile?.mbti || 'ENFP');
  const [directAttachment, setDirectAttachment] = useState<AttachmentStyle>(initialProfile?.attachment || 'anxious');
  const [directChronotype, setDirectChronotype] = useState<Chronotype>(initialProfile?.chronotype || 'wolf');
  const [directStress, setDirectStress] = useState<StressStyle>(initialProfile?.stress || 'talk');
  const [directElement, setDirectElement] = useState<ElementTemperament>(initialProfile?.element || 'fire');

  // Test answers map: question id -> number score (1..5)
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Assemble all 132 questions with chapters
  const { allQuestions, chapters } = useMemo(() => {
    const list: FullQuestion[] = [];
    const chs: ChapterMeta[] = [];

    const dimConfigs: { key: string; title: string; shortTitle: string; items: LikertQuestion[] }[] = [
      { key: 'mbti', title: 'MBTI 인지·판단 양식', shortTitle: '1. MBTI (32문항)', items: MBTI_32_QUESTIONS },
      { key: 'attachment', title: '애착유형 관계 심리', shortTitle: '2. 애착유형 (20문항)', items: ATTACHMENT_20_QUESTIONS },
      { key: 'chronotype', title: '크로노타입 생체시계', shortTitle: '3. 생체시계 (20문항)', items: CHRONOTYPE_20_QUESTIONS },
      { key: 'stress', title: '스트레스 대처 & 방어기제', shortTitle: '4. 스트레스 (20문항)', items: STRESS_20_QUESTIONS },
      { key: 'element', title: '4대 원소 고대 기질론', shortTitle: '5. 4기질론 (20문항)', items: ELEMENT_20_QUESTIONS },
      { key: 'blood', title: '혈액형 & 소셜 바이브', shortTitle: '6. 혈액형 (20문항)', items: BLOOD_20_QUESTIONS }
    ];

    let runningIndex = 0;
    dimConfigs.forEach((cfg, chIdx) => {
      const startIndex = runningIndex;
      cfg.items.forEach((item, itemIdx) => {
        list.push({
          ...item,
          globalIndex: runningIndex,
          chapterIndex: chIdx + 1,
          chapterKey: cfg.key,
          chapterTitle: cfg.title,
          indexInChapter: itemIdx + 1,
          totalInChapter: cfg.items.length
        });
        runningIndex++;
      });
      chs.push({
        index: chIdx + 1,
        key: cfg.key,
        title: cfg.title,
        shortTitle: cfg.shortTitle,
        count: cfg.items.length,
        startIndex: startIndex + 1,
        endIndex: runningIndex
      });
    });

    return { allQuestions: list, chapters: chs };
  }, []);

  const totalQuestions = allQuestions.length; // 132

  // Current question helper
  const currentQuestion: FullQuestion | undefined =
    currentStep >= 1 && currentStep <= totalQuestions
      ? allQuestions[currentStep - 1]
      : undefined;

  // Calculate answers count per chapter
  const chapterProgress = useMemo(() => {
    return chapters.map(ch => {
      let answeredCount = 0;
      for (let i = ch.startIndex; i <= ch.endIndex; i++) {
        const q = allQuestions[i - 1];
        if (q && answers[q.id] !== undefined) {
          answeredCount++;
        }
      }
      return {
        ...ch,
        answeredCount,
        isCompleted: answeredCount === ch.count
      };
    });
  }, [chapters, allQuestions, answers]);

  const totalAnswered = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  // Scoring function across all dimensions
  const calculateResultFromTest = useCallback((): UserPersona => {
    // 1. MBTI Calculation
    let scoreE = 0, scoreI = 0;
    let scoreS = 0, scoreN = 0;
    let scoreT = 0, scoreF = 0;
    let scoreJ = 0, scoreP = 0;

    MBTI_32_QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 3;
      if (q.weightKey === 'E') scoreE += val;
      if (q.weightKey === 'I') scoreI += val;
      if (q.weightKey === 'S') scoreS += val;
      if (q.weightKey === 'N') scoreN += val;
      if (q.weightKey === 'T') scoreT += val;
      if (q.weightKey === 'F') scoreF += val;
      if (q.weightKey === 'J') scoreJ += val;
      if (q.weightKey === 'P') scoreP += val;
    });

    const finalE = scoreE >= scoreI ? 'E' : 'I';
    const finalS = scoreS >= scoreN ? 'S' : 'N';
    const finalT = scoreT >= scoreF ? 'T' : 'F';
    const finalJ = scoreJ >= scoreP ? 'J' : 'P';
    const calculatedMBTI = `${finalE}${finalS}${finalT}${finalJ}` as MBTIType;

    // 2. Attachment Calculation
    let anxietyTotal = 0;
    let avoidanceTotal = 0;
    ATTACHMENT_20_QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 3;
      if (q.weightKey === 'anxiety') anxietyTotal += val;
      if (q.weightKey === 'avoidance') avoidanceTotal += val;
    });
    const isHighAnxiety = anxietyTotal >= 28;
    const isHighAvoidance = avoidanceTotal >= 28;
    let calculatedAttachment: AttachmentStyle = 'secure';
    if (!isHighAnxiety && !isHighAvoidance) calculatedAttachment = 'secure';
    else if (isHighAnxiety && !isHighAvoidance) calculatedAttachment = 'anxious';
    else if (!isHighAnxiety && isHighAvoidance) calculatedAttachment = 'avoidant';
    else calculatedAttachment = 'fearful';

    // 3. Chronotype Calculation
    const chronoScores: Record<Chronotype, number> = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };
    CHRONOTYPE_20_QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 3;
      if (q.weightKey in chronoScores) {
        chronoScores[q.weightKey as Chronotype] += val;
      }
    });
    const sortedChrono = (Object.entries(chronoScores) as [Chronotype, number][]).sort((a, b) => b[1] - a[1]);
    const calculatedChronotype = sortedChrono[0][0];

    // 4. Stress Calculation
    const stressScores: Record<StressStyle, number> = { cave: 0, talk: 0, action: 0, logic: 0 };
    STRESS_20_QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 3;
      if (q.weightKey in stressScores) {
        stressScores[q.weightKey as StressStyle] += val;
      }
    });
    const sortedStress = (Object.entries(stressScores) as [StressStyle, number][]).sort((a, b) => b[1] - a[1]);
    const calculatedStress = sortedStress[0][0];

    // 5. Element Calculation
    const elementScores: Record<ElementTemperament, number> = { fire: 0, water: 0, earth: 0, air: 0 };
    ELEMENT_20_QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 3;
      if (q.weightKey in elementScores) {
        elementScores[q.weightKey as ElementTemperament] += val;
      }
    });
    const sortedElement = (Object.entries(elementScores) as [ElementTemperament, number][]).sort((a, b) => b[1] - a[1]);
    const calculatedElement = sortedElement[0][0];

    // 6. Blood Vibe
    const bloodScores: Record<BloodType, number> = { A: 0, B: 0, O: 0, AB: 0 };
    BLOOD_20_QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 3;
      if (q.weightKey in bloodScores) {
        bloodScores[q.weightKey as BloodType] += val;
      }
    });
    // Blood type uses selected biological blood type if configured at step 0, otherwise highest vibe
    const finalBloodType = bloodType || 'B';

    const persona: UserPersona = {
      id: initialProfile?.id || `user-${Date.now()}`,
      name: name.trim() || '나의 페르소나',
      mbti: calculatedMBTI,
      bloodType: finalBloodType,
      attachment: calculatedAttachment,
      chronotype: calculatedChronotype,
      stress: calculatedStress,
      element: calculatedElement,
      gender,
      customTitle: generatePersonaTitle({
        mbti: calculatedMBTI,
        bloodType: finalBloodType,
        attachment: calculatedAttachment,
        chronotype: calculatedChronotype,
        stress: calculatedStress,
        element: calculatedElement
      }),
      createdAt: new Date().toISOString()
    };

    return persona;
  }, [answers, name, bloodType, gender, initialProfile]);

  const handleSelectAnswer = (questionId: string, val: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }));

    if (currentStep < totalQuestions) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 140);
    } else {
      // Reached end of 132 questions
      setTimeout(() => {
        setCurrentStep(totalQuestions + 1);
      }, 140);
    }
  };

  // Keyboard shortcut listener (1..5)
  useEffect(() => {
    if (!isOpen || mode !== 'test' || currentStep < 1 || currentStep > totalQuestions) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5 && currentQuestion) {
        e.preventDefault();
        handleSelectAnswer(currentQuestion.id, num);
      } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        e.preventDefault();
        setCurrentStep(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && currentStep < totalQuestions) {
        e.preventDefault();
        setCurrentStep(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, mode, currentStep, totalQuestions, currentQuestion]);

  const handleFinishAndSave = () => {
    const profile = calculateResultFromTest();
    onSaveProfile(profile);
    onClose();
  };

  const handleSaveDirect = () => {
    const profile: UserPersona = {
      id: initialProfile?.id || `user-${Date.now()}`,
      name: name.trim() || '나의 페르소나',
      mbti: directMBTI,
      bloodType,
      attachment: directAttachment,
      chronotype: directChronotype,
      stress: directStress,
      element: directElement,
      gender,
      customTitle: generatePersonaTitle({
        mbti: directMBTI,
        bloodType,
        attachment: directAttachment,
        chronotype: directChronotype,
        stress: directStress,
        element: directElement
      }),
      createdAt: new Date().toISOString()
    };
    onSaveProfile(profile);
    onClose();
  };

  const jumpToChapter = (startIndex: number) => {
    setCurrentStep(startIndex);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-3xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-stone-900" />
            <span className="text-sm sm:text-base font-bold text-stone-900">
              {mode === 'test' ? '6대 성향 입체 정밀진단 (총 132문항)' : '프로필 직접 빠른 설정'}
            </span>
            <span className="hidden sm:inline text-xs text-stone-400">|</span>
            <span className="hidden sm:inline text-xs text-stone-500">차원별 5지선답 리커트 척도</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode(mode === 'test' ? 'direct' : 'test')}
              className="text-xs font-medium text-stone-700 hover:text-stone-950 px-2.5 py-1 rounded-md border border-stone-200 bg-white hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {mode === 'test' ? '⚡ 이미 내 성향 알아요 (직접 설정)' : '📝 132문항 정밀 검사로 전환'}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {mode === 'test' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col">
            {/* Step 0: Basic Info */}
            {currentStep === 0 && (
              <div className="space-y-6 my-auto max-w-xl mx-auto w-full py-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-800 mb-2">
                    <Layers className="w-3.5 h-3.5 text-stone-600" />
                    <span>6차원 정밀 진단 시스템</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    심층 진단을 시작하기 전 기본 정보를 입력해주세요
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    차원별 진단과 완전히 동일한 정밀 5지선답 132문항(MBTI 32, 애착 20, 생체시계 20, 스트레스 20, 기질 20, 혈액형 20)을 순서대로 진행합니다. 언제든 중간 저장하여 결과를 확인할 수 있습니다.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      이름 또는 닉네임
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="예: 민지, 도현, 알렉스"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      혈액형 (생체 기본형)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['A', 'B', 'O', 'AB'] as BloodType[]).map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBloodType(b)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            bloodType === b
                              ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs'
                              : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                          }`}
                        >
                          <div className="text-base font-extrabold">{b}형</div>
                          <div className={`text-[11px] mt-0.5 ${bloodType === b ? 'text-stone-300' : 'text-stone-400'}`}>
                            {b === 'A' ? '세심·배려' : b === 'B' ? '자유·개성' : b === 'O' ? '열정·의리' : '다면·합리'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary of 6 Dimensions preview */}
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 text-xs text-stone-600 space-y-1.5">
                    <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-stone-500" />
                      <span>총 132문항 6단계 구성</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-stone-500 pt-1">
                      <div>· 1장: MBTI 인지양식 (32)</div>
                      <div>· 2장: 애착유형 관계심리 (20)</div>
                      <div>· 3장: 크로노타입 생체시계 (20)</div>
                      <div>· 4장: 스트레스 대처기제 (20)</div>
                      <div>· 5장: 4대 원소 고대기질 (20)</div>
                      <div>· 6장: 혈액형 소셜바이브 (20)</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-stone-400">
                    키보드 숫자키(1~5)로 빠른 답변이 가능합니다.
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm active:scale-98 transition-transform"
                  >
                    <span>132문항 정밀진단 시작</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 1..totalQuestions: The Full Likert Questionnaire */}
            {currentStep >= 1 && currentStep <= totalQuestions && currentQuestion && (
              <div className="space-y-4 my-auto flex flex-col justify-between">
                {/* Chapter Navigation Tabs */}
                <div className="border-b border-stone-200 pb-2.5">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-stone-900">
                      차원별 이동 탭 ({totalAnswered} / {totalQuestions} 완료)
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(totalQuestions + 1)}
                      className="text-stone-700 hover:text-stone-900 underline font-medium cursor-pointer text-[11px]"
                    >
                      지금까지 답변으로 중간 저장 & 결과 확인
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {chapterProgress.map(ch => {
                      const isCurrent = currentQuestion.chapterIndex === ch.index;
                      return (
                        <button
                          key={ch.key}
                          type="button"
                          onClick={() => jumpToChapter(ch.startIndex)}
                          className={`p-2 rounded-lg border text-left transition-all cursor-pointer text-xs ${
                            isCurrent
                              ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs'
                              : ch.isCompleted
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                          }`}
                        >
                          <div className="truncate text-[11px] font-semibold">{ch.shortTitle.split(' ')[1]}</div>
                          <div className={`text-[10px] mt-0.5 ${isCurrent ? 'text-stone-300' : 'text-stone-500'}`}>
                            {ch.answeredCount}/{ch.count}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-stone-800">
                      제{currentQuestion.chapterIndex}장: {currentQuestion.chapterTitle}
                    </span>
                    <span className="text-stone-500 font-mono">
                      문항 {currentQuestion.indexInChapter} / {currentQuestion.totalInChapter}
                      <span className="text-stone-400 mx-1.5">|</span>
                      전체 {currentStep} / {totalQuestions} ({Math.round((currentStep / totalQuestions) * 100)}%)
                    </span>
                  </div>
                  {/* Global Progress Bar */}
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-900 rounded-full transition-all duration-200"
                      style={{ width: `${Math.round((totalAnswered / totalQuestions) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Question Prompt Card with Single-Question Smooth Card Transition */}
                <div
                  key={currentStep}
                  className="bg-stone-50/90 rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-2xs animate-in fade-in slide-in-from-right-4 duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-stone-500">
                      {currentQuestion.categoryLabel}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-xs text-stone-400 font-mono">
                      Q{currentStep} of {totalQuestions}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-stone-900 leading-snug">
                    {currentQuestion.question}
                  </h3>
                  {currentQuestion.detailContext && (
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                      {currentQuestion.detailContext}
                    </p>
                  )}
                </div>

                {/* 5-point Likert Scale Options */}
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {LIKERT_OPTIONS.map(opt => {
                      const isSelected = answers[currentQuestion.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelectAnswer(currentQuestion.id, opt.value)}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-98 ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs ring-1 ring-stone-900'
                              : 'border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50 text-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`w-5 h-5 rounded-full text-xs font-mono flex items-center justify-center ${
                              isSelected ? 'bg-white text-stone-900 font-bold' : 'bg-stone-100 text-stone-600'
                            }`}>
                              {opt.shortLabel}
                            </span>
                            <span className="text-xs font-semibold">{opt.label}</span>
                          </div>
                          <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                            {opt.subtext}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-[11px] text-stone-400 text-center pt-1">
                    💡 키보드 숫자키 <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-[10px] border border-stone-200">1</kbd> ~ <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-[10px] border border-stone-200">5</kbd>를 누르면 즉시 선택됩니다.
                  </div>
                </div>

                {/* Bottom Navigation Toolbar */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs text-stone-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>{currentStep === 1 ? '기본 정보로' : '이전 문항'}</span>
                    </button>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const prevCh = chapters.find(c => c.index === currentQuestion.chapterIndex - 1);
                          if (prevCh) jumpToChapter(prevCh.startIndex);
                        }}
                        disabled={currentQuestion.chapterIndex === 1}
                        className="hidden sm:inline-flex px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs text-stone-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        이전 챕터
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Intermediate save button */}
                    <button
                      type="button"
                      onClick={() => setCurrentStep(totalQuestions + 1)}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>현재 답변으로 완료</span>
                    </button>

                    {currentStep < totalQuestions ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>다음 문항</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(totalQuestions + 1)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>검사 완료 및 결과 확인</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 133: Final Preview & Confirmation Screen */}
            {currentStep > totalQuestions && (() => {
              const preview = calculateResultFromTest();
              return (
                <div className="space-y-5 my-auto max-w-2xl mx-auto w-full py-2">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Sparkles className="w-6 h-6 text-amber-300" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900">
                      6대 성향 입체 프로파일링 분석 완료
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      총 {totalAnswered} / {totalQuestions} 문항의 정밀 5지선답 답변 데이터를 종합 분석하여 도출된 결과입니다.
                    </p>
                  </div>

                  {/* Calculated Persona Preview Card */}
                  <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <div>
                        <div className="text-xs font-semibold text-stone-500">도출된 성향 타이틀</div>
                        <div className="text-base font-bold text-stone-900 mt-0.5">{preview.customTitle}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-stone-500">프로필 대상</div>
                        <div className="text-sm font-bold text-stone-800">{preview.name} ({preview.bloodType}형)</div>
                      </div>
                    </div>

                    {/* 6 Dimension Badges Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <div className="text-[10px] text-stone-400 font-semibold">1. MBTI 유형</div>
                        <div className="text-sm font-bold text-stone-900 mt-0.5">{preview.mbti}</div>
                        <div className="text-[11px] text-stone-500 truncate">{MBTI_INFO[preview.mbti].nameKr}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <div className="text-[10px] text-stone-400 font-semibold">2. 애착 유형</div>
                        <div className="text-sm font-bold text-stone-900 mt-0.5">
                          {ATTACHMENT_INFO[preview.attachment].nameKr}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">{ATTACHMENT_INFO[preview.attachment].summary}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <div className="text-[10px] text-stone-400 font-semibold">3. 크로노타입</div>
                        <div className="text-sm font-bold text-stone-900 mt-0.5">
                          {CHRONOTYPE_INFO[preview.chronotype].nameKr}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">{CHRONOTYPE_INFO[preview.chronotype].summary}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <div className="text-[10px] text-stone-400 font-semibold">4. 스트레스 대처</div>
                        <div className="text-sm font-bold text-stone-900 mt-0.5">
                          {STRESS_INFO[preview.stress].nameKr}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">{STRESS_INFO[preview.stress].summary}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <div className="text-[10px] text-stone-400 font-semibold">5. 4대 원소 기질</div>
                        <div className="text-sm font-bold text-stone-900 mt-0.5">
                          {ELEMENT_INFO[preview.element].nameKr}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">{ELEMENT_INFO[preview.element].summary}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <div className="text-[10px] text-stone-400 font-semibold">6. 혈액형 바이브</div>
                        <div className="text-sm font-bold text-stone-900 mt-0.5">{preview.bloodType}형 소셜 바이브</div>
                        <div className="text-[11px] text-stone-500 truncate">
                          {preview.bloodType === 'A' ? '세심한 배려형' : preview.bloodType === 'B' ? '자유로운 마이웨이' : preview.bloodType === 'O' ? '열정적 리더십' : '다면적 합리주의'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-xs font-semibold text-stone-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>문항 다시 검토하기</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFinishAndSave}
                      className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm active:scale-98 transition-transform"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>내 프로필에 즉시 적용 및 저장</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          /* Direct Fast Preset Picker */
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-600">
              이미 본인의 MBTI와 각 세부 성향을 파악하고 계시다면, 6가지 차원을 직접 선택하여 5초 만에 다면 페르소나를 완성할 수 있습니다.
            </div>

            {/* Name & Blood type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  이름 / 별칭
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs focus:ring-1 focus:ring-stone-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  혈액형
                </label>
                <select
                  value={bloodType}
                  onChange={e => setBloodType(e.target.value as BloodType)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-stone-400 cursor-pointer"
                >
                  <option value="A">A형 (세심한 배려형)</option>
                  <option value="B">B형 (자유로운 마이웨이)</option>
                  <option value="O">O형 (열정적 리더십)</option>
                  <option value="AB">AB형 (다면적 합리주의)</option>
                </select>
              </div>
            </div>

            {/* MBTI Select */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                1. MBTI 유형 (16종)
              </label>
              <select
                value={directMBTI}
                onChange={e => setDirectMBTI(e.target.value as MBTIType)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-stone-400 cursor-pointer font-medium"
              >
                {Object.keys(MBTI_INFO).map(m => (
                  <option key={m} value={m}>
                    {m} - {MBTI_INFO[m as MBTIType].nameKr} ({MBTI_INFO[m as MBTIType].summary})
                  </option>
                ))}
              </select>
            </div>

            {/* Attachment Select */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                2. 애착 유형 (Attachment Style)
              </label>
              <select
                value={directAttachment}
                onChange={e => setDirectAttachment(e.target.value as AttachmentStyle)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-stone-400 cursor-pointer font-medium"
              >
                {Object.keys(ATTACHMENT_INFO).map(a => (
                  <option key={a} value={a}>
                    {ATTACHMENT_INFO[a as AttachmentStyle].nameKr} - {ATTACHMENT_INFO[a as AttachmentStyle].summary}
                  </option>
                ))}
              </select>
            </div>

            {/* Chronotype Select */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                3. 크로노타입 (생체 시계 & 수면 리듬)
              </label>
              <select
                value={directChronotype}
                onChange={e => setDirectChronotype(e.target.value as Chronotype)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-stone-400 cursor-pointer font-medium"
              >
                {Object.keys(CHRONOTYPE_INFO).map(c => (
                  <option key={c} value={c}>
                    {CHRONOTYPE_INFO[c as Chronotype].nameKr} - {CHRONOTYPE_INFO[c as Chronotype].summary}
                  </option>
                ))}
              </select>
            </div>

            {/* Stress Select */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                4. 스트레스 대처 유형 (방어기제 & 힐링)
              </label>
              <select
                value={directStress}
                onChange={e => setDirectStress(e.target.value as StressStyle)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-stone-400 cursor-pointer font-medium"
              >
                {Object.keys(STRESS_INFO).map(s => (
                  <option key={s} value={s}>
                    {STRESS_INFO[s as StressStyle].nameKr} - {STRESS_INFO[s as StressStyle].summary}
                  </option>
                ))}
              </select>
            </div>

            {/* Element Select */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                5. 4대 원소 기질 (Temperament)
              </label>
              <select
                value={directElement}
                onChange={e => setDirectElement(e.target.value as ElementTemperament)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-stone-400 cursor-pointer font-medium"
              >
                {Object.keys(ELEMENT_INFO).map(e => (
                  <option key={e} value={e}>
                    {ELEMENT_INFO[e as ElementTemperament].nameKr} - {ELEMENT_INFO[e as ElementTemperament].summary}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={handleSaveDirect}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-98 transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>페르소나 즉시 저장 및 분석 보기</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
