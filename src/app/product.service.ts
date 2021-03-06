import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


interface product{
  name:string;
  type:string;
  description:string;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products:product[]=[];
productUpdate:Subject<any>= new Subject<any>();

  constructor() { }

  get list(){
    return this.products;
    this.productUpdate.next()
  }

  removeItem(name:string){
    this.products = this.products.filter(item => item.name !== name);
    this.productUpdate.next();
  }

  addItem(name:string,type:string,description:string){
    this.products.push({
      name: name,
      type: type,
      description:description
    });
    this.productUpdate.next();
  }
}
