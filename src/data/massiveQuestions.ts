import { DimensionKey } from './detailedQuestions';

export interface LikertQuestion {
  id: string;
  dimension: DimensionKey;
  subScale: string;
  categoryLabel: string;
  question: string;
  weightKey: string;
  detailContext?: string;
}

export const LIKERT_OPTIONS = [
  { value: 1, label: '전혀 아니다', shortLabel: '1', subtext: '전혀 아님' },
  { value: 2, label: '그렇지 않다', shortLabel: '2', subtext: '대체로 아님' },
  { value: 3, label: '보통이다', shortLabel: '3', subtext: '반반이다' },
  { value: 4, label: '그런 편이다', shortLabel: '4', subtext: '대체로 그러함' },
  { value: 5, label: '매우 그렇다', shortLabel: '5', subtext: '완전히 그러함' }
];

// MBTI 32 문항 (8 EI, 8 SN, 8 TF, 8 JP)
export const MBTI_32_QUESTIONS: LikertQuestion[] = [
  { id: 'm_ei_1', dimension: 'mbti', subScale: 'EI', categoryLabel: '에너지 충전', question: '주말에 사람들을 만나 대화하고 활동할 때 지친 에너지가 진정으로 회복된다고 느낀다.', weightKey: 'E' },
  { id: 'm_ei_2', dimension: 'mbti', subScale: 'EI', categoryLabel: '사교적 주도성', question: '처음 보는 사람들과의 모임에서도 어색함 없이 먼저 말을 건네고 분위기를 이끄는 편이다.', weightKey: 'E' },
  { id: 'm_ei_3', dimension: 'mbti', subScale: 'EI', categoryLabel: '생각의 표출', question: '혼자 오래 생각하기보다 사람들과 대화를 나누면서 내 생각이 명확하게 정리되는 편이다.', weightKey: 'E' },
  { id: 'm_ei_4', dimension: 'mbti', subScale: 'EI', categoryLabel: '주목과 관심', question: '여럿이 모인 자리에서 사람들의 관심이나 대화의 중심에 서는 것이 자연스럽고 즐겁다.', weightKey: 'E' },
  { id: 'm_ei_5', dimension: 'mbti', subScale: 'EI', categoryLabel: '고독의 필요성', question: '아무리 친한 사람이라도 하루 종일 함께 있으면 지치고, 혼자만의 고요한 방에 있어야 안도감이 든다.', weightKey: 'I' },
  { id: 'm_ei_6', dimension: 'mbti', subScale: 'EI', categoryLabel: '소수와의 깊은 유대', question: '넓고 얕은 인간관계보다는, 아주 소수의 깊은 영혼의 친구 몇 명과만 관계를 맺길 선호한다.', weightKey: 'I' },
  { id: 'm_ei_7', dimension: 'mbti', subScale: 'EI', categoryLabel: '내면의 침잠', question: '내 속마음이나 깊은 고민을 밖으로 쉽게 털어놓지 않고, 혼자 오랫동안 속으로 삭힌다.', weightKey: 'I' },
  { id: 'm_ei_8', dimension: 'mbti', subScale: 'EI', categoryLabel: '사교 피로도', question: '사람이 많은 번화가나 시끄러운 파티에 다녀오면 영혼이 방전된 것처럼 극심한 피로를 느낀다.', weightKey: 'I' },

  { id: 'm_sn_1', dimension: 'mbti', subScale: 'SN', categoryLabel: '현실 데이터 지향', question: '아이디어나 제안을 들을 때 막연한 가능성보다 손에 잡히는 구체적 데이터와 검증된 사례를 원한다.', weightKey: 'S' },
  { id: 'm_sn_2', dimension: 'mbti', subScale: 'SN', categoryLabel: '오감 관찰력', question: '주변 환경이나 사람들의 옷차림, 헤어스타일, 사물의 미세한 변화를 누구보다 빠르게 알아차린다.', weightKey: 'S' },
  { id: 'm_sn_3', dimension: 'mbti', subScale: 'SN', categoryLabel: '실용성과 현재', question: '"만약에 그럴 수도 있잖아"라는 뜬구름 잡는 가정보다, 지금 당장 눈앞의 현실 처리에 집중한다.', weightKey: 'S' },
  { id: 'm_sn_4', dimension: 'mbti', subScale: 'SN', categoryLabel: '검증된 매뉴얼', question: '새로운 기기나 요리를 할 때 내 감으로 즉흥적으로 하기보다 설명서나 표준 레시피를 정독한다.', weightKey: 'S' },
  { id: 'm_sn_5', dimension: 'mbti', subScale: 'SN', categoryLabel: '직관과 미래 비전', question: '당장의 현실적인 한계보다는, 10년 뒤의 미래나 새로운 패러다임의 가능성을 상상할 때 가슴이 뛴다.', weightKey: 'N' },
  { id: 'm_sn_6', dimension: 'mbti', subScale: 'SN', categoryLabel: '비유와 숨은 의미', question: '말이나 글에 담긴 직관적인 비유, 철학적 상징, 이면의 행간을 파악하는 데 흥미를 느낀다.', weightKey: 'N' },
  { id: 'm_sn_7', dimension: 'mbti', subScale: 'SN', categoryLabel: '기발한 상상력', question: '멍때릴 때 "인류가 멸망한다면?", "우주 밖엔 뭐가 있을까?" 등 끝없는 공상에 자주 빠진다.', weightKey: 'N' },
  { id: 'm_sn_8', dimension: 'mbti', subScale: 'SN', categoryLabel: '틀을 깨는 혁신', question: '기존에 해오던 익숙한 방식보다, 비효율적이더라도 새롭고 독창적인 방식으로 시도하는 걸 좋아한다.', weightKey: 'N' },

  { id: 'm_tf_1', dimension: 'mbti', subScale: 'TF', categoryLabel: '해결책 우선', question: '친구가 억울하거나 힘든 일을 토로할 때, 감정적 위로보다 구체적이고 실질적인 해결책을 먼저 찾는다.', weightKey: 'T' },
  { id: 'm_tf_2', dimension: 'mbti', subScale: 'TF', categoryLabel: '원칙과 논리', question: '의사결정을 내릴 때 감정이나 인간관계에 흔들리지 않고 원칙과 논리적 타당성을 최우선으로 둔다.', weightKey: 'T' },
  { id: 'm_tf_3', dimension: 'mbti', subScale: 'TF', categoryLabel: '비판적 분석력', question: '대화 중 누군가의 논리에 모순이나 허점이 보이면 본능적으로 이를 지적하고 바로잡고 싶다.', weightKey: 'T' },
  { id: 'm_tf_4', dimension: 'mbti', subScale: 'TF', categoryLabel: '직설적 피드백', question: '상대방의 기분을 위해 듣기 좋은 말을 꾸며내기보다, 차라리 뼈아픈 진실을 솔직하게 말하는 편이다.', weightKey: 'T' },
  { id: 'm_tf_5', dimension: 'mbti', subScale: 'TF', categoryLabel: '공감과 정서 수용', question: '친구가 슬퍼하면 나도 모르게 가슴이 먹먹해지고, 옳고 그름을 떠나 일단 그 사람의 편이 되어준다.', weightKey: 'F' },
  { id: 'm_tf_6', dimension: 'mbti', subScale: 'TF', categoryLabel: '관계의 화합 중시', question: '내 주장이 아무리 맞아도 상대방의 마음이 상하거나 분위기가 냉각될 것 같으면 말을 아낀다.', weightKey: 'F' },
  { id: 'm_tf_7', dimension: 'mbti', subScale: 'TF', categoryLabel: '말의 온도에 민감', question: '대화할 때 상대방의 말투, 억양, 표정의 차가움에 매우 민감하여 쉽게 마음의 상처를 받는다.', weightKey: 'F' },
  { id: 'm_tf_8', dimension: 'mbti', subScale: 'TF', categoryLabel: '도덕적 가치와 인정', question: '결정을 할 때 효율성과 이익보다는 "이것이 사람들에게 따뜻하고 옳은 일인가"를 가장 깊이 고뇌한다.', weightKey: 'F' },

  { id: 'm_jp_1', dimension: 'mbti', subScale: 'JP', categoryLabel: '일정 계획과 루틴', question: '하루 일과나 주말 일정을 시간대별로 대략이라도 계획해 두어야 마음이 편안하다.', weightKey: 'J' },
  { id: 'm_jp_2', dimension: 'mbti', subScale: 'JP', categoryLabel: '선제적 마감 처리', question: '과제나 업무 마감일이 주어지면 마감 직전에 몰아서 하기보다 미리미리 끝내두는 편이다.', weightKey: 'J' },
  { id: 'm_jp_3', dimension: 'mbti', subScale: 'JP', categoryLabel: '정리정돈과 체계화', question: '내 방이나 컴퓨터 바탕화면, 메모장이 정돈되어 있지 않고 어수선하면 집중하기 어렵다.', weightKey: 'J' },
  { id: 'm_jp_4', dimension: 'mbti', subScale: 'JP', categoryLabel: '돌발 변수 스트레스', question: '미리 잡혀 있던 약속이나 계획이 당일 갑작스럽게 취소되거나 변경되면 큰 스트레스를 받는다.', weightKey: 'J' },
  { id: 'm_jp_5', dimension: 'mbti', subScale: 'JP', categoryLabel: '자발적 즉흥성', question: '철저한 계획표대로 움직이기보다, 그날의 기분과 우연한 끌림에 따라 자유롭게 행동하는 걸 좋아한다.', weightKey: 'P' },
  { id: 'm_jp_6', dimension: 'mbti', subScale: 'JP', categoryLabel: '마감 직전의 몰입력', question: '마감일 직전까지 여유를 부리다가, 발등에 불이 떨어졌을 때 초인적인 집중력이 발휘된다.', weightKey: 'P' },
  { id: 'm_jp_7', dimension: 'mbti', subScale: 'JP', categoryLabel: '결정의 유보', question: '결론을 성급하게 매듭짓기보다, 더 좋은 대안이나 새로운 정보가 나올 때까지 선택을 열어둔다.', weightKey: 'P' },
  { id: 'm_jp_8', dimension: 'mbti', subScale: 'JP', categoryLabel: '자유분방한 일상', question: '물건의 정돈 상태나 엄격한 규칙보다는 내 활동의 편의성과 자유로운 흐름이 훨씬 중요하다.', weightKey: 'P' }
];


