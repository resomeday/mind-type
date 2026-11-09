export type DimensionKey = 'mbti' | 'blood' | 'attachment' | 'chronotype' | 'stress' | 'element';

export interface DetailedQuestion {
  id: string;
  dimension: DimensionKey;
  subCategory?: string;
  scenario: string; // Realistic situational dilemma
  question: string;
  options: {
    label: string;
    subtext: string;
    value: string;
    weight?: number;
  }[];
}

export interface DimensionMeta {
  key: DimensionKey;
  titleKr: string;
  titleEn: string;
  subtitle: string;
  symbol: string;
  color: string;
  bgColor: string;
  questionCount: number;
  estimatedTime: string;
  description: string;
  whyMatters: string;
}

export const DIMENSIONS_META: Record<DimensionKey, DimensionMeta> = {
  mbti: {
    key: 'mbti',
    titleKr: 'MBTI 인지 및 에너지 양식',
    titleEn: '16 Personality Archetypes',
    subtitle: '에너지 방향 · 정보 수집 · 판단 기준 · 생활 양식 (32문항 5점 척도)',
    symbol: '🧠',
    color: '#6366f1',
    bgColor: '#eef2ff',
    questionCount: 32,
    estimatedTime: '약 3분',
    description: '세상을 인식하고 판단하며 에너지를 교환하는 사고방식의 뼈대를 32개 정밀 문항으로 측정합니다.',
    whyMatters: '대화 코드, 가치관의 우선순위, 의사결정 방식의 충돌을 예방하는 기본 바탕이 됩니다.'
  },
  attachment: {
    key: 'attachment',
    titleKr: '애착 유형 심층 심리',
    titleEn: 'Attachment Style Dynamics',
    subtitle: '불안 척도 10문항 + 회피 척도 10문항 (20문항 5점 척도)',
    symbol: '⚓',
    color: '#10b981',
    bgColor: '#ecfdf5',
    questionCount: 20,
    estimatedTime: '약 2분',
    description: '연인이나 절친 사이에서 친밀감과 거리를 조절하는 무의식적 애착 패턴을 20개 문항으로 분석합니다.',
    whyMatters: '연애 갈등의 90%를 차지하는 "불안형-회피형 추격전"을 방지하고 상처를 치유합니다.'
  },
  chronotype: {
    key: 'chronotype',
    titleKr: '크로노타입 생체시계',
    titleEn: 'Biological Chronotype',
    subtitle: '사자·곰·늑대·돌고래 4동물 바이오리듬 (20문항 5점 척도)',
    symbol: '⏰',
    color: '#ea580c',
    bgColor: '#fff7ed',
    questionCount: 20,
    estimatedTime: '약 2분',
    description: '유전적으로 타고난 신체 시계와 하루 중 최고 에너지 구간을 20개 문항으로 진단합니다.',
    whyMatters: '데이트 시간대 조율, 주말 활동 패턴, 일상 연락 타이밍의 엇갈림을 해결합니다.'
  },
  stress: {
    key: 'stress',
    titleKr: '스트레스 대처 & 멘탈 방어기제',
    titleEn: 'Stress Coping & Recovery',
    subtitle: '동굴·수다·행동·이성분석 4대 힐링 프로토콜 (20문항 5점 척도)',
    symbol: '🧘',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    questionCount: 20,
    estimatedTime: '약 2분',
    description: '멘탈이 무너졌을 때 본능적으로 작동하는 방어기제를 20개 문항으로 정밀 판별합니다.',
    whyMatters: '싸웠을 때 한 명은 동굴로 숨고 한 명은 대화를 보챌 때 생기는 파국을 막아줍니다.'
  },
  element: {
    key: 'element',
    titleKr: '4대 원소 고대 기질론',
    titleEn: '4-Element Temperament',
    subtitle: '불(열정) · 물(공감) · 흙(안정) · 바람(지성/자유) (20문항 5점 척도)',
    symbol: '🔥',
    color: '#ef4444',
    bgColor: '#fef2f2',
    questionCount: 20,
    estimatedTime: '약 2분',
    description: '사람의 본질적 에너지 성향과 삶을 이끄는 근원적 동기를 4대 원소 20개 문항으로 해부합니다.',
    whyMatters: '서로의 아우라와 기운이 부딪히는지, 아니면 시너지를 내며 타오르는지 보여줍니다.'
  },
  blood: {
    key: 'blood',
    titleKr: '혈액형 & 소셜 인터랙션 바이브',
    titleEn: 'Blood Type Social Chemistry',
    subtitle: 'A·B·O·AB형 소셜 스타일 & 케미스트리 (20문항 5점 척도)',
    symbol: '🩸',
    color: '#f43f5e',
    bgColor: '#fff1f2',
    questionCount: 20,
    estimatedTime: '약 2분',
    description: '혈액형별 사회적 관계 포지션과 인터랙션 스타일을 20개 문항으로 세밀하게 진단합니다.',
    whyMatters: '첫인상의 직관적 케미와 대중적 공감대, 반전 매력의 티키타카를 조명합니다.'
  }
};

