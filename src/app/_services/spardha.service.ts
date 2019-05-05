import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SpardhaService {
    public currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: HttpClient) {  
        
        

    }

    

    getUniqueSaprdhaName() {
        return this.http.post(`${environment.apiUrl}/get_unique_spardha_name`, {security_token:this.currentUser.security_token});
    }
    getSpardhaDate(spardhaName) {
        return this.http.post(`${environment.apiUrl}/get_spardha_dates`, {security_token:this.currentUser.security_token, spardha_name:spardhaName});
    }
    getSpardhaTime(spardhaName, spardhatime){
        return this.http.post(`${environment.apiUrl}/get_spardha_times`, {security_token:this.currentUser.security_token, spardha_name:spardhaName, spardha_date:spardhatime});
    }
    getSpardhaList(spardhaName, spardhatime, spardhaTime){
        return this.http.post(`${environment.apiUrl}/get_spardha_lists`, {security_token:this.currentUser.security_token, spardha_name:spardhaName, spardha_date:spardhatime, spardha_time:spardhaTime});
    }
    getSpardhaBalakList(spardhaId) {
        return this.http.post(`${environment.apiUrl}/get_spardha_balak_list`, { security_token: this.currentUser.security_token, spardha_id: spardhaId});
    }
}