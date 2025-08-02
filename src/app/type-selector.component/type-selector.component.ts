import { Component, EventEmitter, Output, OnChanges, Input, SimpleChanges } from '@angular/core';
import { SelectorOption } from '../selector.component/selector.component';
import { SelectorComponent } from '../selector.component/selector.component';

@Component({
  selector: 'type-selector',
  imports: [
    SelectorComponent
  ],
  template: `
    <selector
      [options]="options"
      title="Type"
      (selectionChange)="selectionChange.emit($event)">
    </selector>
  `
})
export class TypeSelectorComponent implements OnChanges {
  @Input() types: Record<string, string> = {};
  @Output() selectionChange = new EventEmitter<Set<string>>();

  options: SelectorOption[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['types']) {
      this.options = Object.entries(this.types).map(([code, label]) => ({ label, value: code }));
    }
  }
}
