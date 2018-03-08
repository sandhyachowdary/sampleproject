import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Client } from '../../models/client';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
 client: Client ={
   firstName: '',
   lastName : '',
   email: '',
   phone : '',
   balance : 0
 }
 disableBalanceOnAdd: boolean;
 @ViewChild('clientForm') form: any;
  constructor(
    private flashmMessage: FlashMessagesService,
    private clientService:  ClientService,
    private router: Router,
    private settingsservice: SettingsService

  ) { }

  ngOnInit() {
  this.disableBalanceOnAdd =this.settingsservice.getSettings()
  .disableBalanceOnAdd;
  }
  onSubmit({value,valid}: {value:Client, valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      //show error
      this.flashmMessage.show('please fill out the form correctly',{
        cssClass: 'alert-danger', timeout:4000

      });
    }else {
      //Add new client
      this.clientService.newClient(value);
      //show message
      this.flashmMessage.show('New client added',{
        cssClass: 'alert-success', timeout:4000

      });
      //Redirect to dash
      this.router.navigate(['/']);
    }
  }

}
