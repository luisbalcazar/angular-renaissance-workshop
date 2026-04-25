import { Component } from '@angular/core';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `<div class="grid min-h-screen grid-rows-[auto_1fr_auto] justify-between mx-auto pt-4">
    <app-header class="col-span-3" />
    <router-outlet />
    <app-footer class="col-span-3" />
  </div>`,
})
export class App {
  title = 'workshop-fundamentals';
}
