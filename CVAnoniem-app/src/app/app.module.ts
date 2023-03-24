import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { FAQComponent } from './faq/faq.component';
import { ErrorComponent } from './global/error/error.component';
import { CvPageComponent } from './cv-page/cv-page.component';
import { GlobalComponent } from './global/global.component';
import { FooterComponent } from './global/footer/footer.component';
import { HeaderComponent } from './global/header/header.component';
import { NavbarComponent } from './global/navbar/navbar.component';
import { InboxComponent } from './account/inbox/inbox.component';
import { CvUserComponent } from './account/cv-user/cv-user.component';
import { CVComponent } from './CV/CV.component';
import { CvListComponent } from './CV/cv-list/cv-list.component';
import { CvFullComponent } from './CV/cv-full/cv-full.component';
import { EMailComponent } from './contact/e-mail/e-mail.component';
import { UserComponent } from './user/user.component';
import { RecaptchaComponent } from './user/recaptcha/recaptcha.component';
import { SociaLoginComponent } from './user/social-login/socia-login.component';
import { SearchComponent } from './home/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    AdminComponent,
    AccountComponent,
    FAQComponent,
    ErrorComponent,
    CvPageComponent,
    GlobalComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    InboxComponent,
    CvUserComponent,
    CVComponent,
    CvListComponent,
    CvFullComponent,
    EMailComponent,
    UserComponent,
    RecaptchaComponent,
    SociaLoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
