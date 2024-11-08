import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importando FormsModule

@Component({
  selector: 'app-input-search',
  standalone: true,  // Certificando-se de que é um componente standalone
  imports: [FormsModule],  // Importando FormsModule aqui
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent {
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  searchText: string = '';

  onSearchChange(): void {
    this.searchChanged.emit(this.searchText);  // Emite o texto da pesquisa
  }
}
