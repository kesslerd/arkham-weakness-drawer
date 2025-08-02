import { Component, Input, OnInit } from '@angular/core';
import { BasicWeakness } from '../model/basic-weakness.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'weakness-list',
  templateUrl: './weakness-list.component.html',
  styleUrls: ['./weakness-list.component.scss']
})
export class WeaknessListComponent implements OnInit {
  @Input() weaknesses: BasicWeakness[] = [];
  packs: Record<string, string> = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Record<string, string>>('assets/packs.json').subscribe(data => {
      this.packs = data;
    });
  }

  getPackName(code: string): string {
    return this.packs[code] || code;
  }
}