import {
  Component,
  Input,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
interface Roles {
  name: string;
  code: string;
}
@Component({
  selector: 'app-schedule-create-dialog',
  templateUrl: './schedule-create-dialog.component.html',
  styleUrls: ['./schedule-create-dialog.component.scss'],
})
export class ScheduleCreateDialogComponent implements OnInit {
  @Input() display = false;
  dateAndTime: Date | undefined;
  roles = [
    {
      name: 'Software developer',
      code: 'softwareDeveloper',
    },
    {
      name: 'Full stack developer',
      code: 'fullStackDeveloper',
    },
    {
      name: 'Node.Js developer',
      code: 'nodejsDeveloper',
    },
    {
      name: 'react',
      code: 'React',
    },
    {
      name: 'angular',
      code: 'Angular',
    },
  ];
  skills = ['Angular', 'react'];
  selectedSkills: string[] = [];
  selectedRole = {} as Roles;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;
  skillCtrl = new FormControl('');
  filteredSkills!: Observable<string[]>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    console.log(this.data.startStr);
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.skills.slice()
      )
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedSkills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedSkills.indexOf(fruit);

    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
}
