import { Component, OnInit } from '@angular/core';
import { LabTestGroupService } from '../../../Services/lab-test-group.service';
import { Observable } from 'rxjs';
import { TreeNode, MessageService } from 'primeng/api';

@Component({
  selector: 'app-lab-test-groups',
  templateUrl: './lab-test-groups.component.html',
  styleUrls: ['./lab-test-groups.component.scss'],
  providers: [MessageService]
})
export class LabTestGroupsComponent implements OnInit {
  model: LabTestGroup;
  displayModel: boolean;
  selectedGroup: any;

  constructor(private labTestGroupService: LabTestGroupService, private messageService: MessageService) {
    this.tableDataSource = [];
    this.model = new LabTestGroup();
  }
  groups: Array<any>;
  tableDataSource: Array<any>;
  treeDataSource: TreeNode[];

  showAddNewForm() {
    this.displayModel = true;
    this.model = new LabTestGroup();
  }
  editGroup(group: LabTestGroup) {
    this.displayModel = true;
    this.model = group;
  }
  deleteGroup(id: string) {
    this.labTestGroupService.Delete(id).subscribe(d => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
      this.loadTree();
    });
  }

  loadChildren(parentId) {
    const childrens = [];
    this.groups.filter(i => i.parent === parentId || (i.parent && i.parent._id === parentId)).forEach(i => {
      i.children = this.loadChildren(i._id);
      i.label = i.name;
      i.data = i._id;
      i.expandedIcon = 'fa fa-folder-open';
      i.collapsedIcon = 'fa fa-folder';
      childrens.push(i);

    });
    return childrens;
  }
  groupNodeSelect(event) {
    this.bindTable(event.node._id);
  }

  validateParent() {
    let _parent = this.selectedGroup ? (this.selectedGroup._id.length > 0 ? this.selectedGroup._id : null) : null;
    if (_parent && _parent === 'root') {
      _parent = null;
    }
    return _parent;
  }
  addGroup(m: LabTestGroup) {
    if (m._id && m._id.length > 0) {
      const _model = { _id: m._id, parent: this.validateParent(), name: m.name };
      this.labTestGroupService.Update(m._id, (<any>_model)).subscribe(d => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully' });
        // this.loadTree();
        this.displayModel = false;
      });
    } else {
      m.parent = this.validateParent();
      this.labTestGroupService.Add(m).subscribe(d => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully' });
        this.loadTree();
        this.displayModel = false;
      });
    }
  }

  loadTree() {
    this.tableDataSource = [];
    const rootNode = {
      label: 'root', _id: 'root', data: 'root', children: [],
      expandedIcon: 'fa fa-folder-open', collapsedIcon: 'fa fa-folder'
    };
    this.treeDataSource = [rootNode];
    this.labTestGroupService.getAll().subscribe(d => {
      this.groups = d;
      this.treeDataSource[0].children = [];
      d.filter(i => !i.parent).forEach(i => {
        i.children = this.loadChildren(i._id);
        i.label = i.name;
        i.data = i._id;
        i.expandedIcon = 'fa fa-folder-open';
        i.collapsedIcon = 'fa fa-folder';
        this.treeDataSource[0].children.push(i);

      });
      this.treeDataSource[0].expanded = true;
    });
  }

  ngOnInit() {
    this.loadTree();

  }

  bindTable(parentId: string) {
    if (parentId === 'root') {
      this.tableDataSource = [];
      this.groups.filter(i => (!i.parent || i.parent._id === 'root')).forEach(i => {
        this.tableDataSource.push(i);
      });
    } else {
      this.tableDataSource = this.loadChildren(parentId);
    }
  }

}

export class LabTestGroup {
  name: string;
  price: Number;
  parent: string;
  _id: string;
}
