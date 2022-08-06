import { Component, OnInit } from '@angular/core';
import { LocalStorageService} from '../../service/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private serUser: LocalStorageService, private toastr: ToastrService) { }

  public nomb: string = '';
  public apell: string = '';
  public email: string = '';
  public pass: string = '';
  public pass2: string = '';
  public dataUser: Array<any> = [];


  ngOnInit(): void {
    this.serUser.testObserv().subscribe((dato: any) => {
      console.log('Info Observable', dato);
    });
  }

  sendNomb(event: any){
    console.log(event.target.value);
    this.nomb = event.target.value;
  }

  sendApell(event: any){
    console.log(event.target.value);
    this.apell = event.target.value;
  }

  sendEmail(event: any) {
    console.log(event.target.value);
    this.email = event.target.value;
  }

  sendPass(event: any) {
    console.log(event.target.value);
    this.pass = event.target.value;
  }

  sendPassConfirm(event: any){
    console.log(event.target.value);
    this.pass2 = event.target.value;
  }

  sendDataUser(){
    if (this.nomb && this.apell && this.email && this.pass && this.pass2 != null){
      this.serUser.registro(this.nomb,this.apell,this.email,this.pass,this.pass2);
       let token = 'Usuario valido';
       sessionStorage.setItem('registro', token);
    } else {
      this.toastr.warning('Verifica tus datos', 'No puedes dejar los inputs vacios');
    }
  }


}
