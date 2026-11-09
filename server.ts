import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API: Relationship AI Consultant
app.post('/api/relationship-consultant', async (req, res) => {
  try {
    const { user1, user2, situation, questionType } = req.body;

    if (!user1 || !user2) {
      return res.status(400).json({ error: '두 사람의 프로필 정보가 필요합니다.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Deterministic psychological fallback
      return res.json({
        advice: `[AI 심층 처방전]\n` +
          `${user1.name}(${user1.mbti} · ${user1.bloodType}형 · ${user1.attachment})님과 ${user2.name}(${user2.mbti} · ${user2.bloodType}형 · ${user2.attachment})님의 관계 분석:\n\n` +
          `1. 소통의 골든 룰: ${user2.attachment === 'anxious' ? '불안형 파트너에게는 미리 일정과 애정을 명확히 표현해 주는 것이 최고의 안정제입니다.' : user2.attachment === 'avoidant' ? '회피형 파트너에게는 감정이 격해졌을 때 혼자 생각을 정리할 동굴 시간을 존중해 주세요.' : '서로의 솔직한 감정을 털어놓으며 투명하게 신뢰를 쌓아가세요.'}\n` +
          `2. 스트레스 충돌 예방: ${user1.stress}형과 ${user2.stress}형의 차이를 인식하고, 힘든 순간 각자의 회복 방식을 비난하지 마세요.\n` +
          `3. 추천 데이트 & 교감: ${user1.chronotype === 'wolf' || user2.chronotype === 'wolf' ? '심야 드라이브나 잔잔한 저녁 와인바에서 깊은 감성 토크' : '상쾌한 낮 시간대 브런치와 감각적인 문화 전시 산책'}을 추천합니다.`,
        isAiGenerated: false
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `당신은 인간관계 및 심리 분석 최고 전문가(MIND:TYPE 수석 심리 상담가)입니다.
다음 두 사람의 다면 성격 지표(MBTI, 혈액형, 애착유형, 크로노타입 생체시계, 스트레스 대처유형, 4대 원소 기질)를 기반으로 따뜻하고 명쾌하며 실질적인 관계 조언을 작성해 주세요.

[사람 1 (사용자)]:
- 이름: ${user1.name}
- MBTI: ${user1.mbti}
- 혈액형: ${user1.bloodType}형
- 애착유형: ${user1.attachment} (안정/불안/회피/공포회피)
- 크로노타입: ${user1.chronotype} (사자/곰/늑대/돌고래)
- 스트레스 대처방식: ${user1.stress} (동굴/수다/행동/이성분석)
- 4원소 기질: ${user1.element} (불/물/흙/바람)

[사람 2 (상대방)]:
- 이름: ${user2.name}
- MBTI: ${user2.mbti}
- 혈액형: ${user2.bloodType}형
- 애착유형: ${user2.attachment}
- 크로노타입: ${user2.chronotype}
- 스트레스 대처방식: ${user2.stress}
- 4원소 기질: ${user2.element}

[상황 / 질문]:
${situation || '이 두 사람이 연애, 우정, 협업에서 어떻게 하면 서로에게 최고의 시너지를 내고 갈등을 지혜롭게 예방할 수 있을까요?'}

[답변 요청사항]:
1. 감정적 톤: 다정하면서도 심리학적 통찰이 담긴 전문적이고 공감 가는 어투 (한국어 존댓말)
2. 형식:
- 💡 [두 사람의 영혼의 교감 포인트]: 성향 결합 시 가장 매력적인 시너지
- ⚡ [주의해야 할 무의식적 갈등 트리거]: 애착/크로노타입/스트레스 충돌 지점
- 🗝️ [맞춤형 관계 처방전]:
  * 말 한마디의 힘 (상대에게 힘이 되는 말 vs 절대 피해야 할 말)
  * 데이트/소통 추천 팁
  * 위기 시 화해 솔루션
3. 너무 길지 않고 읽기 쉬운 카드형 가독성 유지.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.json({
      advice: response.text || '조언을 생성할 수 없습니다.',
      isAiGenerated: true
    });
  } catch (error: any) {
    console.error('Relationship consultant error:', error);
    return res.json({
      advice: '두 분의 성향 조합은 서로의 다름을 통해 가장 큰 성장을 이룰 수 있는 매력적인 관계입니다. 특히 서로의 애착유형과 스트레스 회복 방식을 인정해 줄 때 평생의 소울메이트가 될 수 있습니다.',
      isAiGenerated: false
    });
  }
});

// Setup dev server with Vite middleware or prod static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MIND:TYPE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
