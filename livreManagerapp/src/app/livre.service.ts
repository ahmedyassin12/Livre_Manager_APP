// src/app/livre.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ModelLivre } from './livre'; // Make sure to import your Livre interface
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LivreService {
 private apiServerUrl = environment.apiUrl ;

  constructor(private http: HttpClient) {}

 public getlivreById(id: number): Observable<ModelLivre> {


    const url = `${this.apiServerUrl}/getlivreById/${id}`;

    return this.http.get<ModelLivre>(url);


  }

  public getAllLivres ():Observable <ModelLivre[] >{


    const url = `${this.apiServerUrl}/getAllLivres` ;
    return this.http.get<ModelLivre []>(url) ;


  }

  public createNewLivre (livre:ModelLivre ):Observable <ModelLivre>{


    
    const url = `${this.apiServerUrl}/createNewLivre` ;
    return this.http.post<ModelLivre>(url,livre) ;



  }
  public update_livre ( livre:ModelLivre ):Observable <ModelLivre>{


    const url = `${this.apiServerUrl}/update_livre` ;
    return this.http.put<ModelLivre>(url,livre); 


  }


  public rem_livre (id:number):Observable <void>{


    const url = `${this.apiServerUrl}/rem_livre/${id}` ;

    return this.http.delete<void>(url) ;


  }


  // Add more methods as needed (e.g., create, update, delete)
}


