import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BodyComponent } from './app/shell/body/body.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/routes';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [BodyComponent],
  template: '<app-body></app-body>',
})
export class App {}

bootstrapApplication(App, {
  providers: [provideHttpClient(), provideRouter(routes)],
});
