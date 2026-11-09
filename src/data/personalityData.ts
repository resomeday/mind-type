import {
  MBTIType,
  BloodType,
  AttachmentStyle,
  Chronotype,
  StressStyle,
  ElementTemperament,
  DimensionInfo,
  UserPersona
} from '../types/personality';

export const MBTI_INFO: Record<MBTIType, DimensionInfo<MBTIType>> = {
  INTJ: {
    id: 'INTJ',
    nameKr: '용의주도한 전략가',
    nameEn: 'Architect',
    badge: 'INTJ',
    symbol: '♟️',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    summary: '깊은 통찰력과 치밀한 계획으로 미래를 설계하는 분석가',
    detailedDesc: '전략적 사고와 독립성이 매우 뛰어납니다. 겉으로는 차가워 보이지만 소수의 깊은 유대를 소중히 여기며 지적인 대화를 갈망합니다.',
    keyTraits: ['논리적 통찰', '철저한 계획', '높은 독립성', '지적 호기심'],
    relationshipStrength: '약속을 엄격히 지키며, 장기적이고 안정적인 해결책을 제시해 줍니다.',
    relationshipCaution: '감정적 위로보다는 해결책을 먼저 던져 차갑다는 오해를 살 수 있습니다.'
  },
  INTP: {
    id: 'INTP',
    nameKr: '논리적인 사색가',
    nameEn: 'Logician',
    badge: 'INTP',
    symbol: '🔬',
    color: '#6366f1',
    bgColor: '#eef2ff',
    summary: '지적 탐구와 창의적 발상을 즐기는 아이디어 설계자',
    detailedDesc: '틀에 얽매이지 않고 원리를 파고드는 것을 즐깁니다. 혼자만의 사색 공간이 필수적이며 지적 호기심을 공유할 상대를 선호합니다.',
    keyTraits: ['자유로운 발상', '원리 탐구', '솔직함', '사색의 깊이'],
    relationshipStrength: '선입견 없이 상대방의 독창성을 인정하고 지적 자극을 줍니다.',
    relationshipCaution: '감정 표현이 서툴고 답장이 늦거나 연락이 두절될 때가 있습니다.'
  },
  ENTJ: {
    id: 'ENTJ',
    nameKr: '대담한 통솔자',
    nameEn: 'Commander',
    badge: 'ENTJ',
    symbol: '👑',
    color: '#7c3aed',
    bgColor: '#faf5ff',
    summary: '비전을 실현하고 사람들을 이끄는 추진력의 리더',
    detailedDesc: '명확한 목표 의식과 결단력으로 장애물을 돌파합니다. 함께 성장하고 발전하는 상호 존중의 관계를 가장 중요시합니다.',
    keyTraits: ['강력한 추진력', '전략적 리더십', '솔직 담백', '성장 지향'],
    relationshipStrength: '상대방의 잠재력을 끌어올려 주고 든든하게 길을 열어줍니다.',
    relationshipCaution: '효율성을 지나치게 따지거나 통제하려 해 상대가 압박감을 느낄 수 있습니다.'
  },
  ENTP: {
    id: 'ENTP',
    nameKr: '뜨거운 논쟁가',
    nameEn: 'Debater',
    badge: 'ENTP',
    symbol: '⚡',
    color: '#a855f7',
    bgColor: '#faf5ff',
    summary: '끝없는 호기심과 유쾌한 지적 티키타카를 즐기는 혁신가',
    detailedDesc: '새로운 시각을 제시하고 재치 넘치는 대화를 이끕니다. 지루한 일상을 깨부수는 신선한 에너지를 전파합니다.',
    keyTraits: ['순발력과 재치', '유쾌한 도발', '지적 유연성', '다재다능'],
    relationshipStrength: '결코 지루할 틈이 없으며, 새로운 세계와 관점을 선물합니다.',
    relationshipCaution: '가벼운 말장난이나 장난스러운 반론이 상처가 될 수 있습니다.'
  },
  INFJ: {
    id: 'INFJ',
    nameKr: '선의의 옹호자',
    nameEn: 'Advocate',
    badge: 'INFJ',
    symbol: '🔮',
    color: '#10b981',
    bgColor: '#ecfdf5',
    summary: '깊은 통찰과 따뜻한 공감으로 사람의 마음을 어루만지는 조력자',
    detailedDesc: '사람의 숨겨진 동기와 감정을 놀랍도록 예리하게 감지합니다. 진정성과 도덕적 신념을 공유하는 영혼의 동반자를 꿈꿉니다.',
    keyTraits: ['직관적 공감', '진정성 추구', '도덕적 신념', '조용한 헌신'],
    relationshipStrength: '말하지 않아도 마음을 읽어주며, 깊은 안식처가 되어 줍니다.',
    relationshipCaution: '상처를 안으로 삭히다가 어느 날 갑자기 단절(도어슬램)할 수 있습니다.'
  },
  INFP: {
    id: 'INFP',
    nameKr: '열정적인 중재자',
    nameEn: 'Mediator',
    badge: 'INFP',
    symbol: '🌿',
    color: '#059669',
    bgColor: '#ecfdf5',
    summary: '자신만의 깊은 내면 세계와 낭만을 품은 감성 예술가',
    detailedDesc: '순수함과 따뜻한 이상을 간직하고 있습니다. 상대방의 작은 감정 변화에도 깊이 공감하며 배려심이 넘칩니다.',
    keyTraits: ['풍부한 상상력', '따뜻한 감수성', '진솔한 배려', '낭만주의'],
    relationshipStrength: '상대방의 고유한 개성과 아픔을 편견 없이 온전히 품어줍니다.',
    relationshipCaution: '작은 비판에도 깊은 자책이나 회피로 숨어버릴 수 있습니다.'
  },
  ENFJ: {
    id: 'ENFJ',
    nameKr: '정의로운 주인공',
    nameEn: 'Protagonist',
    badge: 'ENFJ',
    symbol: '☀️',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    summary: '모두를 빛나게 만드는 따뜻한 카리스마와 배려의 리더',
    detailedDesc: '주변 사람들의 성장을 진심으로 응원하고 격려합니다. 타인의 행복을 자신의 행복으로 느끼는 다정다감한 성향입니다.',
    keyTraits: ['포용적 리더십', '탁월한 소통', '이타주의', '열정적 응원'],
    relationshipStrength: '상대방을 세상에서 가장 소중한 사람으로 느끼게 만들어 줍니다.',
    relationshipCaution: '남을 챙기느라 정작 자신을 돌보지 못해 번아웃이 올 수 있습니다.'
  },
  ENFP: {
    id: 'ENFP',
    nameKr: '재기발랄한 활동가',
    nameEn: 'Campaigner',
    badge: 'ENFP',
    symbol: '✨',
    color: '#22c55e',
    bgColor: '#f0fdf4',
    summary: '자유로운 영혼과 풍부한 에너지로 사람을 잇는 활력소',
    detailedDesc: '새로운 사람, 새로운 아이디어에 언제나 가슴이 뜁니다. 따스한 공감과 넘치는 영감으로 주변 분위기를 환하게 밝힙니다.',
    keyTraits: ['창의적 에너지', '풍부한 공감', '즉흥적 자유', '사람 중심'],
    relationshipStrength: '상대방의 가능성을 무조건 믿어주고 삶에 기쁨과 웃음을 불어넣습니다.',
    relationshipCaution: '감정 기복이 있거나 세부적인 일상 계획을 지키는 데 어려움이 있습니다.'
  },
  ISTJ: {
    id: 'ISTJ',
    nameKr: '청렴결백한 논리주의자',
    nameEn: 'Logistician',
    badge: 'ISTJ',
    symbol: '📋',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    summary: '흔들림 없는 성실함과 신뢰로 일상을 지탱하는 수호자',
    detailedDesc: '약속과 책임을 목숨처럼 여깁니다. 묵묵히 행동으로 사랑과 신의를 보여주는 가장 든든한 현실적 버팀목입니다.',
    keyTraits: ['철저한 책임감', '정확성과 규칙', '일관된 신의', '현실적 조언'],
    relationshipStrength: '언제나 곁을 든든하게 지켜주며 결코 거짓이나 배신이 없습니다.',
    relationshipCaution: '변화에 보수적이며 감정적인 위로의 언어 표현이 다소 서툽니다.'
  },
  ISFJ: {
    id: 'ISFJ',
    nameKr: '용감한 수호자',
    nameEn: 'Defender',
    badge: 'ISFJ',
    symbol: '🛡️',
    color: '#0ea5e9',
    bgColor: '#f0f9ff',
    summary: '세심한 관찰과 헌신으로 곁을 묵묵히 보살피는 힐러',
    detailedDesc: '상대방의 취향, 기념일, 사소한 습관까지 기억하고 챙깁니다. 조용하지만 가장 깊은 온기를 지닌 수호천사입니다.',
    keyTraits: ['세심한 기억력', '희생과 배려', '신중한 태도', '따뜻한 일상'],
    relationshipStrength: '일상의 모든 순간에서 안정감과 극진한 보살핌을 느낄 수 있습니다.',
    relationshipCaution: '거절을 잘 못해 홀로 속앓이를 하거나 서운함을 쌓아둘 수 있습니다.'
  },
  ESTJ: {
    id: 'ESTJ',
    nameKr: '엄격한 관리자',
    nameEn: 'Executive',
    badge: 'ESTJ',
    symbol: '🏛️',
    color: '#2563eb',
    bgColor: '#eff6ff',
    summary: '명확한 체계와 실행력으로 문제를 깔끔하게 해결하는 조율자',
    detailedDesc: '약속과 시간 엄수를 기본으로 하며, 효율적인 환경을 만들어냅니다. 현실적이고 명확한 가이드라인을 제공합니다.',
    keyTraits: ['명확한 체계', '실행 중심', '직설적 솔직함', '강한 책임감'],
    relationshipStrength: '어떤 현실적인 위기나 복잡한 행정/계획 문제도 깔끔히 해결해 줍니다.',
    relationshipCaution: '말투가 명령조로 느껴지거나 상대의 감정보다 규칙을 앞세울 수 있습니다.'
  },
  ESFJ: {
    id: 'ESFJ',
    nameKr: '사교적인 외교관',
    nameEn: 'Consul',
    badge: 'ESFJ',
    symbol: '💐',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    summary: '모두를 아우르는 친절과 넘치는 센스로 화합을 만드는 마당발',
    detailedDesc: '사람들을 연결하고 조화로운 분위기를 만드는 데 천부적인 재능이 있습니다. 인정과 칭찬을 나눌 때 가장 빛납니다.',
    keyTraits: ['뛰어난 친화력', '세심한 센스', '조화와 배려', '따뜻한 리액션'],
    relationshipStrength: '누구와도 금방 친해지며, 기념일과 이벤트를 정성껏 챙겨줍니다.',
    relationshipCaution: '타인의 시선이나 인정에 예민하여 작은 냉담함에도 큰 상처를 받습니다.'
  },
  ISTP: {
    id: 'ISTP',
    nameKr: '만능 재주꾼',
    nameEn: 'Virtuoso',
    badge: 'ISTP',
    symbol: '🛠️',
    color: '#d97706',
    bgColor: '#fffbeb',
    summary: '상황을 즉각 파악하고 군더더기 없이 문제를 해결하는 쿨가이',
    detailedDesc: '자율성과 개인 공간을 무엇보다 중요시합니다. 말은 적지만 결정적인 순간에 묵묵히 문제를 해결해 주는 실전파입니다.',
    keyTraits: ['순발력', '개인주의', '실용적 문제해결', '담백한 매력'],
    relationshipStrength: '집착이나 구속 없이 담백하고 쿨한 자유로운 관계를 보장합니다.',
    relationshipCaution: '감정 표현이나 애정 확인 질문에 귀찮아하거나 침묵할 수 있습니다.'
  },
  ISFP: {
    id: 'ISFP',
    nameKr: '호기심 많은 예술가',
    nameEn: 'Adventurer',
    badge: 'ISFP',
    symbol: '🎨',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    summary: '현재의 감각과 순간의 아름다움을 온전히 음미하는 온화한 영혼',
    detailedDesc: '따스하고 겸손하며 타인에게 자신의 방식을 강요하지 않습니다. 편안하고 자연스러운 일상의 소소한 행복을 사랑합니다.',
    keyTraits: ['온화한 성품', '미적 감각', '열린 마음', '현재 중심'],
    relationshipStrength: '상대방을 있는 그대로 인정하며 어떤 강요도 없이 편안함을 선물합니다.',
    relationshipCaution: '갈등 상황을 피하려 대화를 회피하거나 결정을 미루는 경향이 있습니다.'
  },
  ESTP: {
    id: 'ESTP',
    nameKr: '모험을 즐기는 사업가',
    nameEn: 'Entrepreneur',
    badge: 'ESTP',
    symbol: '🏎️',
    color: '#ea580c',
    bgColor: '#fff7ed',
    summary: '두려움 없는 에너지와 직관으로 기회를 포착하는 행동파',
    detailedDesc: '넘치는 에너지와 거침없는 결단력으로 순간을 즐깁니다. 유머 감각과 실전 적응력이 매우 뛰어나 분위기를 압도합니다.',
    keyTraits: ['활동적 에너지', '거침없는 행동력', '사교적 유머', '위기 대처'],
    relationshipStrength: '지루할 틈 없는 신나는 모험과 화끈하고 솔직한 소통을 이끕니다.',
    relationshipCaution: '충동적인 결정이나 깊은 진지함을 회피하는 태도로 상대를 불안하게 할 수 있습니다.'
  },
  ESFP: {
    id: 'ESFP',
    nameKr: '자유로운 영혼의 연예인',
    nameEn: 'Entertainer',
    badge: 'ESFP',
    symbol: '🎉',
    color: '#f97316',
    bgColor: '#fff7ed',
    summary: '주변을 웃음과 온기로 물들이는 즉흥과 매력의 분위기 메이커',
    detailedDesc: '사람들과 어울려 즐거운 추억을 만드는 것을 삶의 낙으로 삼습니다. 솔직하고 사랑스러운 표현으로 마음을 사로잡습니다.',
    keyTraits: ['밝고 긍정적', '뛰어난 사교성', '즉흥적 즐거움', '감정 표현 풍부'],
    relationshipStrength: '어떤 우울한 날도 웃음바다로 바꿔주는 최고의 힐링 비타민입니다.',
    relationshipCaution: '진지한 장기 계획이나 갈등 직면을 어려워해 문제를 회피할 수 있습니다.'
  }
};

