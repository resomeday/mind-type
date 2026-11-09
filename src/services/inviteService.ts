import { UserPersona, GroupRoom, InvitePayload, MBTIType, BloodType, AttachmentStyle, Chronotype, StressStyle, ElementTemperament } from '../types/personality';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  ELEMENT_INFO,
  STRESS_INFO,
  generatePersonaTitle
} from '../data/personalityData';

/**
 * UTF-8 safe base64 encoding
 */
function toBase64(str: string): string {
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch {
    return btoa(str);
  }
}

/**
 * UTF-8 safe base64 decoding
 */
function fromBase64(str: string): string {
  try {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c: string) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch {
    return atob(str);
  }
}

/**
 * Extracts a minimal representation of a persona to reduce URL length
 */
function toMinimalPersona(p: UserPersona) {
  return {
    id: p.id,
    name: p.name,
    mbti: p.mbti,
    bloodType: p.bloodType,
    attachment: p.attachment,
    chronotype: p.chronotype,
    stress: p.stress,
    element: p.element,
    customTitle: p.customTitle,
    gender: p.gender
  };
}

/**
 * Creates a shareable 1:1 chemistry invite URL (invites friend to take test)
 */
export function create1on1InviteUrl(inviter: UserPersona): string {
  const encoded = toBase64(JSON.stringify(toMinimalPersona(inviter)));
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?invite=${encodeURIComponent(encoded)}`;
}

/**
 * Creates a shareable Personality Card URL (direct card share)
 */
export function createCardShareUrl(user: UserPersona): string {
  const encoded = toBase64(JSON.stringify(toMinimalPersona(user)));
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?card=${encodeURIComponent(encoded)}`;
}

/**
 * Creates a URL asking a friend to share their card
 */
export function createCardRequestUrl(requester: UserPersona): string {
  const encoded = toBase64(JSON.stringify({
    requester: toMinimalPersona(requester),
    requestedAt: Date.now()
  }));
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?request_card=${encodeURIComponent(encoded)}`;
}

/**
 * Creates a URL for simultaneous dual viewing of 1:1 compatibility
 */
export function createMutualCompatUrl(user1: UserPersona, user2: UserPersona): string {
  const payload = {
    u1: toMinimalPersona(user1),
    u2: toMinimalPersona(user2),
    sharedAt: Date.now()
  };
  const encoded = toBase64(JSON.stringify(payload));
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?compat=${encodeURIComponent(encoded)}`;
}

/**
 * Creates a shareable Group Chemistry Room invite URL
 */
export function createGroupInviteUrl(room: GroupRoom): string {
  const minimalMembers = room.members.map(m => toMinimalPersona(m));
  const payload = {
    id: room.id,
    name: room.name,
    creatorName: room.creatorName,
    members: minimalMembers
  };

  const encoded = toBase64(JSON.stringify(payload));
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?room=${encodeURIComponent(encoded)}`;
}

/**
 * Robustly parses a friend's card from a pasted URL or raw encoded string
 */
export function parseCardFromCodeOrUrl(input: string): UserPersona | null {
  if (!input || !input.trim()) return null;
  const raw = input.trim();

  try {
    // 1. Try URL parsing if it looks like a URL
    if (raw.includes('?')) {
      const urlPart = raw.split('?')[1] || '';
      const params = new URLSearchParams(urlPart);
      const encoded = params.get('card') || params.get('invite') || params.get('request_card');
      if (encoded) {
        const decoded = JSON.parse(fromBase64(decodeURIComponent(encoded)));
        const target = decoded.requester || decoded;
        if (target && target.name && target.mbti) {
          return sanitizeToPersona(target);
        }
      }
    }

    // 2. Try raw base64 decoding
    try {
      const decodedJson = fromBase64(raw);
      const parsed = JSON.parse(decodedJson);
      const target = parsed.requester || parsed;
      if (target && target.name && target.mbti) {
        return sanitizeToPersona(target);
      }
    } catch {}

    // 3. Try direct JSON parsing
    try {
      const parsed = JSON.parse(raw);
      const target = parsed.requester || parsed;
      if (target && target.name && target.mbti) {
        return sanitizeToPersona(target);
      }
    } catch {}
  } catch (err) {
    console.warn('Failed to parse card from string:', err);
  }

  return null;
}

function sanitizeToPersona(data: any): UserPersona {
  return {
    id: data.id || `friend-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: data.name || '친구',
    mbti: (data.mbti in MBTI_INFO ? data.mbti : 'ENFP') as MBTIType,
    bloodType: (['A', 'B', 'O', 'AB'].includes(data.bloodType) ? data.bloodType : 'A') as BloodType,
    attachment: (data.attachment in ATTACHMENT_INFO ? data.attachment : 'secure') as AttachmentStyle,
    chronotype: (data.chronotype in CHRONOTYPE_INFO ? data.chronotype : 'bear') as Chronotype,
    stress: (data.stress in STRESS_INFO ? data.stress : 'talk') as StressStyle,
    element: (data.element in ELEMENT_INFO ? data.element : 'fire') as ElementTemperament,
    gender: data.gender || 'none',
    customTitle: data.customTitle || generatePersonaTitle(data)
  };
}

