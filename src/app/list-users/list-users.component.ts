import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Users } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private usersService: UsersService,
              private route:ActivatedRoute,
              private router:Router) { }

  users: Users[] =[];
  filteredUser: Users[] = [];
  _listFilter = '';

  //filtre appeller par ngModel get set et performFilter
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUser = this.listFilter ? this.performFilter(this.listFilter) : this.users;
  }

  performFilter(filterBy: string): Users[] {
     filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: Users) =>
      user.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1);
      this.getAllUser();
   }

   
  ngOnInit(): void {
    this.getAllUser();   
  }

  //appel du service pour afficher la liste des utilisateurs
  getAllUser(){

    this.usersService.getAllUsers().subscribe(

      (value) => {
      this.users = value,this.filteredUser=value, console.log(value);
      },
      (error) => {
        console.log('ERROR' + error);
      },
      () => {
        console.log('Observable complete');
      }
    );


  }

  //appel du service pour mettre à jour isActive de l'utilisateur
  setStatus(user: Users) {
    user.isActive = !user.isActive;
    this.usersService.updateUser(user);
    
  }

  //redirection page 
  pageForbidden() {
    alert("page forbidden 403");
  }

//appel du service pour supprimer un utilisateur et mise à jour de la liste par l'appel de la méthode getalluser
  delete(user:Users){
    console.log(user);
    this.usersService.deleteUserById(user.id);
    this.getAllUser();
  }
//action du bouton edit coté html pour redirecto vers page edituser
  edit(userid:number){
    console.log();
    this.router.navigate(['edit-user',userid]);
    
  }
  //action button Active:affiche que les utilisateur a True
  filtreisActiveTrue(){
    console.log("true");
    this.filteredUser=this.users.filter((user: Users) => user.isActive == true),console.log("UTILISATEUR aCTIVE");    
}
  //action button Tout les utilisateurs: affiche les utilisateur active ou non
  AllUtilisateurActiveOrNotActive(){
  this.getAllUser();
}

}