export const BLOOD_INFO: Record<BloodType, DimensionInfo<BloodType>> = {
  A: {
    id: 'A',
    nameKr: 'A형 (세심한 배려가)',
    nameEn: 'Considerate Guardian',
    badge: 'Type A',
    symbol: '🩸A',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    summary: '상대를 먼저 살피는 섬세한 배려심과 높은 책임감',
    detailedDesc: '타인의 기분과 상황을 세심하게 관찰하고 조화를 중시합니다. 약속을 소중히 여기며, 속마음을 쉽게 드러내지 않지만 한번 신뢰를 주면 끝까지 의리를 지킵니다.',
    keyTraits: ['세심한 배려', '신중한 조화', '철저한 신의', '속 깊은 정'],
    relationshipStrength: '상대방이 말하지 않아도 필요한 것을 미리 챙겨주는 사려 깊음이 돋보입니다.',
    relationshipCaution: '서운함을 직접 말하지 않고 끙끙 앓다가 마음의 문을 닫을 수 있습니다.'
  },
  B: {
    id: 'B',
    nameKr: 'B형 (자유로운 마이웨이)',
    nameEn: 'Passionate Free Spirit',
    badge: 'Type B',
    symbol: '🩸B',
    color: '#ec4899',
    bgColor: '#fdf2f8',
    summary: '틀에 얽매이지 않는 솔직함과 독창적인 에너지',
    detailedDesc: '자신만의 세계와 취향이 뚜렷하며 호기심이 왕성합니다. 뒤끝 없이 담백하고 시원시원한 성격으로 직관적인 교감을 선호합니다.',
    keyTraits: ['개성과 독창성', '뒤끝 없는 쿨함', '열정적 몰입', '솔직한 감정'],
    relationshipStrength: '가식 없는 솔직한 소통과 언제나 신선한 아이디어로 관계에 활력을 줍니다.',
    relationshipCaution: '구속이나 잔소리를 질색하며 기분에 따라 즉흥성이 커질 수 있습니다.'
  },
  O: {
    id: 'O',
    nameKr: 'O형 (열정적인 리더십)',
    nameEn: 'Charismatic Leader',
    badge: 'Type O',
    symbol: '🩸O',
    color: '#eab308',
    bgColor: '#fefce8',
    summary: '친화력 넘치는 털털함과 내 사람을 챙기는 의리파',
    detailedDesc: '모임의 중심에서 분위기를 띄우고 사람들을 하나로 모으는 포용력이 있습니다. 목표가 생기면 저돌적으로 뛰어들며 자존감이 높습니다.',
    keyTraits: ['넘치는 친화력', '의리와 포용', '적극적 행동력', '솔직 담백'],
    relationshipStrength: '내 사람이다 싶으면 아낌없이 베풀고 든든한 바람막이가 되어 줍니다.',
    relationshipCaution: '승부욕이 강해 자존심 싸움으로 번지거나 직설적인 말투로 상처를 줄 수 있습니다.'
  },
  AB: {
    id: 'AB',
    nameKr: 'AB형 (다면적 합리주의)',
    nameEn: 'Analytical Pragmatist',
    badge: 'Type AB',
    symbol: '🩸AB',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    summary: '냉철한 이성과 예술적 감수성이 공존하는 매력적인 관찰자',
    detailedDesc: '상황을 한 발짝 물러서서 객관적으로 분석하면서도 독특한 감성을 지니고 있습니다. 사생활과 개인 영역을 철저히 존중받길 원합니다.',
    keyTraits: ['객관적 분석', '유니크한 감각', '독립적 영역', '합리적 소통'],
    relationshipStrength: '감정적인 소모전 없이 깔끔하고 군더더기 없는 성숙한 대화가 가능합니다.',
    relationshipCaution: '선 긋기가 뚜렷하여 상대방이 거리감을 느끼거나 속을 알 수 없다고 느낄 수 있습니다.'
  }
};

