
import { Component } from '@angular/core';
import { IonRefresher, IonSlide, ToastController } from '@ionic/angular';
import { DatabaseService, Item } from './../services/database.service';
import { Router, NavigationExtras  } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  lista: Item[];
  constructor(
    private toast: ToastController,
   private db: DatabaseService) {}


ngOnInit() {

  this.db.getStatus().subscribe(rdy => {

    if (rdy) {

      this.db.getItem().subscribe(result => {

        this.lista = result;

      })

    }

  });

}

 deleteItem(id){
  this.db.deleteItem(id);
}

updateItem(id){
  this.db.updateItem(id);
  
}

completeItem(id){
  this.db.updateItem(id);
}
  

  


}


