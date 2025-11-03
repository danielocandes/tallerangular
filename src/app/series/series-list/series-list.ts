import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../series';
import { Serie } from '../serie.model';
import { SeriesDetailComponent } from '../series-detail/series-detail';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, SeriesDetailComponent],
  templateUrl: './series-list.html'
})
export class SeriesListComponent implements OnInit {
  series: Serie[] = [];
  selectedSerie: Serie | null = null;
  averageSeasons: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe({
      next: (data: Serie[]) => {
        this.series = data;
        this.calculateAverage();
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de series.';
        this.loading = false;
      }
    });
  }

  selectSerie(serie: Serie): void {
    this.selectedSerie = serie;
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
