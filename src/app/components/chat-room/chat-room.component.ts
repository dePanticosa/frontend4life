import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {User} from "../../services/auth.service";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {

    public messages = [];
    public user: User;

    constructor(private db: AngularFirestore) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        const collection = this.db.collection('chat');
        collection.valueChanges().subscribe(chat => {
            this.messages = chat;
        });

    }


}
