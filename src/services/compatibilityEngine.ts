import {
  UserPersona,
  CompatibilityReport,
  BestMatchRecommendation,
  MBTIType,
  AttachmentStyle,
  Chronotype,
  StressStyle,
  ElementTemperament,
  BloodType
} from '../types/personality';
import {
  MBTI_INFO,
  BLOOD_INFO,
  ATTACHMENT_INFO,
  CHRONOTYPE_INFO,
  STRESS_INFO,
  ELEMENT_INFO
} from '../data/personalityData';

// MBTI Compatibility matrix baseline
// Extrovert/Introvert, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving
const MBTI_DUAL_MAP: Record<MBTIType, MBTIType[]> = {
  INTJ: ['ENFP', 'ENTP', 'INFJ', 'INTP'],
  INTP: ['ENTJ', 'ENFJ', 'ESTJ', 'INFP'],
  ENTJ: ['INTP', 'INFP', 'ISFP', 'INTJ'],
  ENTP: ['INFJ', 'INTJ', 'ENFP', 'ISFJ'],
  INFJ: ['ENTP', 'ENFP', 'INFP', 'INTJ'],
  INFP: ['ENFJ', 'ENTJ', 'INTP', 'ISFP'],
  ENFJ: ['INFP', 'ISFP', 'INTP', 'INFJ'],
  ENFP: ['INTJ', 'INFJ', 'ENTP', 'INFP'],
  ISTJ: ['ESFP', 'ESTP', 'ISFJ', 'ESTJ'],
  ISFJ: ['ESFP', 'ESTP', 'ISTJ', 'ISFP'],
  ESTJ: ['ISFP', 'ISTP', 'ISTJ', 'ESFJ'],
  ESFJ: ['ISFP', 'ISTP', 'ESFP', 'ISFJ'],
  ISTP: ['ESTJ', 'ESFJ', 'ENTJ', 'ISTJ'],
  ISFP: ['ESFJ', 'ESTJ', 'ENFJ', 'ISFJ'],
  ESTP: ['ISFJ', 'ISTJ', 'ESFP', 'ESTJ'],
  ESFP: ['ISFJ', 'ISTJ', 'ESTP', 'ESFJ'],
};

