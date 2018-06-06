import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FulldetailhelpmodulesPage } from '../fulldetailhelpmodules/fulldetailhelpmodules';
import { ChatlistPage } from '../chatlist/chatlist';
import { ContentPage} from '../content/content';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the HelpsmodulelistingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-helpsmodulelisting',
  templateUrl: 'helpsmodulelisting.html',
})
export class HelpsmodulelistingPage {
id: number;
articles:any;
cateName:string;
constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider:RestProvider, public toastCtrl: ToastController,private domSanitizer: DomSanitizer) {
  	this.id = navParams.get('id');
  	this.cateName = navParams.get('name');
    this.getArticles(this.id);
  }
getArticles(id){
	this.restProvider.getArticles(id)
    .then(data => {
    if(data && data != null && Object.keys(data).length != 0){
       this.articles = data;
      }else{
          this.presentToast("No data found!");
        this.navCtrl.pop();
      }
    });
}

getSingleFirstModule(id){
	 this.navCtrl.push(FulldetailhelpmodulesPage,{id:id,cat:this.id});
}
getSingleModule(id){
	 this.navCtrl.push(FulldetailhelpmodulesPage,{hisid:id,cat:this.id});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpsmodulelistingPage');
  }
presentToast(msg:any) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 1500,
    position: 'bottom',
    //showCloseButton:true,
    //closeButtonText:'x'
  });
  toast.present();
}
doChat(){
  this.navCtrl.push(ChatlistPage);
}
goHome() { 
    this.navCtrl.push(ContentPage);
  } 
}
