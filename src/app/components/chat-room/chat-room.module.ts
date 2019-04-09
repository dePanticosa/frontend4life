import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common"
import {RouterModule} from "@angular/router";

import {ChatRoomComponent} from "./chat-room.component";


@NgModule({
    declarations: [
        ChatRoomComponent
    ],
    imports: [
        RouterModule.forChild([
            {path: '', component: ChatRoomComponent}
        ]),
        CommonModule,
    ]
})
export class ChatRoomModule {
}
