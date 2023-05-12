import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductosPageComponent } from './components/pages/productos-page/productos-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'productos/:id', component:ProductosPageComponent},
  {path: 'cart-page', component: CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }