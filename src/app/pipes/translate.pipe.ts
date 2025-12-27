import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey?: string;
  private lastValue?: string;
  private subscription?: Subscription;

  constructor(
    private translationService: TranslationService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.subscription = this.translationService.getCurrentLanguage().subscribe(() => {
      this.lastValue = undefined; // Force recalculation
      this.changeDetector.markForCheck();
    });
  }

  transform(key: string, params?: { [key: string]: any }): string {
    if (!key) {
      return '';
    }

    if (this.lastKey === key && this.lastValue !== undefined) {
      return this.lastValue;
    }

    this.lastKey = key;
    this.lastValue = this.translationService.translate(key, params);
    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}