export function calculateCompatibility(u1: UserPersona, u2: UserPersona): CompatibilityReport {
  // 1. MBTI Calculation
  let mbtiScore = 70;
  let mbtiLabel = '무난하고 안정적인 조합';
  let mbtiText = '서로의 사고방식을 존중하며 맞춰갈 수 있는 관계입니다.';

  if (MBTI_DUAL_MAP[u1.mbti]?.includes(u2.mbti)) {
    const isTop = MBTI_DUAL_MAP[u1.mbti][0] === u2.mbti;
    mbtiScore = isTop ? 98 : 92;
    mbtiLabel = isTop ? '환상의 황금 케미 (Golden Pair)' : '영혼의 시너지 파트너';
    mbtiText = `${u1.mbti}의 ${MBTI_INFO[u1.mbti].nameKr} 성향과 ${u2.mbti}의 ${MBTI_INFO[u2.mbti].nameKr} 성향이 서로의 사각지대를 완벽히 보완하며 강력한 끌림을 유발합니다.`;
  } else if (u1.mbti === u2.mbti) {
    mbtiScore = 86;
    mbtiLabel = '거울을 보는 듯한 쌍둥이 케미';
    mbtiText = `같은 ${u1.mbti}끼리 말하지 않아도 서로의 생각과 감정의 흐름을 본능적으로 직감합니다. 단, 같은 고집이 부딪히지 않게 조율이 필요합니다.`;
  } else {
    // Check shared letters
    let shared = 0;
    for (let i = 0; i < 4; i++) {
      if (u1.mbti[i] === u2.mbti[i]) shared++;
    }
    if (shared === 3) {
      mbtiScore = 85;
      mbtiLabel = '편안한 공감대와 조화로운 호흡';
      mbtiText = '대부분의 가치관과 생활 양식이 일치하여 스트레스 없는 편안한 유대를 형성합니다.';
    } else if (shared === 0) {
      mbtiScore = 78;
      mbtiLabel = '정반대의 매력에 끌리는 자석형 케미';
      mbtiText = '모든 축이 달라 처음에 큰 호기심을 느끼며 서로의 완전히 새로운 시각에 감탄하게 됩니다.';
    } else {
      mbtiScore = 80;
      mbtiLabel = '서로 배우며 성장하는 상호보완형';
      mbtiText = '닮은 점과 다른 점이 적절히 섞여 있어 끊임없는 흥미와 대화 거리를 만들어냅니다.';
    }
  }

  // 2. Blood Type Calculation (Cultural & Interpersonal dynamics)
  let bloodScore = 78;
  let bloodLabel = '호기심과 균형의 관계';
  let bloodText = '서로 다른 표현 방식이 신선함을 줍니다.';
  const bloodPair = [u1.bloodType, u2.bloodType].sort().join('');

  if (bloodPair === 'AO') {
    bloodScore = 95;
    bloodLabel = '최고의 상호보완 찰떡궁합';
    bloodText = 'O형의 시원시원한 포용력과 추진력이 A형의 섬세한 배려심과 완벽히 맞아떨어져 편안함과 안정감을 느낍니다.';
  } else if (bloodPair === 'BO') {
    bloodScore = 92;
    bloodLabel = '유쾌하고 거침없는 활력 커플';
    bloodText = 'B형의 독창적인 아이디어와 개성을 O형이 털털하게 받아주며 함께 있을 때 웃음과 활력이 끊이지 않습니다.';
  } else if (bloodPair === 'ABO') {
    bloodScore = 86;
    bloodLabel = '자존심과 매력이 공존하는 조합';
    bloodText = 'AB형의 이성적인 합리성과 O형의 열정적 리더십이 조화를 이루어 멋진 팀워크를 이룹니다.';
  } else if (bloodPair === 'AB') {
    bloodScore = 88;
    bloodLabel = '밀당과 반전 매력의 티키타카';
    bloodText = 'A형의 진중함과 B형의 마이웨이가 만나 처음엔 당황하지만 점점 서로의 색다른 매력에 깊이 빠져듭니다.';
  } else if (bloodPair === 'AAB') {
    bloodScore = 90;
    bloodLabel = '지적이고 정교한 존중의 관계';
    bloodText = '두 사람 모두 타인의 영역과 예의를 중시하여 불필요한 감정 소모 없이 깔끔하고 깊은 신뢰를 쌓습니다.';
  } else if (bloodPair === 'AA') {
    bloodScore = 85;
    bloodLabel = '조용하고 속 깊은 신뢰의 유대';
    bloodText = '말 한마디에도 서로를 배려하지만 서운함을 속에 담아두지 않도록 솔직한 대화 창구가 필요합니다.';
  } else if (bloodPair === 'BB') {
    bloodScore = 84;
    bloodLabel = '쿨하고 뒤끝 없는 화끈한 케미';
    bloodText = '서로의 자유를 100% 존중하며 각자의 취향을 즐기다가 만났을 때 폭발적인 재미를 나눕니다.';
  } else if (bloodPair === 'OO') {
    bloodScore = 85;
    bloodLabel = '의리와 열정으로 뭉친 파워 듀오';
    bloodText = '화끈하고 의리가 넘치는 멋진 파트너십입니다. 주도권 싸움만 피하면 무적의 관계가 됩니다.';
  } else {
    bloodScore = 87;
    bloodLabel = '신비롭고 독창적인 교감';
    bloodText = '서로의 독특한 개성을 지켜주며 지루할 틈 없는 신선한 관점을 주고받습니다.';
  }

  // 3. Attachment Style Dynamics (Crucial psychological predictor)
  let attachmentScore = 80;
  let attachmentLabel = '건강하게 조율 가능한 애착 케미';
  let attachmentText = '정서적 교감을 통해 신뢰를 형성할 수 있습니다.';

  const att1 = u1.attachment;
  const att2 = u2.attachment;

  if (att1 === 'secure' && att2 === 'secure') {
    attachmentScore = 99;
    attachmentLabel = '천상의 평화! 완벽한 정서적 안정지대';
    attachmentText = '두 사람 모두 감정 표현이 솔직하고 건강한 심리적 경계를 지켜 갈등이 생겨도 상처 없이 지혜롭게 풀어냅니다.';
  } else if ((att1 === 'secure' && att2 === 'anxious') || (att1 === 'anxious' && att2 === 'secure')) {
    attachmentScore = 93;
    attachmentLabel = '불안을 잠재우는 든든한 등대 케미';
    attachmentText = '안정형의 한결같은 확신과 신뢰가 불안형의 유기 불안을 녹여주며, 불안형의 뜨거운 애정 표현이 관계를 사랑으로 채웁니다.';
  } else if ((att1 === 'secure' && att2 === 'avoidant') || (att1 === 'avoidant' && att2 === 'secure')) {
    attachmentScore = 90;
    attachmentLabel = '동굴을 존중하는 온화한 안식처';
    attachmentText = '안정형이 상대의 혼자만의 시간을 압박하지 않고 여유롭게 기다려주므로, 회피형이 방어기제를 내려놓고 안전하게 다가옵니다.';
  } else if ((att1 === 'anxious' && att2 === 'avoidant') || (att1 === 'avoidant' && att2 === 'anxious')) {
    attachmentScore = 68;
    attachmentLabel = '주의! 추격자-도망자(불안-회피) 롤러코스터 경보';
    attachmentText = '한 명이 다가갈수록 다른 한 명은 숨이 막혀 도망치고, 멀어지면 다시 쫓아가는 전형적인 악순환이 발생할 수 있습니다. 명확한 소통 규칙이 필수적입니다.';
  } else if (att1 === 'anxious' && att2 === 'anxious') {
    attachmentScore = 75;
    attachmentLabel = '뜨겁게 타오르는 격정의 불꽃';
    attachmentText = '서로를 향한 애정의 깊이는 엄청나지만, 작은 오해에도 서로 상처를 주고받아 감정의 파도가 크게 칠 수 있습니다.';
  } else if (att1 === 'avoidant' && att2 === 'avoidant') {
    attachmentScore = 76;
    attachmentLabel = '각자의 평화를 지키는 쿨한 독립지대';
    attachmentText = '서로에게 과한 간섭을 하지 않아 평화롭지만, 속마음을 털어놓는 깊은 감정적 친밀감으로 발전하는 데 오랜 시간이 걸립니다.';
  } else {
    attachmentScore = 74;
    attachmentLabel = '조심스러운 탐색과 치유가 필요한 관계';
    attachmentText = '상처받을까 두려워하는 복합적인 마음을 인내심 있게 품어줄 때 비로소 진정한 기적이 일어납니다.';
  }

  // 4. Chronotype Lifestyle Sync
  let chronoScore = 75;
  let chronoLabel = '서로 다른 생활 리듬의 조율 필요';
  let chronoText = '활동 시간대의 차이를 인정하고 배려하는 지혜가 필요합니다.';
  const c1 = u1.chronotype;
  const c2 = u2.chronotype;

  if (c1 === c2) {
    chronoScore = 95;
    chronoLabel = '완벽한 생체 시계 일치! 라이프 데칼코마니';
    chronoText = `두 사람 모두 ${CHRONOTYPE_INFO[c1].nameKr}로, 기상 시간, 식사 시간, 가장 텐션이 높은 집중 골든타임이 완벽히 일치합니다.`;
  } else if ((c1 === 'lion' && c2 === 'bear') || (c1 === 'bear' && c2 === 'lion')) {
    chronoScore = 90;
    chronoLabel = '활기찬 주간 라이프의 상쾌한 호흡';
    chronoText = '낮 시간대 데이트나 업무 협업에 가장 최적화된 리듬입니다. 주말을 보람차고 알차게 보낼 수 있습니다.';
  } else if ((c1 === 'bear' && c2 === 'wolf') || (c1 === 'wolf' && c2 === 'bear')) {
    chronoScore = 86;
    chronoLabel = '저녁 골든타임을 공유하는 유연한 호흡';
    chronoText = '오후 늦은 시간과 저녁 식사, 밤 데이트에서 가장 즐거운 교감이 일어납니다.';
  } else if ((c1 === 'lion' && c2 === 'wolf') || (c1 === 'wolf' && c2 === 'lion')) {
    chronoScore = 70;
    chronoLabel = '해와 달 커플! 엇갈린 낮밤의 교차점 찾기';
    chronoText = '사자형은 아침 일찍 눈을 뜨고 밤 10시에 잠드는 반면, 늑대형은 밤 11시부터 에너지가 솟습니다. 주말 약속 시간 조율에 특별한 배려가 필요합니다.';
  } else {
    chronoScore = 82;
    chronoLabel = '유연한 리듬 조율 파트너';
    chronoText = '서로의 컨디션 사이클을 존중하며 여유를 두는 만남이 좋습니다.';
  }

  // 5. Stress Coping Dynamics
  let stressScore = 78;
  let stressLabel = '위기 대처 방식의 조율';
  let stressText = '힘들 때 에너지를 회복하는 방식의 차이를 인지해야 합니다.';
  const s1 = u1.stress;
  const s2 = u2.stress;

  if (s1 === s2) {
    stressScore = 92;
    stressLabel = '위기 상황 속 동질감과 이심전심';
    stressText = `둘 다 ${STRESS_INFO[s1].nameKr} 방식을 사용하므로 힘든 순간 서로가 무엇을 필요로 하는지 굳이 설명하지 않아도 깊이 이해합니다.`;
  } else if ((s1 === 'cave' && s2 === 'talk') || (s1 === 'talk' && s2 === 'cave')) {
    stressScore = 68;
    stressLabel = '동굴 vs 수다의 위험한 충돌 경보';
    stressText = '수다형은 "지금 당장 대화로 풀자"며 다가가지만, 동굴형은 "제발 나 혼자 좀 내버려 둬"라며 문을 닫아버려 서로에게 깊은 상처를 줄 수 있습니다. "30분만 동굴에 다녀올게"라는 시간 약속이 생명줄입니다.';
  } else if ((s1 === 'logic' && s2 === 'talk') || (s1 === 'talk' && s2 === 'logic')) {
    stressScore = 74;
    stressLabel = '공감 vs 솔루션의 엇갈림 주의';
    stressText = '수다형은 오직 "속상했겠다"는 감정적 공감을 원하는데, 이성분석형은 "원인은 이거고 이렇게 해결해"라며 팩트 폭격을 날릴 수 있습니다. 먼저 충분히 들어준 후 조언해야 합니다.';
  } else if ((s1 === 'action' && s2 === 'talk') || (s1 === 'talk' && s2 === 'action')) {
    stressScore = 88;
    stressLabel = '맛있는 음식과 수다의 환상적인 힐링 콤비';
    stressText = '한 명의 활동력(맛집 가기, 드라이브)과 한 명의 수다가 합쳐져 스트레스를 통쾌하게 날려버립니다.';
  } else {
    stressScore = 84;
    stressLabel = '균형 잡힌 위기 극복 파트너십';
    stressText = '서로 다른 회복 방식을 통해 다각도로 스트레스를 해소할 수 있는 여유가 있습니다.';
  }

  // 6. Element Temperament Harmony
  let elementScore = 82;
  let elementLabel = '자연스러운 기질적 조화';
  let elementText = '기질의 에너지가 서로를 자극하고 채워줍니다.';
  const ePair = [u1.element, u2.element].sort().join('');

  if (ePair === 'airfire') {
    elementScore = 96;
    elementLabel = '바람과 불꽃의 폭발적 영감 시너지';
    elementText = '바람(Air)의 지성과 아이디어가 불(Fire)의 열정을 거세게 지펴주며 상상 이상의 거대한 창작과 실행을 만들어냅니다.';
  } else if (ePair === 'earthwater') {
    elementScore = 95;
    elementLabel = '비옥한 대지와 생명의 물! 영원한 안식처';
    elementText = '물(Water)의 깊은 감수성을 흙(Earth)이 든든하게 받쳐주어 푸르른 숲처럼 풍요롭고 포근한 관계를 꽃피웁니다.';
  } else if (ePair === 'firewater') {
    elementScore = 75;
    elementLabel = '온천처럼 따뜻하거나 증발하거나! 양날의 검';
    elementText = '불의 열정에 물이 상처받거나, 물의 우울에 불이 꺼질 수 있습니다. 적절한 온도를 맞추면 마음을 녹이는 온천수가 됩니다.';
  } else if (ePair === 'airair' || ePair === 'earthearth' || ePair === 'firefire' || ePair === 'waterwater') {
    elementScore = 88;
    elementLabel = '같은 원소가 나누는 순수한 공명';
    elementText = '타고난 에너지 결이 같아 처음 만난 순간부터 편안한 동질감을 느낍니다.';
  } else {
    elementScore = 85;
    elementLabel = '서로 다른 원소의 다채로운 풍경';
    elementText = '서로의 세계를 넓혀주는 건강한 화학작용이 일어납니다.';
  }

  // Weighted overall calculation
  const overall = Math.round(
    mbtiScore * 0.28 +
    attachmentScore * 0.28 +
    chronoScore * 0.14 +
    stressScore * 0.14 +
    elementScore * 0.10 +
    bloodScore * 0.06
  );

  const romance = Math.round(attachmentScore * 0.45 + mbtiScore * 0.25 + elementScore * 0.15 + bloodScore * 0.15);
  const friendship = Math.round(mbtiScore * 0.35 + chronoScore * 0.25 + stressScore * 0.25 + bloodScore * 0.15);
  const teamwork = Math.round(mbtiScore * 0.40 + stressScore * 0.30 + elementScore * 0.20 + chronoScore * 0.10);
  const lifestyle = Math.round(chronoScore * 0.50 + stressScore * 0.30 + attachmentScore * 0.20);

  // Concrete tailored relationship advice
  const dos: string[] = [];
  const donts: string[] = [];
  const dates: string[] = [];
  const workTips: string[] = [];

  // Tailor communication Dos
  if (u2.attachment === 'anxious') {
    dos.push(`답장이 늦어질 때는 미리 "회의 들어가서 1시간 뒤에 연락할게"라고 상황을 알려주세요.`);
    dos.push(`"난 널 정말 좋아하고 소중하게 생각해"라는 직관적이고 다정한 확신을 자주 표현해 주세요.`);
  } else if (u2.attachment === 'avoidant') {
    dos.push(`감정이 격해졌을 때는 억지로 붙잡지 말고 "생각 정리되면 편하게 얘기해 줘"라고 여유를 주세요.`);
    dos.push(`상대방의 개인 공간과 취미 영역을 절대 침범하지 않고 존중해 주세요.`);
  } else {
    dos.push(`솔직한 감정과 생각을 숨기지 말고 담백하고 건강하게 나눠보세요.`);
  }

  if (u2.stress === 'talk') {
    dos.push(`스트레스받아 이야기할 때는 해결책보다 "진짜 고생 많았어, 속상했겠다"라고 폭풍 리액션해 주세요.`);
  } else if (u2.stress === 'cave') {
    dos.push(`동굴에 들어갔을 때는 닦달하지 말고 따뜻한 차나 좋아하는 간식을 살포시 놓아두고 기다려 주세요.`);
  } else if (u2.stress === 'logic') {
    dos.push(`논리적으로 무엇이 문제였는지 감정을 배제하고 차분히 함께 정리해 주면 안정을 찾습니다.`);
  } else {
    dos.push(`함께 맛있는 음식을 먹거나 가벼운 산책으로 몸의 감각을 깨워주세요.`);
  }

  // Tailor communication Donts
  if (u2.attachment === 'anxious') {
    donts.push(`싸웠다고 해서 갑자기 연락을 끊고 잠수를 타거나 무성의하게 단답하지 마세요.`);
  } else if (u2.attachment === 'avoidant') {
    donts.push(`"도대체 왜 그래? 나한테 숨기는 거 있어?"라며 구석으로 몰아세우는 압박 질문은 절대 금물입니다.`);
  }

  if (u2.mbti.includes('T')) {
    donts.push(`비논리적인 억지 주장이나 감정적인 비난으로 상대를 설득하려 하지 마세요.`);
  } else {
    donts.push(`상대방의 상처받은 마음에 대해 "그게 왜 상처야? 별것도 아닌데"라며 팩트로 묵살하지 마세요.`);
  }

  // Date recommendations
  if (u1.chronotype === 'wolf' || u2.chronotype === 'wolf') {
    dates.push(`심야 드라이브 및 야경이 내려다보이는 루프탑 바에서 나누는 깊은 감성 대화`);
  } else {
    dates.push(`상쾌한 오전 브런치 카페 및 채광 좋은 미술관 산책`);
  }

  if (u1.element === 'fire' || u2.element === 'fire') {
    dates.push(`테마파크, 방탈출, 페스티벌 등 가슴 뛰고 활력 넘치는 액티비티`);
  } else {
    dates.push(`조용한 북카페나 LP바에서 각자의 책을 읽으며 편안하게 온기 나누기`);
  }

  // Work collaboration tips
  workTips.push(`${u1.mbti.includes('J') ? u1.name : u2.name}님이 전체 마일스톤과 데드라인을 세팅하고, ${u1.mbti.includes('P') ? u1.name : u2.name}님이 기동력과 돌발 상황 유연성을 담당하면 무적의 팀이 됩니다.`);
  workTips.push(`회의 시 아이디어 발산 단계와 냉정한 검토 단계를 명확히 분리하여 서로의 기분을 상하지 않게 조율하세요.`);

  // Headline generation
  let headline = `${overall}점 — 서로를 성장시키는 특별한 인연`;
  let tagline = '차이를 매력으로 바꾸는 마법 같은 잠재력';

  if (overall >= 90) {
    headline = `${overall}점 — 우주가 점지해 준 환상의 소울메이트!`;
    tagline = '마음의 주파수와 생활 리듬이 완벽히 맞아떨어지는 기적의 만남';
  } else if (overall >= 80) {
    headline = `${overall}점 — 편안하고 든든한 황금 시너지 파트너`;
    tagline = '서로의 부족한 점을 포근하게 감싸주는 따뜻한 관계';
  } else if (overall >= 70) {
    headline = `${overall}점 — 자석처럼 강하게 끌리는 매력적인 조합`;
    tagline = '소통 룰만 숙지하면 누구보다 강력한 배움과 성장의 동반자';
  } else {
    headline = `${overall}점 — 세심한 배려가 빛을 발하는 도전적 인연`;
    tagline = '서로의 다름을 인정할 때 인생의 가장 큰 시야를 열어줄 수 있는 관계';
  }

  return {
    overallScore: overall,
    romanceScore: romance,
    friendshipScore: friendship,
    teamworkScore: teamwork,
    lifestyleScore: lifestyle,
    headline,
    tagline,
    synergies: [
      `${mbtiLabel}: ${mbtiText}`,
      `${attachmentLabel}: ${attachmentText}`,
      `${elementLabel}: ${elementText}`
    ],
    frictionPoints: [
      `스트레스 충돌: ${stressText}`,
      `라이프스타일 리듬: ${chronoText}`,
      `문화적/혈액형 바이브: ${bloodText}`
    ],
    conflictResolutionGuide:
      `두 분의 갈등을 해결하는 핵심 열쇠는 "${u1.attachment === 'avoidant' || u2.attachment === 'avoidant' ? '잠시 쿨다운할 개인 시간 보장 후 정해진 시각에 대화 재개' : '상대방의 감정을 있는 그대로 100% 수용해 주는 경청'}"입니다. ` +
      `스트레스 상황에서 서로의 회복 프로토콜(${STRESS_INFO[u1.stress].nameKr} & ${STRESS_INFO[u2.stress].nameKr})을 비난하지 않고 있는 그대로 인정해 줄 때 불필요한 감정 소모를 90% 이상 예방할 수 있습니다.`,
    communicationDos: dos,
    communicationDonts: donts,
    recommendedDatesOrHangouts: dates,
    workCollaborationTips: workTips,
    dimensionBreakdown: {
      mbtiChem: { score: mbtiScore, label: mbtiLabel, text: mbtiText },
      bloodChem: { score: bloodScore, label: bloodLabel, text: bloodText },
      attachmentChem: { score: attachmentScore, label: attachmentLabel, text: attachmentText },
      chronoChem: { score: chronoScore, label: chronoLabel, text: chronoText },
      stressChem: { score: stressScore, label: stressLabel, text: stressText },
      elementChem: { score: elementScore, label: elementLabel, text: elementText }
    }
  };
}

