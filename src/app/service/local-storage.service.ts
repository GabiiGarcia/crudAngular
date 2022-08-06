import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public nombreProd: string = '';
  public productsArrayCopy: Array<any> = [];

  private dataObserv = new BehaviorSubject([]);
  currentDatalog = this.dataObserv.asObservable();
  productsArray: any;

  constructor(private router: Router, private toastr: ToastrService) { }


  public saveData(key: string, value: string){
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public testObserv() {
    return this.currentDatalog;
  }

  public login(name: any, pass: any){
    let users = [];
    if(localStorage.getItem('registro') != null){
      const data = localStorage.getItem('registro');
      const loginData = data !== null ? JSON.parse(data) : [];

      console.log('si jala', loginData[0].nomb);

      for(let i = 0; i < loginData.length; i ++) {
        loginData[i].nomb
        loginData[i].pass

        if(name === loginData[i].nomb && pass === loginData[i].pass ){
          this.toastr.success('Bienvenido ' + name, 'Acceso correcto');
          this.router.navigate(['/products'])

        }
      }
       this.dataObserv.next(loginData);
    }else{
      this.toastr.error('Registrate primero', 'Error');
    }
  }

  public registro(nombre: any, apellidos: any, email: any, contra: any, contra2: any){
    if(localStorage.getItem('registro') != null){
      if(contra === contra2) {
        const dataUser = localStorage.getItem('registro');
        const userData = dataUser !== null ? JSON.parse(dataUser) : [];

        userData.push({
          nombre: nombre,
          apellido: apellidos,
          email: email,
          pass: contra,
        });
        localStorage.setItem('registro', JSON.stringify(userData));
        this.toastr.success('Usuario registrado satisfactoriamente', 'Correcto');
        this.router.navigate(['login'])
        this.dataObserv.next(userData);
      } else {
        this.toastr.warning('Verifica las contrasenas', 'ALerta');
      }

    } else {
      if(contra === contra2) {
        const dataUser = localStorage.getItem('registro');
        const userData = dataUser !== null ? JSON.parse(dataUser) : [];

        localStorage.setItem('registro', JSON.stringify(userData));
      } else {
        this.toastr.warning('Verifica las contraseñas', 'Alerta');
      }
    }
  }



  //funcion para filtrar los productos
  inputSearch(value: any) {

    const dataFilter = this.productsArrayCopy.filter((dato: any) =>
      dato.nombre.toLowerCase().includes(value.toLowerCase()) || dato.precio.toLowerCase().includes(value.toLowerCase())
    );

    return this.productsArray = dataFilter;
  }


}




