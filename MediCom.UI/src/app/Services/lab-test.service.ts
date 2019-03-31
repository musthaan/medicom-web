import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LabTest } from '../models/LabTest';

@Injectable({
  providedIn: 'root'
})
export class LabTestService {

  
  constructor(private http: Http) { }

  public getAll() {
    return this.http.get('http://localhost:5001/api/labtest').map(x => x.json());
  }
  public Add(model: LabTest) {
    return this.http.post('http://localhost:5001/api/labtest', model).map(x => x.json());
  }
  public Update(id: string, model: LabTest) {
    return this.http.put('http://localhost:5001/api/labtest/' + id, model).map(x => x.json());
  }
  public Delete(id: string) {
    return this.http.delete('http://localhost:5001/api/labtest/' + id).map(x => x.json());
  }
  
  public getAllAvailableUnits() {
    return this.http.get('http://localhost:5001/api/labtest/all/availableunits').map(x => x.json());
  }
}
