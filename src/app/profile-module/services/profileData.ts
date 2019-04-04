export const PROFILE_MENU = [
    {
        "id": "info",
        "buttonClass": "btn-success",
        "iconClass": "fa-info-circle",
        "spanContent": "Información",
        "routerLink": "/perfil/*id*/info",
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
    // {
    //     "id": "lessonsProfile",
    //     "buttonClass": "btn-warning",
    //     "iconClass": "fa-file-alt",
    //     "spanContent": "Lecciones",
    //     "routerLink": "/perfil/lecciones",
    //     "subOptions": [
    //         {
    //             "text": "Ciudades",
    //             "routerLink": "/admin/ciudades"
    //         },
    //         {
    //             "text": "Instituciones",
    //             "routerLink": "/admin/instituciones"
    //         },
    //         {
    //             "text": "Áreas de conocimiento",
    //             "routerLink": "/admin/areas"
    //         }
    //     ]
    // },
    
];

export const FIELDS_FORM = [
    {
        id: "name",
        label: "Nombres",
        type: "text",
        attr: "name"        
    },
    {
        id: "surname",
        label: "Apellidos",
        type: "text",
        attr: "surname"        
    },
    {
        id: "about",
        label: "Descripción",
        type: "textarea",
        attr: "about"        
    },
    {
        id: "city",
        label: "Ciudad",
        type: "select",
        attr: "city",
        required: false,
        autocomplete: true                    
    },
    {
        id: "profession",
        label: "Profesión",
        type: "select",
        attr: "profession",
        required: false,
        autocomplete: true            
    },
    {
        id: "institution",
        label: "Institución",
        type: "select",
        attr: "institution",
        required: false,
        autocomplete: true                    
    },
    {
        id: "postgraduate",
        label: "Postgrados",
        type: "textarea",
        attr: "postgraduate"        
    }                    
];

export const INFO_FIELDS = [
    {
        id: "name",
        label: "Nombres",
        type: "text",
        attr: "name"        
    },
    {
        id: "surname",
        label: "Apellidos",
        type: "text",
        attr: "surname"        
    },
    {
        id: "about",
        label: "Descripción",
        type: "textarea",
        attr: "about"        
    },
    {
        id: "city",
        label: "Ciudad",
        type: "select",
        attr: "city",
        required: false,
        autocomplete: true                    
    },
    {
        id: "profession",
        label: "Profesión",
        type: "select",
        attr: "profession",
        required: false,
        autocomplete: true            
    },
    {
        id: "institution",
        label: "Institución",
        type: "select",
        attr: "institution",
        required: false,
        autocomplete: true                    
    },
    {
        id: "postgraduate",
        label: "Postgrados",
        type: "textarea",
        attr: "postgraduate"        
    }                    
];


export const LABEL_PROFILE = {
    teacher: {
        label:"Docente",
        class:"badge-success"
    },
    guest: {
        label:"Invitado",
        class:"badge-orange"
    },
    student: {
        label:"Estudiante",
        class:"badge-info"
    },
    expert: {
        label:"Facilitador",
        class:"badge-purple"
    },
    admin: {
        label:"Facilitador",
        class:"badge-purple"
    },
    delegated_admin: {
        label:"Facilitador",
        class:"badge-purple"
    }
};    