// 2. 애착유형 20문항 (10 불안, 10 회피)
export const ATTACHMENT_20_QUESTIONS: LikertQuestion[] = [
  { id: 'a_anx_1', dimension: 'attachment', subScale: 'ANX', categoryLabel: '연락과 유기 불안', question: '소중한 연인이나 친구가 몇 시간 동안 연락이 닿지 않으면 나를 떠날까 봐 불안을 느낀다.', weightKey: 'anxiety' },
  { id: 'a_anx_2', dimension: 'attachment', subScale: 'ANX', categoryLabel: '지속적 애정 확인', question: '상대방이 "나를 아직도 사랑하는지, 나와 있는 게 좋은지" 수시로 확인받아야 안심이 된다.', weightKey: 'anxiety' },
  { id: 'a_anx_3', dimension: 'attachment', subScale: 'ANX', categoryLabel: '과도한 자책감', question: '상대의 기분이 조금만 가라앉아 보여도 "내가 뭘 잘못했나?"라며 혼자 깊은 자책에 빠진다.', weightKey: 'anxiety' },
  { id: 'a_anx_4', dimension: 'attachment', subScale: 'ANX', categoryLabel: '감정적 일체감', question: '연인과 하루 종일 생각과 감정을 공유하며 하나로 완전히 융합되길 간절히 바란다.', weightKey: 'anxiety' },
  { id: 'a_anx_5', dimension: 'attachment', subScale: 'ANX', categoryLabel: '침묵 공포증', question: '갈등이 생겼을 때 시간을 두고 생각을 정리하자는 상대방의 침묵을 1분도 견디기 힘들다.', weightKey: 'anxiety' },
  { id: 'a_anx_6', dimension: 'attachment', subScale: 'ANX', categoryLabel: '질투와 불안정감', question: '연인이나 절친이 다른 사람과 즐겁게 대화하는 모습을 보면 버림받을 것 같은 질투심이 솟구친다.', weightKey: 'anxiety' },
  { id: 'a_anx_7', dimension: 'attachment', subScale: 'ANX', categoryLabel: '상대의 관심 갈구', question: '내 하루의 행복과 기분이 상대방의 사소한 카톡 답장 속도나 단어 선택에 크게 휘둘린다.', weightKey: 'anxiety' },
  { id: 'a_anx_8', dimension: 'attachment', subScale: 'ANX', categoryLabel: '헌신적 매달림', question: '상대가 나를 떠나지 않게 하기 위해서라면 내 자존심이나 취향을 기꺼이 포기할 수 있다.', weightKey: 'anxiety' },
  { id: 'a_anx_9', dimension: 'attachment', subScale: 'ANX', categoryLabel: '거절에 대한 공포', question: '내 부탁이나 제안을 상대방이 거절했을 때, 나라는 존재 자체가 부정당한 것 같은 수치심을 느낀다.', weightKey: 'anxiety' },
  { id: 'a_anx_10', dimension: 'attachment', subScale: 'ANX', categoryLabel: '미래에 대한 불신', question: '지금 관계가 아무리 행복해도 "결국 언젠가는 날 버리고 떠나겠지"라는 비관적 두려움이 엄습한다.', weightKey: 'anxiety' },

  { id: 'a_avd_1', dimension: 'attachment', subScale: 'AVD', categoryLabel: '친밀감 거부', question: '누군가와 지나치게 감정적으로 가까워지면 숨이 턱 막히고 구속당하는 느낌이 들어 거리를 둔다.', weightKey: 'avoidance' },
  { id: 'a_avd_2', dimension: 'attachment', subScale: 'AVD', categoryLabel: '과도한 자립심', question: '타인에게 마음을 의지하는 것은 나약한 일이며, 결국 세상에서 믿을 수 있는 건 나 자신뿐이다.', weightKey: 'avoidance' },
  { id: 'a_avd_3', dimension: 'attachment', subScale: 'AVD', categoryLabel: '취약함의 은폐', question: '내 깊은 속마음이나 눈물, 부끄러운 약점을 타인에게 드러내는 것이 극도로 불편하고 꺼려진다.', weightKey: 'avoidance' },
  { id: 'a_avd_4', dimension: 'attachment', subScale: 'AVD', categoryLabel: '갈등 시 동굴 도피', question: '갈등이나 심각한 감정 대화가 시작되면 귀를 막고 내 방으로 숨거나 연락을 끊어버린다.', weightKey: 'avoidance' },
  { id: 'a_avd_5', dimension: 'attachment', subScale: 'AVD', categoryLabel: '상대의 의존 부담', question: '연인이나 친구가 나에게 깊은 정서적 위로나 징징거림을 요구하면 짜증과 피로가 치민다.', weightKey: 'avoidance' },
  { id: 'a_avd_6', dimension: 'attachment', subScale: 'AVD', categoryLabel: '개인 공간 절대 사수', question: '아무리 사랑하는 사람이라도 내 개인적인 영역, 취미, 사생활을 침범하는 것을 용납하기 힘들다.', weightKey: 'avoidance' },
  { id: 'a_avd_7', dimension: 'attachment', subScale: 'AVD', categoryLabel: '차가운 이성 방어', question: '감정이 격해질 때 눈물이나 애원을 하기보다 차갑게 선을 긋고 논리적인 척하며 상대를 밀어낸다.', weightKey: 'avoidance' },
  { id: 'a_avd_8', dimension: 'attachment', subScale: 'AVD', categoryLabel: '독신 지향', question: '평생의 약속이나 깊은 계약 관계를 생각하면 내 자유를 영원히 잃어버릴까 봐 두렵다.', weightKey: 'avoidance' },
  { id: 'a_avd_9', dimension: 'attachment', subScale: 'AVD', categoryLabel: '애정 표현의 인색함', question: '사랑한다는 말이나 끈끈한 스킨십을 지속적으로 요구받으면 왠지 낯간지럽고 도망치고 싶어진다.', weightKey: 'avoidance' },
  { id: 'a_avd_10', dimension: 'attachment', subScale: 'AVD', categoryLabel: '선제적 단절', question: '상대방이 나에게 실망해서 떠나기 전에, 내가 먼저 정을 떼고 차갑게 돌아서는 편이다.', weightKey: 'avoidance' }
];

