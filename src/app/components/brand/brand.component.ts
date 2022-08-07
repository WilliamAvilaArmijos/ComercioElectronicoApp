import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { BrandDto } from 'src/app/models/models';
import { BrandService } from 'src/app/components/brand/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands:Array<BrandDto>=[];
  selectedBrand!:BrandDto;
  formulario!: FormGroup;
  brand:{code: string, description: string}={code:'',description:''};
  submitted:boolean=false;
  constructor(private brandService: BrandService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.brandService.getBrands(new GlobalParams()).subscribe(
      data => this.brands = data
    );
  }
  editBrand(code:string, content:any) {
    this.brandService.getBrandById(code).subscribe(
      response => {
        this.selectedBrand = response;
        console.log(this.selectedBrand);
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    );
  }

  createBrand(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  buildForm() {
    this.formulario= this.formBuilder.group({
      code: [{value: this.selectedBrand.code, disabled: true}, [Validators.required, Validators.maxLength(4)]],
      description: [this.selectedBrand.description, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]]
    });
  }

  updateBrand(content:any) {
    if(this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);
    console.log(this.formulario.getRawValue());

    this.brandService.updateBrand(this.selectedBrand.code,this.formulario.getRawValue()).subscribe(
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
      console.log('Creando marca')
      this.brandService.createBrands(formulario.value).subscribe(data=>{
        console.log(data);
      });
    }
    this.modalService.dismissAll();
    window.location.reload();
  }

  deleted(code:string, content:any){
    this.brandService.deleteBrand(code).subscribe(
      response => console.log(response)
      
    );
    window.location.reload();
  }
}
