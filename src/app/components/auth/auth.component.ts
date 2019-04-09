import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

    public state: string;
    private subscribes = [];

    constructor(private db: AngularFirestore,
                private auth: AuthService) {
    }

    ngOnInit(): void {
        let subscribtion = this.auth.state$.subscribe(state => {
            this.state = state;
        });
        this.subscribes.push(subscribtion)
    }

    ngOnDestroy(): void {
        this.subscribes.forEach(subs => {
            subs.unsubscribe();
        })
    }
}
