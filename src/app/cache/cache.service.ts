import { Injectable } from "@angular/core";
import { Registeration } from "../model/registeration.model";


@Injectable({
    providedIn: 'root'
})
export class CacheService {

    registeredInfo!: Registeration;


    setRegisterationDetails(registrationInfo: Registeration) {
        this.registeredInfo = registrationInfo;
    }

    getRegisterationDetails() {
        return this.registeredInfo;
    }
}