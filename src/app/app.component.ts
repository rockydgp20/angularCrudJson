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
  userObj = {
    name: '',
    mobile: '',
    email: '',
    pasword: '',
    id: ''
  }
  constructor( private commonService: CommonService) {}
  title = 'acrudjson';
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getLatestUsers();
    
  }
  addUser(user) {
    console.log(user);
    this.commonService.createUser(user).subscribe((response) => {
      this.getLatestUsers();
    })
    
  }
  getLatestUsers(){
    this.commonService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
      console.log(response);
      
    })
  }
  deleteUser(user){
    this.commonService.deleteUser(user).subscribe(() => {
      this.getLatestUsers();
    })
  }
  editUser(user) {
    this.isEdit = true;
    this.userObj = user;
  }
  updateUser() {
    console.log(this.userObj);
    
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(() => {
      this.getLatestUsers();

    })
  }
}
