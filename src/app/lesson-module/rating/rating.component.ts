import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model'
import { LESSON_STATES } from 'src/app/services/DATA';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
    
})
export class RatingComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public lesson_states = LESSON_STATES;
    
    @Input() lesson;
    public lessonOld;
    
    public comment;

    public ratingForm;

    public errorMsg;
    public successMsg;
    public userAlreadyCommentedMsg;

    public status; 
    public submitted = false;

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _commentService: CommentService,

    ) {
        this.title = 'Calificaciones y comentarios';
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();

        this.userAlreadyCommentedMsg = 'No es posible calificar la misma lección más de una vez.';
        this.errorMsg = 'Hubo un error al guardar la calificación de la lección. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha enviado la calificación correctamente. Muchas gracias por participar.';

        this.ratingForm = new FormGroup({
            rating: new FormControl('', Validators.required),
            text: new FormControl('')
        });

    }

    ngOnChanges(){
        this.restartValues();
    }


    ngOnInit(): void {

    }


    restartValues() {
        this.status = null;
        this.submitted = false;
        this.userAlreadyCommented = null;
    }

    public userAlreadyCommented = null;
    async onSubmit() {   
        this.restartValues();    

        this.userAlreadyCommented = this.lesson.comments.find(
            comment => this.identity._id == comment.user._id
            );

        this.submitted = true;

        if (this.userAlreadyCommented || this.ratingForm.invalid) {
            return;
        }

        this.comment = new Comment(
            this.ratingForm.value.text,
            this.identity._id
        );

        this.comment.score = this.ratingForm.value.rating;


        let response = await this._commentService.addComment(this.token, this.comment)
            .toPromise().catch(error => {
                this.status = 'error';
                console.log(<any>error);
            });



        if (response && response.comment._id) {            

            if(this.lesson.score == 0){             
                this.lesson.score += response.comment.score;
            }else{
                this.lesson.score += response.comment.score;
                this.lesson.score /= 2;                
            }

            this.lesson.comments.push(response.comment._id);

            this._lessonService.editLesson(this.token, this.lesson).subscribe(
                response => {
                    if (response && response.lesson._id) {                        
                        this.status = "success";
                        this.lesson = response.lesson;
                    }
                },
                error => {
                    this.status = 'error';
                    console.log(<any>error);
                }
            )

        } else {
            this.status = 'error';
        }

        this.submitted = false;

    }

    onChanges(): void {

        this.ratingForm.valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
                this.submitted = false;
                this.userAlreadyCommented = null;
            }
        });

    }
}
