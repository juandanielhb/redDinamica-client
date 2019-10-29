import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { LESSON_STATES } from 'src/app/services/DATA';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'group',
    templateUrl: './group.component.html'

})
export class GroupComponent implements OnInit {
    public title: string;
    public url;
    @Input() users;

    public lesson_states = LESSON_STATES;

    public groupForm;

    @Input() lesson;
    private token: any;

    public errorMsg;
    public successMsg;

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService,
        private _lessonService: LessonService
    ) {
        this.token = this._userService.getToken();

        this.title = 'Grupo de desarrollo';
        this.url = GLOBAL.url;

        this.errorMsg = 'Hubo un error agregando el grupo de desarrollo a la lección. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha agregado el grupo de desarrallo de la lección correctamente.';

        this.groupForm = new FormGroup({
            expert: new FormControl(''),
            leader: new FormControl(''),
            members: new FormControl('')
        });
    }

    public parentUrl;
    public expertUsers;
    public teacherUsers;
    ngOnInit(): void {
        this.expertUsers = this.users.filter(user => {
            return user.role == 'expert' || user.role == 'admin' || user.role == 'delegated_admin' || user.canAdvise;
        });

        if (this.lesson.leader) {
            this.teacherUsers = this.users.filter(user => {
                return this.lesson.leader._id != user._id;
            });
        } else {
            this.teacherUsers = this.users;
        }


        this._route.parent.url.subscribe(value => {
            this.parentUrl = value[0].path;
        });

        let tempArray;
        if (this.lesson.development_group && this.lesson.leader) {
            tempArray = this.lesson.development_group.filter(user => {
                return this.lesson.leader._id != user._id;
            });

            this.groupForm.patchValue({
                members: tempArray
            });
        } else if (this.lesson.development_group) {
            this.groupForm.patchValue({
                members: this.lesson.development_group
            });
        }

        if (this.lesson.expert) {
            this.groupForm.patchValue({
                expert: this.lesson.expert,
            });
        }

        if (this.lesson.leader) {
            this.groupForm.patchValue({
                leader: this.lesson.leader
            });
        }

    }

    public submitted;
    public status;
    onSubmit() {
        this.submitted = true;

        this.lesson.development_group = this.groupForm.value.members;
        this.lesson.expert = this.groupForm.value.expert;
        this.lesson.leader = this.groupForm.value.leader;

        this._lessonService.editLesson(this.token, this.lesson).subscribe(
            response => {

                if (response.lesson && response.lesson._id) {
                    this.status = 'success';
                    this.submitted = false;

                } else {
                    this.status = 'error';
                }
            },
            error => {
                if (error != null) {
                    this.status = 'error';
                    console.log(<any>error);
                }
            }
        );

        document.scrollingElement.scrollTop = 0;
    }

    onChanges() {
        this.status = null;
        this.submitted = false;
    }
}
