export let HOME_MENU = [
    {
        id: "start",
        buttonClass: "btn-info",
        iconClass: "fa-home",
        spanContent: "Inicio",
        routerLink: "/inicio",
        subOptions: []
    },
    {
        id: "lesson",
        buttonClass: "btn-warning pl-3",
        iconClass: "fa-file-alt",
        spanContent: "Lecciones",
        routerLink: "/inicio/lecciones",
        subOptions: [
            {
                "text": "Todas las lecciones",
                "routerLink": "/inicio/lecciones"
            },
            {
                "text": "Mis lecciones",
                "routerLink": "/inicio/mis-lecciones"
            },
            {
                "text": "Convocatorias",
                "routerLink": "/inicio/convocatorias"
            },
        ]
    },
    {
        id: "resources",
        buttonClass: "btn-danger pl-3",
        iconClass: "fa-paperclip",
        spanContent: "Recursos",
        routerLink: "/inicio/recursos",
        subOptions: []
    },
    {
        id: "user",
        buttonClass: "btn-success",
        iconClass: "fa-user-friends",
        spanContent: "Usuarios",
        routerLink: "/inicio/usuarios",
        subOptions: []
    }
];