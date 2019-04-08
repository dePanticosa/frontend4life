import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    public message: string;
    public messages: Observable<any[]>;

    constructor(private db: AngularFirestore) {
    }

    ngOnInit(): void {
        const collection = this.db.collection('chat');
        this.messages = collection.valueChanges();
    }

    send() {
        if (this.message !== '' && this.message) {
            this.db.collection('chat').doc('messages').set({message: this.message});
            this.message = '';
        }
    }

}
