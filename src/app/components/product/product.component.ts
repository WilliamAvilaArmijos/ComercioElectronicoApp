import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { BrandDto } from 'src/app/models/models';
import { PagedResultDto, ProductDto } from './models/modelspagination';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products= { total: 0, items: [] } as PagedResultDto<ProductDto>;
  selectedProduct!:ProductDto;
  formulario!: FormGroup;
  submitted:boolean=false;
  product: {name: string, description: string, price: number, productType: string, brand: string}= {name: '', description: '', price: 0, productType: '', brand: ''};
  constructor(private productService: ProductService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productService.getProducts(new GlobalParams()).subscribe(
      data => this.products = data
    );
  }

  editProduct(id:string, content:any) {
    this.productService.getProductsById(id).subscribe(
      response => {
        this.selectedProduct = response;
        console.log(this.selectedProduct);
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    );
  }

  create(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  buildForm() {
    this.formulario= this.formBuilder.group({
      id: [{value: this.selectedProduct.id, disabled: true}],
      name: [this.selectedProduct.name, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]],
      description: [this.selectedProduct.description, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]],
      price: [this.selectedProduct.price, [Validators.required]],
      productTypeId: [this.selectedProduct.productType],
      brandId: [this.selectedProduct.brand]
    });
  }

  update(content:any) {
    if(this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);
    console.log(this.formulario.getRawValue());

    this.productService.updateProducts(this.selectedProduct.id,this.formulario.getRawValue()).subscribe(
      response => console.log(response)
      
    );
    this.modalService.dismissAll();
    window.location.reload();
  }

  onSubmit(formulario: NgForm){
    console.log(formulario);

    if (formulario.form.invalid) {
      this.submitted = true;
      console.log("El formulario es invalido");
    }else{
      console.log('Creando tipo de producto')
      this.productService.createProducts(formulario.value).subscribe(data=>{
        console.log(data);
      });
    }
    this.modalService.dismissAll();
    window.location.reload();
  }

  deleted(id:string, content:any){
    this.productService.deleteProducts(id).subscribe(
      response => console.log(response)
      
    );
    window.location.reload();
  }

  
}
