import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  searchText: string = '';
  data = [
    { id: 'INV__1001', name: 'Paragon', cost: 520.18, maxDate: '01/05/2021' },
    { id: 'INV__1002', name: 'Sonic', cost: 415.25, maxDate: '01/04/2021' },
    { id: 'INV__1003', name: 'Innercircle', cost: 1324.84, maxDate: '01/02/2021' },
    { id: 'INV__1004', name: 'Varsity Plus', cost: 998.26, maxDate: '30/12/2020' },
    { id: 'INV__1005', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1006', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1007', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' },
    { id: 'INV__1008', name: 'Highlander', cost: 1152.35, maxDate: '18/12/2020' }
  ];

  // Função para filtrar os dados com base no texto de pesquisa
  filteredData() {
    if (!this.searchText) {
      return this.data;
    }
    return this.data.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.id.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
