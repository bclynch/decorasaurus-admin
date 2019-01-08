import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {
  }

  truncateId(id: string) {
    return `${id.slice(0, 4)}...${id.substr(id.length - 4)}`;
  }
}
