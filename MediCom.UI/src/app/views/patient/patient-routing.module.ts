import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { NewPatiantComponent } from './new-patiant/new-patiant.component';
import { PendingTestsComponent } from './pending-tests/pending-tests.component';



const routes: Routes = [
    {
        path: '',

        data: {
            title: 'Patient'
        },
        children: [
            {
                data: {
                    title: 'New'
                },
                path: 'new',
                component: NewPatiantComponent
            }, {
                path: 'pending',
                component: PendingTestsComponent,
                data: {
                    title: 'Pending Tests'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
