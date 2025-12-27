import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, SupportedLanguage } from '../../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent implements OnInit {
  @ViewChild('dropdownContainer') dropdownContainer?: ElementRef;
  currentLanguage: SupportedLanguage = 'en';
  supportedLanguages: SupportedLanguage[] = [];
  isOpen = false;

  readonly languageNames: Record<SupportedLanguage, string> = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
    es: 'Español'
  };

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.supportedLanguages = this.translationService.getSupportedLanguages();
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  async selectLanguage(lang: SupportedLanguage): Promise<void> {
    await this.translationService.setLanguage(lang);
    this.isOpen = false;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  getLanguageName(lang: SupportedLanguage): string {
    return this.languageNames[lang];
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (this.isOpen && this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}