// 1. Detailed MBTI Questions (8 items: 2 for each axis)
export const DETAILED_MBTI_QUESTIONS: DetailedQuestion[] = [
  {
    id: 'mbti-ei-1',
    dimension: 'mbti',
    subCategory: 'E vs I (에너지 충전)',
    scenario: '월요일부터 금요일까지 쉼 없이 야근과 미팅에 시달린 후 드디어 맞이한 토요일 아침입니다.',
    question: '이번 주말, 내 뇌와 신체가 진정으로 "완벽하게 회복되었다"고 느끼는 순간은?',
    options: [
      {
        label: '마음 맞는 친구들을 만나 맛있는 음식을 먹고 끝없는 수다와 웃음으로 스트레스를 털어낼 때',
        subtext: '사람들과 활기차게 교류하며 바깥 공기를 마실 때 비로소 생기가 돌아옵니다. (외향 E)',
        value: 'E'
      },
      {
        label: '모든 연락을 잠시 미뤄두고, 커튼을 친 조용한 방에서 혼자 영화를 보거나 뒹굴거릴 때',
        subtext: '타인의 시선이나 대화가 완전히 차단된 절대적 고독이어야 배터리가 충전됩니다. (내향 I)',
        value: 'I'
      }
    ]
  },
  {
    id: 'mbti-ei-2',
    dimension: 'mbti',
    subCategory: 'E vs I (사회적 공간)',
    scenario: '초대받은 지인의 파티나 대형 네트워킹 모임에 도착했습니다. 아는 사람은 1~2명뿐입니다.',
    question: '이 공간에서 나의 자연스러운 행동 흐름은 어디에 더 가깝나요?',
    options: [
      {
        label: '흥미로운 사람들에게 다가가 자연스럽게 인사를 건네고 새로운 인맥을 넓히며 분위기를 즐긴다',
        subtext: '새로운 만남은 신선한 자극이며 대화 속에서 자연스럽게 중심에 섭니다. (외향 E)',
        value: 'E'
      },
      {
        label: '내가 아는 소수의 사람 곁에 머물거나, 사람이 덜 붐비는 조용한 구석에서 관찰자 시점이 된다',
        subtext: '낯선 사람들과의 스몰 토크는 급격한 에너지 소모를 불러와 일찍 귀가하고 싶어집니다. (내향 I)',
        value: 'I'
      }
    ]
  },
  {
    id: 'mbti-sn-1',
    dimension: 'mbti',
    subCategory: 'S vs N (정보 인식)',
    scenario: '누군가 당신에게 "앞으로 10년 뒤의 미래 산업"에 대해 새로운 아이디어를 제안했습니다.',
    question: '그 이야기를 들을 때 내 머릿속에 가장 먼저 떠오르는 질문이나 생각은?',
    options: [
      {
        label: '"실제로 현재 시장 데이터와 검증된 성공 사례가 있나? 구체적 실행 자본과 수치는 얼마인가?"',
        subtext: '손에 잡히는 구체적 현실과 팩트, 검증된 절차가 우선이어야 신뢰가 갑니다. (감각 S)',
        value: 'S'
      },
      {
        label: '"이 아이디어가 세상을 어떻게 바꿀까? 숨겨진 잠재력과 패러다임의 변화는 무엇일까?"',
        subtext: '당장의 디테일보다는 번뜩이는 비전과 의미, 거대한 가능성의 청사진에 가슴이 뜁니다. (직관 N)',
        value: 'N'
      }
    ]
  },
  {
    id: 'mbti-sn-2',
    dimension: 'mbti',
    subCategory: 'S vs N (상상과 렌즈)',
    scenario: '혼자 버스나 지하철 창밖을 바라보며 멍을 때리고 있을 때입니다.',
    question: '나의 무의식적 생각은 주로 어떤 방향으로 꼬리를 무나요?',
    options: [
      {
        label: '오늘 해야 할 일, 방금 본 간판의 디자인, 오늘 저녁 메뉴, 현실의 실제 기억들',
        subtext: '눈앞의 오감과 실제 겪은 일상적인 사건들에 생각이 머뭅니다. (감각 S)',
        value: 'S'
      },
      {
        label: '"만약 세상에 중력이 사라진다면?", "내가 다른 나라에서 태어났다면?", 기발하고 철학적인 망상',
        subtext: '현실의 시공간을 훌쩍 벗어난 엉뚱하고 깊은 상상의 나래를 펼칩니다. (직관 N)',
        value: 'N'
      }
    ]
  },
  {
    id: 'mbti-tf-1',
    dimension: 'mbti',
    subCategory: 'T vs F (판단 기준)',
    scenario: '가장 아끼는 절친이 "나 오늘 상사한테 말도 안 되는 이유로 깨지고 너무 우울해..."라며 전화를 걸어왔습니다.',
    question: '친구의 말을 듣자마자 내 마음속에서 본능적으로 가장 먼저 튀어나오는 반응은?',
    options: [
      {
        label: '"상사가 도대체 구체적으로 뭐라고 했는데? 너 잘못은 아닌 거 맞아? 내일 어떻게 대처할 건데?"',
        subtext: '상황을 객관적으로 분석해서 친구가 다시는 억울한 일을 당하지 않도록 해결책을 찾아주는 게 진정한 사랑입니다. (사고 T)',
        value: 'T'
      },
      {
        label: '"아 진짜 미쳤다... 너 오늘 하루 종일 얼마나 속상하고 서러웠어? 마음은 좀 괜찮아?"',
        subtext: '옳고 그름을 따지기 전에 상대방의 다친 마음에 온전히 공감하고 감정을 안아주는 게 최우선입니다. (감정 F)',
        value: 'F'
      }
    ]
  },
  {
    id: 'mbti-tf-2',
    dimension: 'mbti',
    subCategory: 'T vs F (의사결정 잣대)',
    scenario: '동아리나 팀 프로젝트에서 한 팀원의 역량이 부족해 전체 마감에 지장을 주고 있는 상황입니다.',
    question: '이 문제를 해결해야 할 때, 나의 최종적인 판단 원칙은 어디에 무게가 실리나요?',
    options: [
      {
        label: '원칙과 규칙, 공정성에 입각하여 명확한 피드백을 주고 필요하다면 역할을 냉정히 재배정한다',
        subtext: '감정에 휘둘려 일처리를 흐지부지하면 전체 팀의 효율과 결과물이 무너집니다. (사고 T)',
        value: 'T'
      },
      {
        label: '그 팀원이 받을 상처와 팀 내 분위기, 인간적인 유대를 최대한 배려하며 함께 도울 방안을 찾는다',
        subtext: '성과가 조금 떨어지더라도 사람이 다치거나 관계가 깨지는 것은 피하고 싶습니다. (감정 F)',
        value: 'F'
      }
    ]
  },
  {
    id: 'mbti-jp-1',
    dimension: 'mbti',
    subCategory: 'J vs P (일정 및 라이프스타일)',
    scenario: '친구와 함께 유럽이나 휴양지로 4박 5일 자유여행을 떠나기로 했습니다.',
    question: '여행을 준비하고 즐기는 나의 스타일은 어느 쪽에 더 가깝나요?',
    options: [
      {
        label: '일자별·시간대별 이동 동선, 예약 바우처, 맛집 후보와 비 올 때의 플랜 B까지 미리 체계적으로 정리한다',
        subtext: '예측 가능하고 계획대로 흘러갈 때 심리적 안정감과 여행의 만족도가 극대화됩니다. (판단 J)',
        value: 'J'
      },
      {
        label: '항공권과 첫날 숙소만 정해두고, 현지에서 눈앞에 마주치는 골목과 그날의 기분에 따라 발길 닿는 대로 움직인다',
        subtext: '계획에 얽매이면 답답하며, 예측할 수 없는 우연과 즉흥의 묘미야말로 진짜 여행의 묘미입니다. (인식 P)',
        value: 'P'
      }
    ]
  },
  {
    id: 'mbti-jp-2',
    dimension: 'mbti',
    subCategory: 'J vs P (작업 실행 방식)',
    scenario: '중요한 보고서 제출이나 개인 목표 마감일이 2주 뒤로 다가왔습니다.',
    question: '과제를 완성해 나가는 나의 실제 행동 패턴은?',
    options: [
      {
        label: '첫 주에 전체 뼈대를 잡고 매일 균등하게 분량을 쳐내어, 마감 2~3일 전에 여유롭게 끝내둔다',
        subtext: '마감에 쫓기면 스트레스가 극심하므로 일정을 선제적으로 통제해야 직성이 풀립니다. (판단 J)',
        value: 'J'
      },
      {
        label: '초반에는 아이디어만 굴리며 여유를 부리다가, 마감 24시간 전 폭발적인 초인적 벼락치기로 몰입한다',
        subtext: '마감 직전의 긴장감과 아드레날린이 솟구칠 때 최고의 집중력과 퀄리티가 나옵니다. (인식 P)',
        value: 'P'
      }
    ]
  }
];

