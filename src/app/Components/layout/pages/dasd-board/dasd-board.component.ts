import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dasd-board',
  templateUrl: './dasd-board.component.html',
  styleUrls: ['./dasd-board.component.css']
})
export class DashboardComponent implements OnInit {
  
  totalIngresos: number = 0;
  totalVentas: number = 0;
  totalProductos: number = 0;
  reservasSemana: number = 0;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(stats => {
      this.totalIngresos = stats.totalIngresos;
      this.totalVentas = stats.totalVentas;
      this.totalProductos = stats.totalProductos;
      this.reservasSemana = stats.reservasSemana;
      this.initCharts();
    });
  }

  initCharts(): void {
    // Gráfico de Barras
    new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: ['Ingresos', 'Ventas', 'Productos', 'Reservas'],
        datasets: [{
          label: 'Estadísticas',
          data: [this.totalIngresos, this.totalVentas, this.totalProductos, this.reservasSemana],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico de Líneas
    new Chart('chartLineas', {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'Reservas Semanales',
          data: [5, 10, 8, 12], // Datos de ejemplo
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}