export const ATTACHMENT_INFO: Record<AttachmentStyle, DimensionInfo<AttachmentStyle>> = {
  secure: {
    id: 'secure',
    nameKr: '안정형 (Secure)',
    nameEn: 'Secure Attachment',
    badge: '안정형',
    symbol: '⚓',
    color: '#10b981',
    bgColor: '#ecfdf5',
    summary: '자신과 타인을 신뢰하며 건강한 경계와 친밀감을 유지하는 유형',
    detailedDesc: '자신의 감정을 솔직하게 표현하고 상대의 독립성을 존중합니다. 갈등이 생겨도 방어적이거나 공격적으로 반응하지 않고 대화로 풀어나갑니다.',
    keyTraits: ['정서적 안정감', '솔직한 감정표현', '건강한 경계', '신뢰 기반 소통'],
    relationshipStrength: '어떤 파트너를 만나도 불안이나 회피를 가라앉히는 든든한 안식처 역할을 합니다.',
    relationshipCaution: '지나치게 일방적으로 배려하다 상대방의 미성숙한 회피/불안을 과도하게 수용할 수 있습니다.'
  },
  anxious: {
    id: 'anxious',
    nameKr: '불안형 / 몰입형 (Anxious)',
    nameEn: 'Anxious Attachment',
    badge: '불안형',
    symbol: '💓',
    color: '#f43f5e',
    bgColor: '#fff1f2',
    summary: '상대방과의 깊은 일체감을 갈망하며 애정 확인에 민감한 유형',
    detailedDesc: '연락 빈도나 사소한 어조 변화에도 상대의 감정 변화를 예민하게 감지합니다. 사랑하는 사람에게 온 마음을 쏟는 헌신적인 사랑꾼입니다.',
    keyTraits: ['풍부한 애정', '높은 공감 레이더', '친밀감 갈망', '열정적 헌신'],
    relationshipStrength: '상대방을 향한 애정 표현이 무척 풍부하며 언제나 1순위로 여깁니다.',
    relationshipCaution: '상대의 답장이 늦거나 혼자만의 시간을 가질 때 버림받을지 모른다는 극심한 불안을 느낍니다.'
  },
  avoidant: {
    id: 'avoidant',
    nameKr: '회피형 / 거부형 (Avoidant)',
    nameEn: 'Avoidant Attachment',
    badge: '회피형',
    symbol: '🛡️',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    summary: '스스로를 지키는 독립성이 최우선이며 감정적 구속을 경계하는 유형',
    detailedDesc: '타인에게 의존하는 것을 불편해하며 스스로 문제를 해결하려 합니다. 관계가 너무 가까워지면 숨이 막히는 느낌을 받아 한 발짝 뒤로 물러납니다.',
    keyTraits: ['높은 자립심', '감정 조절 능력', '개인 공간 중시', '냉철한 판단'],
    relationshipStrength: '과도한 집착이나 감정 기복 없이 독립적이고 안정된 자아를 유지합니다.',
    relationshipCaution: '갈등이나 깊은 감정적 요구에 직면하면 대화를 닫고 동굴 속으로 숨어버립니다.'
  },
  fearful: {
    id: 'fearful',
    nameKr: '공포회피형 / 혼란형 (Fearful-Avoidant)',
    nameEn: 'Fearful-Avoidant Attachment',
    badge: '공포회피형',
    symbol: '🌪️',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    summary: '친밀감을 간절히 원하면서도 상처받을까 두려워 밀어내는 복합 유형',
    detailedDesc: '마음속으로는 깊은 사랑을 열망하지만, 가까워질수록 상대가 나를 떠날까 두려워 방어기제가 작동합니다. 다가왔다가도 물러서는 복잡한 심리를 지닙니다.',
    keyTraits: ['깊은 감수성', '강한 보호본능', '다면적 심리', '진정한 이해 갈망'],
    relationshipStrength: '마음의 문을 온전히 연 단 한 사람에게는 그 누구보다 깊은 헌신과 유대를 바칩니다.',
    relationshipCaution: '밀당하려는 의도가 없음에도 상대방을 혼란스럽게 만드는 밀어내기를 할 수 있습니다.'
  }
};

