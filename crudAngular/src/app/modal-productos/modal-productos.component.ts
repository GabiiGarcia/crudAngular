import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit {

  constructor(private modal:NgbModal) { }


  ngOnInit(): void {
  }


openCentrado(contenido: any){
  this.modal.open(contenido,{centered:true});
}


}
