import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { PagedResultProductTypeDto, ProductTypeDto } from './models/modelspagination';
import { ProductTypeService } from './services/product-type.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  productTypes= { total: 0, items: [] } as PagedResultProductTypeDto<ProductTypeDto>;
  selectedType!:ProductTypeDto;
  formulario!: FormGroup;
  type:{code: string, description: string}={code:'',description:''};
  submitted:boolean=false;
  constructor(private productTypeService: ProductTypeService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productTypeService.getProductTypes(new GlobalParams()).subscribe(
      data => this.productTypes = data
    );
  }

  editType(code:string, content:any) {
    this.productTypeService.getTypeById(code).subscribe(
      response => {
        this.selectedType = response;
        console.log(this.selectedType);
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
      code: [{value: this.selectedType.code, disabled: true}, [Validators.required, Validators.maxLength(4)]],
      description: [this.selectedType.description, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]]
    });
  }

  update(content:any) {
    if(this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);
    console.log(this.formulario.getRawValue());

    this.productTypeService.updateType(this.selectedType.code,this.formulario.getRawValue()).subscribe(
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
      this.productTypeService.createType(formulario.value).subscribe(data=>{
        console.log(data);
      });
    }
    this.modalService.dismissAll();
    window.location.reload();
  }

  deleted(code:string, content:any){
    this.productTypeService.deleteType(code).subscribe(
      response => console.log(response)
      
    );
    window.location.reload();
  }

}
