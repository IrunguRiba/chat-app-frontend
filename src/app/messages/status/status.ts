import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './status.html',
  styleUrls: ['./status.css'],
})
export class Status {
  img1 = 'img1.webp';
  img2 = 'img2.jpg';
  arrow = 'arrow.png';
  search = 'search.png';

  searchText: string = '';
  statuses = 50;
  statusesArray = Array.from({ length: this.statuses });
}