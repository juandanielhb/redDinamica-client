import { Component, OnInit } from '@angular/core';
import { ACADEMIC_LEVEL, LESSON_STATES } from 'src/app/services/DATA';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { BasicDataService } from 'src/app/services/basicData.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

@Component({
    selector: 'advise-lesson',
    templateUrl: './advise-lesson.component.html'

})
export class AdviseLessonComponent implements OnInit {
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

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    // Filter
    public filter;
    public selectedStates = [];

    public states = [
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
        this.title = 'Asesorar lecciones';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.areas;
    }

    ngOnInit(): void {
        this.getAllLessonsToAdvise();
        this.getAllAreas();
        this.actualPage();
    }

    setState(selectedState) {
        if (this.selectedStates.indexOf(selectedState) >= 0) {
            this.selectedStates.splice(this.selectedStates.indexOf(selectedState), 1);

        } else {
            this.selectedStates.push(selectedState);

        }

        this.getAllLessonsToAdvise();
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

    getAllLessonsToAdvise() {
        let filteredLessons = [];

        this._lessonService.getAllLessonsToAdvise(this.token).subscribe(
            response => {
                if (response.lessons) {
                    this.allLessons = response.lessons;

                    // Filter by state
                    if (this.selectedStates.length > 0) {
                        this.selectedStates.forEach((state) => {
                            filteredLessons = filteredLessons.concat(this.allLessons.filter((lesson) => {
                                return lesson.state == state;
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

    getLessonsToAdvise(page = 1) {

        this._lessonService.getLessonsToAdvise(this.token, page).subscribe(
            response => {
                if (response.lessons) {
                    this.lessons = response.lessons;
                    this.total = response.total;
                    this.pages = response.pages;

                    if (page > this.pages) {
                        this._router.navigate(['/inicio/asesorar-lecciones']);
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

            this.getLessonsToAdvise(this.page);
        });
    }

    reloadLessons() {
        this.getAllLessonsToAdvise();
    }

}

