import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

@Component({
    selector: 'proposed',
    templateUrl: './proposed.component.html'

})
export class ProposedComponent implements OnInit {
    public title;
    public url;
    public token;
    public identity;

    public lessons = [];
    
    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _router: Router,
        private _route: ActivatedRoute     
    ) {
        this.title = 'Lecciones propuestas';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        
    }

    ngOnInit(): void {
        this.actualPage();
    }

    ngDoCheck(): void {
        if(this.needReloadData){
            this.actualPage();
            this.needReloadData = false;
        }
    }
    
    getLessons(page = 1) {        

        this._lessonService.getSuggestedLesson(this.token, page).subscribe(
            response => {               
                
                if (response.lessons) {
                    this.lessons = response.lessons;
                    this.total = response.total;
                    this.pages = response.pages;

                    if (page > this.pages) {
                        this._router.navigate(['/admin/lecciones-propuestas']);
                    }
                }
            }, error => {
                console.log(<any>error);
            }
        );
    }

    actualPage() {

        this._route.params.subscribe(params => {
            let page = +params['page'];

            this.page = page;

            if (!page) {
                this.page = 1;
                this.nextPage = this.page + 1;
            } else {
                this.nextPage = page + 1;
                this.prevPage = page - 1;

                if (this.prevPage <= 0) {
                    this.prevPage = 1;
                }
            }

            this.getLessons(this.page);
        });
    }

    editLesson(lesson){
        lesson.accepted = true;
        lesson.state = 'proposed';

        this._lessonService.editLesson(this.token, lesson).subscribe(
            response =>{                
                if(response && response.lesson._id){        
                    this.getLessons(this.page);
                }
             },
             error => {
                 console.log(<any>error);
             }
        )
    }

    public detailsLessonItem;
    setDetailLesson(lesson){
        this.detailsLessonItem = lesson;
    }

    public deleteLessonId;
    setDeleteLesson(lessonId){
        this.deleteLessonId = lessonId;
    }

    public needReloadData;
    setNeedReload(event){
        this.needReloadData = true;
    }

}
