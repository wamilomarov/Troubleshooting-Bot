import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ScrollableDirective} from '../../directives/scrollable/scrollable.directive';
import {OffsetTopDirective} from '../../directives/offsetTop/offset-top.directive';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  private myId: string = '62537dtfwuf5';

  // @ts-ignore
  @ViewChild(ScrollableDirective) list: ScrollableDirective;
  @ViewChildren(OffsetTopDirective) listItems: QueryList<OffsetTopDirective>;

  text: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollToLastMessage();
    this.listItems.changes.subscribe((queryChanges) => {
      this.listItems = queryChanges;
      this.scrollToLastMessage();
    })
  }


  private scrollToLastMessage() {
    if (this.messages.length > 0)
    {
      var lastMessage = this.messages.length - 1;
      this.list.scrollTop = this.listItems.find((_, i) => i === lastMessage).offsetTop;
    }
  }

  sendText(text: string) {
    var message = {
        'sender': {
          '_id': '62537dtfwuf5',
          'name': 'Shamil Omarov',
          'photo': '/assets/img/img_avatar.png'
        },
        'message': text
      };
    this.messages.push(message);
    this.text = "";
  }


  private messages: Array<any> = [
    {
      'sender': {
        '_id': '62537dtfwuf5',
        'name': 'Shamil Omarov',
        'photo': '/assets/img/img_avatar.png'
      },
      'message': 'Hi. How are you?'
    },

    {
      'sender': {
        '_id': '62537dtfwuf4',
        'name': 'EricBot',
        'photo': '/assets/img/chatbot-profile.png'
      },
      'message': 'Hi! Welcome to chat!'
    },

    {
      'sender': {
        '_id': '62537dtfwuf5',
        'name': 'Shamil Omarov',
        'photo': '/assets/img/img_avatar.png'
      },
      'message': 'Hi. How are you?'
    },

    {
      'sender': {
        '_id': '62537dtfwuf4',
        'name': 'EricBot',
        'photo': '/assets/img/chatbot-profile.png'
      },
      'message': 'Hi! Welcome to chat!'
    },
    {
      'sender': {
        '_id': '62537dtfwuf5',
        'name': 'Shamil Omarov',
        'photo': '/assets/img/img_avatar.png'
      },
      'message': 'Hi. How are you?'
    },

    {
      'sender': {
        '_id': '62537dtfwuf4',
        'name': 'EricBot',
        'photo': '/assets/img/chatbot-profile.png'
      },
      'message': 'Hi! Welcome to chat!'
    },

    {
      'sender': {
        '_id': '62537dtfwuf5',
        'name': 'Shamil Omarov',
        'photo': '/assets/img/img_avatar.png'
      },
      'message': 'Hi. How are you?'
    },

    {
      'sender': {
        '_id': '62537dtfwuf4',
        'name': 'EricBot',
        'photo': '/assets/img/chatbot-profile.png'
      },
      'message': 'Hi! Welcome to chat!'
    },
    {
      'sender': {
        '_id': '62537dtfwuf5',
        'name': 'Shamil Omarov',
        'photo': '/assets/img/img_avatar.png'
      },
      'message': 'Hi. How are you?'
    },

    {
      'sender': {
        '_id': '62537dtfwuf4',
        'name': 'EricBot',
        'photo': '/assets/img/chatbot-profile.png'
      },
      'message': 'Hi! Welcome to chat!'
    },

    {
      'sender': {
        '_id': '62537dtfwuf5',
        'name': 'Shamil Omarov',
        'photo': '/assets/img/img_avatar.png'
      },
      'message': 'Hi. How are you?'
    },

    {
      'sender': {
        '_id': '62537dtfwuf4',
        'name': 'EricBot',
        'photo': '/assets/img/chatbot-profile.png'
      },
      'message': 'Hi! Welcome to chat!'
    },
  ];
}