// 2. Detailed Attachment Style Questions (5 deep psychological items)
export const DETAILED_ATTACHMENT_QUESTIONS: DetailedQuestion[] = [
  {
    id: 'att-1',
    dimension: 'attachment',
    subCategory: '연락과 유기 불안',
    scenario: '소중한 연인이나 단짝 친구가 평소와 달리 半나절 이상 카톡을 읽지 않거나 단답으로 일관할 때입니다.',
    question: '나의 마음속에서 가장 본능적으로 일어나는 감정과 생각은?',
    options: [
      {
        label: '"오늘 바쁜가 보네, 일 끝나면 연락 오겠지" 하고 내 일상에 편안하게 집중한다',
        subtext: '상대의 애정을 의심하지 않으며 혼자 있는 시간도 안정적입니다. (안정 지향)',
        value: 'secure_1'
      },
      {
        label: '"내가 어제 무슨 말실수했나? 나한테 마음이 식었나?" 가슴이 철렁하고 불안이 끝없이 증폭된다',
        subtext: '작은 거리감에도 버림받을지 모른다는 극심한 유기 불안을 느낍니다. (불안 지향)',
        value: 'anxious_1'
      },
      {
        label: '"오히려 편하고 좋네. 나한테 지나치게 의존하지 않는 사람이 좋아" 하고 신경을 꺼버린다',
        subtext: '상대방의 감정적 거리에 둔감하며 개인의 독립성을 최우선시합니다. (회피 지향)',
        value: 'avoidant_1'
      },
      {
        label: '서운하고 화가 치밀어 오르면서도, 내가 먼저 연락했다가 무시당할까 봐 차갑게 선을 긋는다',
        subtext: '친밀해지고 싶으면서도 거절당할까 두려워 방어적으로 밀어냅니다. (공포회피 지향)',
        value: 'fearful_1'
      }
    ]
  },
  {
    id: 'att-2',
    dimension: 'attachment',
    subCategory: '갈등 대처 메커니즘',
    scenario: '관계에서 심각한 의견 대립이나 감정적 서운함이 폭발하여 말다툼이 일어났습니다.',
    question: '이 순간, 내가 가장 취하고 싶은 태도는 무엇인가요?',
    options: [
      {
        label: '감정을 솔직하고 차분하게 털어놓으며, 상대방의 입장도 끝까지 경청하여 합의점을 찾는다',
        subtext: '갈등은 관계의 끝이 아니라 더 깊어지는 과정이라고 신뢰합니다. (안정 지향)',
        value: 'secure_2'
      },
      {
        label: '지금 당장 결판을 내고 서로 사랑한다는 확신을 확인받지 못하면 밤새 잠을 잘 수 없다',
        subtext: '감정의 공백이나 상대방의 침묵을 견디지 못하고 매달립니다. (불안 지향)',
        value: 'anxious_2'
      },
      {
        label: '숨이 턱 막히고 짜증이 밀려와 "나중에 얘기해"라며 말을 끊고 내 방으로 숨어버린다',
        subtext: '감정적 압박에 직면하면 도망치거나 방어막을 올려 단절합니다. (회피 지향)',
        value: 'avoidant_2'
      },
      {
        label: '상대방에게 큰 배신감을 느껴 매몰차게 비난했다가도, 곧바로 상대가 떠날까 봐 패닉에 빠진다',
        subtext: '밀어내기와 집착을 오가며 극단적인 감정 롤러코스터를 탑니다. (공포회피 지향)',
        value: 'fearful_2'
      }
    ]
  },
  {
    id: 'att-3',
    dimension: 'attachment',
    subCategory: '취약함의 공개 (Vulnerability)',
    scenario: '나의 가장 부끄러운 약점이나 어두운 과거, 나약한 속마음을 상대에게 털어놓는 상황입니다.',
    question: '나의 내면을 있는 그대로 보여주는 것에 대해 어떻게 느끼나요?',
    options: [
      {
        label: '신뢰하는 사람에게라면 나의 부족한 모습도 편안하게 열어 보일 수 있다',
        subtext: '취약함의 공유가 진정한 친밀감의 열쇠라고 믿습니다. (안정 지향)',
        value: 'secure_3'
      },
      {
        label: '내 모든 것을 다 털어놓고 상대방도 나에게 100% 영혼까지 전부 보여주길 갈망한다',
        subtext: '경계 없는 일체감과 끝없는 정서적 밀착을 원합니다. (불안 지향)',
        value: 'anxious_3'
      },
      {
        label: '내 치부를 드러내는 것은 극도로 불편하며, 결국 나를 지킬 사람은 나 자신뿐이다',
        subtext: '타인에게 약점을 잡히거나 의존하는 것을 극도로 경계합니다. (회피 지향)',
        value: 'avoidant_3'
      },
      {
        label: '내 마음을 털어놓고 깊이 위로받고 싶지만, 결국 날 한심하게 보고 떠날까 봐 입을 닫는다',
        subtext: '간절히 이해받고 싶지만 상처받는 것에 대한 공포가 더 큽니다. (공포회피 지향)',
        value: 'fearful_3'
      }
    ]
  },
  {
    id: 'att-4',
    dimension: 'attachment',
    subCategory: '관계의 자율성과 거리',
    scenario: '연인이나 친구가 "이번 주말엔 각자 친구들 만나고 혼자만의 시간을 갖자"고 제안했습니다.',
    question: '이 제안을 들었을 때 내 마음의 첫 파동은?',
    options: [
      {
        label: '"좋지! 각자 즐거운 시간 보내고 일요일 저녁에 이야기 나누자"',
        subtext: '서로의 독립된 공간이 관계를 더 건강하게 만든다고 여깁니다. (안정 지향)',
        value: 'secure_4'
      },
      {
        label: '"나랑 있는 게 지루해졌나? 나보다 다른 사람이 더 좋은가?" 가슴 한구석이 찌릿하게 서운하다',
        subtext: '상대방의 물리적 거리 두기를 감정의 식음으로 오해하기 쉽습니다. (불안 지향)',
        value: 'anxious_4'
      },
      {
        label: '"드디어 살 것 같네." 아무런 구속 없이 혼자 있을 생각에 해방감이 든다',
        subtext: '관계의 밀착이 길어지면 답답함을 느끼고 거리를 벌리려 합니다. (회피 지향)',
        value: 'avoidant_4'
      },
      {
        label: '쿨한 척 알겠다고 하지만, 마음속에서는 서운함과 차가운 방어기제가 동시에 요동친다',
        subtext: '겉으로는 담담한 척하면서 속으로는 상처를 입고 거리를 둡니다. (공포회피 지향)',
        value: 'fearful_4'
      }
    ]
  },
  {
    id: 'att-5',
    dimension: 'attachment',
    subCategory: '애정 확인의 주기',
    scenario: '관계가 평화롭고 아무런 문제가 없는 일상입니다.',
    question: '평소 나는 상대방의 애정이나 관심에 대해 어떻게 반응하나요?',
    options: [
      {
        label: '상대의 사랑을 굳이 의심하지 않으며, 나 역시 자연스럽고 편안하게 애정을 표현한다',
        subtext: '안정적인 신뢰의 토대 위에서 자연스러운 사랑을 나눕니다. (안정 지향)',
        value: 'secure_5'
      },
      {
        label: '"나 아직도 사랑해?", "나 안 보고 싶었어?"라며 수시로 확인받아야 안심이 된다',
        subtext: '애정 표현이 조금만 줄어들어도 금세 불안해져 끊임없이 확답을 구합니다. (불안 지향)',
        value: 'anxious_5'
      },
      {
        label: '상대가 지나치게 사랑을 고백하거나 감정적 헌신을 요구하면 오히려 부담스럽고 뒷걸음질 친다',
        subtext: '지나친 감정의 무게를 견디지 못하고 차가운 이성으로 방어합니다. (회피 지향)',
        value: 'avoidant_5'
      },
      {
        label: '상대가 다정할 때는 안도하면서도, "이 행복이 언제 깨질까" 늘 의심과 두려움을 품고 있다',
        subtext: '행복한 순간에도 불안과 경계 태세를 완전히 풀지 못합니다. (공포회피 지향)',
        value: 'fearful_5'
      }
    ]
  }
];

