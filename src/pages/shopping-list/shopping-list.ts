import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ShoppingItem } from '../../models/shopping-items/shopping-items.iterface';
import { EditShoppingPage } from '../edit-shopping/edit-shopping';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(private navCtrl: NavController, private navParams: NavParams,
     private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {
    //Pointing shoppinglistRef$ at firebase -> "shopping-list"
    this.shoppingListRef$= this.database.list('shopping-list');
  }

  selectActionSheetItem(shoppingItem : ShoppingItem){
    // Add ActionSheet of delete,edit,cancel

      this.actionSheetCtrl.create({
        title: `${shoppingItem.itemName}`,
        buttons:[
              {
                text:'Edit',
                handler: () => {
                    this.navCtrl.push(EditShoppingPage,{
                      shoppingItemID: shoppingItem.$key
                    });
                }

              },
              {
                text:'Delete',
               role: 'destructive',
                handler: () => {
                    this.shoppingListRef$.remove(shoppingItem.$key);
                }

              },
              {
                text:'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log("The user has selected cancel button");
                }

              }

      ]
      }).present();
  }


  NavigateToShoppingPage(){
    this.navCtrl.push(AddShoppingPage);
  }



}
