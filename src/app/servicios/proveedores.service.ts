import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  presURL = 'https://comprasapp-2a6e3.firebaseio.com/proveedores.json';
  preURL = 'https://comprasapp-2a6e3.firebaseio.com/proveedores';
  constructor(private http: HttpClient) { }

  postProveedor(proveedor: any) {
    const newpres = JSON.stringify(proveedor);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.presURL, newpres, { headers }).pipe(
      map(res => {
        console.log(res);
        return res;
      }))
  }

  getProveedor(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url)
    map(res => res);
  }

  getProveedores() {
    return this.http.get(this.presURL)
    map(res => res);
  }

  putProveedor(proveedor: any, id$: string) {
    
    const newpre = JSON.stringify(proveedor);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.preURL}/${id$}.json`;
    return this.http.put(url, newpre, { headers })
    map(res => {
      console.log(res);
      return res;
    })
  }

  delProveedor(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.delete(url)
    map(res => res);
  }

}
