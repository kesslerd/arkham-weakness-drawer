import { Component, EventEmitter, Output, OnChanges, Input, SimpleChanges } from '@angular/core';
import { SelectorOption } from '../selector.component/selector.component';
import { SelectorComponent } from '../selector.component/selector.component';

@Component({
  selector: 'trait-selector',
  imports: [
    SelectorComponent
  ],
  template: `
    <selector
      [options]="options"
      title="Traits"
      (selectionChange)="onSelectorChange($event)">
    </selector>
  `
})
export class TraitSelectorComponent implements OnChanges {
  @Input() traits: string[] = [];
  @Output() selectionChange = new EventEmitter<Set<string>>();


  options: SelectorOption[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['traits']) {
      this.options = this.traits.map(trait => ({ label: trait, value: trait }));
    }
  }

  onSelectorChange(selection: Set<string>) {
    this.selectionChange.emit(selection);
  }
}
