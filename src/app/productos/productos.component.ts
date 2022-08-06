import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Products } from '../models/products';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../service/local-storage.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public previsualizacion!: string;
  public archivos: any = [];
  public nombreProd: string = '';
  public productsArrayCopy: Array<any> = [];


  constructor(private modal: NgbModal, private sanitizer: DomSanitizer, private value: LocalStorageService ) {}

  ngOnInit(): void {
    if (localStorage.getItem('products')) {
      const data = localStorage.getItem('products');
      this.productsArray = data !== null ? JSON.parse(data) : [];
      this.productsArrayCopy = [...this.productsArray];
      /* console.log(this.productsArray); */
    }
  }

  openCentrado(contenido: any) {
    this.modal.open(contenido, { centered: true });

  }

  productsArray: Products[] = [];

  selectedProducts: Products = new Products();

  openForEdit(products: Products) {
    this.selectedProducts = products;
    this.modal.dismissAll();
  }

  addOrEdit() {
    if (this.selectedProducts.id === 0) {
      /* if (this.previsualizacion != null) { */
      //
      this.selectedProducts.id = this.productsArray.length + 1;
      this.selectedProducts.imagen = this.previsualizacion;
      //
      this.productsArray.push(this.selectedProducts);
      this.productsArrayCopy = this.productsArray;
      localStorage.setItem('products', JSON.stringify(this.productsArray));
      this.modal.dismissAll();
      /* } */
    }
    if(this.nombreProd) {
      localStorage.setItem('products', JSON.stringify(this.productsArrayCopy));
    }
    localStorage.setItem('products', JSON.stringify(this.productsArray));

    this.selectedProducts = new Products();
    this.modal.dismissAll();
  }

  delete() {
    if (confirm('¿Estas seguro de eliminar los datos?')) {
      if (this.nombreProd) {
        this.productsArray = this.productsArrayCopy.filter(
          (x) => x != this.selectedProducts
        );
        localStorage.setItem('products', JSON.stringify(this.productsArrayCopy));
        this.nombreProd = '';
      } else {
        this.productsArray = this.productsArray.filter(
          (x) => x != this.selectedProducts
        );
        localStorage.setItem('products', JSON.stringify(this.productsArray));
      }
      this.selectedProducts = new Products();
    }
  }

  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      /* console.log('visualizacion', this.previsualizacion); */
    });
    this.archivos.push(archivoCapturado);
    /* console.log(this.archivos); */
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: $event,
            image,
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

  //funcion para filtrar los productos
  inputSearch(value: any) {
    console.log('acceso');
  }

  // cerrar(){
  //   this.modal.dismissAll();
  //   console.log("clear clicked");

  // }


}
