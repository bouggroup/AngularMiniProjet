import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../model/user';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    id:number;
    user:Users;
  constructor(private route:ActivatedRoute, private userService:UsersService,private router:Router) { }

  ngOnInit(): void {

    this.id= this.route.snapshot.params['id']
    console.log(this.id);

    this.userService.getUserById(this.id).subscribe(data => {this.user=data,console.log( data)});


  }

//soumission du formulaire au service pour mettre à jour l'utilisateur et redirection vers list-user
  onSubmit(){
    console.log("good");
    console.log(this.user);
    this.userService.updateUser(this.user);
    this.router.navigate(['list-users']);
  }

}
