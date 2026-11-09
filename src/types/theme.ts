export type DesignTheme = 'warm' | 'monochrome' | 'pastel';

export interface ThemeConfig {
  id: DesignTheme;
  name: string;
  desc: string;
  dotColor: string;
  bgClass: string;
  cardClass: string;
  textPrimary: string;
  textSecondary: string;
  accentBtn: string;
  borderClass: string;
}

export const THEMES: Record<DesignTheme, ThemeConfig> = {
  warm: {
    id: 'warm',
    name: '내추럴 웜 (추천)',
    desc: '따뜻하고 부드러운 오프화이트 & 킨포크 에디토리얼 감성',
    dotColor: '#E2DCD5',
    bgClass: 'bg-[#FAF8F5]',
    cardClass: 'bg-white/95 border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-500',
    accentBtn: 'bg-stone-900 hover:bg-stone-800 text-white',
    borderClass: 'border-stone-200/70',
  },
  monochrome: {
    id: 'monochrome',
    name: '모던 스튜디오',
    desc: '애플 감성의 깔끔하고 세련된 흑백 미니멀리즘',
    dotColor: '#CBD5E1',
    bgClass: 'bg-[#F8FAFC]',
    cardClass: 'bg-white border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)]',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-500',
    accentBtn: 'bg-slate-950 hover:bg-slate-800 text-white',
    borderClass: 'border-slate-200/80',
  },
  pastel: {
    id: 'pastel',
    name: '소프트 파스텔',
    desc: '은은한 라벤더 & 세이지 그린의 포근한 무드',
    dotColor: '#E9D5FF',
    bgClass: 'bg-[#FBF8FC]',
    cardClass: 'bg-white/95 border-purple-100/80 shadow-[0_2px_14px_rgba(147,51,234,0.03)]',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-500',
    accentBtn: 'bg-purple-900 hover:bg-purple-800 text-white',
    borderClass: 'border-purple-100',
  },
};
