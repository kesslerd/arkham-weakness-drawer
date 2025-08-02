import { Component, EventEmitter, Output, OnChanges, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<string[]>('assets/traits.json').subscribe(data => {
      this.options = data.map(t => ({ label: t, value: t }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['traits']) {
      this.options = Object.entries(this.traits).map(([code, label]) => ({ label, value: code }));
    }
  }

  onSelectorChange(selection: Set<string>) {
    this.selectionChange.emit(selection);
  }
}
