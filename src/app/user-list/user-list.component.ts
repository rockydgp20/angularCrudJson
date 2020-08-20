import { Component, OnInit, EventEmitter, Output, Input, SimpleChange, SimpleChanges} from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(private commonService: CommonService) { }
  allUsers: any;
  isEdit = false;
  alert: boolean = false;
  showSuccessMsg: boolean = false;
  showUpdateMsg: boolean = false;
  showDeleteMsg: boolean= false;
  @Output() outPutToParent = new EventEmitter();
  @Output() isEditCheck = new EventEmitter();
  @Input() userList;

//Pagination parameters
p: Number = 1;
count:Number = 5;

  userObj = {
    name: '',
    mobile: '',
    email: '',
    pasword: '',
    id: ''
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getLatestUsers();
    console.log(this.userList);
  }
  ngOnChange(change: SimpleChange) {
    console.log(change);
    console.log(this.userList);
  }
  addUser(user) {
    console.log(user);
    this.commonService.createUser(user).subscribe((response) => {
      //this.getLatestUsers();
      this.showSuccessMsg = true;
      this.alert = true;
    });
  }

  deleteUser(user) {
    if (confirm("Are you Sure you want to delete: " + user.name)) {
      this.commonService.deleteUser(user).subscribe(() => {
        //this.getLatestUsers();
        this.showDeleteMsg = true;
        this.alert = true;
      });
    }
  }
  editUser(user) {
    this.isEdit = true;
    this.userObj = user;
    this.outPutToParent.emit(user);
    this.isEditCheck.emit(this.isEdit);
  }
  // updateUser() {
  //   this.isEdit = !this.isEdit;
  //   this.commonService.updateUser(this.userObj).subscribe(() => {
  //     //this.getLatestUsers();
  //     this.showUpdateMsg = true;
  //     this.alert = true;
  //   });
  // }
  closeAlert() {
    this.alert = false;
  }

}
