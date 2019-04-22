import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { LESSON_STATES, ACADEMIC_LEVEL } from 'src/app/services/DATA';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';


@Component({
    selector: 'edit',
    templateUrl: './edit.component.html'
    
})
export class EditComponent implements OnInit {
    public title: string;
    public token;
    public url;
    
    @Input() lesson;
    @Output() edited = new EventEmitter();

    public lessonForm;   

    public status;
    public submitted;   

    public errorMsg;
    public successMsg;

    public academic_level = ACADEMIC_LEVEL;    
    public lesson_states = LESSON_STATES;
    public callForm;
    
    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
    ) {      
        this.title = "Editar lección";
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();

        this.errorMsg = 'Hubo un error creando la convocatoria. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha creado la convocatoria correctamente.';

        this.lessonForm = new FormGroup({
            title: new FormControl('', Validators.required),
            resume: new FormControl('', Validators.required),
            justification: new FormControl('', Validators.required),
            references: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required)
        });
    }

    get f() { return this.lessonForm.controls; }

    ngOnInit(): void {
        this.lessonForm.patchValue({
            title: this.lesson.title, 
            resume: this.lesson.resume, 
            justification: this.lesson.justification, 
            references: this.lesson.references, 
            state: this.lesson.state,
        });
        
    }

    onSubmit() {
        this.submitted = true;
        
        if (this.lessonForm.invalid) {
            return;
        }

        this.lesson.title = this.lessonForm.value.title;
        this.lesson.resume = this.lessonForm.value.resume;
        this.lesson.references = this.lessonForm.value.references;
        this.lesson.justification = this.lessonForm.value.justification;
        this.lesson.state = this.lessonForm.value.state;        


        console.log(this.lessonForm.value.title)
        this._lessonService.editLesson(this.token, this.lesson).subscribe(
            response => {
                console.log(response);
                if (response.lesson && response.lesson._id) {
                    this.status = 'success';                    
                    this.submitted = false;       
                    this.edited.emit();
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
    }
}
