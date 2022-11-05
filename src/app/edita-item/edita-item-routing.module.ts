import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditaItemPage } from './edita-item.page';

const routes: Routes = [
  {
    path: '',
    component: EditaItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaItemPageRoutingModule {}
