import { Component } from '@angular/core';
import { CommonService } from './common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  allUsers: any;
  isEdit = false;
  alert: boolean = false;
  showSuccessMsg: boolean = false;
  showUpdateMsg: boolean = false;
  showDeleteMsg: boolean= false;
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
  constructor( private commonService: CommonService) {}
  title = 'acrudjson';
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getLatestUsers();
    
  }
  addUser(user) {
    console.log(user);
    this.commonService.createUser(user).subscribe((response) => {
      this.getLatestUsers();
      this.showSuccessMsg = true;
      this.alert = true;
    })
  }
  getLatestUsers() {
    this.commonService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
    })
  }
  deleteUser(user){
    this.commonService.deleteUser(user).subscribe(() => {
      this.getLatestUsers();
      this.showDeleteMsg = true;
      this.alert = true;
    })
  }
  editUser(user) {
    this.isEdit = true;
    this.userObj = user;
  }
  updateUser() {
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(() => {
      this.getLatestUsers();
      this.showUpdateMsg = true;
      this.alert = true;
    })
  }
  closeAlert(){
    this.alert = false;
  }
}