/**
 * Parses query params from current URL to check for invites, shared cards, card requests, or mutual compat
 */
export function parseInviteFromUrl(): InvitePayload | null {
  try {
    const params = new URLSearchParams(window.location.search);

    // 1. Mutual Compatibility View (?compat=...)
    const compatParam = params.get('compat');
    if (compatParam) {
      const decodedJson = fromBase64(decodeURIComponent(compatParam));
      const parsed = JSON.parse(decodedJson);
      if (parsed && parsed.u1 && parsed.u2) {
        return {
          type: 'compat_view',
          inviter: sanitizeToPersona(parsed.u1),
          partner: sanitizeToPersona(parsed.u2)
        };
      }
    }

    // 2. Direct Card Received (?card=...)
    const cardParam = params.get('card');
    if (cardParam) {
      const decodedJson = fromBase64(decodeURIComponent(cardParam));
      const parsed = JSON.parse(decodedJson);
      if (parsed && parsed.name && parsed.mbti) {
        return {
          type: 'card_received',
          inviter: sanitizeToPersona(parsed)
        };
      }
    }

    // 3. Card Share Request (?request_card=...)
    const reqParam = params.get('request_card');
    if (reqParam) {
      const decodedJson = fromBase64(decodeURIComponent(reqParam));
      const parsed = JSON.parse(decodedJson);
      const requester = parsed.requester || parsed;
      if (requester && requester.name) {
        return {
          type: 'request_card',
          inviter: sanitizeToPersona(requester)
        };
      }
    }

    // 4. 1:1 Invite (?invite=...)
    const inviteParam = params.get('invite');
    if (inviteParam) {
      const decodedJson = fromBase64(decodeURIComponent(inviteParam));
      const parsed = JSON.parse(decodedJson);
      if (parsed && parsed.name && parsed.mbti) {
        return {
          type: '1on1',
          inviter: sanitizeToPersona(parsed)
        };
      }
    }

    // 5. Group Room Invite (?room=...)
    const roomParam = params.get('room');
    if (roomParam) {
      const decodedJson = fromBase64(decodeURIComponent(roomParam));
      const parsed = JSON.parse(decodedJson);
      if (parsed && parsed.name && Array.isArray(parsed.members)) {
        return {
          type: 'group',
          inviter: sanitizeToPersona(parsed.members[0] || {
            id: 'creator',
            name: parsed.creatorName || '방장',
            mbti: 'ENFP',
            bloodType: 'B',
            attachment: 'secure',
            chronotype: 'bear',
            stress: 'talk',
            element: 'fire'
          }),
          roomId: parsed.id,
          roomName: parsed.name,
          members: (parsed.members as any[]).map(sanitizeToPersona)
        };
      }
    }
  } catch (err) {
    console.warn('Failed to parse invitation parameter from URL:', err);
  }

  return null;
}

/**
 * Generates ready-to-copy Korean invitation message for 1:1 friend test
 */
