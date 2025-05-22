import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  imports: [CommonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {
  @Input()
  text:string = "Submit"
  @Input()
  type:'button' | 'submit' ='submit'
  @Input()
  bgColor ="#e72929"
  @Input()
  color = "white"
  @Input()
  fontsizerem =1.2
  @Input()
  widthrem = 30
  @Output()
  onclick = new EventEmitter()
}
