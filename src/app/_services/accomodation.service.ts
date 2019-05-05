import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AccomodationService {
    public currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: HttpClient) {

    }

    getRoomByRoomId(roomId): Observable<any> {
        return this.http.post(`${environment.apiUrl}/fetch_room_info`, {
            security_token: this.currentUser.security_token,
            acc_title: roomId
        });
    }

    submitRoomInfo(roomId, balaks, checkout, keyGiven, keyGivenToWhom): Observable<any> {
        return this.http.post(`${environment.apiUrl}/submit_accommodation_attendance`, {
            security_token: this.currentUser.security_token,
            acc_title: roomId,
            balaks: balaks,
            check_out: checkout,
            acc_key_given: keyGiven,
            acc_key_whom_to_given: keyGivenToWhom
        });
    }
}
