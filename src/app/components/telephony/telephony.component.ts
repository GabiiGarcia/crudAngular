import { Component, OnInit } from '@angular/core';
import { Telephony } from '../../models/telephony';

@Component({
  selector: 'app-telephony',
  templateUrl: './telephony.component.html',
  styleUrls: ['./telephony.component.css']
})
export class TelephonyComponent implements OnInit {

  telephonyArray: Telephony[] = [
    {idTel: 1, nameTel: "Samsung", priceTel: 2000, descriptionTel: "Blanco 64 GB 4 RAM"},
    {idTel: 2, nameTel: "Nokia", priceTel: 2000, descriptionTel: "Negro 64 GB 4 RAM"}
  ];

  selectedTelephony: Telephony = new Telephony();

  openEditTel(telephony: Telephony){
    this.selectedTelephony = telephony;

  }

  addOrEditTel(){

    if(this.selectedTelephony.idTel === 0){
      this.selectedTelephony.idTel = this.telephonyArray.length + 1;
      this.telephonyArray.push(this.selectedTelephony);
    }
    this.selectedTelephony = new Telephony();
  }

  deleteTel(){
    if(confirm('¡Estas seguro de querer eliminarlo?')){
      this.telephonyArray = this.telephonyArray.filter( x => x != this.selectedTelephony);
      this.selectedTelephony = new Telephony();
    }

  }
  // constructor() { }

  ngOnInit(): void {
  }

}
