import { Component, OnInit } from '@angular/core';
import { LabTestService } from '../../../Services/lab-test.service';
import { LabTest } from '../../../models/LabTest';
import { SelectItem, MessageService } from 'primeng/api';
import { LabTestGroup } from '../lab-test-groups/lab-test-groups.component';
import { LabTestGroupService } from '../../../Services/lab-test-group.service';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss'],
  providers: [MessageService]

})
export class LabTestComponent implements OnInit {
  tableDataSource: LabTest[];
  model: LabTest;
  displayModel = false;
  groups: SelectItem[];
  modalForm: IModalForm;
  selectedItemForDelete: string;
  unitSuggestions: Array<string>;
  groupOptions:any;

  constructor(private _labTestService: LabTestService, private _labTestGroupService: LabTestGroupService,
    private messageService: MessageService) {
    this.model = new LabTest();
    this.modalForm = { group: {} }; this.unitSuggestions = [];
    this.groupOptions =[];
    
  }

  ngOnInit() {
    this.bindGroupDropDown();
    this.loadTable();
  }
  bindUnits(event) {

    this._labTestService.getAllAvailableUnits().subscribe((d: Array<string>) => {
      if (d) {
        this.unitSuggestions = d.filter(s => s.indexOf(event.query) >= 0);
      }
    });
  }
  loadTable() {
    this._labTestService.getAll().subscribe(d => {
      this.tableDataSource = d;
    });
  }
  bindGroupDropDown() {
    this.groups = [];
    this._labTestGroupService.getAll().subscribe((d: Array<any>) => {
      d.forEach(g => {
        this.groups.push({ label: g.name, value: { id: g._id, name: g.name } });
      });

    });
  }
  showAddNewForm() { this.displayModel = true; this.model = new LabTest(); }
  editTest(m: LabTest) {
    this.modalForm.group = { id: (<any>m.group)._id, name: (<any>m.group).name };
    this.model = m;
    this.displayModel = true;
  }
  deleteTest() {
    if (this.selectedItemForDelete) {
      this.messageService.clear('c');

      this._labTestService.Delete(this.selectedItemForDelete).subscribe(d => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
        this.displayModel = false;
        this.loadTable();
      });
    }
  }
  addTest(m: LabTest) {
    if (!this.validateForm()) { return false; }

    m.group = this.modalForm.group.id;
    this.messageService.clear('c');
    if (m._id) {
      this._labTestService.Update(m._id, m).subscribe(d => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully' });
        // this.displayModel = false;
        this.model = new LabTest();
        this.loadTable();
      });
    } else {
      this._labTestService.Add(m).subscribe(d => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully' });
        // this.displayModel = false;
        this.model = new LabTest();
        this.loadTable();
      });
    }
  }
  showDeleteConfirm(id: string) {
    this.messageService.clear();
    this.selectedItemForDelete = id;
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }
  onReject() {
    this.messageService.clear('c');

  }
  validateForm(): boolean {
    let msg = '';
    if (!this.model.name) {
      msg = 'Name is required';
      this.messageService.add({ severity: 'error', summary: 'Validation failed', detail: msg });
    }
    if (!this.modalForm.group || !this.modalForm.group.id) {
      msg = 'Group is required';
      this.messageService.add({ severity: 'error', summary: 'Validation failed', detail: msg });
    }
    if (!this.model.unit) {
      msg = 'Unit is required';
      this.messageService.add({ severity: 'error', summary: 'Validation failed', detail: msg });
    }
    if (!this.model.price) {
      msg = 'Price is required';
      this.messageService.add({ severity: 'error', summary: 'Validation failed', detail: msg });
    }
    return msg.length === 0;
  }

}


export interface IModalForm {
  group: any;
  naem?: string;
}
