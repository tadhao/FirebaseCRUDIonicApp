import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-items/shopping-items.iterface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ShoppingListPage } from '../shopping-list/shopping-list';


@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingListRef$= this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    /*
      create a new object and convert item nuber to number.
      Then push data to Firebase
    */
    this.shoppingListRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });


    //Reset our ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    //Navigate user to ShoppingListPage
    this.navCtrl.pop();
  }


}
