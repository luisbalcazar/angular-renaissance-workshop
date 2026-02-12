import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  template: `
    <div
      class="grid grid-rows-[auto_1fr_auto] min-h-screen max-w-screen-2xl mx-auto justify-between pt-4"
    >
      <app-header class="col-span-3" />
      <router-outlet />
      <app-footer class="col-span-3" />
    </div>
  `,
})
export class App {
  protected readonly title = signal('angular-renaissance-workshop');
}
