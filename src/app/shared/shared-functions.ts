import {Router} from "@angular/router";

export default class SharedFunctions {

  constructor(private router: Router) {
  }

  public readLocalStorage(key: string): string{
    return localStorage.getItem(key);
  }

  public redirectToPage(routeName: string){
    this.router.navigate([routeName]);  // example route name = "/login"
  }
}
