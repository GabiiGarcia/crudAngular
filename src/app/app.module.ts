import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductosComponent } from './productos/productos.component';
import { RegisterComponent } from './components/register/register.component';
import { ModalProductosComponent } from './modal-productos/modal-productos.component';
import { SearchComponent } from './components/search/search.component';
import { TelephonyComponent } from './components/telephony/telephony.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    routingComponents,

    // LoginComponent,
    RegisterComponent,
     ModalProductosComponent,
     SearchComponent,
     TelephonyComponent,
    // HomeComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
