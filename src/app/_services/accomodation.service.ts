import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccomodationService {
    public currentUser:any=JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: HttpClient) {

    }

    getRoomByRoomId(roomId): Observable<any>{
        return this.http.post(`${environment.apiUrl}/fetch_room_info`, {security_token:this.currentUser.security_token, acc_title:roomId});
    }
}