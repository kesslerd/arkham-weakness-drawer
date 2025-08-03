import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BasicWeakness } from '../model/basic-weakness.model';

@Component({
  selector: 'last-draw',
  templateUrl: './last-draw.component.html',
  styleUrls: ['./last-draw.component.scss']
})
export class LastDrawComponent {
  @Input() drawn: BasicWeakness[] = [];
  @Input() packs: Record<string, string> = {};

  @Output() veto = new EventEmitter<BasicWeakness>();

  onVeto(card: BasicWeakness) {
    this.veto.emit(card);
  }
}