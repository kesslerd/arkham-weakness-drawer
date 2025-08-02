import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      (selectionChange)="selectionChange.emit($event)">
    </selector>
  `
})
export class PackSelectorComponent implements OnInit {
  options: SelectorOption[] = [];
  @Output() selectionChange = new EventEmitter<Set<string>>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ [code: string]: string }>('assets/packs.json').subscribe(data => {
      this.options = Object.entries(data).map(([code, label]) => ({ label, value: code }));
    });
  }
}
