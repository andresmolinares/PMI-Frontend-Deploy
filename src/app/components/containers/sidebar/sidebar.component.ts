import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showFiller = false;
  constructor(private _cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logOutConfirmation() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres cerrar sesión?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#62B4F7',
      cancelButtonColor: '#F7A562',
      confirmButtonText: 'Si, cerrar sesión',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.logOut();
      }
    })
  }

  logOut() {
    this._cookieService.deleteAll("/","localhost",true,"None");
    window.location.reload();
  }


}
