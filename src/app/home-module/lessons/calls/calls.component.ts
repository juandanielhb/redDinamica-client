import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { BasicDataService } from 'src/app/services/basicData.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

@Component({
    selector: 'calls',
    templateUrl: './calls.component.html'

})
export class CallsComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public allLessons = [];
    public lessons = [];

    public academic_level: Object = {
        school: "Primaria",
        garden: "Preescolar",
        highschool: "Secundaria",
        university: "Universitario"
    };

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

    public areas;

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _bDService: BasicDataService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.title = 'Convocatorias';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();

        this.filter = new FormControl('');
    }

    ngDoCheck(): void {
        if (this.needReloadData) {
            this.actualPage();
            this.needReloadData = false;
        }
    }

    ngOnInit(): void {
        this.getAllCalls();
        this.getAllAreas();
        this.actualPage();
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

    getCalls(page = 1) {

        this._lessonService.getCalls(this.token, page).subscribe(
            response => {
                if (response.lessons) {
                    this.lessons = response.lessons;
                    this.total = response.total;
                    this.pages = response.pages;

                    if (page > this.pages) {
                        this._router.navigate(['/inicio/convocatorias']);
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

            this.getCalls(this.page);
        });
    }

    getAllCalls() {
        let filteredLessons = [];
        let res;

        this._lessonService.getAllCalls(this.token).subscribe(
            response => {
                if (response.lessons) {
                    this.allLessons = response.lessons;

                    // Filter by area
                    if (this.selectedAreas.length > 0) {
                        this.selectedAreas.forEach((area) => {
                            filteredLessons = filteredLessons.concat(this.allLessons.filter((lesson) => {
                                res = false;

                                lesson.knowledge_area.forEach(function (knowledge_area) {
                                    res = knowledge_area.name == area;
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

    setArea(selectedArea) {
        if (this.selectedAreas.indexOf(selectedArea) >= 0) {
            this.selectedAreas.splice(this.selectedAreas.indexOf(selectedArea), 1);
        } else {
            this.selectedAreas.push(selectedArea);
        }

        this.getAllCalls();
    }

    setLevel(selectedLevel) {

        if (this.selectedLevels.indexOf(selectedLevel) >= 0) {
            this.selectedLevels.splice(this.selectedLevels.indexOf(selectedLevel), 1);
        } else {
            this.selectedLevels.push(selectedLevel);
        }

        this.getAllCalls();
    }

    public showAreas = false;
    setShowAreas() {
        if (this.showAreas) {
            this.showAreas = false;
        } else {
            this.showAreas = true;
        }
    }

    public showLevels = false;
    setShowLevels() {
        if (this.showLevels) {
            this.showLevels = false;
        } else {
            this.showLevels = true;
        }
    }

    hasJoined(lesson) {
        let tempArray = [];
        
        if (lesson && lesson.call.interested.length > 0) {

            lesson.call.interested.forEach(interested => {
                tempArray.push(interested._id);
            });

            if (tempArray.indexOf(this.identity._id) >= 0) {
                return true;

            } else {
                return false;
            }
        }
        
    }

    editLesson(lesson, action) {
        let editLesson = lesson;
        let tempArray = [];

        lesson.call.interested.forEach(interested => {
            tempArray.push(interested._id);
        });

        editLesson.call.interested = tempArray;

        if (action == 'remove') {
            let ix = editLesson.call.interested.indexOf(this.identity._id);
            console.log(ix)
            lesson.call.interested.splice(ix, 1);            

        } else if (action == 'add') {

            if (editLesson.call.interested.indexOf >= 0) {
                return;
            }

            editLesson.call.interested.push(this.identity._id);
        }


        this._lessonService.editLesson(this.token, editLesson).subscribe(
            response => {

                if (response && response.lesson._id) {
                    this.getCalls(this.page);
                    this.getAllCalls();
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    public callLesson;
    setCallLesson(lesson) {
        this.callLesson = lesson;
    }

    public needReloadData;
    setNeedReload(event){
        this.needReloadData = true;
    }
}
