import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ShoppingItem } from '../../models/shopping-items/shopping-items.iterface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-edit-shopping',
  templateUrl: 'edit-shopping.html',
})
export class EditShoppingPage {

  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;
  shoppingItemSubscription: Subscription;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase) {

      const shoppingItemID= this.navParams.get('shoppingItemID');
      this.shoppingItemRef$= this.database.object(`shopping-list/${shoppingItemID}`);

      this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem)
  }

  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.update(shoppingItem);

        //Navigate user to ShoppingListPage
        this.navCtrl.pop();
  }

  ionViewWillLeave() {
    //unsubscribe when leave the page
    this.shoppingItemSubscription.unsubscribe();
  }

}
