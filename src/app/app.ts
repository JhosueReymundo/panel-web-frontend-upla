import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dialog } from './shared/dialog/componentsdialog/dialog/dialog'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dialog, ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontWeF');
}
