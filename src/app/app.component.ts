import { Component, OnInit } from '@angular/core';

import { of, from } from 'rxjs';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  ngOnInit() {
    of(2, 4, 6, 8).subscribe(console.log);

    from([5, 10, 15, 20]).subscribe(
      item => console.log(`resulting item ${item}`),
      err => console.error(`error occurred ${err}`),
      () => console.log('complete')
    );

    from(['user1', 'user2', 'user3']).subscribe(
      item => console.log(`resulting item ${item}`),
      err => console.error(`error occurred ${err}`),
      () => console.log('complete')
    );

    of('user1', 'user2', 'user3').subscribe(
      item => console.log(`resulting item ${item}`),
      err => console.error(`error occurred ${err}`),
      () => console.log('complete')
    );
  }

}
