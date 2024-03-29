import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductosPageComponent } from './components/pages/productos-page/productos-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { EmpastadosPageComponent } from './components/pages/empastados-page/empastados-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { OrderDetailComponent } from './components/pages/order-detail/order-detail.component';
import { OrderPersonComponent } from './components/pages/order-person/order-person.component';
import { ThreeRendererComponent } from './components/pages/three-renderer/three-renderer.component';
import { PedidoComponent } from './components/pages/pedido/pedido.component';
import { OrdenesEmpastadosPageComponent } from './components/pages/ordenes-empastados-page/ordenes-empastados-page.component';
import { OrdenesEmpastadosPersonaPageComponent } from './components/pages/ordenes-empastados-persona-page/ordenes-empastados-persona-page.component';
/*
import { registerLocaleData } from '@angular/common';
import localeEsGT from '@angular/common/locales/es-GT';
*/
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductosPageComponent,
    CartPageComponent,
    TitleComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,
    EmpastadosPageComponent,
    ContactPageComponent,
    AdminPageComponent,
    OrderDetailComponent,
    OrderPersonComponent,
    ThreeRendererComponent,
    PedidoComponent,
    OrdenesEmpastadosPageComponent,
    OrdenesEmpastadosPersonaPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [

    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true },
    /*{ provide: LOCALE_ID, useValue: 'es-GT' }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
