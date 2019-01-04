import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public appInited: Observable<any>;
  private _subject: BehaviorSubject<any>;

  constructor(
    private adminService: AdminService
  ) {
    this._subject = new BehaviorSubject<boolean>(false);
    this.appInited = this._subject;
  }

  appInit() {
    this.adminService.fetchUser().then(
      () => this._subject.next(true)
    );
  }
}
