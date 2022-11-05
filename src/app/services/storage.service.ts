import { Injectable } from '@angular/core';

import { DatePipe } from '@angular/common';

import { Storage } from '@ionic/storage-angular';

@Injectable({

  providedIn: 'root'

})

export class StorageService {

  constructor(private storage: Storage, private datepipe: DatePipe) {


    this.createDB();

   }


async createDB() {

  const storage = await this.storage.create();

  this.storage = storage;

  }


  public insert(item: Item) {

    let keys = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");

    return this.save(keys, item);

  }

 //Método para edição de uma tarefa, ele chamará o método save passando a chave do registro e a tarefa que será alterada

  public update(keys: string, item: Item) {

    return this.save(keys, item);

  }

 //Método para setar valores na chave do storage

  private save(keys: string, item: Item) {

    return this.storage.set(keys, item);

  }

  

 //Excluir um registro


  public remove(keys: string) {

    return this.storage.remove(keys);

  }



 //Selecionar todos os registros

  public getAll() {

    let lista: Lista[] = [];

    return this.storage.forEach((value: Item, keys: string) => {

      let item = new Lista();

      item.keys = keys;

      item.item = value;

      lista.push(item);

    })

      .then(() => {

        return Promise.resolve(lista);

      })

      .catch((error) => {

        return Promise.reject(error);

      });

  }

}

 // A classe item tem os atributos de um produto

export class Item {

  produto: string;

  quantidade: GLfloat;

  status: boolean;

}



 //A classe lista terá a chave do storage a o objeto Item com todos os campos

export class Lista {

  keys: string;

  item: Item;

}









