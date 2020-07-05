import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isNotFound: boolean;

  constructor(private productService: ProductService) { }

  list = [];
  ngOnInit(): void {
    this.list = this.productService.list;
    this.productService.productUpdate.subscribe(() => {
      this.list = this.productService.list;
    })
  }


  changeList(name: string, type: string) {
    this.isNotFound = false;

    if (name && type) {
      this.list.forEach(item => {

        if (item.name === name) {
          this.isNotFound = true;
          return;
        }
      });


      if (!this.isNotFound) {
        this.productService.addItem(name, type);
      }
    }

  }

  deleteItem(name: string) {
    this.productService.removeItem(name);
  }
}
