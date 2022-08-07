import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serv: LocalStorageService, private toastr: ToastrService) { }

  public user: string = '';
  public pass: string = '';
  public data: Array<any> = [];

  ngOnInit(): void {
    this.serv.testObserv().subscribe((dato: any) => {
      console.log('info Observable', dato);
    });
  }

  senduser(event: any) {
    console.log(event.target.value);
    this.user = event.target.value;
  }

  sendPass(event: any){
    console.log(event.target.value);
    this.pass = event.target.value;
  }

  sendData(){
    if (this.user && this.pass != null){
      this.serv.login(this.user, this.pass);
      let token = 'valido';
      sessionStorage.setItem('login', token);
    } else{
      this.toastr.warning('No puedes dejar los inputs vacios', 'llena todos los campos');
    }
  }

}
