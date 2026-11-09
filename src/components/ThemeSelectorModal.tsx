import React from 'react';
import { X, Check, Palette, Sparkles, Feather, Moon, Sun } from 'lucide-react';
import { DesignTheme, THEMES } from '../types/theme';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: DesignTheme;
  onSelectTheme: (theme: DesignTheme) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-xl border border-stone-200/90 w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">
                디자인 스타일 선택
              </h3>
              <p className="text-xs text-stone-500">
                군더더기 없이 심플하고 편안한 무드를 골라보세요
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Options */}
        <div className="p-5 space-y-3">
          {(Object.keys(THEMES) as DesignTheme[]).map((themeKey) => {
            const theme = THEMES[themeKey];
            const isSelected = currentTheme === themeKey;

            return (
              <button
                key={themeKey}
                onClick={() => {
                  onSelectTheme(themeKey);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900/10'
                    : 'border-stone-200/80 hover:border-stone-300 hover:bg-stone-50/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div 
                    className="w-9 h-9 rounded-xl border border-stone-200 flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-2xs"
                    style={{ backgroundColor: theme.dotColor }}
                  >
                    {themeKey === 'warm' ? '🌿' : themeKey === 'monochrome' ? '🖤' : '🌸'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-900">
                        {theme.name}
                      </span>
                      {themeKey === 'warm' && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          디자이너 추천
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      {theme.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-stone-300 group-hover:border-stone-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer recommendation tips */}
        <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-stone-400" />
            <span>여백과 글씨가 편안한 심플 미니멀 디자인</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition cursor-pointer"
          >
            적용 완료
          </button>
        </div>
      </div>
    </div>
  );
};