// 3. 크로노타입 20문항 (5 Lion, 5 Bear, 5 Wolf, 5 Dolphin)
export const CHRONOTYPE_20_QUESTIONS: LikertQuestion[] = [
  { id: 'c_lion_1', dimension: 'chronotype', subScale: 'LION', categoryLabel: '새벽 기상', question: '알람 시계가 없어도 아침 5시 30분 ~ 6시 30분 사이에 저절로 눈이 번쩍 떠진다.', weightKey: 'lion' },
  { id: 'c_lion_2', dimension: 'chronotype', subScale: 'LION', categoryLabel: '오전 골든타임', question: '하루 중 가장 중요한 일이나 고난도 공부는 오전 8시 ~ 12시에 할 때 효율이 최고조에 달한다.', weightKey: 'lion' },
  { id: 'c_lion_3', dimension: 'chronotype', subScale: 'LION', categoryLabel: '아침 생산성', question: '아침 일찍 일어나 운동을 하거나 하루 계획을 세우며 남들보다 먼저 하루를 시작할 때 짜릿하다.', weightKey: 'lion' },
  { id: 'c_lion_4', dimension: 'chronotype', subScale: 'LION', categoryLabel: '초저녁 방전', question: '밤 9~10시만 되면 배터리가 급격히 소진되어 눕자마자 기절하듯 잠자리에 든다.', weightKey: 'lion' },
  { id: 'c_lion_5', dimension: 'chronotype', subScale: 'LION', categoryLabel: '심야 기피', question: '자정을 넘긴 심야 술자리나 밤샘 작업은 내 몸과 뇌에 쥐약처럼 고통스럽다.', weightKey: 'lion' },

  { id: 'c_bear_1', dimension: 'chronotype', subScale: 'BEAR', categoryLabel: '태양 주기 기상', question: '해가 뜨는 아침 7시 ~ 8시 사이에 일어나는 것이 가장 개운하고 신체 리듬에 맞는다.', weightKey: 'bear' },
  { id: 'c_bear_2', dimension: 'chronotype', subScale: 'BEAR', categoryLabel: '한낮 생산성', question: '오전 10시부터 오후 2시까지의 한낮 시간대에 집중력과 업무 적응력이 가장 원만하다.', weightKey: 'bear' },
  { id: 'c_bear_3', dimension: 'chronotype', subScale: 'BEAR', categoryLabel: '오후 식곤증', question: '점심 식사 후 오후 2~3시경에 졸음이 쏟아져 20분 정도 낮잠이나 휴식이 절실하다.', weightKey: 'bear' },
  { id: 'c_bear_4', dimension: 'chronotype', subScale: 'BEAR', categoryLabel: '안정적 수면', question: '밤 11시 ~ 자정 무렵에 잠자리에 들고 7~8시간 푹 자는 표준적 수면 리듬을 유지한다.', weightKey: 'bear' },
  { id: 'c_bear_5', dimension: 'chronotype', subScale: 'BEAR', categoryLabel: '사회적 호흡', question: '대부분의 약속이나 모임 시간(점심, 저녁)에 큰 무리 없이 자연스럽게 맞춰갈 수 있다.', weightKey: 'bear' },

  { id: 'c_wolf_1', dimension: 'chronotype', subScale: 'WOLF', categoryLabel: '아침 기상 고통', question: '오전 9시 이전에 일어나는 것은 고문과 같으며, 일어나도 점심 전까지 뇌가 멍하고 무겁다.', weightKey: 'wolf' },
  { id: 'c_wolf_2', dimension: 'chronotype', subScale: 'WOLF', categoryLabel: '야간 창의성', question: '남들이 자러 가는 밤 11시 ~ 새벽 2시 사이에 아이디어와 영감이 미친 듯이 솟구친다.', weightKey: 'wolf' },
  { id: 'c_wolf_3', dimension: 'chronotype', subScale: 'WOLF', categoryLabel: '심야 감성', question: '새벽의 고요하고 적막한 공기 속에서 작업하거나 취미를 즐길 때 진정한 자유를 느낀다.', weightKey: 'wolf' },
  { id: 'c_wolf_4', dimension: 'chronotype', subScale: 'WOLF', categoryLabel: '저녁 각성', question: '하루 중 에너지가 가장 쌩쌩하게 살아나는 시간은 해가 진 저녁 7시 이후부터이다.', weightKey: 'wolf' },
  { id: 'c_wolf_5', dimension: 'chronotype', subScale: 'WOLF', categoryLabel: '새벽 취침', question: '특별한 이유가 없어도 새벽 1~3시까지 깨어있는 것이 내 신체에 가장 자연스럽다.', weightKey: 'wolf' },

  { id: 'c_dlp_1', dimension: 'chronotype', subScale: 'DOLPHIN', categoryLabel: '예민한 수면', question: '작은 소리나 미세한 불빛에도 잠에서 깨며, 깊은 잠을 자지 못하고 자주 뒤척인다.', weightKey: 'dolphin' },
  { id: 'c_dlp_2', dimension: 'chronotype', subScale: 'DOLPHIN', categoryLabel: '불규칙한 리듬', question: '매일 자고 일어나는 시간이 들쭉날쭉하며, 누워도 잡생각이 꼬리를 물어 쉽게 잠들지 못한다.', weightKey: 'dolphin' },
  { id: 'c_dlp_3', dimension: 'chronotype', subScale: 'DOLPHIN', categoryLabel: '단기 번개 몰입', question: '하루 종일 일정하게 일하기보다, 짧은 시간 동안 고도의 집중력을 발휘해 순식간에 끝낸다.', weightKey: 'dolphin' },
  { id: 'c_dlp_4', dimension: 'chronotype', subScale: 'DOLPHIN', categoryLabel: '만성 신경 피로', question: '신경계가 늘 긴장되어 있어 피로감을 쉽게 느끼며, 카페인이나 자극에 매우 민감하다.', weightKey: 'dolphin' },
  { id: 'c_dlp_5', dimension: 'chronotype', subScale: 'DOLPHIN', categoryLabel: '완벽주의 각성', question: '미해결된 과제나 마음의 불안이 있으면 잠을 이룰 수 없어 밤을 꼬박 새우기도 한다.', weightKey: 'dolphin' }
];


