import {  Component,  OnInit} from "@angular/core";
import {  listItemModel} from "../list-item-model";
import {  ToastrService} from "ngx-toastr";
import {  trigger,  transition,  useAnimation} from "@angular/animations";
import {  bounce} from "ng-animate";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  animations: [trigger("bounce", [transition("* => *", useAnimation(bounce))])]
})
export class ListComponent implements OnInit {
  bounce: any;
  item: string = "";
  listItems: listItemModel[] = [];
  buttonname: string = "Add Item";

  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  addItem() {
    if (this.item == "") {
      this.toastr.error("Please Enter an Item", "Uh Oh!", {
        timeOut: 1200
      });
    } else {
      let randomId = Math.floor(100000 + Math.random() * 900000);
      this.listItems.push(new listItemModel(this.item, false, randomId));
      if (this.buttonname == "Edit Item") {
        this.toastr.success("Item: " + this.item, "Item Edited!", {
          timeOut: 1500
        });

      } else {

        this.toastr.success("Item: " + this.item, "Item Added!", {
          timeOut: 1500
        });
      }
      this.item = "";
      this.buttonname = "Add Item";
    }
  }

  deleteItemFromList(item: any) {
    this.toastr.info(item.itemName + " deleted from list", "Awesome!", {
      timeOut: 1500
    });
    this.listItems = this.listItems.filter(itemID => itemID.id != item.id);
  }

  editItem(item: any) {
    this.item = item.itemName;
    this.buttonname = "Edit Item";
    this.listItems = this.listItems.filter(itemID => itemID.id != item.id);

  }
}
