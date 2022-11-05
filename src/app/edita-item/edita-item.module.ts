import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaItemPageRoutingModule } from './edita-item-routing.module';

import { EditaItemPage } from './edita-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaItemPageRoutingModule
  ],
  declarations: [EditaItemPage]
})
export class EditaItemPageModule {}
