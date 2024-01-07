import { Component, OnInit } from '@angular/core';
import { ModelLivre } from './livre';
import { LivreService } from './livre.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public livres: ModelLivre[] = [];
  public UpdateLivre: ModelLivre={ id: 0, auteur: '', titre: '', imageUrl: '' } ;  
  public deleteLivre: ModelLivre ={ id: 0, auteur: '', titre: '', imageUrl: '' } ;



  constructor(private livreService: LivreService) {}

  ngOnInit(): void {
    this.getAllLivres();
  }

  public getAllLivres(): void {
    this.livreService.getAllLivres().subscribe({
      next: (response: ModelLivre[]) => {
        this.livres = response;
      },
      error: (issue: HttpErrorResponse) => {
        alert(issue.message);
      },
      complete: () => {
        // Code to execute after the observable completes
      }
    });
  }


  public onOpenModal(livre : ModelLivre|null , mode:String ):void 
  {


    const container = document.getElementById('main-container') ;

    const button = document.createElement('button'); 
    button.type='button' ; 
    button.style.display='none';
    button.setAttribute('data-toggle',  'modal') ;


if(mode === 'add'){
  button.setAttribute('data-target',  '#addlivreModal') ;


}

if(mode === 'edit'){

  this.UpdateLivre=livre!; 

  button.setAttribute('data-target',  '#updatelivreModal') ;


}
if(mode === 'delete'){
  this.deleteLivre=livre!;
  button.setAttribute('data-target',  '#deletelivreModal') ;


}

container?.appendChild(button) ; 
button.click() ; 

  }

  public onAddLivre(addForm: NgForm): void{


    document.getElementById('add-livre-form')?.click(); 

    this.livreService.createNewLivre(addForm.value).subscribe(
      
   { 


   next: (response: ModelLivre) => {
        console.log(response);
        
        this.getAllLivres();

        
      },
   error: (error: HttpErrorResponse) => {
        alert(error.message);

      }
    
      }
    
    );

    addForm.reset() ;



    
  }



  public OnUpdate_livre( livre:ModelLivre): void{



      this.livreService.update_livre(livre).subscribe(
      
   { 


   next: (response: ModelLivre) => {
        console.log(response);
        
        this.getAllLivres();

      },
   error: (error: HttpErrorResponse) => {
        alert(error.message);

      }
    
      }
    
    );



    
  }
  

  public onDelete( livreId:number): void{



    this.livreService.rem_livre(livreId).subscribe(
    
 { 


 next: (response: void) => {
      console.log(response);
      
      this.getAllLivres();

    },
 error: (error: HttpErrorResponse) => {
      alert(error.message);

    }
  
    }
  
  );



  
}


public searchLivres(key:String): void {


  console.log(key) ; 

  const results: ModelLivre[] =[]; 

  for(const livre of this.livres)
{
if(livre.titre.toLowerCase().indexOf(key.toLowerCase())!==-1 || 
livre.auteur.toLowerCase().indexOf(key.toLowerCase())!==-1 ) 
{
results.push(livre) ; 


}


}

this.livres=results;

if( key.length==0 ) {


this.getAllLivres() ;


}

}
  
}
