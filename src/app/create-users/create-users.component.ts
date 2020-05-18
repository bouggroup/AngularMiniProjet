import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  userform = new FormGroup({
    email: new FormControl('',Validators.email),
    isActive: new FormControl(true),
    firstname: new FormControl('',[
    Validators.required,
    Validators.minLength(4)]),
    lastname: new FormControl(''),
    age: new FormControl('',),
    company: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    favoriteFruit: new FormControl('')
  })

  get firstname() { return this.userform.get('firstname'); }

  constructor(private userservice:UsersService,private router:Router) { }

  ngOnInit(): void {

   
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userform.value);
    this.userservice.createUser(this.userform.value);
    this.router.navigate(['list-users']);
  }

}
