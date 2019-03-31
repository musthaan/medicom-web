import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-tests',
  templateUrl: './pending-tests.component.html',
  styleUrls: ['./pending-tests.component.scss']
})
export class PendingTestsComponent implements OnInit {
  tableDataSource: any;
  constructor() { }

  ngOnInit() {
  }

}
