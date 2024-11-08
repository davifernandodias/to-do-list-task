import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-switch',
  standalone: true,
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})
export class InputSwitchComponent {
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();

  onSwitchChange(event: Event): void {
    this.change.emit(event); // Emitindo o evento para o componente pai
  }
}