export const CHRONOTYPE_INFO: Record<Chronotype, DimensionInfo<Chronotype>> = {
  lion: {
    id: 'lion',
    nameKr: '사자형 (Lion / 얼리버드)',
    nameEn: 'Lion Chronotype',
    badge: '사자형',
    symbol: '🦁',
    color: '#ea580c',
    bgColor: '#fff7ed',
    summary: '새벽을 깨우는 활력과 오전 골든타임을 장악하는 계획형 리더',
    detailedDesc: '아침 5~6시에 눈이 번쩍 뜨이며 오전 시간에 집중력과 판단력이 최고조에 달합니다. 계획적이고 목표 지향적인 생활 루틴을 즐깁니다.',
    keyTraits: ['오전 집중력', '규칙적 루틴', '목표 지향', '일찍 잠자리에 듦'],
    relationshipStrength: '주말 데이트나 여행을 아침 일찍부터 알차고 부지런하게 리드합니다.',
    relationshipCaution: '밤 9~10시만 되면 배터리가 방전되어 야간 대화나 심야 데이트에 집중하기 어렵습니다.'
  },
  bear: {
    id: 'bear',
    nameKr: '곰형 (Bear / 태양 주기형)',
    nameEn: 'Bear Chronotype',
    badge: '곰형',
    symbol: '🐻',
    color: '#b45309',
    bgColor: '#fffbeb',
    summary: '해와 함께 움직이는 가장 자연스럽고 원만한 사회적 바이오리듬',
    detailedDesc: '인구의 절반 이상이 해당하는 유형으로, 해가 뜰 때 일어나 해가 질 때 편안함을 느낍니다. 친화력이 좋고 타인의 리듬에 맞추는 유연성이 뛰어납니다.',
    keyTraits: ['안정적 생체리듬', '탁월한 사교성', '오후 2~4시 휴식 필요', '원만한 적응력'],
    relationshipStrength: '대부분의 사람들과 일상 약속이나 데이트 시간대를 잡기에 가장 편안합니다.',
    relationshipCaution: '점심 식사 후 식곤증과 오후 나른함이 심해 중요한 결정을 미룰 수 있습니다.'
  },
  wolf: {
    id: 'wolf',
    nameKr: '늑대형 (Wolf / 야행성 크리에이터)',
    nameEn: 'Wolf Chronotype',
    badge: '늑대형',
    symbol: '🐺',
    color: '#6366f1',
    bgColor: '#eef2ff',
    summary: '모두가 잠든 밤 11시부터 영감과 아이디어가 샘솟는 심야 몰입가',
    detailedDesc: '아침 기상이 가장 고통스럽지만 저녁 7시 이후부터 뇌가 맑아집니다. 감성적이고 창의적인 야간 작업과 심야의 깊은 감성 대화를 사랑합니다.',
    keyTraits: ['야간 창의력', '자유로운 리듬', '심야 감성', '아침 슬로우 스타터'],
    relationshipStrength: '새벽까지 이어지는 깊이 있는 속마음 토크와 로맨틱한 심야 감성을 책임집니다.',
    relationshipCaution: '오전 약속에 늦거나 낮 동안 멍해 있어 아침형 연인과 생활 리듬이 엇갈리기 쉽습니다.'
  },
  dolphin: {
    id: 'dolphin',
    nameKr: '돌고래형 (Dolphin / 예민한 완벽주의자)',
    nameEn: 'Dolphin Chronotype',
    badge: '돌고래형',
    symbol: '🐬',
    color: '#0ea5e9',
    bgColor: '#f0f9ff',
    summary: '뇌의 절반만 잠드는 예민함과 고도의 집중력을 지닌 인텔리전트',
    detailedDesc: '수면이 얕고 소리나 빛에 민감하지만, 짧은 시간에 폭발적인 지적 생산성을 발휘합니다. 밤낮과 상관없이 영감이 오면 몰입하는 천재성을 띱니다.',
    keyTraits: ['예민한 감각', '순간 몰입력', '완벽주의', '불규칙한 수면'],
    relationshipStrength: '상대방의 미세한 변화를 놓치지 않으며 지적이고 밀도 높은 소통을 이끕니다.',
    relationshipCaution: '수면 부족으로 인한 신경과민이나 피로가 불쑥 짜증으로 튀어나올 수 있습니다.'
  }
};

