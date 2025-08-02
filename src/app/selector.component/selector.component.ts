import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export interface SelectorOption {
  label: string;
  value: string;
}

@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnChanges {
  @Input() options: SelectorOption[] = [];
  @Output() selectionChange = new EventEmitter<Set<string>>();

  selected: Set<string> = new Set();
  allSelected = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options.length > 0 && !this.allSelected) {
      this.toggleAll(); // ✅ Only when options change and not yet selected
    }
  }

  toggleAll(): void {
    if (this.allSelected) {
      this.selected.clear();
    } else {
      this.options.forEach(opt => this.selected.add(opt.value));
    }

    this.allSelected = !this.allSelected;
    this.emitSelection();
  }

  onCheckboxChange(value: string, checked: boolean): void {
    if (checked) {
      this.selected.add(value);
    } else {
      this.selected.delete(value);
    }

    this.allSelected = this.selected.size === this.options.length;
    this.emitSelection();
  }

  private emitSelection(): void {
    this.selectionChange.emit(new Set(this.selected));
  }

  isChecked(value: string): boolean {
    return this.selected.has(value);
  }
}
