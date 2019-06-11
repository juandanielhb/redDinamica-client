import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/services/lesson.service';
import { UserService } from 'src/app/services/user.service';

import { Router, ActivatedRoute } from '@angular/router';

import { FormControl } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { BasicDataService } from 'src/app/services/basicData.service';
import { ACADEMIC_LEVEL, LESSON_STATES } from 'src/app/services/DATA';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html'
  
})
export class LessonsComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public allLessons = [];
    public lessons = [];

    public level = { basic: "Básico", medium: "Medio", advanced: "Avanzado" };
    public type = { consideration: "Consideración", development: "Desarrollo" };
    public academic_level = ACADEMIC_LEVEL;
    
    public lesson_states = LESSON_STATES;


    public visible = new FormControl();

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    // Filter
    public filter;    
    public selectedAreas = [];
    public selectedLevels = [];
    public orderControl;

    public loading = true;

    public states = [
        {
            label: "Propuesta",
            value: "proposed",
            class: "secondary"
        },
        {
            label: "Asignada",
            value: "assigned",
            class: "warning"
        },
        {
            label: "Desarrollo",
            value: "development",
            class: "info"
        },
        {
            label: "Prueba",
            value: "test",
            class: "primary"
        },
        {
            label: "Terminada",
            value: "completed",
            class: "success"
        }
    ];

    public areas;
    public levels = [
        {
            label: "Preescolar",
            value: "garden",
        },
        {
            label: "Primaria",
            value: "school"
        },
        {
            label: "Secundaria",
            value: "highschool"
        },
        {
            label: "Universitario",
            value: "university"
        }
    ];

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _bDService: BasicDataService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.title = 'Lecciones';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.areas;

        this.orderControl = new FormControl('');
        this.filter = new FormControl('');

    }

    ngOnInit(): void {
        this.getAllLessons();        
        this.getAllAreas();
        this.actualPage();
    }

    setOrder() {

        if (this.orderControl) {
            if (this.orderControl.value == 'views') {
                return 'views';
            } else if (this.orderControl.value == 'score') {
                return 'score';
            }
        }
        return '';
    }

    setArea(selectedArea) {
        if (this.selectedAreas.indexOf(selectedArea) >= 0) {
            this.selectedAreas.splice(this.selectedAreas.indexOf(selectedArea), 1);

        } else {
            this.selectedAreas.push(selectedArea);

        }

        this.getAllLessons();
    }

    setLevel(selectedLevel) {

        if (this.selectedLevels.indexOf(selectedLevel) >= 0) {
            this.selectedLevels.splice(this.selectedLevels.indexOf(selectedLevel), 1);
        } else {
            this.selectedLevels.push(selectedLevel);
        }

        this.getAllLessons();
    }

    getAllAreas() {
        this.areas = JSON.parse(localStorage.getItem('areas'));


        if (!this.areas) {

            this._bDService.getAllKnowledgeAreas().subscribe(
                response => {
                    if (response.areas) {
                        this.areas = response.areas;

                        localStorage.setItem('areas', JSON.stringify(this.areas));
                    }
                }, error => {
                    console.log(<any>error);
                });
        }
    }

    getAllLessons() {
        let filteredLessons = [];
        let res;
        let orderBy = this.setOrder();

        this._lessonService.getAllLessons(this.token, orderBy, true).subscribe(
            response => {
                if (response.lessons) {
                    this.allLessons = response.lessons;

                    // Filter by area
                    if (this.selectedAreas.length > 0) {
                        this.selectedAreas.forEach((area) => {
                            filteredLessons = filteredLessons.concat(this.allLessons.filter((lesson) => {
                                res = false;
                                
                                lesson.knowledge_area.some(function (knowledge_area) {
                                    res = knowledge_area.name == area;
                                    if(res){
                                        return true;
                                    }
                                });

                                return res;
                            }));
                        });

                        this.allLessons = filteredLessons;
                        filteredLessons = [];
                    }

                    // Filter by level
                    if (this.selectedLevels.length > 0) {
                        this.selectedLevels.forEach((level) => {
                            filteredLessons = filteredLessons.concat(this.allLessons.filter((lesson) => {
                                return lesson.level == level;
                            }));
                        });

                        this.allLessons = filteredLessons;
                        filteredLessons = [];
                    }

                }
            }, error => {
                console.log(<any>error);
            });
    }

    getLessons(page = 1) {

        this._lessonService.getLessons(this.token, page, true).subscribe(
            response => {
                if (response.lessons) {
                    this.lessons = response.lessons;
                    this.total = response.total;
                    this.pages = response.pages;   
                                 
                    if (page > this.pages) {
                        this._router.navigate(['/inicio/lecciones']);
                    }

                    this.loading = false;
                }
            }, error => {
                this.loading = false;
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

    reloadLessons() {
        this.getAllLessons();
    }    

    public needReloadData;
    setNeedReload(event){
        this.needReloadData = true;
    }

    public showAreas = false; 
    setShowAreas(){
        if(this.showAreas){
            this.showAreas = false;
        }else{
            this.showAreas = true;
        }
    }

    public showLevels = false; 
    setShowLevels(){
        if(this.showLevels){
            this.showLevels = false;
        }else{
            this.showLevels = true;
        }
    }

    increaseViews(lesson){
        lesson.views += 1;

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
}