export const STRESS_INFO: Record<StressStyle, DimensionInfo<StressStyle>> = {
  cave: {
    id: 'cave',
    nameKr: '동굴잠수형 (Cave Diver)',
    nameEn: 'Cave / Isolation Style',
    badge: '동굴잠수형',
    symbol: '🏕️',
    color: '#475569',
    bgColor: '#f1f5f9',
    summary: '외부 자극을 차단하고 혼자만의 침묵 속에서 배터리를 충전하는 유형',
    detailedDesc: '스트레스를 받으면 말이 없어지고 모든 알림을 끄고 방으로 들어갑니다. 감정을 혼자 삭히고 정리가 끝나야 비로소 세상 밖으로 나옵니다.',
    keyTraits: ['침묵의 충전', '혼자만의 시간 필수', '외부 자극 차단', '자율적 회복'],
    relationshipStrength: '감정적으로 흥분해 상대에게 막말을 퍼붓지 않고 차분히 정리합니다.',
    relationshipCaution: '갑자기 연락을 끊거나 묵묵부답이 되어 상대방을 불안과 서운함에 빠뜨립니다.'
  },
  talk: {
    id: 'talk',
    nameKr: '폭풍수다형 (Expressive Talker)',
    nameEn: 'Talk / Venting Style',
    badge: '폭풍수다형',
    symbol: '🗣️',
    color: '#ec4899',
    bgColor: '#fdf2f8',
    summary: '마음속 이야기를 털어놓고 감정적 공감을 받으며 치유되는 유형',
    detailedDesc: '답답한 일이 있으면 누군가에게 털어놓아야 직성이 풀립니다. 해결책보다는 "그랬구나, 네가 진짜 속상했겠다"라는 공감 한마디에 모든 피로가 녹아내립니다.',
    keyTraits: ['감정 공유', '즉각적 표출', '공감에 의한 힐링', '솔직한 감정'],
    relationshipStrength: '마음에 담아두는 뒤끝 없이 그 자리에서 털어내고 다시 밝아집니다.',
    relationshipCaution: '듣는 사람이 지칠 정도로 쏟아내거나 해결책을 제시받으면 서운해할 수 있습니다.'
  },
  action: {
    id: 'action',
    nameKr: '행동폭주형 (Active Doer)',
    nameEn: 'Action / Physical Style',
    badge: '행동폭주형',
    symbol: '🏃',
    color: '#f97316',
    bgColor: '#fff7ed',
    summary: '몸을 격렬하게 움직이거나 소비/정리정돈으로 잡념을 날려버리는 유형',
    detailedDesc: '가만히 앉아 고민하기보다 헬스장에 가거나, 방 청소를 하거나, 맛있는 음식을 먹거나, 쇼핑을 하며 에너지를 전환합니다.',
    keyTraits: ['신체 활동 전환', '스트레스 해소용 소비', '청소/정리', '오감 자극'],
    relationshipStrength: '침울하게 우울의 늪에 빠지지 않고 활동적으로 기분을 전환합니다.',
    relationshipCaution: '충동적인 과소비나 무리한 일정으로 몸을 혹사시켜 탈이 날 수 있습니다.'
  },
  logic: {
    id: 'logic',
    nameKr: '이성분석형 (Logical Analyzer)',
    nameEn: 'Logical / Rationalizer Style',
    badge: '이성분석형',
    symbol: '🧠',
    color: '#2563eb',
    bgColor: '#eff6ff',
    summary: '원인을 철저히 해부하고 체계적인 해결 프로토콜을 짜며 안정을 찾는 유형',
    detailedDesc: '감정에 휘둘리기보다 "왜 이 문제가 발생했는가?", "어떻게 방지할 것인가?"를 메모장에 적으며 단계별 플랜을 수립할 때 불안이 사라집니다.',
    keyTraits: ['원인 규명', '해결책 설계', '객관적 거리두기', '통제력 회복'],
    relationshipStrength: '위기 상황에서도 감정을 배제하고 가장 합리적인 수습책을 도출합니다.',
    relationshipCaution: '상대가 위로를 바랄 때 차가운 원인 분석과 지적질로 느껴져 갈등을 키울 수 있습니다.'
  }
};

