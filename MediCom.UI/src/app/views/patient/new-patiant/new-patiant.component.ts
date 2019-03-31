import { Component, OnInit } from '@angular/core';
import { LabTestGroupService } from '../../../Services/lab-test-group.service';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-new-patiant',
  templateUrl: './new-patiant.component.html',
  styleUrls: ['./new-patiant.component.scss']
})
export class NewPatiantComponent implements OnInit {
  newPatient: NewPatient;
  groups: SelectItemGroup[];
  group: any;
  totalTestAmount = 0;
  addedTests: NewPatientTest[];
  displayAddTestDialog: boolean;

  constructor(private _labTestGroupService: LabTestGroupService) { }

  ngOnInit() {
    this.newPatient = new NewPatient();
    this.addedTests = [];
    this.displayAddTestDialog = false;
    this.getLabTestGroups();
  }

  getLabTestGroups() {
    this.groups = [];
    this._labTestGroupService.getAllwithTests().subscribe((data: Array<any>) => {
      data.forEach(d => {
        if (d.tests && d.tests.length > 0) {
          const _g: SelectItemGroup = { label: d.name, value: d._id, items: [] };
          d.tests.forEach(t => {
            _g.items.push({ label: t.name, value: t._id, price: t.price });
          });
          this.groups.push(_g);
        }
      });
      console.log(this.groups);
    });
  }

  addTestToList() {
    this.displayAddTestDialog = true;
    const listItem = new NewPatientTest();
    this.groups.forEach(g => {
      const subItems = g.items.filter(s => s.value === this.group);
      if (subItems.length !== 0) {
        listItem.name = subItems[0].label;
        listItem.testId = subItems[0].value;
        listItem.groupName = g.label;
        listItem.price = subItems[0].price;
      }
    });
    this.addedTests.push(listItem);
  }

  onAddTestFilterTextChange(event) {
    debugger;

    
  }

}

export class NewPatient {
  name: string;
  tests: NewPatientTest[];
  age: number;
  gender: string;
  address: string;
  phone: string;
  ref: string;

}
export class NewPatientTest {
  name: string;
  testId: string;
  groupName: string;
  price: number;
}

export interface SelectItemGroup {
  label: string;
  value?: any;
  items: ItestSelectItem[];
}

export interface ItestSelectItem extends SelectItem {
  price?: number;
}
