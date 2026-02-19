import { Component } from '@angular/core';
import { Header } from "../header/header";
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
