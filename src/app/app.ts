import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicWeakness } from './model/basic-weakness.model';

import { PackSelectorComponent } from './pack-selector.component/pack-selector.component';
import { TraitSelectorComponent } from './trait-selector.component/trait-selector.component';
import { LastDrawComponent } from './last-draw.component/last-draw.component';
import { TypeSelectorComponent } from './type-selector.component/type-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PackSelectorComponent,
    TraitSelectorComponent,
    TypeSelectorComponent,
    LastDrawComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = 'Draw Random Basic Weakness';

  allWeaknesses: BasicWeakness[] = [];
  allPacks: Record<string, string> = {};
  allTypes: Record<string, string> = {};
  allTraits: string[] = [];

  lastDrawnWeaknesses: BasicWeakness[] = [];

  selectedPacks: Set<string> = new Set();
  selectedTraits: Set<string> = new Set();
  selectedTypes: Set<string> = new Set();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<BasicWeakness[]>('assets/basic_weaknesses.json').subscribe(data => {
      this.allWeaknesses = data;
    });

    this.http.get<Record<string, string>>('assets/packs.json').subscribe(data => {
      this.allPacks = data;
    });

    this.http.get<string[]>('assets/traits.json').subscribe(data => {
      this.allTraits = data
    });

    this.http.get<Record<string, string>>('assets/types.json').subscribe(data => {
      this.allTypes = data
    });
  }

  onPackChange(packs: Set<string>) {
    this.selectedPacks = packs;
  }

  onTraitChange(traits: Set<string>) {
    this.selectedTraits = traits;
  }

  onTypeChange(types: Set<string>) {
    this.selectedTypes = types;
  }

  clear(): void {
    this.lastDrawnWeaknesses = [];
  }

  onVeto(card: BasicWeakness): void {
    this.lastDrawnWeaknesses = this.lastDrawnWeaknesses.filter(
      w => w.id !== card.id
    );
  }

  draw(count: number): void {
    const valid = this.allWeaknesses.filter(card =>
      this.selectedPacks.has(card.pack_code) &&
      card.traits.some(trait => this.selectedTraits.has(trait)) &&
      this.selectedTypes.has(card.type_code)
    );

    const shuffled = this.shuffle(valid)
    const drawn = shuffled.slice(0, count);

    this.lastDrawnWeaknesses = drawn;
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    let currentIndex = result.length;

    while (currentIndex-- !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);

      [result[currentIndex], result[randomIndex]] = [
        result[randomIndex],
        result[currentIndex],
      ];
    }

    return result;
  }

}