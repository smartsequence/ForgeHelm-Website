// 支援的語言列表（第一階段：熱門 15 種語言）

export const languages = {
  'zh-TW': {
    code: 'zh-TW',
    name: '繁體中文',
    nativeName: '繁體中文',
    flag: '🇹🇼',
  },
  'en': {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  'ja': {
    code: 'ja',
    name: '日本語',
    nativeName: '日本語',
    flag: '🇯🇵',
  },
  'ko': {
    code: 'ko',
    name: '한국어',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
  'zh-CN': {
    code: 'zh-CN',
    name: '简体中文',
    nativeName: '简体中文',
    flag: '🇨🇳',
  },
  'es': {
    code: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  'fr': {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  'de': {
    code: 'de',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  'it': {
    code: 'it',
    name: 'Italiano',
    nativeName: 'Italiano',
    flag: '🇮🇹',
  },
  'pt': {
    code: 'pt',
    name: 'Português',
    nativeName: 'Português',
    flag: '🇵🇹',
  },
  'ru': {
    code: 'ru',
    name: 'Русский',
    nativeName: 'Русский',
    flag: '🇷🇺',
  },
  'ar': {
    code: 'ar',
    name: 'العربية',
    nativeName: 'العربية',
    flag: '🇸🇦',
  },
  'hi': {
    code: 'hi',
    name: 'हिन्दी',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
  },
  'th': {
    code: 'th',
    name: 'ไทย',
    nativeName: 'ไทย',
    flag: '🇹🇭',
  },
  'vi': {
    code: 'vi',
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
  },
} as const;

export type Language = keyof typeof languages;
export const defaultLang: Language = 'zh-TW';

// 取得語言名稱（用於顯示）
export function getLanguageName(lang: Language): string {
  return languages[lang]?.name || lang;
}

// 取得原生語言名稱
export function getNativeLanguageName(lang: Language): string {
  return languages[lang]?.nativeName || lang;
}

// 取得所有語言代碼
export function getAllLanguageCodes(): Language[] {
  return Object.keys(languages) as Language[];
}
