import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeModule, DialogModule, DropdownModule, KeyFilterModule, ButtonModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NewPatiantComponent } from './new-patiant/new-patiant.component';
import { PatientRoutingModule } from './patient-routing.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PendingTestsComponent } from './pending-tests/pending-tests.component';


@NgModule({
    imports: [CommonModule,
        FormsModule,
        PatientRoutingModule,
        TreeModule, TableModule, DialogModule, DropdownModule, KeyFilterModule, ToastModule, ButtonModule,
        RadioButtonModule
    ],
    declarations: [NewPatiantComponent, PendingTestsComponent]
})
export class PatientModule { }
