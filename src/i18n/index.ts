// src/i18n/index.ts
// Lightweight client-side i18n system for Mausam
import en from './en';
import hi from './hi';

export type Lang = 'en' | 'hi';

const dictionaries: Record<Lang, Record<string, string>> = { en, hi };

let currentLang: Lang = (localStorage.getItem('mausam_lang') as Lang) || 'en';

export function t(key: string): string {
  return dictionaries[currentLang][key] || dictionaries.en[key] || key;
}

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem('mausam_lang', lang);
  document.documentElement.lang = lang;
}

export function toggleLang(): Lang {
  const next = currentLang === 'en' ? 'hi' : 'en';
  setLang(next);
  return next;
}

// Translate all elements with data-i18n attribute
export function translatePage(): void {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translated = t(key);
      if (el.tagName === 'INPUT') {
        (el as HTMLInputElement).placeholder = translated;
      } else {
        el.textContent = translated;
      }
    }
  });
  // Also update aria-labels
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) el.setAttribute('aria-label', t(key));
  });
}

// Weather condition translations
export function translateCondition(condition: string): string {
  if (currentLang === 'en') return condition;
  const map: Record<string, string> = {
    'Sunny': 'धूप',
    'Clear': 'साफ',
    'Partly Cloudy': 'आंशिक रूप से बादल',
    'Mostly Cloudy': 'अधिकतर बादल',
    'Cloudy': 'बादल',
    'Overcast': 'बादल छाए',
    'Light Drizzle': 'हल्की बूंदाबांदी',
    'Drizzle': 'बूंदाबांदी',
    'Heavy Drizzle': 'तेज बूंदाबांदी',
    'Light Rain': 'हल्की बारिश',
    'Rain': 'बारिश',
    'Moderate Rain': 'मध्यम बारिश',
    'Heavy Rain': 'तेज बारिश',
    'Passing Showers': 'गुजरती बौछारें',
    'Light Showers': 'हल्की बौछारें',
    'Showers': 'बौछारें',
    'Thunderstorm': 'तूफान',
    'Lightning': 'बिजली',
    'Snow': 'बर्फ़',
    'Light Snow': 'हल्की बर्फ़',
    'Heavy Snow': 'तेज बर्फ़',
    'Fog': 'कोहरा',
    'Mist': 'कोहरा',
    'Haze': 'धुंध',
    'Windy': 'तेज़ हवा',
    'Hot': 'गर्म',
    'Cold': 'ठंड',
    'Warm': 'गर्म',
    'Cool': 'ठंडा',
    'Humid': 'उमस',
    'Dry': 'शुष्क',
    'Sunny and Warm': 'धूप और गर्म',
    'Clear and Crisp': 'साफ और ताज़ा',
    'Hazy Sunshine': 'धुंधली धूप',
  };
  return map[condition] || condition;
}
