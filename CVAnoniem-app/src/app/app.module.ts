import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

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
import {PrivacyComponent} from './faq/privacy/privacy.component';
import {AboutComponent} from './faq/about/about.component';
import {SavedCvComponent} from './user/saved-cv/saved-cv.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {UploadCvComponent} from './account/upload-cv/upload-cv.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MsgResultComponent} from './account/inbox/msg-result/msg-result.component';
import {MessageSenderComponent} from './message-sender/message-sender.component';
import {UserPermissionsComponent} from './user-permissions/user-permissions.component';
import {GoogleLoginComponent} from "./user/social-login/google-login/google-login.component";
import {OAuthModule} from "angular-oauth2-oidc";


const Route: Routes = [
  //{path: '', redirectTo: 'Home',},
  {path: '', component: HomeComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'FAQ', component: FAQComponent},
  {path: 'Privacy', component: PrivacyComponent},
  {path: 'Contact', component: ContactComponent},
  {path: 'Account', component: AccountComponent},
  {path: 'Inbox', component: InboxComponent},
  {path: 'About', component: AboutComponent},
  {path: 'CVPage', component: CvPageComponent},
  {path: 'SavedCVPage', component: SavedCvComponent},
  {path: 'UploadCV', component: UploadCvComponent},
  {path: 'SendMessage', component: MessageSenderComponent},
  {path: 'user-permissions', component: UserPermissionsComponent},
  {path: 'google-login', component: GoogleLoginComponent}
]

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
    SearchComponent,
    PrivacyComponent,
    AboutComponent,
    SavedCvComponent,
    UploadCvComponent,
    MsgResultComponent,
    MessageSenderComponent,
    UserPermissionsComponent,
    GoogleLoginComponent,
  ],
  imports: [
    BrowserModule,                  //Browser Module
    RouterModule.forRoot(Route),    //Page routing
    RouterOutlet,                   //Page Routing
    NgxExtendedPdfViewerModule,     //PDF Viewer
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot()         //Google Login
    //Back end communication
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
