import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { AdminService } from './admin.service';
import { FloydService } from './floyd.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public appInited: Observable<any>;
  private _subject: BehaviorSubject<any>;

  constructor(
    private adminService: AdminService,
    private floydService: FloydService
  ) {
    this._subject = new BehaviorSubject<boolean>(false);
    this.appInited = this._subject;
  }

  appInit() {
    this.adminService.fetchUser().then(
      () => {
        this.floydService.init().then(
          () => this._subject.next(true)
        );
      }
    );
  }
}
