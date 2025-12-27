import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslationService } from './services/translation.service';

export function initializeTranslations(translationService: TranslationService) {
  return () => translationService.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslationService],
      multi: true
    }
  ]
};