// 3. Detailed Chronotype Questions (4 bio-rhythm items)
export const DETAILED_CHRONOTYPE_QUESTIONS: DetailedQuestion[] = [
  {
    id: 'chrono-1',
    dimension: 'chronotype',
    subCategory: '자연 기상 패턴',
    scenario: '내일은 아무런 약속이나 알람도 없는 완벽한 휴일입니다.',
    question: '당신의 몸이 스스로 눈을 뜨는 가장 자연스러운 시간대는 언제인가요?',
    options: [
      {
        label: '알람 없이도 아침 5시 30분 ~ 7시 사이에 눈이 번쩍 떠진다',
        subtext: '새벽 공기를 마실 때 쾌감을 느끼는 전형적인 사자형 (Lion)',
        value: 'lion'
      },
      {
        label: '햇살이 비치는 아침 7시 ~ 8시 30분 사이에 기분 좋게 일어난다',
        subtext: '태양의 주기와 함께 호흡하는 표준형 곰형 (Bear)',
        value: 'bear'
      },
      {
        label: '오전 10시~11시까지는 푹 자야 하며, 아침에 억지로 깨우면 하루 종일 멍하다',
        subtext: '심야에 에너지를 불태우는 전형적인 야행성 늑대형 (Wolf)',
        value: 'wolf'
      },
      {
        label: '새벽에 자다 깨기를 반복하며, 기상 시간이 불규칙하고 얕은 잠을 잔다',
        subtext: '신경이 예민하고 뇌의 반쪽만 잠드는 돌고래형 (Dolphin)',
        value: 'dolphin'
      }
    ]
  },
  {
    id: 'chrono-2',
    dimension: 'chronotype',
    subCategory: '두뇌 집중 골든타임',
    scenario: '가장 어렵고 복잡한 시험공부나 창의적인 기획서를 써야 합니다.',
    question: '나의 뇌세포가 가장 날카롭게 회전하고 몰입도가 200% 폭발하는 골든타임은?',
    options: [
      {
        label: '오전 8시 ~ 12시 (아침부터 점심 전까지의 오전 시간대)',
        subtext: '사자형: 오전에 하루의 가장 중요한 업무를 끝내야 능률이 오릅니다.',
        value: 'lion'
      },
      {
        label: '오전 10시 ~ 오후 2시 (햇살이 가장 밝은 한낮 시간대)',
        subtext: '곰형: 점심 전후로 원만한 집중력을 발휘하며 팀 협업에 최적화되어 있습니다.',
        value: 'bear'
      },
      {
        label: '밤 9시 ~ 새벽 2시 (세상이 모두 잠든 고요한 심야 시간대)',
        subtext: '늑대형: 해가 지고 달이 뜰 때부터 진정한 창의성과 영감이 분출합니다.',
        value: 'wolf'
      },
      {
        label: '오후 3시 ~ 저녁 7시 또는 불규칙하지만 짧고 폭발적인 번개 몰입',
        subtext: '돌고래형: 순간 집중력이 고도로 예민하게 작동하는 천재형 몰입파입니다.',
        value: 'dolphin'
      }
    ]
  },
  {
    id: 'chrono-3',
    dimension: 'chronotype',
    subCategory: '오후 피로도 곡선',
    scenario: '점심 식사를 마친 오후 2시 ~ 4시경의 일상적인 내 컨디션은?',
    question: '오후의 나른함을 대하는 나의 신체 반응은?',
    options: [
      {
        label: '오전 일과를 거의 마쳐 여유가 있지만, 슬슬 에너지가 조금씩 하강한다',
        subtext: '사자형: 초저녁이 되면 급격히 배터리가 소진되어 일찍 귀가하고 싶어집니다.',
        value: 'lion'
      },
      {
        label: '식곤증이 쏟아져 20분 정도 낮잠을 자거나 진한 커피를 마셔야 회복된다',
        subtext: '곰형: 태양의 최고점 이후 전형적인 신체 휴식 신호가 찾아옵니다.',
        value: 'bear'
      },
      {
        label: '이제 막 슬로우 스타터로서 몸이 완전히 풀리고 기운이 돌기 시작한다',
        subtext: '늑대형: 남들이 지쳐갈 때 비로소 뇌의 퓨즈가 켜지는 반전 체력입니다.',
        value: 'wolf'
      },
      {
        label: '피로감은 있지만 신경이 곤두서 있어 쉽게 잠들지 못하고 머리가 팽팽 돈다',
        subtext: '돌고래형: 신체적 긴장도가 높아 카페인 조절이 필수적인 타입입니다.',
        value: 'dolphin'
      }
    ]
  },
  {
    id: 'chrono-4',
    dimension: 'chronotype',
    subCategory: '야간 활동과 수면',
    scenario: '밤 10시가 넘었을 때의 나의 정신 상태는?',
    question: '취침을 앞둔 밤 시간대의 나는 어떤 모습인가요?',
    options: [
      {
        label: '밤 9~10시만 되면 눈꺼풀이 무겁게 감기며 일찍 침대로 들어간다',
        subtext: '사자형: 일찍 자고 일찍 일어나는 자연의 규칙을 충실히 따릅니다.',
        value: 'lion'
      },
      {
        label: '11시경 가벼운 TV나 스마트폰을 보다가 자정 무렵 스르륵 잠에 든다',
        subtext: '곰형: 무난하고 규칙적인 수면 루틴을 유지하는 다수파입니다.',
        value: 'bear'
      },
      {
        label: '밤 11시부터 진정한 내 하루가 시작되며, 새벽 2시까지 쌩쌩하게 작업한다',
        subtext: '늑대형: 밤의 적막과 어둠 속에서 진정한 자유와 창작욕을 느낍니다.',
        value: 'wolf'
      },
      {
        label: '자려고 누워도 잡생각이나 작은 소리 때문에 뒤척이다 늦게 잠든다',
        subtext: '돌고래형: 완벽주의와 예민한 감각으로 암막 커튼과 귀마개가 필수입니다.',
        value: 'dolphin'
      }
    ]
  }
];