// 4. 스트레스 대처 20문항 (5 Cave, 5 Talk, 5 Action, 5 Logic)
export const STRESS_20_QUESTIONS: LikertQuestion[] = [
  { id: 's_cave_1', dimension: 'stress', subScale: 'CAVE', categoryLabel: '외부 자극 차단', question: '스트레스를 극도로 받으면 스마트폰을 끄고 방 문을 걸어 잠근 뒤 침대 속으로 숨는다.', weightKey: 'cave' },
  { id: 's_cave_2', dimension: 'stress', subScale: 'CAVE', categoryLabel: '침묵 속 삭힘', question: '힘든 일이 있을 때 남에게 말하기보다 혼자만의 침묵 속에서 감정이 식을 때까지 삭힌다.', weightKey: 'cave' },
  { id: 's_cave_3', dimension: 'stress', subScale: 'CAVE', categoryLabel: '대화 강요 분노', question: '내가 마음의 문을 닫았을 때 "지금 당장 말해!"라며 닦달하면 숨이 막히고 폭발할 것 같다.', weightKey: 'cave' },
  { id: 's_cave_4', dimension: 'stress', subScale: 'CAVE', categoryLabel: '고립을 통한 충전', question: '아무도 나를 찾지 않는 완전한 고립의 시간을 보내고 나면 비로소 에너지가 회복된다.', weightKey: 'cave' },
  { id: 's_cave_5', dimension: 'stress', subScale: 'CAVE', categoryLabel: '감정 표출 기피', question: '흥분한 상태에서 감정을 거칠게 쏟아내는 것은 낭비이며, 차라리 입을 다무는 게 낫다.', weightKey: 'cave' },

  { id: 's_talk_1', dimension: 'stress', subScale: 'TALK', categoryLabel: '즉각적 언어화', question: '속상한 일이 있으면 친구나 연인에게 당장 털어놓고 말해야 가슴의 응어리가 풀린다.', weightKey: 'talk' },
  { id: 's_talk_2', dimension: 'stress', subScale: 'TALK', categoryLabel: '공감 중심 힐링', question: '해결책보다 "진짜 고생 많았다, 속상했겠다"라는 상대방의 리액션 한마디에 피로가 녹는다.', weightKey: 'talk' },
  { id: 's_talk_3', dimension: 'stress', subScale: 'TALK', categoryLabel: '뒤끝 없는 털어냄', question: '마음속 이야기를 1~2시간 동안 다 쏟아내고 나면 거짓말처럼 개운해져서 다시 웃을 수 있다.', weightKey: 'talk' },
  { id: 's_talk_4', dimension: 'stress', subScale: 'TALK', categoryLabel: '침묵의 답답함', question: '힘든 일이 있는데도 혼자 끙끙 앓고 말을 안 하는 사람을 보면 답답해서 미칠 것 같다.', weightKey: 'talk' },
  { id: 's_talk_5', dimension: 'stress', subScale: 'TALK', categoryLabel: '지적에 대한 상처', question: '내가 힘들어할 때 "네가 잘못한 거 아니야?"라며 팩트 폭격을 날리면 깊은 배신감을 느낀다.', weightKey: 'talk' },

  { id: 's_act_1', dimension: 'stress', subScale: 'ACTION', categoryLabel: '격렬한 신체 활동', question: '스트레스를 받으면 헬스장에서 쇠질을 하거나 러닝을 뛰며 땀을 흠뻑 흘려야 풀린다.', weightKey: 'action' },
  { id: 's_act_2', dimension: 'stress', subScale: 'ACTION', categoryLabel: '대청소와 정리', question: '마음이 복잡할 때 방 구조를 바꾸거나, 미친 듯이 쓸고 닦으며 청소를 해야 직성이 풀린다.', weightKey: 'action' },
  { id: 's_act_3', dimension: 'stress', subScale: 'ACTION', categoryLabel: '오감 자극 소비', question: '매운 음식을 배 터지게 먹거나 평소 사고 싶었던 물건을 쇼핑하며 스트레스를 날린다.', weightKey: 'action' },
  { id: 's_act_4', dimension: 'stress', subScale: 'ACTION', categoryLabel: '장소 이동', question: '집에 가만히 누워있기보다 차를 몰고 야경을 보러 가거나 낯선 곳으로 떠나야 한다.', weightKey: 'action' },
  { id: 's_act_5', dimension: 'stress', subScale: 'ACTION', categoryLabel: '무기력 기피', question: '고민만 하고 아무런 행동도 하지 않은 채 침대에 누워있는 내 모습을 보면 더 스트레스를 받는다.', weightKey: 'action' },

  { id: 's_log_1', dimension: 'stress', subScale: 'LOGIC', categoryLabel: '원인 규명 메모', question: '문제가 터졌을 때 메모장을 켜고 "이 사태의 원인과 타임라인"을 객관적으로 적어 내려간다.', weightKey: 'logic' },
  { id: 's_log_2', dimension: 'stress', subScale: 'LOGIC', categoryLabel: '해결책 수립', question: '감정에 휘둘리기보다 단계별 대안(Plan A, Plan B)을 세우고 나면 마음의 안정을 찾는다.', weightKey: 'logic' },
  { id: 's_log_3', dimension: 'stress', subScale: 'LOGIC', categoryLabel: '위로보다 해결책', question: '영혼 없는 "힘내"라는 위로보다 실질적으로 문제를 해결할 뾰족한 수가 필요하다.', weightKey: 'logic' },
  { id: 's_log_4', dimension: 'stress', subScale: 'LOGIC', categoryLabel: '통제력 회복', question: '내 삶의 예측 가능성과 통제권을 다시 쥐지 못하면 불안해서 아무것도 할 수 없다.', weightKey: 'logic' },
  { id: 's_log_5', dimension: 'stress', subScale: 'LOGIC', categoryLabel: '감정과 팩트 분리', question: '위기 상황일수록 감정을 철저히 배제하고 냉철한 3인칭 관찰자 시점으로 사태를 바라본다.', weightKey: 'logic' }
];

