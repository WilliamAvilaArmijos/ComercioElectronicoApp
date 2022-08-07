import { NgModule } from "@angular/core";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductTypeComponent } from "./product-type.component";

@NgModule({
    declarations:[
        ProductTypeComponent,
    ],
    imports:[
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        NgbModule,
        FormsModule
    ],
    exports:[
        ProductTypeComponent,
    ]
})
export class ProductTypeModule{

}