// 4. Detailed Stress Coping Questions (4 crisis scenario items)
export const DETAILED_STRESS_QUESTIONS: DetailedQuestion[] = [
  {
    id: 'stress-1',
    dimension: 'stress',
    subCategory: '극심한 스트레스 시 첫 반응',
    scenario: '직장, 학업, 또는 인간관계에서 감당하기 힘든 억울함이나 멘탈 붕괴 사건이 터졌습니다.',
    question: '집에 도착하자마자 내가 본능적으로 취하는 첫 번째 행동은?',
    options: [
      {
        label: '스마트폰 비행기 모드를 켜고, 방 문을 걸어 잠근 뒤 침대 이불 속으로 파고든다',
        subtext: '외부 자극을 0으로 차단하고 완전한 침묵 속에 머물러야 뇌가 식습니다. (동굴잠수형)',
        value: 'cave'
      },
      {
        label: '친한 친구에게 전화를 걸어 "야 너 지금 통화돼?"라며 1시간 동안 울분을 토해낸다',
        subtext: '마음에 쌓인 감정을 입 밖으로 쏟아내고 공감받을 때 가슴이 뚫립니다. (폭풍수다형)',
        value: 'talk'
      },
      {
        label: '운동화를 신고 헬스장으로 뛰어가 땀을 쏟거나, 매운 떡볶이를 시키고 방 청소를 한다',
        subtext: '몸을 격렬하게 움직이거나 오감을 강하게 자극해 잡념을 증발시킵니다. (행동폭주형)',
        value: 'action'
      },
      {
        label: '노트북이나 메모장을 켜고 "문제의 원인, 타임라인, 향후 대안"을 냉정하게 정리한다',
        subtext: '상황을 객관적으로 분석하고 논리적 통제권을 되찾을 때 안정을 찾습니다. (이성분석형)',
        value: 'logic'
      }
    ]
  },
  {
    id: 'stress-2',
    dimension: 'stress',
    subCategory: '진짜 위로가 되는 방식',
    scenario: '내가 너무 지치고 힘들어할 때, 곁에 있는 파트너가 해주었으면 하는 가장 고마운 위로는?',
    question: '내 영혼의 응어리를 풀어주는 최고의 위로 방식은?',
    options: [
      {
        label: '"언제든 말하고 싶을 때 얘기해, 혼자 편하게 쉬어"라며 묵묵히 자리를 비켜주는 것',
        subtext: '닦달하지 않고 나 혼자 감정을 정리할 수 있도록 침묵의 배려를 주는 것 (동굴잠수형)',
        value: 'cave'
      },
      {
        label: '"진짜 고생 많았어... 네가 얼마나 억울하고 속상했을까"라며 두 눈을 마주보고 100% 리액션해 주는 것',
        subtext: '해결책보다 내 감정을 그대로 받아주는 무조건적인 편들기와 공감 (폭풍수다형)',
        value: 'talk'
      },
      {
        label: '"옷 입어, 맛있는 고기 먹으러 가자!"라며 바람 쐬러 데리고 나가 신나게 놀아주는 것',
        subtext: '침울한 분위기를 단숨에 깨뜨리고 신체적 즐거움으로 기분을 전환시켜 주는 것 (행동폭주형)',
        value: 'action'
      },
      {
        label: '"내가 봤을 때 이 상황은 이렇게 수습하면 문제없어"라며 실질적 해결책과 전략을 짚어주는 것',
        subtext: '감정적인 뻔한 위로보다 현실적인 돌파구를 명쾌하게 설계해 주는 것 (이성분석형)',
        value: 'logic'
      }
    ]
  },
  {
    id: 'stress-3',
    dimension: 'stress',
    subCategory: '갈등 시 최악의 상대방 태도',
    scenario: '스트레스를 받아 예민해져 있을 때, 나를 가장 폭발하게 만드는 상대방의 태도는?',
    question: '나의 역린을 건드리는 최악의 커뮤니케이션은?',
    options: [
      {
        label: '"도대체 왜 말을 안 해? 혼자 꽁해있지 말고 지금 당장 얘기해!"라며 문을 두드릴 때',
        subtext: '정리되지 않은 감정을 강제로 캐묻고 동굴을 침범당할 때 질식할 것 같습니다. (동굴잠수형)',
        value: 'cave'
      },
      {
        label: '"그걸 왜 그렇게 신경 써? 네가 너무 예민한 거 아니야?"라며 내 감정을 묵살할 때',
        subtext: '내 속상한 마음에 찬물을 끼얹고 비난하거나 팩트로 평가할 때 상처가 깊습니다. (폭풍수다형)',
        value: 'talk'
      },
      {
        label: '"방구석에 가만히 누워서 한숨만 쉬고 있어봐야 뭐가 달라지니?"라며 핀잔을 줄 때',
        subtext: '기분 전환을 위한 활동을 억압당하고 무기력에 갇힐 때 미쳐버릴 것 같습니다. (행동폭주형)',
        value: 'action'
      },
      {
        label: '아무런 대책이나 팩트 없이 오직 감정적인 떼쓰기나 비논리적인 비난만 쏟아낼 때',
        subtext: '문제 해결에 아무 도움도 안 되는 감정 소모전에 휘말릴 때 극심한 피로를 느낍니다. (이성분석형)',
        value: 'logic'
      }
    ]
  },
  {
    id: 'stress-4',
    dimension: 'stress',
    subCategory: '주말 멘탈 리셋 루틴',
    scenario: '일주일 동안 깎여나간 정신력을 100% 회복하기 위한 최고의 주말 루틴은?',
    question: '나만의 궁극의 에너지 리셋 버튼은?',
    options: [
      {
        label: '아무도 없는 집에서 OTT 정주행, 책 읽기, 방해받지 않는 단절의 시간',
        subtext: '동굴잠수형: 외부 자극이 없는 고요함이 유일한 해독제입니다.',
        value: 'cave'
      },
      {
        label: '단짝 친구와 분위기 좋은 카페나 주점에서 늦은 밤까지 나누는 딥토크',
        subtext: '폭풍수다형: 정서적인 유대와 온기를 채울 때 영혼이 살아납니다.',
        value: 'talk'
      },
      {
        label: '등산, 러닝, 쇼핑, 드라이브 등 신나게 몸을 쓰고 맛있는 걸 먹는 활력 충전',
        subtext: '행동폭주형: 신체 에너지의 대순환을 통해 무거운 기운을 털어냅니다.',
        value: 'action'
      },
      {
        label: '한 주간의 지출 정리, 다음 주 캘린더 세팅, 방 구조 정리를 통한 통제감 획득',
        subtext: '이성분석형: 내 삶의 질서와 체계가 정돈될 때 깊은 안도감을 얻습니다.',
        value: 'logic'
      }
    ]
  }
];

