import { Component, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';

@Component({
  selector: 'button[theme]',
  template: `
        <!--Flex wrapper for cross-browser support-->
        <div [class]="flex">
            <!--Left Icon-->
            <i *ngIf="icon && iconClass && leftSide" [ngClass]="iconClass"></i>
            <!--Transcluded Content-->
            <ng-content *ngIf="theme !== 'icon'"></ng-content>
            <!--Right Icon-->
            <i *ngIf="icon && iconClass && rightSide" [ngClass]="iconClass"></i>
            <i *ngIf="loading" class="loading">
                <svg version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                  x="0px" y="0px" width="18.2px" height="18.5px" viewBox="0 0 18.2 18.5" style="enable-background:new 0 0 18.2 18.5;"
                  xml:space="preserve">
                    <style type="text/css">
                      .spinner { fill:#FFFFFF; }
                    </style>
                    <path class="spinner" d="M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9
                        c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1
                        c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z"/>
                </svg>
            </i>
        </div>
    `,
})
export class NovoButtonComponent implements OnChanges {
  @Input() public icon: string;
  @Input() public color: string;
  @Input() public side: string;
  @Input() public theme: string;
  @Input() public loading: boolean;
  @Input() public state: string;

  @HostBinding('class') public buttonClasses: string;

  public leftSide: boolean = false;
  public rightSide: boolean = true;
  public iconClass: string;
  public flex: string;

  public ngOnChanges(changes?: SimpleChanges): void {
    // Enforcing style guidelines
    if (this.theme === 'primary' && !this.icon) {
      this.icon = 'check';
    } else if (this.theme === 'standard' && this.icon) {
      this.icon = undefined;
    }

    this.iconClass = (this.icon && !this.loading) ? `bhi-${this.icon}` : '';
    this.flex = this.theme ? 'flex-wrapper' : '';

    if (this.side !== undefined && this.theme !== 'primary') {
      this.leftSide = (this.side === 'left');
      this.rightSide = !this.leftSide;
    }

    let clazzes: string[] = [this.theme];
    if (this.icon) {
      clazzes.push('has-icon');
    }
    if (this.loading) {
      clazzes.push('loading');
    }
    if (this.color) {
      clazzes.push(this.color);
    }
    if (this.state) {
      clazzes.push(this.state);
    }
    this.buttonClasses = clazzes.join(' ');
  }
}