// 5. 4대 원소 고대 기질론 20문항 (5 Fire, 5 Water, 5 Earth, 5 Air)
export const ELEMENT_20_QUESTIONS: LikertQuestion[] = [
  { id: 'e_fire_1', dimension: 'element', subScale: 'FIRE', categoryLabel: '열정적 추진력', question: '한 번 가슴에 불이 붙으면 브레이크 없이 저돌적으로 목표를 향해 돌진한다.', weightKey: 'fire' },
  { id: 'e_fire_2', dimension: 'element', subScale: 'FIRE', categoryLabel: '승부욕과 승리', question: '경쟁이나 게임에서 지는 것을 극도로 싫어하며 1등을 해야 직성이 풀린다.', weightKey: 'fire' },
  { id: 'e_fire_3', dimension: 'element', subScale: 'FIRE', categoryLabel: '솔직 화끈함', question: '좋고 싫음이 얼굴과 말투에 투명하게 드러나며 돌려 말하는 가식을 질색한다.', weightKey: 'fire' },
  { id: 'e_fire_4', dimension: 'element', subScale: 'FIRE', categoryLabel: '주도적 에너지', question: '분위기를 뜨겁게 달구고 사람들을 이끌어 모임의 활력소가 되는 걸 즐긴다.', weightKey: 'fire' },
  { id: 'e_fire_5', dimension: 'element', subScale: 'FIRE', categoryLabel: '뒤끝 없는 털어냄', question: '욱하고 타오를 때가 있지만 화가 풀리면 뒤끝 없이 금세 털어버린다.', weightKey: 'fire' },

  { id: 'e_water_1', dimension: 'element', subScale: 'WATER', categoryLabel: '정서적 감수성', question: '타인의 슬픔이나 아픔을 내 일처럼 느끼며 눈물이 많고 마음이 여리다.', weightKey: 'water' },
  { id: 'e_water_2', dimension: 'element', subScale: 'WATER', categoryLabel: '바다 같은 유연함', question: '어떤 사람이나 환경을 만나도 모나지 않게 융화되고 맞춰주는 포용력이 있다.', weightKey: 'water' },
  { id: 'e_water_3', dimension: 'element', subScale: 'WATER', categoryLabel: '치유와 위로', question: '상처받은 사람들의 마음을 보듬고 편안한 안식처가 되어주는 데서 큰 보람을 느낀다.', weightKey: 'water' },
  { id: 'e_water_4', dimension: 'element', subScale: 'WATER', categoryLabel: '분위기 감지', question: '공간에 감도는 미묘한 감정선과 사람들의 말하지 않는 속마음을 직감적으로 읽는다.', weightKey: 'water' },
  { id: 'e_water_5', dimension: 'element', subScale: 'WATER', categoryLabel: '감정 전이', question: '주변 사람의 우울한 감정이나 부정적인 기운을 스펀지처럼 흡수해 쉽게 가라앉는다.', weightKey: 'water' },

  { id: 'e_earth_1', dimension: 'element', subScale: 'EARTH', categoryLabel: '변함없는 신뢰', question: '약속과 책임을 목숨처럼 여기며 한 번 뱉은 말은 끝까지 지키려 한다.', weightKey: 'earth' },
  { id: 'e_earth_2', dimension: 'element', subScale: 'EARTH', categoryLabel: '단단한 현실감각', question: '화려한 겉치레나 허상보다 손에 잡히는 실속과 안정된 기반을 가장 중시한다.', weightKey: 'earth' },
  { id: 'e_earth_3', dimension: 'element', subScale: 'EARTH', categoryLabel: '끈기와 인내심', question: '남들이 포기하고 떠날 때도 묵묵히 자리를 지키며 끝까지 땅을 다져나간다.', weightKey: 'earth' },
  { id: 'e_earth_4', dimension: 'element', subScale: 'EARTH', categoryLabel: '듬직한 버팀목', question: '주변 사람들이 위기나 혼란을 겪을 때 가장 먼저 찾아와 기대는 사람이 바로 나다.', weightKey: 'earth' },
  { id: 'e_earth_5', dimension: 'element', subScale: 'EARTH', categoryLabel: '안정 지향', question: '갑작스러운 변화나 불안정한 모험을 꺼리며 검증된 안정을 선호한다.', weightKey: 'earth' },

  { id: 'e_air_1', dimension: 'element', subScale: 'AIR', categoryLabel: '지적 자유', question: '어디에도 얽매이지 않고 새로운 지식과 독창적인 사상을 탐험할 때 가장 행복하다.', weightKey: 'air' },
  { id: 'e_air_2', dimension: 'element', subScale: 'AIR', categoryLabel: '산뜻한 위트', question: '지루하고 무거운 분위기를 유쾌한 위트와 신선한 관점으로 환기시키는 재주가 있다.', weightKey: 'air' },
  { id: 'e_air_3', dimension: 'element', subScale: 'AIR', categoryLabel: '객관적 거리두기', question: '감정에 매몰되지 않고 한 발짝 물러서서 상황을 냉정하고 명쾌하게 조망한다.', weightKey: 'air' },
  { id: 'e_air_4', dimension: 'element', subScale: 'AIR', categoryLabel: '구속 혐오', question: '나의 생각이나 사생활을 통제하려 들거나 꼰대식 룰을 강요하면 참을 수 없다.', weightKey: 'air' },
  { id: 'e_air_5', dimension: 'element', subScale: 'AIR', categoryLabel: '열린 시야', question: '고정관념에 갇히지 않고 늘 시대를 앞서가는 열린 시각과 아이디어를 지향한다.', weightKey: 'air' }
];

