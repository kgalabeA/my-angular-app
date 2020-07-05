import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  @Input() name:string;
  @Input() type:string;
  @Output('delete') deleteItem$: EventEmitter<string>= new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  deleteItem(event){
    this.deleteItem$.next(event);
  }
}