// 5. Detailed 4 Elements Temperament Questions (4 essence items)
export const DETAILED_ELEMENT_QUESTIONS: DetailedQuestion[] = [
  {
    id: 'element-1',
    dimension: 'element',
    subCategory: '삶을 이끄는 근원적 동력',
    scenario: '인생을 살아가면서 내가 가장 가슴 뛰고 살아있음을 느끼는 순간은 언제인가요?',
    question: '나라는 사람을 움직이게 만드는 가장 원초적인 엔진은?',
    options: [
      {
        label: '열정과 승부욕! 한 번 목표가 생기면 불꽃처럼 타오르며 장애물을 부수고 질주할 때',
        subtext: '불 (Fire): 강력한 추진력과 직관으로 세상을 달구는 열정의 화신입니다.',
        value: 'fire'
      },
      {
        label: '깊은 정서적 교감! 사람들의 아픔을 어루만지고 마음과 마음이 하나로 이어질 때',
        subtext: '물 (Water): 바다처럼 유연하고 섬세하게 타인을 품어주는 감수성의 치유자입니다.',
        value: 'water'
      },
      {
        label: '단단한 신뢰와 결실! 흔들림 없이 묵묵히 신뢰를 쌓아 올려 안정된 기반을 세울 때',
        subtext: '흙 (Earth): 대지처럼 든든한 현실감과 인내심으로 모두의 버팀목이 됩니다.',
        value: 'earth'
      },
      {
        label: '지적 자유와 호기심! 어디에도 얽매이지 않고 새로운 아이디어와 진리를 탐구할 때',
        subtext: '바람 (Air): 바람처럼 산뜻하고 유쾌하게 경계를 넘나드는 지성의 방랑자입니다.',
        value: 'air'
      }
    ]
  },
  {
    id: 'element-2',
    dimension: 'element',
    subCategory: '첫인상과 풍기는 아우라',
    scenario: '사람들이 나와 조금만 대화를 나눠봐도 직관적으로 느끼는 나의 에너지 분위기는?',
    question: '타인이 나를 통해 가장 강하게 느끼는 고유의 바이브는?',
    options: [
      {
        label: '솔직하고 당당하며, 거침없는 솔직함과 활력이 넘치는 화끈한 분위기 (Fire)',
        subtext: '주변 공기를 뜨겁게 달구며 사람들의 시선을 사로잡는 존재감',
        value: 'fire'
      },
      {
        label: '부드럽고 온화하며, 어떤 말도 편안하게 털어놓게 만드는 포근한 분위기 (Water)',
        subtext: '상대방의 긴장을 사르르 녹여주는 다정다감한 정서적 온기',
        value: 'water'
      },
      {
        label: '진중하고 믿음직하며, 약속을 반드시 지킬 것 같은 듬직하고 단단한 분위기 (Earth)',
        subtext: '어떤 혼란 속에서도 중심을 잃지 않는 흔들림 없는 안정감',
        value: 'earth'
      },
      {
        label: '위트 있고 영리하며, 트렌디하고 호기심 넘치는 산뜻하고 경쾌한 분위기 (Air)',
        subtext: '지루할 틈 없이 유쾌한 대화와 신선한 관점을 선물하는 청량함',
        value: 'air'
      }
    ]
  },
  {
    id: 'element-3',
    dimension: 'element',
    subCategory: '가장 견디기 힘든 환경',
    scenario: '어떤 환경이나 사람 곁에 있을 때 가장 질식할 것 같고 숨이 막히나요?',
    question: '나의 에너지를 갉아먹는 최악의 불협화음은?',
    options: [
      {
        label: '미적지근하고 답답한 태도, 열정 없이 현상 유지만 바라는 지루한 정체 (Fire)',
        subtext: '불꽃은 타오르지 못하고 갇혀 있을 때 꺼져버립니다.',
        value: 'fire'
      },
      {
        label: '피도 눈물도 없는 냉소주의, 타인의 감정을 무시하고 계산만 앞세우는 메마른 인간관계 (Water)',
        subtext: '물은 온기 없는 차가움 속에서 얼어붙어 상처를 입습니다.',
        value: 'water'
      },
      {
        label: '하루아침에 엎어지는 변덕, 약속을 가볍게 여기는 무책임함과 불확실한 혼란 (Earth)',
        subtext: '흙은 단단한 지반이 흔들릴 때 가장 큰 불안을 느낍니다.',
        value: 'earth'
      },
      {
        label: '구태의연한 꼰대 문화, 사생활을 통제하려 들고 내 생각의 자유를 억압하는 환경 (Air)',
        subtext: '바람은 좁은 감옥에 가둘 때 거센 폭풍으로 변합니다.',
        value: 'air'
      }
    ]
  },
  {
    id: 'element-4',
    dimension: 'element',
    subCategory: '위기 직면 시 본능',
    scenario: '예상치 못한 인생의 거대한 벽이나 도전에 부딪혔을 때 내 몸의 본능은?',
    question: '벽을 돌파하는 나의 무기는?',
    options: [
      {
        label: '정면 돌파! "될 때까지 부딪혀보자!"라는 저돌적인 투지와 승부욕으로 밀어붙인다 (Fire)',
        subtext: '도전은 나를 더 뜨겁게 불태우는 연료입니다.',
        value: 'fire'
      },
      {
        label: '유연한 적응! 물처럼 벽의 틈새를 흐르고 상황의 파도에 몸을 맡기며 부드럽게 넘긴다 (Water)',
        subtext: '부드러움이 가장 강한 것을 이깁니다.',
        value: 'water'
      },
      {
        label: '철저한 버티기! 흔들리지 않고 한 걸음씩 인내하며 견고하게 땅을 다져나간다 (Earth)',
        subtext: '시간은 결국 끈기 있는 자의 편입니다.',
        value: 'earth'
      },
      {
        label: '기발한 우회로! "벽을 넘을 필요 없이 다른 길로 날아가면 되잖아?"라며 판을 바꾼다 (Air)',
        subtext: '지성과 유연한 발상이 모든 문제를 우아하게 풉니다.',
        value: 'air'
      }
    ]
  }
];

