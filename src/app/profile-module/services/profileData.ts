export const PROFILE_MENU = [    
    {
        "id": "publications",
        "buttonClass": "btn-info",
        "iconClass": "fa-newspaper",
        "spanContent": "Publicaciones",
        "routerLink": "/perfil/*id*/posts",
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
        label:"Administrador",
        class:"badge-green"
    },
    delegated_admin: {
        label:"Administrador",
        class:"badge-green"
    }
};    