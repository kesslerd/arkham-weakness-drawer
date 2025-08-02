import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { BasicWeakness } from './model/basic-weakness.model';

import { PackSelectorComponent } from './pack-selector.component/pack-selector.component';
import { TraitSelectorComponent } from './trait-selector.component/trait-selector.component';
import { LastDrawComponent } from './last-draw.component/last-draw.component';
import { WeaknessListComponent } from './weakness-list.component/weakness-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PackSelectorComponent,
    TraitSelectorComponent,
    LastDrawComponent,
    WeaknessListComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = 'Random Basic Weakness Picker';

  allWeaknesses: BasicWeakness[] = [];
  lastDrawnWeaknesses: BasicWeakness[] = [];
  weaknessList: BasicWeakness[] = [];

  selectedPacks: Set<string> = new Set();
  selectedTraits: Set<string> = new Set();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<BasicWeakness[]>('assets/basic_weaknesses.json').subscribe(data => {
      this.allWeaknesses = data;
    });
  }

  onPackChange(packs: Set<string>) {
    this.selectedPacks = packs;
  }

  onTraitChange(traits: Set<string>) {
    this.selectedTraits = traits;
  }

  clear(): void {
    this.lastDrawnWeaknesses = [];
    this.weaknessList = [];
  }

  draw(count: number): void {
    const valid = this.allWeaknesses.filter(card =>
      this.selectedPacks.has(card.pack_code) &&
      card.traits.some(trait => this.selectedTraits.has(trait))
    );

    const shuffled = valid.sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, count);

    this.lastDrawnWeaknesses = drawn;
    this.weaknessList = [...drawn, ...this.weaknessList];
  }
}