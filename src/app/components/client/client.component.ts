import { Component, OnInit } from '@angular/core';
import {ClientServiceService} from '../../services/client-service.service';
import {Client} from '../../models/Client/client.model';
import {ToastrService} from "ngx-toastr";
import {Form, NgForm} from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: any;
  client: Client;
  editMode = false;

  constructor(private clientService: ClientServiceService, private toastr : ToastrService) {
    this.client = new Client();
  }

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient()
  {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  saveClient(client: Client, myForm:NgForm)
  {
    // Check if it's an update or insert
    if (this.editMode) {
      this.updateClient(client);
      this.toastr.success("Client modified successfully !", 'Client Modified !');
      this.editMode = false;
    } else {
      this.clientService.addClient(client).subscribe(data => {
        myForm.resetForm();
        this.toastr.success("Client added successfully !", 'Client Registered !');
        this.getAllClient();
      }, err => {
        console.log(err);
      });
    }
  }

  updateClient(client:Client)
  {
    this.clientService.updateClient(client).subscribe((data) => {
      this.clients.forEach((cl) => {
        if (cl.clientId == client.clientId) {
          cl = client;
        }
      })
    });
  }

  /**
   * Delete a client
   *
   * @param id
   */
  deleteClient(id)
  {
    this.clientService.deleteClient(id)
      .subscribe((data) => {
        this.clients = this.clients.filter(c => c.clientId != id);
        this.toastr.success("Client deleted successfully !", 'Client deleted !');
      })
  }

  /**
   * Modify client
   */
  modifyClient(cl:Client)
  {
    this.client= cl;
    this.editMode = true;
  }
}
