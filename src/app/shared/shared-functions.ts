import {Router} from "@angular/router";
import {Inject} from "@angular/core";

export default class SharedFunctions {

  constructor(@Inject(Router) private router: Router) {
  }

  public readLocalStorage(key: string): string{
    return localStorage.getItem(key);
  }

  public setLocalStorage(key: string,value: string){
    localStorage.setItem(key, value);
  }

  public redirectToPage(routeName: string){
    this.router.navigate([routeName]).then(r => console.log("yonlendirildi"));  // example route name = "/login"
  }
}
