import { Component, Input, OnInit } from '@angular/core';
import { BasicWeakness } from '../model/basic-weakness.model';

@Component({
  selector: 'weakness-list',
  templateUrl: './weakness-list.component.html',
  styleUrls: ['./weakness-list.component.scss']
})
export class WeaknessListComponent {
  @Input() weaknesses: BasicWeakness[] = [];
  @Input() packs: Record<string, string> = {};

  getPackName(code: string): string {
    return this.packs[code] || code;
  }
}