export function generate1on1InviteText(inviter: UserPersona, inviteUrl: string): string {
  const mbti = MBTI_INFO[inviter.mbti];
  const blood = BLOOD_INFO[inviter.bloodType];
  const chrono = CHRONOTYPE_INFO[inviter.chronotype];
  const elem = ELEMENT_INFO[inviter.element];

  return `💌 [${inviter.name}]님이 보낸 6차원 성향 심리테스트 & 1:1 궁합 초대장!

"나의 MBTI(${inviter.mbti} ${mbti.nameKr}), 혈액형(${blood.symbol} ${inviter.bloodType}형), 생체시계(${chrono.symbol} ${chrono.badge}), 4기질(${elem.symbol} ${elem.badge}) 진단 결과야!

너도 6차원 성향 심리테스트를 풀고, 우리 둘만의 소울메이트 궁합 점수와 1:1 관계 분석 리포트를 확인해봐!"

👉 1:1 궁합 확인 링크:
${inviteUrl}`;
}

/**
 * Generates ready-to-copy Korean message for sharing personality card
 */
export function generateCardShareText(user: UserPersona, cardUrl: string): string {
  const mbti = MBTI_INFO[user.mbti];
  const blood = BLOOD_INFO[user.bloodType];
  const elem = ELEMENT_INFO[user.element];

  return `📇 [${user.name}]님의 6차원 성격 카드 도착!

✨ "${user.customTitle}"
🧬 MBTI: ${user.mbti} (${mbti.nameKr}) · ${user.bloodType}형 · ${elem.badge}

링크를 누르면 내 성격 카드를 친구 앱에 바로 저장하고, 우리 둘의 1:1 궁합과 케미 점수를 즉시 확인할 수 있어!

👉 친구 성격 카드 저장 & 1:1 궁합 보기:
${cardUrl}`;
}

/**
 * Generates ready-to-copy message requesting a friend to share their card
 */
export function generateCardRequestText(requester: UserPersona, requestUrl: string): string {
  return `📢 [${requester.name}]님의 성격 카드 공유 요청!

"친구야, 너의 6차원 성격 카드를 나한테 공유해줘! 
우리의 MBTI, 생체시계, 애착유형, 스트레스 케미 점수를 맞춰보고 1:1 궁합 리포트를 같이 확인하자!"

👉 1분 성향 진단하고 ${requester.name}님에게 카드 공유하기:
${requestUrl}`;
}

/**
 * Generates ready-to-copy message for simultaneous dual compatibility view
 */
export function generateMutualCompatText(
  u1: UserPersona,
  u2: UserPersona,
  score: number,
  compatUrl: string
): string {
  return `💞 [${u1.name} & ${u2.name}] 1:1 성향 케미 궁합 결과!

🏆 종합 케미 점수: ${score}점
👤 ${u1.name}: ${u1.mbti} · ${u1.bloodType}형 · ${u1.customTitle}
👤 ${u2.name}: ${u2.mbti} · ${u2.bloodType}형 · ${u2.customTitle}

"우리의 상호 보완 시너지와 대화 화법, 둘만의 관계 솔루션을 함께 확인해보세요!"

👉 우리 둘의 1:1 궁합 동시 확인 링크:
${compatUrl}`;
}

/**
 * Generates ready-to-copy Korean invitation message for multi-person group room
 */
export function generateGroupInviteText(room: GroupRoom, inviteUrl: string): string {
  const memberCount = room.members.length;
  const names = room.members.map(m => m.name).slice(0, 4).join(', ');
  const more = memberCount > 4 ? ` 외 ${memberCount - 4}명` : '';

  return `👥 [${room.name}] 6차원 모임 케미 룸에 초대합니다!

현재 참여자: ${names}${more} (총 ${memberCount}명)

"각자의 성향(MBTI, 애착, 생체시계, 스트레스, 기질론)을 등록하면
우리 모임의 팀 컬러, 최적의 만남 시간대, 모임 내 최고 찰떡 콤비 분석을 한눈에 볼 수 있어!"

👉 단체 케미 룸 참여하기:
${inviteUrl}`;
}
