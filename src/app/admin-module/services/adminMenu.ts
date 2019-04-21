export const ADMIN_MENU = [
    {
        "id": "users",
        "buttonClass": "btn-info",
        "iconClass": "fa-user",
        "spanContent": "Usuarios",
        "subOptions": [
            {
                "text": "Nuevos usuarios",
                "routerLink": "/admin/usuarios-nuevos"
            },
            {
                "text": "Todos los usuarios",
                "routerLink": "/admin/usuarios"
            }
        ]
    },
    {
        "id": "lessons",
        "buttonClass": "btn-warning",
        "iconClass": "fa-file-alt",
        "spanContent": "Lecciones",
        "subOptions": [
            {
                "text": "Todas las lecciones",
                "routerLink": "/admin/lecciones"
            },
            {
                "text": "Propuestas",
                "routerLink": "/admin/lecciones-propuestas"
            },
            {
                "text": "Experiencias",
                "routerLink": "/admin/experiencias"
            }
        ]
    },
    {
        "id": "resources",
        "buttonClass": "btn-danger",
        "iconClass": "fa-paperclip",
        "spanContent": "Recursos",
        "subOptions": [
            {
                "text": "Todos recursos",
                "routerLink": "/admin/recursos"
            },
            {
                "text": "Propuestas",
                "routerLink": "/admin/recursos-propuestos"
            }
        ]
    },
    {
        "id": "basicData",
        "buttonClass": "btn-success",
        "iconClass": "fa-database",
        "spanContent": "Datos básicos",
        "subOptions": [
            {
                "text": "Ciudades",
                "routerLink": "/admin/ciudades"
            },
            {
                "text": "Instituciones",
                "routerLink": "/admin/instituciones"
            },
            {
                "text": "Áreas de conocimiento",
                "routerLink": "/admin/areas"
            },
            {
                "text": "Profesiones",
                "routerLink": "/admin/profesiones"
            }
        ]
    },

];
