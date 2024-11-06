import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  // Dados fictícios
  rows = [
    { id: 1, name: 'to clean house', cost: 1000, status: 'Unpaid' },
    { id: 2, name: 'buy groceries', cost: 200, status: 'Paid' },
    { id: 3, name: 'pay bills', cost: 500, status: 'Pending' },
    { id: 4, name: 'repair car', cost: 1500, status: 'Pending' },
    { id: 5, name: 'renew subscription', cost: 120, status: 'Paid' },
    { id: 6, name: 'renew subscription', cost: 120, status: 'Paid' },
    { id: 7, name: 'renew subscription', cost: 120, status: 'Paid' },
    { id: 8, name: 'buy new phone', cost: 2500, status: 'Unpaid' },
    { id: 9, name: 'pay rent', cost: 1000, status: 'Unpaid' },
    { id: 10, name: 'buy clothes', cost: 300, status: 'Paid' },
    { id: 11, name: 'study for exams', cost: 0, status: 'Pending' },
    { id: 12, name: 'wash car', cost: 100, status: 'Paid' },
    { id: 13, name: 'organize office', cost: 250, status: 'Unpaid' },
    { id: 14, name: 'prepare dinner', cost: 200, status: 'Pending' },
    { id: 15, name: 'buy laptop', cost: 3000, status: 'Unpaid' }
  ];

  // Variáveis de controle da página
  currentPage = 1;
  pageSize = 7;
  totalPages = Math.ceil(this.rows.length / this.pageSize);

  // Método para obter as linhas da página atual
  get displayedRows() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.rows.slice(start, end);
  }

  // Método que será acionado quando o usuário rolar para baixo
  onScroll(event: any) {
    const scrollPosition = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;

    // Quando o usuário chegar perto do final da tabela, carregamos mais dados
    if (scrollHeight - scrollPosition <= clientHeight + 100) {
      this.loadMoreData();
    }
  }

  // Método para carregar mais dados
  loadMoreData() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Retorna a classe CSS dependendo do status
  getStatusClass(status: string) {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Paid':
        return 'status-paid';
      case 'Unpaid':
        return 'status-unpaid';
      default:
        return '';
    }
  }
}