// 6. 혈액형 & 소셜 바이브 20문항 (5 A, 5 B, 5 O, 5 AB)
export const BLOOD_20_QUESTIONS: LikertQuestion[] = [
  { id: 'b_a_1', dimension: 'blood', subScale: 'A', categoryLabel: '세심한 배려', question: '상대방의 작은 표정 변화나 불편함을 먼저 알아채고 조용히 챙겨주는 편이다.', weightKey: 'A' },
  { id: 'b_a_2', dimension: 'blood', subScale: 'A', categoryLabel: '예의와 신중함', question: '약속 시간이나 사회적 예의를 엄격히 지키며 남에게 폐를 끼치는 것을 극도로 꺼린다.', weightKey: 'A' },
  { id: 'b_a_3', dimension: 'blood', subScale: 'A', categoryLabel: '깊은 속정', question: '겉으로는 조용하지만 한 번 마음을 준 사람에게는 끝까지 한결같은 의리를 지킨다.', weightKey: 'A' },
  { id: 'b_a_4', dimension: 'blood', subScale: 'A', categoryLabel: '혼자 삭힘', question: '서운한 점이 있어도 관계가 깨질까 봐 그 자리에서 따지지 않고 혼자 삼키는 편이다.', weightKey: 'A' },
  { id: 'b_a_5', dimension: 'blood', subScale: 'A', categoryLabel: '안전성 추구', question: '새로운 결정을 할 때 돌다리도 여러 번 두드려보고 리스크를 최소화하려 한다.', weightKey: 'A' },

  { id: 'b_b_1', dimension: 'blood', subScale: 'B', categoryLabel: '자유로운 마이웨이', question: '남들의 시선이나 사회적 틀에 얽매이지 않고 내가 좋아하는 길을 뚝심 있게 간다.', weightKey: 'B' },
  { id: 'b_b_2', dimension: 'blood', subScale: 'B', categoryLabel: '뒤끝 없는 쿨함', question: '불만이 있으면 그 자리에서 솔직하게 말하고 뒤돌아서면 아무 일 없던 듯 털어버린다.', weightKey: 'B' },
  { id: 'b_b_3', dimension: 'blood', subScale: 'B', categoryLabel: '반전 매력', question: '시크해 보이는 첫인상과 달리 친해지면 장난기가 넘치고 독창적인 유머를 발산한다.', weightKey: 'B' },
  { id: 'b_b_4', dimension: 'blood', subScale: 'B', categoryLabel: '열정적 몰입', question: '꽂히는 관심사가 생기면 주변을 다 잊고 밤을 새워가며 열정적으로 파고든다.', weightKey: 'B' },
  { id: 'b_b_5', dimension: 'blood', subScale: 'B', categoryLabel: '간섭 기피', question: '잔소리를 듣거나 내 사생활에 간섭하려 들면 바로 정색하고 선을 긋는다.', weightKey: 'B' },

  { id: 'b_o_1', dimension: 'blood', subScale: 'O', categoryLabel: '친화력 넘치는 마당발', question: '어느 모임에 가도 금방 사람들과 어울려 분위기를 띄우고 모임의 중심이 된다.', weightKey: 'O' },
  { id: 'b_o_2', dimension: 'blood', subScale: 'O', categoryLabel: '내 사람을 챙기는 의리', question: '내 사람이다 싶으면 밥도 잘 사주고 어떤 어려움도 든든하게 막아주는 대장부 기질이 있다.', weightKey: 'O' },
  { id: 'b_o_3', dimension: 'blood', subScale: 'O', categoryLabel: '시원시원한 리더십', question: '우유부단하게 망설이기보다 "내가 책임질게, 이렇게 하자!"라며 시원하게 이끈다.', weightKey: 'O' },
  { id: 'b_o_4', dimension: 'blood', subScale: 'O', categoryLabel: '자존심과 승부욕', question: '자존심을 건드리는 말에는 절대 지기 싫어하며 끝까지 자존심을 지켜낸다.', weightKey: 'O' },
  { id: 'b_o_5', dimension: 'blood', subScale: 'O', categoryLabel: '대범한 포용력', question: '속에 꿍한 것 없이 시원시원하고 대범하게 인간관계를 맺는 것을 선호한다.', weightKey: 'O' },

  { id: 'b_ab_1', dimension: 'blood', subScale: 'AB', categoryLabel: '냉철한 관찰자', question: '무리 속에 있어도 늘 한 발짝 뒤에서 사람들의 행동과 상황을 객관적으로 분석한다.', weightKey: 'AB' },
  { id: 'b_ab_2', dimension: 'blood', subScale: 'AB', categoryLabel: '유니크한 취향', question: '남들이 다 하는 유행보다 나만의 독특하고 세련된 취향과 감성을 소중히 여긴다.', weightKey: 'AB' },
  { id: 'b_ab_3', dimension: 'blood', subScale: 'AB', categoryLabel: '합리적 소통', question: '감정적인 소모전이나 진흙탕 싸움을 질색하며 깔끔하고 논리적인 소통을 원한다.', weightKey: 'AB' },
  { id: 'b_ab_4', dimension: 'blood', subScale: 'AB', categoryLabel: '명확한 경계', question: '친한 사이라도 서로의 넘지 말아야 할 선(Line)을 철저히 지키는 것을 예의라 여긴다.', weightKey: 'AB' },
  { id: 'b_ab_5', dimension: 'blood', subScale: 'AB', categoryLabel: '다면적 매력', question: '차가운 이성과 따뜻한 예술적 감수성을 동시에 품고 있어 알수록 신비롭다는 말을 듣는다.', weightKey: 'AB' }
];

export function getMassiveQuestionsForDimension(dimension: DimensionKey): LikertQuestion[] {
  switch (dimension) {
    case 'mbti': return MBTI_32_QUESTIONS;
    case 'attachment': return ATTACHMENT_20_QUESTIONS;
    case 'chronotype': return CHRONOTYPE_20_QUESTIONS;
    case 'stress': return STRESS_20_QUESTIONS;
    case 'element': return ELEMENT_20_QUESTIONS;
    case 'blood': return BLOOD_20_QUESTIONS;
  }
}
