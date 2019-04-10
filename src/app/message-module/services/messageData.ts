export const MESSAGE_MENU = [    
    {
        "id": "send",
        "buttonClass": "btn-info",
        "iconClass": "fa-paper-plane",
        "spanContent": "Enviar mensaje",
        "routerLink": "/mensajes/nuevo",
        "subOptions": []
    },
    {
        "id": "received",
        "buttonClass": "btn-success",
        "iconClass": "fa-envelope-square",
        "spanContent": "Mensajes recibidos",
        "routerLink": "/mensajes/recibidos",
        "subOptions": []
    },
    {
        "id": "sended",
        "buttonClass": "btn-warning",
        "iconClass": "fa-share-square",
        "spanContent": "Mensajes enviados",
        "routerLink": "/mensajes/enviados",
        "subOptions": []
    },
    // {
    //     "id": "information",
    //     "buttonClass": "btn-warning",
    //     "iconClass": "fa-info-circle",
    //     "spanContent": "Información",
    //     "routerLink": "/mensajes/informacion",
    //     "subOptions": []
    // },
    
];

export const LABEL_ROLE = {
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