/**
 * Recommend optimal relationship archetypes for the user
 * (The core requirement: "최적의 인간관계를 추천해주는 앱")
 */
export function findBestMatches(user: UserPersona): BestMatchRecommendation[] {
  // 1. Romantic Soulmate
  // Attachment: Secure is always ideal; if user is avoidant, gentle secure; if user is anxious, solid secure
  const idealRomanceMBTI = MBTI_DUAL_MAP[user.mbti]?.[0] || 'ENFJ';
  const idealRomanceElement: ElementTemperament =
    user.element === 'fire' ? 'air' :
    user.element === 'water' ? 'earth' :
    user.element === 'earth' ? 'water' : 'fire';
  const idealRomanceChrono: Chronotype = user.chronotype === 'wolf' ? 'bear' : user.chronotype;

  // 2. Lifelong Best Friend
  const idealFriendMBTI = MBTI_DUAL_MAP[user.mbti]?.[1] || (user.mbti.startsWith('E') ? 'ENFP' : 'INFP');
  const idealFriendStress: StressStyle = user.stress === 'talk' ? 'action' : 'talk';

  // 3. Power Teamwork Partner
  // Needs complementary J/P or T/F
  const oppJ = user.mbti.endsWith('J') ? 'P' : 'J';
  const idealTeamMBTI = (user.mbti.slice(0, 3) + oppJ) as MBTIType;
  const idealTeamElement: ElementTemperament = user.element === 'fire' ? 'earth' : 'fire';

  // 4. Growth Catalyst
  const idealGrowthMBTI = MBTI_DUAL_MAP[user.mbti]?.[2] || 'INTJ';

  return [
    {
      type: 'romance',
      categoryTitle: '💖 최고의 연애 소울메이트 (Romantic Soulmate)',
      matchPersona: {
        mbti: idealRomanceMBTI,
        bloodType: user.bloodType === 'A' ? 'O' : user.bloodType === 'B' ? 'O' : 'A',
        attachment: 'secure',
        chronotype: idealRomanceChrono,
        stress: user.stress === 'cave' ? 'logic' : 'talk',
        element: idealRomanceElement,
        title: `${idealRomanceMBTI} × 안정형 × ${ELEMENT_INFO[idealRomanceElement].nameKr} 기질`,
        description: `감정의 불안이나 회피를 온화하게 안아주는 든든한 안정형 애착을 지녔으며, ${user.mbti}의 사각지대를 가장 매력적으로 보완해 주는 ${idealRomanceMBTI}의 조합입니다.`,
        whyBest: `당신의 ${ATTACHMENT_INFO[user.attachment].badge} 성향을 가장 깊이 이해하고 불안감 없는 확신과 진정한 낭만을 선사합니다.`,
        matchScore: 98
      }
    },
    {
      type: 'friendship',
      categoryTitle: '🤝 평생 갈 영혼의 절친 (Lifelong Best Friend)',
      matchPersona: {
        mbti: idealFriendMBTI,
        bloodType: user.bloodType === 'AB' ? 'B' : 'O',
        attachment: 'secure',
        chronotype: user.chronotype,
        stress: idealFriendStress,
        element: user.element,
        title: `${idealFriendMBTI} × 같은 크로노타입(${CHRONOTYPE_INFO[user.chronotype].badge})`,
        description: `같은 생체 시계를 공유하여 약속 잡기가 가장 편하며, 대화 코드가 찰떡처럼 맞아떨어져 10시간 수다를 떨어도 지치지 않는 평생의 단짝입니다.`,
        whyBest: `스트레스 해소 방식(${STRESS_INFO[idealFriendStress].badge})이 당신과 완벽한 시너지를 내어 번아웃이 올 때 최고의 힐링을 줍니다.`,
        matchScore: 95
      }
    },
    {
      type: 'teamwork',
      categoryTitle: '💼 시너지 폭발 협업/스터디 파트너 (Power Team)',
      matchPersona: {
        mbti: idealTeamMBTI,
        bloodType: 'A',
        attachment: 'secure',
        chronotype: 'lion',
        stress: 'logic',
        element: idealTeamElement,
        title: `${idealTeamMBTI} × 이성분석형 × 사자형(오전 집중)`,
        description: `목표 지향적인 추진력과 빈틈없는 리스크 관리 능력을 갖추어, 프로젝트나 스터디를 함께할 때 가장 믿음직스러운 실행형 파트너입니다.`,
        whyBest: `당신이 아이디어를 던지면 이를 현실적인 프로세스로 구조화하여 결과물을 완성해 냅니다.`,
        matchScore: 94
      }
    },
    {
      type: 'growth',
      categoryTitle: '🌱 서로를 성숙시키는 지적 성장 파트너 (Growth Catalyst)',
      matchPersona: {
        mbti: idealGrowthMBTI,
        bloodType: 'AB',
        attachment: 'avoidant',
        chronotype: 'dolphin',
        stress: 'logic',
        element: 'air',
        title: `${idealGrowthMBTI} × 바람(Air) 기질의 사색가`,
        description: `당신이 미처 보지 못했던 새로운 지평과 객관적 인사이트를 던져주어 인생의 사고관을 한 단계 도약시켜 주는 지적인 멘토형 친구입니다.`,
        whyBest: `서로의 다름을 존중하며 토론할 때 가장 큰 지적 희열과 성장을 경험할 수 있습니다.`,
        matchScore: 89
      }
    }
  ];
}
