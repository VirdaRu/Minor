import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {ContactComponent} from './contact/contact.component';
import {AdminComponent} from './admin/admin.component';
import {AccountComponent} from './account/account.component';
import {FAQComponent} from './faq/faq.component';
import {ErrorComponent} from './global/error/error.component';
import {CvPageComponent} from './cv-page/cv-page.component';
import {GlobalComponent} from './global/global.component';
import {FooterComponent} from './global/footer/footer.component';
import {HeaderComponent} from './global/header/header.component';
import {NavbarComponent} from './global/navbar/navbar.component';
import {InboxComponent} from './account/inbox/inbox.component';
import {CvUserComponent} from './account/cv-user/cv-user.component';
import {CvComponent} from './cv/cv.component';
import {CvListComponent} from './cv/cv-list/cv-list.component';
import {CvFullComponent} from './cv/cv-full/cv-full.component';
import {EMailComponent} from './contact/e-mail/e-mail.component';
import {UserComponent} from './user/user.component';
import {RecaptchaComponent} from './user/recaptcha/recaptcha.component';
import {SocialLoginComponent} from './user/social-login/social-login.component';
import {SearchComponent} from './home/search/search.component';

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
    CvComponent,
    CvListComponent,
    CvFullComponent,
    EMailComponent,
    UserComponent,
    RecaptchaComponent,
    SocialLoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
