import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Products } from '../models/products';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../service/local-storage.service';
import { ToastrService } from 'ngx-toastr';

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
  public editar: boolean = false;
  public idProd: any;

  constructor(
    private modal: NgbModal,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private service: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('products')) {
      const data = localStorage.getItem('products');
      this.productsArray = data !== null ? JSON.parse(data) : [];
      this.productsArrayCopy = [...this.productsArray];
      /* console.log(this.productsArray); */
    }
  }

  modalAdd(contenido: any) {
    this.selectedProducts = new Products();
    this.modal.open(contenido, { centered: true });
  }

  modalEdit(contenido: any) {
    this.modal.open(contenido, { centered: true });
  }

  productsArray: Products[] = [];

  selectedProducts: Products = new Products();

  openForEdit(contenido: any, products: Products) {
    this.modalEdit(contenido);
    this.idProd = products.id;
    /* console.log('id', this.idProd); */
    this.selectedProducts = products;
    this.editar = true;
    /* console.log(this.editar); */
  }

  add() {
    if (this.selectedProducts.id === 0) {
      /* console.log('agregar', this.selectedProducts); */
      if (
        this.selectedProducts.nombre &&
        this.selectedProducts.precio &&
        this.selectedProducts.descripcion &&
        this.selectedProducts.imagen
      ) {
        this.selectedProducts.id = this.productsArray.length + 1;
        this.selectedProducts.imagen = this.previsualizacion;

        this.productsArray.push(this.selectedProducts);
        this.productsArrayCopy = this.productsArray;
        localStorage.setItem(
          'products',
          JSON.stringify(this.productsArrayCopy)
        );

        this.selectedProducts = new Products();
        this.modal.dismissAll();
      } else {
        this.toastr.error(
          'No puedes dejar los inputs vacios',
          'llena todos los campos'
        );
      }
    }
  }

  edit(contenido: any) {
    /* console.log('pos', pos); */
    this.modal.open(contenido, { centered: true });
    this.selectedProducts.imagen = this.previsualizacion;
    localStorage.setItem('products', JSON.stringify(this.productsArray));
    this.modal.dismissAll();
  }

  delete() {
    if (confirm('¿Estas seguro de eliminar los datos?')) {
      if (this.nombreProd) {
        this.productsArray = this.productsArrayCopy.filter(
          (x) => x != this.selectedProducts
        );
        localStorage.setItem(
          'products',
          JSON.stringify(this.productsArrayCopy)
        );
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

  funciontType(editar, contenido) {
    if (editar) {
      this.edit(contenido);
    } else {
      this.add();
    }
  }

  inputSearch(value: any) {
    const filtrado = this.service.functionFilter(value, this.productsArray, this.productsArrayCopy);

    this.productsArray = filtrado;
  }
}
