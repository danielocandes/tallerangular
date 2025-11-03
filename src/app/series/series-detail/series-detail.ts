import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Serie } from '../serie.model';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-detail.html',
  styleUrl: './series-detail.css'
})
export class SeriesDetailComponent {
  @Input() serie!: Serie;
}