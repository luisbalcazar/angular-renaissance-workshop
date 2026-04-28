import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  template: `@if (isLoading()) {
    <div class="grid h-screen fixed right-8 z-50">
      <div class="place-self-end loader"></div>
    </div>
  }`,
  styles: `
    .loader {
      @apply w-20 h-20 border-8 border-gray-300 rounded-full border-t-blue-600 animate-spin;
    }
  `,
})
export class Loader {
  isLoading = inject(LoaderService).isLoading;
}
