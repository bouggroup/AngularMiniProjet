import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { Users } from '../model/user';

@Component({
  selector: 'app-detail-users',
  templateUrl: './detail-users.component.html',
  styleUrls: ['./detail-users.component.css']
})
export class DetailUsersComponent implements OnInit {
  errorMessage = '';
  @Input() user:Users;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private usersService:UsersService) { }

  ngOnInit(): void {
    //recupere l'id de l'utilisateur dans l'url puis appel la méthode getUser
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getUser(id);
  }

}
//appel du service pour afficher un utilisateur  grâce à son id
getUser(id: number) {
  this.usersService.getUserById(id).subscribe({
    next: user => {this.user = user,console.log(user)},
    error: err => this.errorMessage = err
  });
}

}
