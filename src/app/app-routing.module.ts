import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { DefaultErrorComponent } from './components/default-error/default-error.component';
import { HomeComponent } from './components/home/home.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'marca', component: BrandComponent},
  {path:'not-found', component: DefaultErrorComponent},
  {path:'productos', component: ProductComponent},
  {path:'tipos-productos', component: ProductTypeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
