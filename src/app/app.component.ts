import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService, User} from "./services/auth.service";
import {stringify} from "@angular/core/src/util";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    private password: string;
    private name: string;
    public text: string;
    private path: string;
    public state: string = 'text';
    private subscribes = [];
    private user: User = {
        name: '',
        password: ''
    };

    constructor(private db: AngularFirestore,
                private router: Router,
                private auth: AuthService) {

    }

    ngOnInit(): void {
        if (localStorage.getItem('auth')) {
            this.router.navigate(['chat-room']);
            this.user = JSON.parse(localStorage.getItem('user'));
        } else {
            this.router.navigate(['auth']);
            let subscribtion = this.auth.state$.subscribe(state => {
                this.state = state
            });
            this.subscribes.push(subscribtion)
        }
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.path = event.url
                }
            });

    }

    send() {
        if (this.path === '/auth' && this.text !== '' && this.text && this.state === 'name') {
            this.auth.changeMessage('pass');
            this.name = this.text;
            this.text = '';
        } else if(this.path === '/auth' && this.text !== '' && this.text && this.state === 'pass') {
            this.auth.changeMessage('conf');
            this.password = this.text;
            this.text = '';
        } else if(this.path === '/auth' && this.text !== '' && this.text && this.state === 'conf') {
            if (this.password === this.text) {
                this.router.navigate(['chat-room']);
                localStorage.setItem('auth', 'login');
                this.user.name = this.name;
                this.user.password = this.password;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.text = '';
                this.db.collection('users').add(this.user);
                this.text = '';
            } else {
                this.auth.changeMessage('conf2');
                this.text = '';
            }
        } else if (this.path === '/auth' && this.text !== '' && this.text && this.state === 'conf2') {
            if (this.password === this.text) {
                this.router.navigate(['chat-room']);
                localStorage.setItem('auth', 'login');
                this.user.name = this.name;
                this.user.password = this.password;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.db.collection('users').add(this.user);
                this.text = '';
            } else {
                this.auth.changeMessage('conf2');
                this.text = '';
            }
        } else if (this.path === '/chat-room') {
            this.db.collection('chat').add({message: this.text, sender: this.user, date: new Date().getTime()});
            this.text = '';
        }
    }


    ngOnDestroy(): void {
        this.subscribes.forEach(subs => {
            subs.unsubscribe();
        })
    }

}
