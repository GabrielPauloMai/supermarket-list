import { Injectable } from '@angular/core';

import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';

import { BehaviorSubject, Observable } from 'rxjs';

import { Platform } from '@ionic/angular';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { HttpClient } from '@angular/common/http';

import { promise } from 'protractor';



// criação de uma interface para manipular os campos da tabela Item

export interface Item {

  id: number,

  produto: string,

  quantidade: number,

  tipo: number,

  status: number,

  valor: number,

}

@Injectable({

  providedIn: 'root'

})

export class DatabaseService {

  private database: SQLiteObject;

  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);



  item = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {



    //criação do banco de dados, chamando a função o método banco,

    //que fará a criação da tabela e inserção dos dados iniciais

    this.plt.ready().then(() => {

      this.sqlite.create({

        name: 'item.db',

        location: 'default',

      })

       .then((db: SQLiteObject): void => {

          this.database = db;

          this.dataBase();

         
        })

    });

  }

  // usará o arquivo criado no passo anterior para criação das tabelas

  dataBase() {

    this.http.get('assets/banco.sql', { responseType: 'text' })

      .subscribe(sql => {

        this.sqlitePorter.importSqlToDb(this.database, sql)

          .then(_ => {

            this.loadItem();

            this.dbReady.next(true);

          })

          .catch(e => console.error(e));

      });

  }



  //observable para o banco de dados

  getStatus() {

    return this.dbReady.asObservable();

  }



  //observable para a tabela item

  getItem(): Observable<Item[]> {

    return this.item.asObservable();

  }



  //recupera todos os lugares cadastrados

  loadItem() {

    return this.database.executeSql('SELECT * FROM item;', []).then(data => {

      let item: Item[] = [];

      if (data.rows.length > 0) {

        for (var i = 0; i < data.rows.length; i++) {


          item.push({

            id: data.rows.item(i).id,

            produto: data.rows.item(i).produto,

            quantidade: data.rows.item(i).quantidade,

            tipo: data.rows.item(i).tipo,

            status: data.rows.item(i).status,

            valor: data.rows.item(i).valor,

          });

        }

      }

      this.item.next(item);

    });

  }



  //adicionar um novo lugar ao banco

  addItem(produto, quantidade, tipo, status, valor) {

    let data = [produto, quantidade, tipo, status, valor];
 
    return this.database.executeSql('INSERT INTO item (produto, quantidade, tipo, status, valor) VALUES (?, ?, ?, ?, ?)', data).then(data => {

      this.loadItem();

    });

  }

  // pegar um único lugar, será usado na edição de um lugar cadastrado

  async getitem(id): Promise<Item> {

    const data = await this.database.executeSql('SELECT * FROM item WHERE id = ?', [id]);
  
    return {
      id: data.rows.item(0).id,

      produto: data.rows.item(0).produto,
      
      quantidade: data.rows.item(0).quantidade,

      tipo: data.rows.item(0).tipo,
      
      status: data.rows.item(0).status,

      valor: data.rows.item(0).valor,


    };

  }



  //deleção de um lugar

  deleteItem(id) {

    return this.database.executeSql('DELETE FROM Item WHERE id = ?', [id]).then(_ => {

      this.loadItem();

    });

  }

  //edição de um Item

  updateItem(item: Item) {

    let data = [item.produto, item.quantidade, item.tipo, item.status, item.valor, item.id];

    return this.database.executeSql(`UPDATE Item SET produto = ?, quantidade = ?, tipo = ?, status = ?, valor=? WHERE id = ${item.id}`, data).then(data => {

      this.loadItem();

    })

  }




}


