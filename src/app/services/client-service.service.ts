import { Injectable } from '@angular/core';
import {Client} from '../models/Client/client.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ClientServiceService {

  private url = "https://localhost:5001/api";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all API clients
   */
  getClients() {
    return this.httpClient.get(this.url+"/clients");
  }

  /**
   * Save a new client
   *
   * @param client
   */
  addClient(client: Client)
  {
    return this.httpClient.post(this.url+"/clients", client);
  }

  /**
   * Delete a client
   *
   * @param id
   */
  deleteClient(id)
  {
    return this.httpClient.delete(`${this.url}/clients/${id}`, {responseType: 'text'});
  }

  /**
   * Update a new client
   *
   * @param cl
   */
  updateClient(cl:Client) {
    return this.httpClient.put(`${this.url}/clients/${cl.clientId}`, cl);
  }
}
