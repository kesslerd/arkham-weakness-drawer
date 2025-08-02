import { Component, Input, OnInit } from '@angular/core';
import { BasicWeakness } from '../model/basic-weakness.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'weakness-list',
  templateUrl: './weakness-list.component.html',
  styleUrls: ['./weakness-list.component.scss']
})
export class WeaknessListComponent {
  @Input() weaknesses: BasicWeakness[] = [];
  @Input() packs: Record<string, string> = {};

  constructor(private http: HttpClient) { }

  getPackName(code: string): string {
    return this.packs[code] || code;
  }
}