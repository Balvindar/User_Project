import { Inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { NotificationMessage, NotificationType } from "../model/notificationMessage";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {

    notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

    sendMessage(message: NotificationMessage) {
        this.notificationSubject.next(message);
    }

    constructor(private toastrService: ToastrService) {
        this.notificationSubject.subscribe((resMessage: any) => {
            switch (resMessage.type) {
                case NotificationType.success:
                    this.toastrService.success(resMessage.message);
                    break;
                case NotificationType.error:
                    this.toastrService.error(resMessage.message);
                    break;
                case NotificationType.warning:
                    this.toastrService.warning(resMessage.message);
                    break;
                case NotificationType.info:
                    this.toastrService.info(resMessage.message);
                    break;
                default:
                    this.toastrService.info(resMessage.message);
                    break;

            }
        }, (error: any) => {
            console.log('Error while fetching .....');
        });
    }




}