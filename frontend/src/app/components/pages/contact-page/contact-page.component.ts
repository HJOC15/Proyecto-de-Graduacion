import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit(): void {
    // Aquí puedes acceder a this.currentUser para obtener los datos del usuario actual.
    // Por ejemplo, this.currentUser.name, this.currentUser.email, etc.
  }
}