export const ELEMENT_INFO: Record<ElementTemperament, DimensionInfo<ElementTemperament>> = {
  fire: {
    id: 'fire',
    nameKr: '불 (Fire / 열정과 직관)',
    nameEn: 'Fire Temperament',
    badge: '불 (Fire)',
    symbol: '🔥',
    color: '#ef4444',
    bgColor: '#fef2f2',
    summary: '타오르는 열정과 직관적인 추진력으로 판을 뒤흔드는 불꽃',
    detailedDesc: '강렬한 추진력과 승부욕을 지녔습니다. 눈앞의 도전을 피하지 않으며 주변에 폭발적인 활력과 영감을 불어넣습니다.',
    keyTraits: ['열정', '추진력', '직관적 결단', '솔직 화끈함'],
    relationshipStrength: '뜨겁고 솔직한 사랑과 리드로 관계에 언제나 다이내믹한 활기를 줍니다.',
    relationshipCaution: '욱하는 성미가 있거나 쉽게 타오르고 쉽게 식어버릴 위험이 있습니다.'
  },
  water: {
    id: 'water',
    nameKr: '물 (Water / 공감과 정서)',
    nameEn: 'Water Temperament',
    badge: '물 (Water)',
    symbol: '💧',
    color: '#06b6d4',
    bgColor: '#ecfeff',
    summary: '어떤 그릇에도 담기는 유연함과 깊은 공감의 바다',
    detailedDesc: '타인의 감정을 자신의 것처럼 느끼며 치유하는 능력이 탁월합니다. 부드럽고 섬세하며 융화력이 뛰어납니다.',
    keyTraits: ['풍부한 정서', '탁월한 적응력', '치유와 위로', '섬세한 감각'],
    relationshipStrength: '상대방의 상처를 따뜻하게 감싸 안아주는 최고의 정서적 보금자리입니다.',
    relationshipCaution: '주변의 부정적인 기운을 그대로 흡수해 감정적으로 쉽게 가라앉을 수 있습니다.'
  },
  earth: {
    id: 'earth',
    nameKr: '흙 (Earth / 현실과 안정)',
    nameEn: 'Earth Temperament',
    badge: '흙 (Earth)',
    symbol: '🌱',
    color: '#15803d',
    bgColor: '#f0fdf4',
    summary: '흔들림 없는 신뢰와 단단한 현실감으로 삶을 지탱하는 대지',
    detailedDesc: '인내심과 성실함으로 신뢰를 쌓아 올립니다. 실질적인 가치를 중시하며 언제나 그 자리에서 든든한 버팀목이 되어 줍니다.',
    keyTraits: ['변함없는 신뢰', '현실적 감각', '인내와 끈기', '단단한 기반'],
    relationshipStrength: '거짓 없는 진솔함과 변함없는 든든함으로 평생의 안정감을 줍니다.',
    relationshipCaution: '변화에 대한 두려움으로 보수적이거나 고집을 꺾지 않을 때가 있습니다.'
  },
  air: {
    id: 'air',
    nameKr: '바람 (Air / 지성과 자유)',
    nameEn: 'Air Temperament',
    badge: '바람 (Air)',
    symbol: '💨',
    color: '#64748b',
    bgColor: '#f8fafc',
    summary: '경계를 자유롭게 넘나드는 지성과 유연한 호기심의 바람',
    detailedDesc: '새로운 정보와 사상에 열려 있으며 객관적이고 논리적인 대화를 좋아합니다. 얽매이는 것을 싫어하며 산뜻한 관계를 추구합니다.',
    keyTraits: ['지적 호기심', '자유로운 사유', '산뜻한 소통', '탁월한 위트'],
    relationshipStrength: '편견 없는 열린 대화와 재치로 항상 상쾌한 영감을 불어넣습니다.',
    relationshipCaution: '깊은 감정적 헌신이나 책임의 순간에 겉돌거나 회피하려는 인상을 줄 수 있습니다.'
  }
};

