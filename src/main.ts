import {APP_INITIALIZER, enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function redirectToHttps () {
  if (!environment.production || location.protocol === 'https:') {
    return () => null;
  }

  return () => window.location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  {
    provide: APP_INITIALIZER,
    useFactory: redirectToHttps,
    multi: true,
  },
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
