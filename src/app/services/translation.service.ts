import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type SupportedLanguage = 'en' | 'de' | 'fr' | 'it' | 'es';

interface Translations {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'beook2pdf_language';
  private readonly SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'de', 'fr', 'it', 'es'];
  private readonly DEFAULT_LANGUAGE: SupportedLanguage = 'en';
  
  private currentLanguage$ = new BehaviorSubject<SupportedLanguage>(this.DEFAULT_LANGUAGE);
  private translations: Translations = {};
  private translationsLoaded = false;
  private initPromise?: Promise<void>;

  constructor() {
    // Don't initialize here - will be done by APP_INITIALIZER
  }

  getCurrentLanguage(): Observable<SupportedLanguage> {
    return this.currentLanguage$.asObservable();
  }

  getCurrentLanguageValue(): SupportedLanguage {
    return this.currentLanguage$.value;
  }

  getSupportedLanguages(): SupportedLanguage[] {
    return [...this.SUPPORTED_LANGUAGES];
  }

  async setLanguage(lang: SupportedLanguage): Promise<void> {
    if (!this.SUPPORTED_LANGUAGES.includes(lang)) {
      lang = this.DEFAULT_LANGUAGE;
    }

    await this.loadTranslations(lang);
    this.currentLanguage$.next(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.updateDocumentLanguage(lang);
  }

  translate(key: string, params?: { [key: string]: any }): string {
    // Ensure translations are loaded (should be done by APP_INITIALIZER, but safety check)
    if (!this.translationsLoaded || Object.keys(this.translations).length === 0) {
      // If not loaded yet, return key as fallback
      // This should not happen with APP_INITIALIZER, but handle gracefully
      return key;
    }

    const keys = key.split('.');
    let value: any = this.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to key if translation not found
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Simple parameter replacement
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return value;
  }

  async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initializeLanguage();
    return this.initPromise;
  }

  private async initializeLanguage(): Promise<void> {
    // Check localStorage first
    const savedLang = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage;
    if (savedLang && this.SUPPORTED_LANGUAGES.includes(savedLang)) {
      await this.setLanguage(savedLang);
      return;
    }

    // Detect browser language
    const browserLang = this.detectBrowserLanguage();
    await this.setLanguage(browserLang);
  }

  private detectBrowserLanguage(): SupportedLanguage {
    if (typeof navigator === 'undefined') {
      return this.DEFAULT_LANGUAGE;
    }

    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (!browserLang) {
      return this.DEFAULT_LANGUAGE;
    }

    // Extract language code (e.g., 'de-DE' -> 'de')
    const langCode = browserLang.split('-')[0].toLowerCase();

    // Map to supported language
    if (this.SUPPORTED_LANGUAGES.includes(langCode as SupportedLanguage)) {
      return langCode as SupportedLanguage;
    }

    return this.DEFAULT_LANGUAGE;
  }

  private async loadTranslations(lang: SupportedLanguage): Promise<void> {
    try {
      const response = await fetch(`assets/i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}: ${response.status} ${response.statusText}`);
      }
      this.translations = await response.json();
      this.translationsLoaded = true;
      console.log(`Translations loaded for language: ${lang}`, Object.keys(this.translations).length, 'top-level keys');
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      // Fallback to English if translation file not found
      if (lang !== this.DEFAULT_LANGUAGE) {
        try {
          const response = await fetch(`assets/i18n/${this.DEFAULT_LANGUAGE}.json`);
          if (response.ok) {
            this.translations = await response.json();
            this.translationsLoaded = true;
            console.log(`Fallback translations loaded for language: ${this.DEFAULT_LANGUAGE}`);
          } else {
            throw new Error(`Failed to load fallback translations: ${response.status}`);
          }
        } catch (fallbackError) {
          console.error('Error loading fallback translations:', fallbackError);
          this.translations = {};
          this.translationsLoaded = false;
        }
      } else {
        this.translations = {};
        this.translationsLoaded = false;
      }
    }
  }

  private updateDocumentLanguage(lang: SupportedLanguage): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }
}


