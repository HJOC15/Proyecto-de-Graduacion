import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductosPageComponent } from './components/pages/productos-page/productos-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { EmpastadosPageComponent } from './components/pages/empastados-page/empastados-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { OrderDetailComponent } from './components/pages/order-detail/order-detail.component';
import { OrderPersonComponent } from './components/pages/order-person/order-person.component';
import { AdminAuthGuard } from './auth/guards/admin-auth.guard';
import { PedidoComponent } from './components/pages/pedido/pedido.component';
import { OrdenesEmpastadosPageComponent } from './components/pages/ordenes-empastados-page/ordenes-empastados-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'productos/:id', component:ProductosPageComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]},
  {path: 'payment', component: PaymentPageComponent, canActivate:[AuthGuard]},
  {path:'track/:orderId', component: OrderTrackPageComponent, canActivate:[AuthGuard]},
  {path: 'empastados-page', component: EmpastadosPageComponent, canActivate:[AuthGuard]},
  {path: 'contact-page', component: ContactPageComponent, canActivate:[AuthGuard]},
  {path: 'admin-page', component: AdminPageComponent, canActivate:[AdminAuthGuard]},
  {path: 'order/:id', component: OrderDetailComponent, canActivate:[AdminAuthGuard]},
  {path: 'order-person', component: OrderPersonComponent, canActivate:[AuthGuard]},
  {path: 'pedido', component: PedidoComponent, canActivate:[AuthGuard]},
  {path: 'ordenes-empastados-page', component: OrdenesEmpastadosPageComponent, canActivate:[AdminAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
