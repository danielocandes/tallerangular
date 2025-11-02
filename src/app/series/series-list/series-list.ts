import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../series';
import { Serie } from '../serie.model';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-list.html'
})
export class SeriesListComponent implements OnInit {
  series: Serie[] = [];
  averageSeasons: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe({
      next: (data) => {
        this.series = data;
        this.calculateAverage();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de series.';
        this.loading = false;
      }
    });
  }

  private calculateAverage(): void {
    if (!this.series || this.series.length === 0) {
      this.averageSeasons = null;
      return;
    }
    const total = this.series.reduce((sum, s) => sum + (s.seasons ?? 0), 0);
    this.averageSeasons = +(total / this.series.length).toFixed(2);
  }
}