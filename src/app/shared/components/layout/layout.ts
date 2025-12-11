import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { Header } from "../header/header";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-layout',
  imports: [Sidebar, Header, RouterOutlet, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
