import { Component, OnInit } from '@angular/core';

import { StorageService, Item } from '../services/storage.service';

import { NavController,  ToastController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'app-edita-item',

  templateUrl: './edita-item.page.html',

  styleUrls: ['./edita-item.page.scss'],

})

export class EditaItemPage implements OnInit {

  model: Item;

  key: string;

  parametros: any;



  constructor(public navCtrl: NavController, 

     private storageService: StorageService, 

     private route: ActivatedRoute,

     private router: Router,

     private toast: ToastController) { }



 

     ngOnInit() {

      this.route.queryParams.subscribe(()=> {

        let getNav = this.router.getCurrentNavigation();

        if (getNav.extras.state) {

          this.key = getNav.extras.state.valorParaEnviar.keys;

          this.model = getNav.extras.state.valorParaEnviar.lista;

        } else {

          this.model = new Item(); 

        }

      });

       

    }

 // Chama o método salvaTarefa exibindo um toast se houver erro ou sucesso.

 // https://ionicframework.com/docs/native/toast        ;

  save() {

    this.salvaItem()

      .then(async () => {

        (await this.toast.create({ message: 'Item salvo.', duration: 3000, position: 'bottom' })).present();

        this.navCtrl.pop();

      })

      .catch(async () => {

        (await this.toast.create({ message: 'Erro ao salvar o Item.', duration: 3000, position: 'bottom' })).present();

      });

  }

 // se já existir uma key chama o método update, senão chama o método insert do Service Storage

  private salvaItem() {

    if (this.key) {

      return this.storageService.update(this.key, this.model);

    } else {

      return this.storageService.insert(this.model);

    }

  }

}