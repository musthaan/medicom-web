import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { LabTestGroupsComponent } from './lab-test-groups/lab-test-groups.component';
import { LabTestComponent } from './lab-test/lab-test.component';



const routes: Routes = [
    {
        path: '',

        data: {
            title: 'Masters'
        }, children: [
            {
                data: {
                    title: 'Lab Test Group'
                },
                path: 'group',
                component: LabTestGroupsComponent
            },
            { data: {
                title: 'Lab Test'
            },
                path: 'labtest',
                component: LabTestComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MastersRoutingModule { }
