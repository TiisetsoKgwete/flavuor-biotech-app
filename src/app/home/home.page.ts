import { Component, OnInit } from '@angular/core';

type LiveState = 'loading' | 'ready' | 'error';

interface LiveIndicator {
  value: string;
  year: string;
  state: LiveState;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  liveIndicators: Record<'undernourishment' | 'foodProduction' | 'wasteMethane', LiveIndicator> = {
    undernourishment: { value: '', year: '', state: 'loading' },
    foodProduction: { value: '', year: '', state: 'loading' },
    wasteMethane: { value: '', year: '', state: 'loading' },
  };

  ngOnInit(): void {
    this.loadIndicator('undernourishment', 'SN.ITK.DEFC.ZS', (v) => `${v.toFixed(1)}%`);
    this.loadIndicator('foodProduction', 'AG.PRD.FOOD.XD', (v) => v.toFixed(1));
    this.loadIndicator('wasteMethane', 'EN.GHG.CH4.WA.MT.CE.AR5', (v) => v.toLocaleString());
  }

  private async loadIndicator(
    key: 'undernourishment' | 'foodProduction' | 'wasteMethane',
    code: string,
    formatValue: (value: number) => string,
  ): Promise<void> {
    const candidates = ['WLD', '1W'];

    for (const countryCode of candidates) {
      try {
        const response = await fetch(
          `https://api.worldbank.org/v2/country/${countryCode}/indicator/${code}?format=json&per_page=200`,
        );

        if (!response.ok) {
          continue;
        }

        const payload = await response.json();
        const data = Array.isArray(payload?.[1]) ? payload[1] : [];
        const latest = data.find((row: { value: number | null }) => row?.value !== null);

        if (!latest || latest.value === null) {
          continue;
        }

        this.liveIndicators[key] = {
          value: formatValue(Number(latest.value)),
          year: String(latest.date ?? ''),
          state: 'ready',
        };
        return;
      } catch {
        // Try fallback aggregate code before marking as unavailable.
      }
    }

    this.liveIndicators[key] = {
      value: '',
      year: '',
      state: 'error',
    };
  }
}

