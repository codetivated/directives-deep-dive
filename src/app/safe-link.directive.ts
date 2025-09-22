import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });

  constructor() {
    console.log('SafeLinkDirective instantiated');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'You are about to leave this site. Do you want to proceed?'
    );
    if (wantsToLeave) {
      const href = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href =
        href + '?from=' + this.queryParam();
      return;
    } else {
      event?.preventDefault();
    }
  }
}
