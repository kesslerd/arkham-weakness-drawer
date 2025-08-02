import { Component, EventEmitter, Output, OnChanges, Input, SimpleChanges } from '@angular/core';
import { SelectorOption } from '../selector.component/selector.component';
import { SelectorComponent } from '../selector.component/selector.component';

@Component({
  selector: 'pack-selector',
  imports: [
    SelectorComponent
  ],
  template: `
    <selector
      [options]="options"
      title="Expansion"
      (selectionChange)="selectionChange.emit($event)">
    </selector>
  `
})
export class PackSelectorComponent implements OnChanges {
  @Input() packs: Record<string, string> = {};
  @Output() selectionChange = new EventEmitter<Set<string>>();

  options: SelectorOption[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['packs']) {
      this.options = Object.entries(this.packs).map(([code, label]) => ({ label, value: code }));
    }
  }
}
