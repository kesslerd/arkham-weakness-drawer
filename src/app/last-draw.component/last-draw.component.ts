import { Component, Input } from '@angular/core';
import { BasicWeakness } from '../model/basic-weakness.model';

@Component({
  selector: 'last-draw',
  templateUrl: './last-draw.component.html',
  styleUrls: ['./last-draw.component.scss']
})
export class LastDrawComponent {
  @Input() drawn: BasicWeakness[] = [];
}