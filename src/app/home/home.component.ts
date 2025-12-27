import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageSwitcherComponent } from '../components/language-switcher/language-switcher.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly downloadUrl = 'https://github.com/Createyourfreeacc/Beook2PDF/releases/download/v0.1.0/Beook2PDF-Setup-0.1.0.exe';
  readonly githubUrl = 'https://github.com/Createyourfreeacc/beook2pdf';
  readonly currentYear = new Date().getFullYear();

  private subscription?: Subscription;
  currentLang = '';

  get benefits() {
    const t = this.translationService.translate.bind(this.translationService);
    return [
      {
        title: t('benefits.items.0.title'),
        description: t('benefits.items.0.description')
      },
      {
        title: t('benefits.items.1.title'),
        description: t('benefits.items.1.description')
      },
      {
        title: t('benefits.items.2.title'),
        description: t('benefits.items.2.description')
      },
      {
        title: t('benefits.items.3.title'),
        description: t('benefits.items.3.description')
      }
    ];
  }

  get useCases() {
    const t = this.translationService.translate.bind(this.translationService);
    return [
      {
        title: t('useCases.items.0.title'),
        description: t('useCases.items.0.description')
      },
      {
        title: t('useCases.items.1.title'),
        description: t('useCases.items.1.description')
      },
      {
        title: t('useCases.items.2.title'),
        description: t('useCases.items.2.description')
      }
    ];
  }

  get steps() {
    const t = this.translationService.translate.bind(this.translationService);
    return [
      {
        number: t('steps.items.0.number'),
        title: t('steps.items.0.title'),
        description: t('steps.items.0.description')
      },
      {
        number: t('steps.items.1.number'),
        title: t('steps.items.1.title'),
        description: t('steps.items.1.description')
      },
      {
        number: t('steps.items.2.number'),
        title: t('steps.items.2.title'),
        description: t('steps.items.2.description')
      },
      {
        number: t('steps.items.3.number'),
        title: t('steps.items.3.title'),
        description: t('steps.items.3.description')
      }
    ];
  }

  get faqs() {
    const t = this.translationService.translate.bind(this.translationService);
    return [
      {
        q: t('faq.items.0.q'),
        a: t('faq.items.0.a')
      },
      {
        q: t('faq.items.1.q'),
        a: t('faq.items.1.a')
      },
      {
        q: t('faq.items.2.q'),
        a: t('faq.items.2.a')
      },
      {
        q: t('faq.items.3.q'),
        a: t('faq.items.3.a')
      },
      {
        q: t('faq.items.4.q'),
        a: t('faq.items.4.a')
      }
    ];
  }

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to language changes to trigger change detection
    this.subscription = this.translationService.getCurrentLanguage().subscribe(lang => {
      this.currentLang = lang;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffsetPx = 84;
      const y = element.getBoundingClientRect().top + window.scrollY - navOffsetPx;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}

