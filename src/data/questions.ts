export interface TestQuestion {
  id: number;
  category: 'mbti_ei' | 'mbti_sn' | 'mbti_tf' | 'mbti_jp' | 'attachment' | 'chronotype' | 'stress' | 'element';
  categoryLabel: string;
  dimensionTitle: string;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    scoreWeight?: number;
  }[];
}

export const TEST_QUESTIONS: TestQuestion[] = [
  // 1. MBTI - E vs I
  {
    id: 1,
    category: 'mbti_ei',
    categoryLabel: '에너지 방향',
    dimensionTitle: 'MBTI (외향 vs 내향)',
    question: '지치고 힘든 한 주를 보낸 뒤, 주말에 에너지를 채우는 가장 완벽한 방법은?',
    subtitle: '내가 진짜 충전되는 순간을 골라보세요.',
    options: [
      {
        label: '보고 싶었던 사람들을 만나 신나게 이야기하고 활동하기',
        description: '사람들 속에서 웃고 떠들 때 에너지가 차오릅니다.',
        value: 'E'
      },
      {
        label: '조용한 방에서 아무 방해도 받지 않고 혼자 침대 뒹굴거리기',
        description: '혼자만의 고요한 시간이어야 배터리가 충전됩니다.',
        value: 'I'
      }
    ]
  },
  {
    id: 2,
    category: 'mbti_ei',
    categoryLabel: '에너지 방향',
    dimensionTitle: 'MBTI (외향 vs 내향)',
    question: '처음 간 모임이나 파티에 들어섰을 때 나의 자연스러운 모습은?',
    subtitle: '나의 사교 패턴을 떠올려보세요.',
    options: [
      {
        label: '새로운 사람들에게 먼저 말을 걸고 분위기를 주도한다',
        description: '새로운 만남은 언제나 흥미롭고 호기심이 생깁니다.',
        value: 'E'
      },
      {
        label: '아는 사람 옆에 붙어있거나 먼저 다가와 주길 기다린다',
        description: '낯선 사람들과의 긴 대화는 기가 빨립니다.',
        value: 'I'
      }
    ]
  },

  // 2. MBTI - S vs N
  {
    id: 3,
    category: 'mbti_sn',
    categoryLabel: '인식 및 정보 수집',
    dimensionTitle: 'MBTI (감각 vs 직관)',
    question: '새로운 프로젝트나 아이디어를 마주했을 때 내 머릿속에 먼저 떠오르는 것은?',
    subtitle: '정보를 해석하는 나의 렌즈는?',
    options: [
      {
        label: '실현 가능한 구체적 일정, 예산, 실제 성공 사례들',
        description: '손에 잡히는 팩트와 현실적인 실행 가능성이 우선입니다.',
        value: 'S'
      },
      {
        label: '이것이 가져올 파급력, 기발한 비전, 숨겨진 의미와 가능성',
        description: '미래의 청사진과 번뜩이는 영감이 먼저 가슴을 뛰게 합니다.',
        value: 'N'
      }
    ]
  },
  {
    id: 4,
    category: 'mbti_sn',
    categoryLabel: '인식 및 정보 수집',
    dimensionTitle: 'MBTI (감각 vs 직관)',
    question: '멍때릴 때 나의 머릿속 생각은 주로 어디로 흘러가나요?',
    subtitle: '평소 생각의 흐름을 관찰해 보세요.',
    options: [
      {
        label: '오늘 먹을 점심 메뉴, 퇴근길 동선, 방금 일어난 실제 일들',
        description: '현재 눈앞의 오감과 현실적인 일상사에 머뭅니다.',
        value: 'S'
      },
      {
        label: '만약 좀비가 나타난다면? 인간이란 무엇일까? 꼬리를 무는 상상',
        description: '현실을 넘어선 무한한 상상과 철학적 망상 속으로 여행합니다.',
        value: 'N'
      }
    ]
  },

  // 3. MBTI - T vs F
  {
    id: 5,
    category: 'mbti_tf',
    categoryLabel: '판단 및 의사결정',
    dimensionTitle: 'MBTI (사고 vs 감정)',
    question: '친구가 "나 이번에 면접 떨어졌어..."라며 울먹일 때 나의 첫 반응은?',
    subtitle: '마음속에서 본능적으로 튀어나오는 말은?',
    options: [
      {
        label: '진짜 속상했겠다... 밥은 먹었어? 내가 맛있는 거 사줄게!',
        description: '상대방의 아픈 감정을 먼저 품어주고 위로하는 것이 최우선입니다.',
        value: 'F'
      },
      {
        label: '어떤 질문이 나왔는데? 면접관 피드백은 뭐였어? 원인을 분석하자',
        description: '진짜 친구를 돕는 길은 다음번 합격을 위한 실질적 해결책 제시입니다.',
        value: 'T'
      }
    ]
  },
  {
    id: 6,
    category: 'mbti_tf',
    categoryLabel: '판단 및 의사결정',
    dimensionTitle: 'MBTI (사고 vs 감정)',
    question: '중요한 결정을 내려야 할 때, 내 마음에 가장 크게 와닿는 기준은?',
    subtitle: '결정의 최종 잣대는 무엇인가요?',
    options: [
      {
        label: '관련된 사람들의 기분과 관계의 조화, 마음의 평화',
        description: '아무리 논리적이어도 사람 마음에 상처를 주면 꺼려집니다.',
        value: 'F'
      },
      {
        label: '객관적인 원칙, 논리적 정당성, 공정함과 효율성',
        description: '감정에 휩쓸리지 않고 이성적 팩트에 근거해야 뒤탈이 없습니다.',
        value: 'T'
      }
    ]
  },

  // 4. MBTI - J vs P
  {
    id: 7,
    category: 'mbti_jp',
    categoryLabel: '생활 및 실행 양식',
    dimensionTitle: 'MBTI (판단 vs 인식)',
    question: '친구와 제주도 2박 3일 여행을 떠나기로 했습니다. 나의 준비 스타일은?',
    subtitle: '나의 여행 계획 방식을 골라보세요.',
    options: [
      {
        label: '동선별 맛집 리스트, 시간대별 스케줄, 플랜 B까지 엑셀로 정리',
        description: '계획이 딱딱 맞아떨어질 때 짜릿한 쾌감과 안정감을 느낍니다.',
        value: 'J'
      },
      {
        label: '숙소와 비행기만 끊고, 현지에서 날씨와 기분에 따라 발길 닿는 대로',
        description: '틀에 얽매이지 않고 즉흥의 묘미를 즐길 때 진정한 힐링입니다.',
        value: 'P'
      }
    ]
  },
  {
    id: 8,
    category: 'mbti_jp',
    categoryLabel: '생활 및 실행 양식',
    dimensionTitle: 'MBTI (판단 vs 인식)',
    question: '중요한 과제나 마감 기한이 주어졌을 때 내 작업 흐름은?',
    subtitle: '일하는 스타일을 돌아보세요.',
    options: [
      {
        label: '첫날부터 날짜별 분량을 쪼개어 마감 2~3일 전에 미리 완료',
        description: '마감에 쫓기는 스트레스를 피하기 위해 미리미리 끝내둡니다.',
        value: 'J'
      },
      {
        label: '미루고 미루다가 마감 전날 밤 초인적인 벼락치기로 집중 폭발',
        description: '마감 직전의 아드레날린이 최고의 퀄리티와 몰입을 만들어냅니다.',
        value: 'P'
      }
    ]
  },

  // 5. 애착유형 (Attachment Style)
  {
    id: 9,
    category: 'attachment',
    categoryLabel: '관계 심리학',
    dimensionTitle: '애착 유형 (Attachment Style)',
    question: '연인이나 아주 가까운 사람이 연락이 몇 시간째 닿지 않을 때 나의 심리는?',
    subtitle: '관계 속에서 불안과 친밀감을 다루는 무의식 패턴입니다.',
    options: [
      {
        label: '"무슨 일 있나 보네, 이따 오겠지" 하고 내 할 일에 집중한다',
        description: '상대를 신뢰하며 내 일상을 편안하게 유지합니다. (안정형)',
        value: 'secure'
      },
      {
        label: '"혹시 내가 뭐 실수했나? 나한테 마음이 식었나?" 끝없는 불안과 초조함',
        description: '작은 연락 부재에도 버림받을지 모른다는 유기 불안이 솟구칩니다. (불안형)',
        value: 'anxious'
      },
      {
        label: '"오히려 좋아. 나도 나만의 자유 시간을 누려야지" 하고 신경을 끈다',
        description: '상대가 너무 끈적하게 매달리지 않는 거리를 선호합니다. (회피형)',
        value: 'avoidant'
      },
      {
        label: '서운하고 화가 나면서도, 내가 먼저 연락했다가 상처받을까 봐 밀어낸다',
        description: '친밀해지고 싶으면서도 다가오면 겁이 나 방어막을 칩니다. (공포회피형)',
        value: 'fearful'
      }
    ]
  },
  {
    id: 10,
    category: 'attachment',
    categoryLabel: '관계 심리학',
    dimensionTitle: '애착 유형 (갈등 해결 방식)',
    question: '연인이나 절친과 심각한 의견 충돌이나 서운함이 생겼을 때 나의 태도는?',
    subtitle: '가장 편안하게 느끼는 소통 방식을 골라보세요.',
    options: [
      {
        label: '감정을 차분히 가라앉히고 솔직하게 내 마음을 털어놓으며 대화로 푼다',
        description: '갈등을 회피하지 않고 상호 신뢰 속에서 풀어냅니다. (안정형)',
        value: 'secure'
      },
      {
        label: '당장 지금 끝장 대화를 해서 나를 사랑하는지 확인받아야 잠이 온다',
        description: '침묵을 견디지 못하고 즉각적인 애정 확인을 원합니다. (불안형)',
        value: 'anxious'
      },
      {
        label: '지금 말 섞기 싫고 숨이 막히니 문 닫고 내 동굴로 들어가 버린다',
        description: '감정적인 압박을 견디기 힘들어 차갑게 선을 긋습니다. (회피형)',
        value: 'avoidant'
      },
      {
        label: '상대에게 실망해서 마음을 닫았다가도 나를 떠날까 봐 전전긍긍한다',
        description: '복합적인 감정의 소용돌이 속에서 혼란을 겪습니다. (공포회피형)',
        value: 'fearful'
      }
    ]
  },

  // 6. 크로노타입 (Chronotype)
  {
    id: 11,
    category: 'chronotype',
    categoryLabel: '생체 리듬',
    dimensionTitle: '크로노타입 (수면 & 생체 바이오리듬)',
    question: '아무 일정도 없는 휴일, 알람 없이 눈을 떴을 때 나의 가장 자연스러운 하루는?',
    subtitle: '내 뇌와 신체가 가장 맑아지는 골든타임을 찾아보세요.',
    options: [
      {
        label: '아침 6~7시경 상쾌하게 눈이 떠지며, 오전 9~12시에 집중력이 폭발한다',
        description: '일찍 일어나 세상을 앞서가는 뼛속까지 얼리버드 (사자형 / Lion)',
        value: 'lion'
      },
      {
        label: '해와 함께 오전 7~8시에 일어나고, 오후에 살짝 졸리며, 밤 11시쯤 잠든다',
        description: '대다수의 사람들과 호흡을 같이하는 태양 주기형 (곰형 / Bear)',
        value: 'bear'
      },
      {
        label: '아침 기상은 지옥이지만, 밤 10시가 넘어가면 뇌가 맑아지고 각성한다',
        description: '새벽까지 영감과 창의력이 샘솟는 심야 야행성 (늑대형 / Wolf)',
        value: 'wolf'
      },
      {
        label: '잠귀가 밝아 깊이 못 자고 수면 리듬이 불규칙하지만, 순간 몰입력이 뛰어나다',
        description: '예민한 신경과 완벽주의를 지닌 스마트 사색가 (돌고래형 / Dolphin)',
        value: 'dolphin'
      }
    ]
  },

  // 7. 스트레스 대처 유형 (Stress Defense)
  {
    id: 12,
    category: 'stress',
    categoryLabel: '멘탈 관리법',
    dimensionTitle: '스트레스 대처 유형 (방어기제)',
    question: '극심한 스트레스와 멘탈 붕괴 상황이 닥쳤을 때, 내가 본능적으로 하는 행동은?',
    subtitle: '나를 치유하는 영혼의 회복 프로토콜은?',
    options: [
      {
        label: '모든 알림을 끄고 침대 이불 속 동굴로 들어가 아무와도 말하지 않는다',
        description: '외부 자극을 차단하고 침묵의 시간을 가질 때 치유됩니다. (동굴잠수형)',
        value: 'cave'
      },
      {
        label: '친한 친구를 소환해서 카페나 술자리에서 3시간 동안 속마음을 쏟아낸다',
        description: '말하고 공감받을 때 마음에 맺힌 멍울이 시원하게 풀립니다. (폭풍수다형)',
        value: 'talk'
      },
      {
        label: '헬스장에서 땀을 뻘뻘 흘리거나, 매운 음식을 먹거나, 방을 뒤엎고 청소한다',
        description: '몸을 격렬하게 움직이거나 오감을 자극해 잡념을 날립니다. (행동폭주형)',
        value: 'action'
      },
      {
        label: '메모장을 켜고 "문제의 근본 원인과 단계별 해결책"을 조목조목 분석한다',
        description: '상황을 객관적으로 해부하고 이성적 통제력을 찾을 때 편안해집니다. (이성분석형)',
        value: 'logic'
      }
    ]
  },

  // 8. 4대 원소 기질론 (4 Elements Temperament)
  {
    id: 13,
    category: 'element',
    categoryLabel: '고대 기질론',
    dimensionTitle: '4대 원소 기질 (Fire, Water, Earth, Air)',
    question: '친구들이 나를 떠올릴 때 가장 많이 하는 말이나 나의 본질적인 아우라는?',
    subtitle: '당신이라는 사람의 고유한 에너지 색채는?',
    options: [
      {
        label: '열정적이고 화끈하며, 한 번 꽂히면 브레이크 없이 돌진하는 불꽃 (Fire)',
        description: '강력한 추진력과 직관으로 주위를 뜨겁게 달굽니다.',
        value: 'fire'
      },
      {
        label: '섬세하고 감수성이 풍부하며, 상처받은 마음을 따뜻하게 안아주는 바다 (Water)',
        description: '깊은 공감과 유연한 배려로 사람들의 마음을 치유합니다.',
        value: 'water'
      },
      {
        label: '한결같고 신뢰로우며, 어떤 폭풍우에도 흔들리지 않고 곁을 지키는 대지 (Earth)',
        description: '단단한 현실감과 끈기로 가장 든든한 버팀목이 됩니다.',
        value: 'earth'
      },
      {
        label: '자유롭고 호기심이 넘치며, 틀에 갇히지 않고 신선한 아이디어를 던지는 바람 (Air)',
        description: '산뜻한 지성과 위트로 경쾌한 영감을 불어넣습니다.',
        value: 'air'
      }
    ]
  }
];
