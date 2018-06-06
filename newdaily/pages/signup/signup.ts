import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public myform : FormGroup;
  account: { username: any, password: any } = {
    username: this.datepipe.transform(new Date(),'hss')+''+Math.floor(100 + Math.random() * 900),
    password: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public restProvider: RestProvider,
    public datepipe: DatePipe,
    public translateService: TranslateService) {
    this.ionViewDidLoad();

  }
ionViewWillEnter(){
this.myform = new FormGroup({
       username: new FormControl('', [Validators.required]),
       password: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z0-9!@#$%^&*()_-]{6,20}$')])
    });
  console.log(this.myform.value)
}
doSignup() {
    this.restProvider.doSignup(this.account)
    .then(data => {
      if(data['id'] && data['id'] != ''){
         window.localStorage.setItem('access_token', data['id']);
         this.navCtrl.push('ContentPage');
      }else{
      console.log(data);
      }
    });
  }
ionViewDidLoad() {
    console.log('ionViewDidLoad signup hai');
  }
}