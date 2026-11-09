import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  CheckCircle2,
  Layers,
  Sparkles,
  Shield,
  HeartHandshake,
  Compass,
  Cpu
} from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    if (!contentRef.current) return;
    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>MIND:TYPE 앱 기능 및 아키텍처 종합 명세서</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif; line-height: 1.6; color: #1c1917; padding: 40px; max-width: 900px; margin: 0 auto; background: #fff; }
  h1 { font-size: 26px; border-bottom: 2px solid #1c1917; padding-bottom: 12px; margin-bottom: 20px; }
  h2 { font-size: 18px; color: #1c1917; border-left: 4px solid #1c1917; padding-left: 10px; margin-top: 30px; margin-bottom: 12px; }
  h3 { font-size: 14px; color: #44403c; margin-top: 18px; margin-bottom: 8px; font-weight: bold; }
  table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }
  th, td { border: 1px solid #d6d3d1; padding: 8px 12px; text-align: left; }
  th { background: #f5f5f4; font-weight: bold; }
  .badge { display: inline-block; padding: 2px 6px; background: #f5f5f4; border-radius: 4px; font-size: 11px; font-weight: bold; }
  .box { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 14px; margin: 12px 0; font-size: 13px; }
  @media print {
    body { padding: 0; }
    .no-print { display: none; }
    .page-break { page-break-before: always; }
  }
</style>
</head>
<body>
${contentRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MIND_TYPE_앱_기능_및_설계_명세서_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-stone-900/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-4xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:w-full">
        {/* Modal Top Toolbar (Hidden on Print) */}
        <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50/90 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-stone-800" />
            <span className="text-sm font-bold text-stone-900">
              MIND:TYPE 앱 기능 및 설계 명세서 (PDF 리포트)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHtml}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>HTML 저장</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF로 인쇄 / 저장</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans text-stone-900 print:p-0 print:overflow-visible">
          <div ref={contentRef} className="space-y-8 max-w-3xl mx-auto">
            {/* Document Header */}
            <div className="border-b-2 border-stone-900 pb-5">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-mono">
                <span>PROJECT SPECIFICATION REPORT</span>
                <span>버전: v2.4 · 작성일: {new Date().toLocaleDateString('ko-KR')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                MIND:TYPE — 6차원 다면 성격 진단 및 최적 인간관계 추천 시스템
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                MBTI, 혈액형, 성인 애착유형, 크로노타입(생체시계), 스트레스 대처 방어기제, 고대 4대 기질론의 6개 심리 차원을 결합하여
                개인의 입체적 페르소나를 도출하고 최적의 인간관계(연애·우정·협업)와 1:1 케미스트리를 진단하는 플랫폼 명세서입니다.
              </p>
            </div>

            {/* Section 1: Overview & Tech Stack */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 border-l-4 border-stone-900 pl-2.5">
                1. 시스템 개요 및 기술 스택
              </h2>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                  <div><strong>• 프레임워크:</strong> React 19, TypeScript, Vite 8</div>
                  <div><strong>• 백엔드/런타임:</strong> Node.js v22, Express 4, tsx</div>
                  <div><strong>• 스타일링/UI:</strong> Tailwind CSS v4, Lucide Icons, Warm Minimalist Constitution</div>
                  <div><strong>• 시각화:</strong> Recharts (6차원 Spider Radar Chart)</div>
                  <div><strong>• AI 엔진:</strong> Google Gemini 2.5 Flash (@google/genai SDK)</div>
                  <div><strong>• 데이터 지속성:</strong> 브라우저 localStorage (무중단 로컬 저장)</div>
                </div>
              </div>
            </section>

            {/* Section 2: 6 Dimensions & 132 Questions */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 border-l-4 border-stone-900 pl-2.5">
                2. 6차원 입체 성향 진단 시스템 (총 132문항 5지선답)
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                모든 검사는 5점 리커트 척도(1: 전혀 아니다 ~ 5: 매우 그렇다)로 정밀 점수화되며, 키보드 단축키(1~5)와 챕터별 점프 및 중간 저장을 완벽 지원합니다.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-stone-200 rounded-xl overflow-hidden">
                  <thead className="bg-stone-100 text-stone-800 text-left">
                    <tr>
                      <th className="p-2.5 border-b border-stone-200">차원</th>
                      <th className="p-2.5 border-b border-stone-200">문항수</th>
                      <th className="p-2.5 border-b border-stone-200">세부 분류 및 지표</th>
                      <th className="p-2.5 border-b border-stone-200">산출 로직 및 특징</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    <tr>
                      <td className="p-2.5 font-bold">1장. MBTI</td>
                      <td className="p-2.5 font-mono">32문항</td>
                      <td className="p-2.5">EI(8), SN(8), TF(8), JP(8)</td>
                      <td className="p-2.5">각 축별 점수 합산 비교를 통해 16종 인지 유형 도출</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">2장. 애착유형</td>
                      <td className="p-2.5 font-mono">20문항</td>
                      <td className="p-2.5">불안(10), 회피(10)</td>
                      <td className="p-2.5">불안/회피 2차원 회귀 모델로 안정·불안·회피·공포회피 판정</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">3장. 크로노타입</td>
                      <td className="p-2.5 font-mono">20문항</td>
                      <td className="p-2.5">사자(5), 곰(5), 늑대(5), 돌고래(5)</td>
                      <td className="p-2.5">생체 수면 및 일과 리듬 최빈값 기반 4대 생체시계 도출</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">4장. 스트레스 대처</td>
                      <td className="p-2.5 font-mono">20문항</td>
                      <td className="p-2.5">동굴(5), 수다(5), 행동(5), 이성(5)</td>
                      <td className="p-2.5">심리적 위기 시 발동하는 4대 무의식 방어기제 분석</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">5장. 4대 기질론</td>
                      <td className="p-2.5 font-mono">20문항</td>
                      <td className="p-2.5">불(5), 물(5), 흙(5), 바람(5)</td>
                      <td className="p-2.5">히포크라테스-엠페도클레스 전통 기질론 현대적 재해석</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">6장. 혈액형 바이브</td>
                      <td className="p-2.5 font-mono">20문항</td>
                      <td className="p-2.5">A(5), B(5), O(5), AB(5)</td>
                      <td className="p-2.5">한국 문화권 소셜 바이브와 실제 생체 혈액형 결합</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Radar Chart & Personality Keyword Card */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 border-l-4 border-stone-900 pl-2.5">
                3. 거미줄 레이더 차트 & 성격 핵심 키워드 카드
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-1">🕸️ 거미줄 레이더 차트 (Recharts)</h3>
                  <p>외향성, 직관성, 정서 공감, 주간 리듬, 스트레스 수용성, 기질 활동성의 6개 축을 0~100 스케일로 시각화하여 사용자의 강점과 보완점을 한눈에 파악합니다.</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-1">🏷️ 성격 핵심 키워드 카드</h3>
                  <p>6차원 성향 결합에서 추출한 8개 핵심 해시태그, 나의 3대 초능력(Superpowers), 매력 약점(Blindspot), 최적 시너지 파트너 키워드를 소셜 카드 형태로 제공합니다.</p>
                </div>
              </div>
            </section>

            {/* Section 4: Relationship Matching & 1:1 Chemistry */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 border-l-4 border-stone-900 pl-2.5">
                4. 최적 인간관계 매칭 & 1:1 케미스트리 알고리즘
              </h2>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2">
                <p><strong>• 소울메이트 추천:</strong> 나의 MBTI-황금 페어링, 애착 상호보완, 기질 궁합을 종합하여 최적 연애 파트너(Top 1), 평생 지기(Friendship), 비즈니스 협업 파트너를 자동 추천합니다.</p>
                <p><strong>• 1:1 정밀 궁합:</strong> 상대방과의 종합 궁합 점수(0~100점), 연애·우정·팀워크·생활리듬 4대 지수, 시너지 3대 포인트, 갈등 주의점 및 화해 가이드를 제공합니다.</p>
                <p><strong>• AI 관계 컨설턴트 (Google Gemini):</strong> 두 사람의 6차원 지표와 구체적 고민을 기반으로 실시간 심층 솔루션을 생성하며, API 키가 없을 때는 내장 규칙 기반 엔진(Zero-Token)으로 무중단 지원합니다.</p>
              </div>
            </section>

            {/* Section 5: Invitations & Group Room System */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 border-l-4 border-stone-900 pl-2.5">
                5. 초대장 시스템 & 단체 모임 케미 룸
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-1">💌 1:1 친구 초대장</h3>
                  <p>초대 링크(`?invite=...`)를 전송하면 친구가 링크를 열어 검사를 진행하고, 완료 즉시 두 사람의 1:1 궁합 리포트가 자동 연결됩니다.</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-1">👥 단체/모임 케미 룸</h3>
                  <p>단톡방에 룸 링크(`?room=...`)를 공유하여 다수의 친구가 참여하면 4원소 밸런스, 모임 골든타임(생체시계 기반), 룸 내 최고 찰떡 콤비 Top 1 및 평화 중재자를 자동 산출합니다.</p>
                </div>
              </div>
            </section>

            {/* Section 6: Zero-Token & Deployment Guide */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 border-l-4 border-stone-900 pl-2.5">
                6. 토큰 최적화 (Zero-Token 모드) 및 배포 가이드
              </h2>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2">
                <p><strong>• 토큰 절약:</strong> Google AI Studio 무료 티어(15 RPM / 1,500 RPD) 이용 시 비용 0원이며, API 연동 없이 내장 알고리즘만 사용하는 Zero-Token 모드로 100% 독립 실행이 가능합니다.</p>
                <p><strong>• 배포 명령어:</strong> `npm run build && npm run start` (Express가 정적 파일 서빙과 API를 단일 3000 포트에서 통합 서빙).</p>
                <p><strong>• 클라우드/서버:</strong> PM2 백그라운드 무중단 실행(`pm2 start server.ts`), Docker 컨테이너 지원, Nginx 리버스 프록시 연동 지원.</p>
              </div>
            </section>

            {/* Document Footer */}
            <div className="pt-6 border-t border-stone-200 text-center text-[11px] text-stone-400 font-mono">
              © 2026 MIND:TYPE Platform Architecture. All rights reserved. Generated automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
