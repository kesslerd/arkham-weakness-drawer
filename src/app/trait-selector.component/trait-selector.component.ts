import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
export class TraitSelectorComponent implements OnInit {
  options: SelectorOption[] = [];
  @Output() selectionChange = new EventEmitter<Set<string>>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<string[]>('assets/traits.json').subscribe(data => {
      this.options = data.map(t => ({ label: t, value: t }));
    });
  }

  onSelectorChange(selection: Set<string>) {
    this.selectionChange.emit(selection);
  }
}
