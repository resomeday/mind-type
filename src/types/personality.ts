export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type BloodType = 'A' | 'B' | 'O' | 'AB';

export type AttachmentStyle =
  | 'secure' // 안정형
  | 'anxious' // 불안형 (몰입형)
  | 'avoidant' // 회피형 (거부형)
  | 'fearful'; // 공포회피형 (혼란형)

export type Chronotype =
  | 'lion' // 사자형 (얼리버드, 오전 최적화)
  | 'bear' // 곰형 (태양 주기형, 대중적 리듬)
  | 'wolf' // 늑대형 (야행성, 심야 집중형)
  | 'dolphin'; // 돌고래형 (예민형, 얕은 수면/새벽 영감)

export type StressStyle =
  | 'cave' // 동굴잠수형 (단절과 혼자만의 침묵)
  | 'talk' // 폭풍수다형 (감정 토로와 공감 요청)
  | 'action' // 행동폭주형 (운동, 쇼핑, 청소, 몸 움직이기)
  | 'logic'; // 이성분석형 (원인 규명과 논리적 해결책 집착)

export type ElementTemperament =
  | 'fire' // 불 (열정, 직관, 추진력, 다혈질)
  | 'water' // 물 (감수성, 공감, 적응, 유연함)
  | 'earth' // 흙 (현실감, 신중, 안정, 끈기)
  | 'air'; // 바람 (지성, 호기심, 유희, 객관성)

export interface UserPersona {
  id: string;
  name: string;
  mbti: MBTIType;
  bloodType: BloodType;
  attachment: AttachmentStyle;
  chronotype: Chronotype;
  stress: StressStyle;
  element: ElementTemperament;
  gender?: 'female' | 'male' | 'none';
  customTitle?: string;
  createdAt?: string;
}

export interface DimensionInfo<T extends string> {
  id: T;
  nameKr: string;
  nameEn: string;
  badge: string;
  symbol: string;
  color: string;
  bgColor: string;
  summary: string;
  detailedDesc: string;
  keyTraits: string[];
  relationshipStrength: string;
  relationshipCaution: string;
}

export interface CompatibilityReport {
  overallScore: number;
  romanceScore: number;
  friendshipScore: number;
  teamworkScore: number;
  lifestyleScore: number;
  headline: string;
  tagline: string;
  synergies: string[];
  frictionPoints: string[];
  conflictResolutionGuide: string;
  communicationDos: string[];
  communicationDonts: string[];
  recommendedDatesOrHangouts: string[];
  workCollaborationTips: string[];
  dimensionBreakdown: {
    mbtiChem: { score: number; label: string; text: string };
    bloodChem: { score: number; label: string; text: string };
    attachmentChem: { score: number; label: string; text: string };
    chronoChem: { score: number; label: string; text: string };
    stressChem: { score: number; label: string; text: string };
    elementChem: { score: number; label: string; text: string };
  };
}

export interface BestMatchRecommendation {
  type: 'romance' | 'friendship' | 'teamwork' | 'growth';
  categoryTitle: string;
  matchPersona: Partial<UserPersona> & {
    title: string;
    description: string;
    whyBest: string;
    matchScore: number;
  };
}

export interface GroupRoom {
  id: string;
  name: string;
  createdAt: string;
  creatorName: string;
  description?: string;
  members: UserPersona[];
}

export type IncomingActionType =
  | '1on1' // 1:1 friend test invitation
  | 'group' // Group chemistry room invitation
  | 'card_received' // Friend shared their personality card
  | 'request_card' // Friend requested user to share card
  | 'compat_view'; // Simultaneous mutual compatibility view link

export interface InvitePayload {
  type: IncomingActionType;
  inviter: UserPersona;
  partner?: UserPersona;
  roomId?: string;
  roomName?: string;
  members?: UserPersona[];
}