/**
 * Generate a distinct creative persona archetype title based on combinations
 */
export function generatePersonaTitle(p: Pick<UserPersona, 'mbti' | 'bloodType' | 'attachment' | 'chronotype' | 'stress' | 'element'>): string {
  const elementPrefix = {
    fire: '불꽃처럼 타오르는',
    water: '깊은 바다처럼 감싸주는',
    earth: '흔들림 없이 든든한',
    air: '자유롭게 바람을 타는'
  }[p.element];

  const chronoNoun = {
    lion: '새벽의 전략가',
    bear: '온화한 조율자',
    wolf: '심야의 크리에이터',
    dolphin: '예민한 완벽주의자'
  }[p.chronotype];

  return `${elementPrefix} ${p.mbti} ${chronoNoun}`;
}

export function generatePersonaCatchphrase(p: Pick<UserPersona, 'mbti' | 'bloodType' | 'attachment' | 'chronotype' | 'stress' | 'element'>): string {
  return `"${BLOOD_INFO[p.bloodType].badge}의 감각과 ${ATTACHMENT_INFO[p.attachment].badge}의 유대, ${STRESS_INFO[p.stress].badge}로 충전하는 ${p.mbti} 페르소나"`;
}

/**
 * Sample companions to showcase rich comparisons right out of the box
 */
