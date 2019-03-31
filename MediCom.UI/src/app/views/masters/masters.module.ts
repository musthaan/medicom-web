import { NgModule } from '@angular/core';
import { LabTestComponent } from './lab-test/lab-test.component';
import { LabTestGroupsComponent } from './lab-test-groups/lab-test-groups.component';
import { FormsModule } from '@angular/forms';
import { MastersRoutingModule } from './masters-routing.module';
import { TreeModule, DialogModule, DropdownModule, KeyFilterModule, ButtonModule, AutoCompleteModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [CommonModule,
        FormsModule,
        MastersRoutingModule,
        TreeModule, TableModule, DialogModule, DropdownModule, KeyFilterModule, ToastModule, ButtonModule,
        AutoCompleteModule
    ],
    declarations: [LabTestComponent, LabTestGroupsComponent]
})
export class MastersModule { }
