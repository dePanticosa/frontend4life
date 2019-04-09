import {Routes} from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";

export const appRoutes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent},
    {path: 'chat-room', loadChildren: './components/chat-room/chat-room.module#ChatRoomModule'}
];