export const SAMPLE_PROFILES: UserPersona[] = [
  {
    id: 'sample-1',
    name: '이지은 (민트)',
    mbti: 'ENFP',
    bloodType: 'B',
    attachment: 'anxious',
    chronotype: 'wolf',
    stress: 'talk',
    element: 'fire',
    customTitle: '불꽃 영감의 심야 감성가',
    gender: 'female'
  },
  {
    id: 'sample-2',
    name: '김도현 (정석)',
    mbti: 'INTJ',
    bloodType: 'A',
    attachment: 'secure',
    chronotype: 'lion',
    stress: 'logic',
    element: 'earth',
    customTitle: '흔들림 없는 새벽의 전략가',
    gender: 'male'
  },
  {
    id: 'sample-3',
    name: '박서연 (바람)',
    mbti: 'ENTP',
    bloodType: 'AB',
    attachment: 'avoidant',
    chronotype: 'wolf',
    stress: 'action',
    element: 'air',
    customTitle: '자유롭게 사유하는 심야 혁신가',
    gender: 'female'
  },
  {
    id: 'sample-4',
    name: '최민준 (바다)',
    mbti: 'ISFJ',
    bloodType: 'O',
    attachment: 'secure',
    chronotype: 'bear',
    stress: 'cave',
    element: 'water',
    customTitle: '깊은 바다처럼 온화한 안식처',
    gender: 'male'
  },
  {
    id: 'sample-5',
    name: '한수아 (여름)',
    mbti: 'ESFP',
    bloodType: 'O',
    attachment: 'anxious',
    chronotype: 'bear',
    stress: 'talk',
    element: 'fire',
    customTitle: '햇살처럼 밝은 일상의 활력소',
    gender: 'female'
  },
  {
    id: 'sample-6',
    name: '윤재호 (신비)',
    mbti: 'INFJ',
    bloodType: 'A',
    attachment: 'fearful',
    chronotype: 'dolphin',
    stress: 'cave',
    element: 'water',
    customTitle: '새벽 감성의 신비로운 치유자',
    gender: 'male'
  }
];

/**
 * 6-Dimension Signature Symbol & Color Palette System
 */
export const DIMENSION_PALETTE = {
  mbti: {
    key: 'mbti',
    index: 1,
    nameKr: 'MBTI 인지 스타일',
    symbol: '🧠',
    accentColor: '#6366f1',
    lightBg: 'bg-indigo-50/70',
    border: 'border-indigo-200/80',
    badgeText: 'text-indigo-900',
    kicker: '01. 인지 & 판단 양식',
    desc: '내향/외향, 직관/감각, 사고/감정, 판단/인식의 4원 축 인지 필터'
  },
  attachment: {
    key: 'attachment',
    index: 2,
    nameKr: '애착 유형 관계 심리',
    symbol: '⚓',
    accentColor: '#0d9488',
    lightBg: 'bg-teal-50/70',
    border: 'border-teal-200/80',
    badgeText: 'text-teal-900',
    kicker: '02. 관계 안정성 & 닻',
    desc: '친밀함과 독립성에 대한 정서적 안정도 및 갈등 시 애착 패턴'
  },
  chronotype: {
    key: 'chronotype',
    index: 3,
    nameKr: '크로노타입 생체시계',
    symbol: '⏰',
    accentColor: '#d97706',
    lightBg: 'bg-amber-50/70',
    border: 'border-amber-200/80',
    badgeText: 'text-amber-900',
    kicker: '03. 생체시계 & 바이오리듬',
    desc: '사자·곰·늑대·돌고래 유형별 최고 몰입 시간대 및 취침 주기'
  },
  stress: {
    key: 'stress',
    index: 4,
    nameKr: '스트레스 회복 프로토콜',
    symbol: '🧘',
    accentColor: '#9333ea',
    lightBg: 'bg-purple-50/70',
    border: 'border-purple-200/80',
    badgeText: 'text-purple-900',
    kicker: '04. 갈등 대처 & 쉼의 양식',
    desc: '동굴잠수·폭풍수다·행동폭주·이성분석 4대 심리 회복 메커니즘'
  },
  element: {
    key: 'element',
    index: 5,
    nameKr: '동양 4대 기질론',
    symbol: '🌿',
    accentColor: '#ea580c',
    lightBg: 'bg-orange-50/70',
    border: 'border-orange-200/80',
    badgeText: 'text-orange-900',
    kicker: '05. 에너지 원천 & 체질',
    desc: '불(열정)·물(공감)·흙(안정)·바람(지성)의 타고난 본원 에너지'
  },
  blood: {
    key: 'blood',
    index: 6,
    nameKr: '혈액형 소통 아키타입',
    symbol: '🩸',
    accentColor: '#e11d48',
    lightBg: 'bg-rose-50/70',
    border: 'border-rose-200/80',
    badgeText: 'text-rose-900',
    kicker: '06. 첫인상 & 대인 교감',
    desc: '한국인에게 가장 직관적인 소통 스타일과 무의식적 사회적 페르소나'
  }
} as const;

