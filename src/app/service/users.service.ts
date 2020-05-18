import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../model/user';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,private router:Router) { }

  private AllUsersUrl = 'http://localhost:3000/users';

  //appel de l'api pour afficher la liste de touts les utilisateurs 
  getAllUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.AllUsersUrl);
  }

  //appel de l'api pour afficher le contenu d'un utilisateur
  getUserById(id):Observable<Users>{
    //return this.http.get<Users>(this.AllUsersUrl +'/'+ id );      
    return this.http.get<Users>(`${this.AllUsersUrl}/${id}`);
  }


  // appel de l'api pour la mise à jour de l'utilisateur
  //Si il y a une erreur,il aura une alert sinon la requête est OK
  updateUser(user:Users){

   return this.http.put<Users>(`${this.AllUsersUrl}/${user.id}`,user).subscribe((value) => {
    console.log(value);
    },
    (error) => {
      console.log('ERROR 500' + error),alert("ERREUR 500");
    },
    () => {
      console.log('Observable complete');
    }
  );

  }
  //appel de l'api pour suppression de l'utilisateur
  deleteUserById(id: number):void{
    console.log(id)
    this.http.delete<any>(`${this.AllUsersUrl}/${id}`).subscribe(user => console.log("utilisateur supprimer"));
  }

  //appel de l'api pour la creation d'un utilisateur
  createUser(data:Users){

    console.log(data);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Users>(`${this.AllUsersUrl}`,data,{headers}).subscribe(user => {
      console.log("utilisateur ajouter"),console.log(data)
    });
  }

 

}
