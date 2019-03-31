import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { LabTestGroup } from '../views/masters/lab-test-groups/lab-test-groups.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabTestGroupService {

  constructor(private _http: Http) { }

  public getAll() {
    return this._http.get(`${environment.apiPath}labtestgroup`).map(x => x.json());
  }
  public Add(model: LabTestGroup) {
    return this._http.post(`${environment.apiPath}labtestgroup`, model).map(x => x.json());
  }
  public Update(id: string, model: LabTestGroup) {
    return this._http.put(`${environment.apiPath}labtestgroup/${id}`, model).map(x => x.json());
  }
  public Delete(id: string) {
    return this._http.delete(`${environment.apiPath}labtestgroup/${id}`).map(x => x.json());
  }

  public getAllwithTests() {
    return this._http.get(`${environment.apiPath}labtestgroup/all/tests`).map(x => x.json());
  }

}