// 6. Detailed Blood Type Social Dynamics (4 cultural interactive items)
export const DETAILED_BLOOD_QUESTIONS: DetailedQuestion[] = [
  {
    id: 'blood-1',
    dimension: 'blood',
    subCategory: '모임에서의 소셜 포지션',
    scenario: '5~6명의 친구들이 모여 저녁 메뉴나 약속 장소를 정하는 상황입니다.',
    question: '이 대화에서 나의 가장 자연스러운 행동 포지션은?',
    options: [
      {
        label: '조용히 상대방들의 취향과 못 먹는 음식을 먼저 살피며 배려하는 세심한 조율자',
        subtext: '상대방의 기분을 거스르지 않고 화합을 이끄는 A형 성향',
        value: 'A'
      },
      {
        label: '"난 오늘 양꼬치 땡기는데? 가자!" 하고 확실한 자기 취향과 직관을 던지는 마이웨이',
        subtext: '호불호가 확실하고 솔직 담백하게 분위기를 이끄는 B형 성향',
        value: 'B'
      },
      {
        label: '"자, 후보 3개 정하자! 투표해서 바로 가자!" 시원시원하게 판을 정리하는 열정 리더',
        subtext: '친화력과 포용력으로 모임의 중심을 잡는 O형 성향',
        value: 'O'
      },
      {
        label: '한 발짝 물러서서 가성비, 웨이팅 시간, 동선을 객관적으로 비교해 추천하는 실용 분석가',
        subtext: '감정적인 휩쓸림 없이 합리적 대안을 제시하는 AB형 성향',
        value: 'AB'
      }
    ]
  },
  {
    id: 'blood-2',
    dimension: 'blood',
    subCategory: '서운한 일의 표현 방식',
    scenario: '친구에게 서운하거나 마음에 걸리는 일이 생겼을 때입니다.',
    question: '나는 그 서운함을 어떻게 다루나요?',
    options: [
      {
        label: '겉으로는 티를 안 내고 속으로 삭히다가, 나중에 조심스럽게 속마음을 털어놓는다',
        subtext: '관계의 파장을 최소화하려는 속 깊은 배려의 A형 스타일',
        value: 'A'
      },
      {
        label: '그 자리에서 "야 너 방금 그 말 좀 심했다?" 하고 시원하게 말하고 쿨하게 털어버린다',
        subtext: '뒤끝 없이 즉시 표현하고 담백하게 넘어가는 B형 스타일',
        value: 'B'
      },
      {
        label: '약간 자존심이 상하지만, 내 사람이라는 의리가 있으면 털털하게 넘어가 준다',
        subtext: '대범한 포용력과 강한 의리를 중요시하는 O형 스타일',
        value: 'O'
      },
      {
        label: '감정싸움을 하기보다 상대방과의 심리적 거리를 한 걸음 벌리며 조용히 선을 긋는다',
        subtext: '불필요한 감정 소모를 원천 차단하는 합리적 AB형 스타일',
        value: 'AB'
      }
    ]
  },
  {
    id: 'blood-3',
    dimension: 'blood',
    subCategory: '첫인상과 친해졌을 때의 갭차이',
    scenario: '처음 만났을 때와 아주 친해졌을 때, 친구들이 말하는 나의 반전 매력은?',
    question: '나라는 사람의 숨겨진 입체적 매력은?',
    options: [
      {
        label: '처음엔 얌전하고 조용해 보였는데, 친해지면 속 깊은 장난꾸러기에 세상 다정하다',
        subtext: 'A형: 신뢰가 쌓이면 무장해제되는 진솔한 온기',
        value: 'A'
      },
      {
        label: '처음엔 낯을 가리거나 시크해 보였는데, 친해지면 엉뚱하고 매력적인 비글미 폭발',
        subtext: 'B형: 정해진 틀을 깨는 독창적인 매력 덩어리',
        value: 'B'
      },
      {
        label: '처음부터 활발하고 털털했는데, 알면 알수록 내 사람에 대한 책임감과 속정이 엄청 깊다',
        subtext: 'O형: 화끈한 리더십 뒤에 숨겨진 든든한 바람막이',
        value: 'O'
      },
      {
        label: '처음엔 4차원 같거나 차가워 보였는데, 알수록 따뜻하고 독특한 천재적 감성이 있다',
        subtext: 'AB형: 냉철한 지성과 신비로운 순수함의 공존',
        value: 'AB'
      }
    ]
  },
  {
    id: 'blood-4',
    dimension: 'blood',
    subCategory: '실제 내 혈액형 확인',
    scenario: '나의 실제 생물학적 혈액형을 최종적으로 확인하거나 선택해 주세요.',
    question: '당신의 혈액형은 무엇인가요?',
    options: [
      {
        label: 'A형 (꼼꼼하고 사려 깊은 세심한 배려가)',
        subtext: '상대방의 입장을 먼저 생각하는 신중한 조화의 매력',
        value: 'A'
      },
      {
        label: 'B형 (틀에 갇히지 않는 솔직 담백한 자유로운 영혼)',
        subtext: '열정적인 호기심과 거침없는 창의적 에너지의 매력',
        value: 'B'
      },
      {
        label: 'O형 (친화력 넘치는 털털함과 의리의 리더)',
        subtext: '사람들을 하나로 모으는 포용력과 적극적인 추진력',
        value: 'O'
      },
      {
        label: 'AB형 (지성과 감성을 넘나드는 다면적 합리주의자)',
        subtext: '객관적인 관찰력과 독립적인 취향을 지닌 매력',
        value: 'AB'
      }
    ]
  }
];

export function getQuestionsForDimension(dimension: DimensionKey): DetailedQuestion[] {
  switch (dimension) {
    case 'mbti': return DETAILED_MBTI_QUESTIONS;
    case 'attachment': return DETAILED_ATTACHMENT_QUESTIONS;
    case 'chronotype': return DETAILED_CHRONOTYPE_QUESTIONS;
    case 'stress': return DETAILED_STRESS_QUESTIONS;
    case 'element': return DETAILED_ELEMENT_QUESTIONS;
    case 'blood': return DETAILED_BLOOD_QUESTIONS;
  }
}
