import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editprov',
  templateUrl: './editprov.component.html',
  styleUrls: ['./editprov.component.css']
})
export class EditprovComponent implements OnInit {

  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza'];
  proveedorForm: FormGroup;
  proveedor: any;
  nombre: any;
  cif: any;
  direccion: any;
  codigo_postal: any;
  localidad: any;
  provincia: any;
  telefono: any;
  email: any;
  persona_contacto: any;
  id: string;
  constructor(private pf: FormBuilder,
    private proveedorService: ProveedoresService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params
      .subscribe(parametros => {
        this.id = parametros['id'];
        this.proveedorService.getProveedor(this.id)
          .subscribe(proveedor => this.proveedor = proveedor)
      });
  }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      codigo_postal: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      persona_contacto:['', Validators.required]
    });
    this.onChanges();
  }

  onChanges():void {
    this.proveedorForm.valueChanges.subscribe(valor => {
      this.direccion = valor.direccion;
      this.codigo_postal = valor.codigo_postal;
      this.localidad=valor.localidad;
      this.provincia=valor.provincia;
      this.telefono=valor.telefono;
      this.email=valor.email;
      this.persona_contacto=valor.persona_contacto;
    });

  }

  onSubmit(){
    this.proveedor=this.saveProveedor();
    this.proveedorService.putProveedor(this.proveedor, this.id)
      .subscribe(newpre => {
        this.router.navigate(['/proveedores']);
      })

  }

  saveProveedor(){
    const saveProveedor={
      nombre:this.proveedorForm.get('nombre').value,
      cif:this.proveedorForm.get('cif').value,
      direccion:this.proveedorForm.get('direccion').value,
      codigo_postal:this.proveedorForm.get('codigo_postal').value,
      localidad:this.proveedorForm.get('localidad').value,
      provincia:this.proveedorForm.get('provincia').value,
      telefono:this.proveedorForm.get('telefono').value,
      email:this.proveedorForm.get('email').value,
      persona_contacto:this.proveedorForm.get('persona_contacto').value,
    }
    return saveProveedor;
  }
}
