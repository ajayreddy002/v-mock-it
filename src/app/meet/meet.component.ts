import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit, OnDestroy, AfterViewInit {
  private api: any;
  @ViewChild('jitsiContainer') jitsiContainer!: ElementRef;
  constructor(
    private router: Router
  ){}
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.api) {
      this.api.dispose();
      this.api = null;
    }
  }
  ngAfterViewInit(): void {
    const options = {
      roomName: '1b35294b-95dc-40f4-83e7-33a0b6dbc5ea',
      parentNode: this.jitsiContainer.nativeElement,
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        width: '100%',
        height: '100%',
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: '#F4F4F4',
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'desktop',
          'fullscreen',
          'hangup',
          'profile',
          'chat',
          // 'recording',
          'etherpad',
          // 'settings',
          'raisehand',
          'tileview',
          'videobackgroundblur',
        ],
        TOOLBAR_ALWAYS_VISIBLE: true,
        VIDEO_LAYOUT_FIT: 'both',
      },
      configOverwrite: {
        disableDeepLinking: true,
        disableLocalVideoFlip: true,
        remoteVideoMenu: {
          disableKick: true,
        },
      },
    };
    this.api = new JitsiMeetExternalAPI('meet.jit.si', options);

    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });
  }
  handleClose = () => {
    this.router.navigate(['login']);
    localStorage.clear();
  };

  handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant); 
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    console.log('handleParticipantJoined', participant);
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    console.log('handleVideoConferenceJoined', participant);
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    this.router.navigate(['login']);
    localStorage.clear();
    // this.router.navigate(['/thank-you']);
  };

  handleMuteStatus = (audio: any) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video: any) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }
}
