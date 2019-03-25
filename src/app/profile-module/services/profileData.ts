export const PROFILE_MENU = [
    {
        "id": "info",
        "buttonClass": "btn-success",
        "iconClass": "fa-info-circle",
        "spanContent": "Información",
        "routerLink": "/perfil/info",
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
    // {
    //     "id": "newsResources",
    //     "buttonClass": "btn-danger",
    //     "iconClass": "fa-newspaper",
    //     "spanContent": "Noticias y recursos",
    //     "subOptions": [
    //         {
    //             "text": "Noticias",
    //             "routerLink": "/admin/ciudades"
    //         },
    //         {
    //             "text": "Recursos",
    //             "routerLink": "/admin/instituciones"
    //         }
    //     ]
    // },
    // {
    //     "id": "lessons",
    //     "buttonClass": "btn-warning",
    //     "iconClass": "fa-file-alt",
    //     "spanContent": "Lecciones",
    //     "subOptions": [
    //         {
    //             "text": "Propuestas",
    //             "routerLink": "/admin/ciudades"
    //         },
    //         {
    //             "text": "Crear convocatoria",
    //             "routerLink": "/admin/instituciones"
    //         },
    //         {
    //             "text": "Otra",
    //             "routerLink": "/admin/areas"
    //         }
    //     ]
    // },
    {
        "id": "lessonsProfile",
        "buttonClass": "btn-warning",
        "iconClass": "fa-file-alt",
        "spanContent": "Lecciones",
        "routerLink": "/perfil/lecciones",
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

export const FIELDS_FORM = [
    {
        id: "editName",
        label: "Nombres",
        type: "text",
        attr: "name"        
    },
    {
        id: "editSurname",
        label: "Apellidos",
        type: "text",
        attr: "surname"        
    },
    {
        id: "editabout",
        label: "Descripción",
        type: "textarea",
        attr: "about"        
    },
    {
        id: "editCity",
        label: "Ciudad",
        type: "text",
        attr: "city"        
    },
    {
        id: "editProfession",
        label: "Profesión",
        type: "text",
        attr: "profession"        
    },
    {
        id: "editInstitution",
        label: "Institución",
        type: "text",
        attr: "institution"        
    },
    {
        id: "editPostgraduate",
        label: "Postgrados",
        type: "textarea",
        attr: "postgraduate"        
    },

                    
];


export const LABEL_PROFILE = {
    teacher:"Docente",
    guest:"Invitado",
    student:"Estudiante",
    expert:"Facilitador",
    admin:"Facilitador",
    delegated_admin:"Facilitador"
};    