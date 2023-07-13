import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() classText: string;
  @Output() buttonClick = new EventEmitter<any>();

  constructor() {
    this.text = "";
    this.classText = "btn btn-primary";
   }
  
  onClick(): void {
    this.buttonClick.emit();
  }
}
