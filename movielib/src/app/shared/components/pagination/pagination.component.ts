import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

	@Input() pageCount: number;
	@Input() currentPage: number;

	@Output() changePageEvent = new EventEmitter<number>();

	pages: number[];

  constructor() { }

  ngOnInit(): void {
  	this.pages = Array.from({length: this.pageCount}, (_, i) => i + 1);
  }

  changePage(value: number) {
  	this.currentPage = value;
    this.changePageEvent.emit(value);
  }
}
