import { Component, OnInit } from '@angular/core';
import { CommonService} from '../common.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  allUsers: any;
  isEdit = false;
  alert: boolean = false;
  showSuccessMsg: boolean = false;
  showUpdateMsg: boolean = false;
  showDeleteMsg: boolean= false;
  userObj = {
    name: '',
    mobile: '',
    email: '',
    pasword: '',
    id: ''
  }
  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }
  addUser(user) {
    console.log(user);
    this.commonService.createUser(user).subscribe((response) => {
      //this.getLatestUsers();
      this.showSuccessMsg = true;
      this.alert = true;
    })
  }
  updateUser() {
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(() => {
      //this.getLatestUsers();
      this.showUpdateMsg = true;
      this.alert = true;
    })
  }
}
