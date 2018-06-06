import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HelpsmodulelistingPage } from '../helpsmodulelisting/helpsmodulelisting';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { ChatlistPage } from '../chatlist/chatlist';
import { ContentPage} from '../content/content';

/**
 * Generated class for the HelpmodulesShortViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-helpmodules-short-view',
  templateUrl: 'helpmodules-short-view.html',
})
export class HelpmodulesShortViewPage {
  id: number;
  oneCategory: any;
  hasArticle: any;
  constructor(public navCtrl: NavController,
			  public navParams: NavParams, 
			  public restProvider:RestProvider,
			  platform: Platform,
        private domSanitizer: DomSanitizer) {
  this.id = navParams.get('id');
  this.getOneCategory(this.id);
  }
getOneCategory(id){
	this.restProvider.getOneCategory(id)
    .then(data => {
      this.oneCategory = data['categories'];
      this.hasArticle = data['article'];
    });
}
getArticles(id,name){
	 this.navCtrl.push(HelpsmodulelistingPage, {id: id,name: name});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpmodulesShortViewPage');
  }
doChat(){
  this.navCtrl.push(ChatlistPage);
}
goHome() { 
    this.navCtrl.push(ContentPage);
  }


/**dokodsf*/
}
