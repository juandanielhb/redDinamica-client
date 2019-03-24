export let OPTIONS_ADMIN_MENU = [
    {
        "id": "users",
        "buttonClass": "btn-success",
        "iconClass": "fa-user",
        "spanContent": "Usuarios",
        "subOptions": [
            {
                "text": "Nuevos usuarios",
                "routerLink": "/inicio/add"
            },
            {
                "text": "Todos los usuarios",
                "routerLink": "/inicio/add"
            },
            {
                "text": "Agregar usuario",
                "routerLink": "/inicio/add"
            },
        ]
    },
    {
        "id": "newsResources",
        "buttonClass": "btn-danger",
        "iconClass": "fa-newspaper",
        "spanContent": "Noticias y recursos",
        "subOptions": [
            {
                "text": "Noticias",
                "routerLink": "/admin/ciudades"
            },
            {
                "text": "Recursos",
                "routerLink": "/admin/instituciones"
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
                "text": "Propuestas",
                "routerLink": "/admin/ciudades"
            },
            {
                "text": "Crear convocatoria",
                "routerLink": "/admin/instituciones"
            },
            {
                "text": "Otra",
                "routerLink": "/admin/areas"
            }
        ]
    },
    {
        "id": "basicData",
        "buttonClass": "btn-info",
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
            }
        ]
    },
    
];
