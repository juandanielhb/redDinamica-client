export const ADD_FIELDS_FORM = [
    {
        id: "name",
        label: "Nombres",
        type: "text",
        attr: "name",        
        required: true
    },
    {
        id: "surname",
        label: "Apellidos",
        type: "text",
        attr: "surname",
        required: true            
    },
    {
        id: "email",
        label: "Correo electrónico",
        type: "text",
        attr: "email",
        required: true        
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
        id: "category",
        label: "Categoría",
        type: "select",
        attr: "role",
        required: true        
    }     
];

export const EDIT_FIELDS_FORM = [
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
        id: "email",
        label: "Correo electrónico",
        type: "text",
        attr: "email"        
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
        type: "text",
        attr: "city"        
    },
    {
        id: "profession",
        label: "Profesión",
        type: "text",
        attr: "profession"        
    },
    {
        id: "institution",
        label: "Institución",
        type: "text",
        attr: "institution"        
    },
    {
        id: "postgraduate",
        label: "Postgrados",
        type: "textarea",
        attr: "postgraduate"        
    },
    {
        id: "category",
        label: "Categoría",
        type: "select",
        attr: "role",
        required: true        
    }     
];

export const CATEGORIES = [
    {
        label: "Facilitador",
        value: "expert",
    },
    {
        label: "Docente",
        value: "teacher",
    },
    {
        label: "Estudiante",
        value: "student",
    },
    {
        label: "Invitado",
        value: "guest",
    }            
];

export const CATEGORIES_ADMIN = [
    ...CATEGORIES ,
    {
        label: "Administrador delegado",
        value: "delegated_admin",
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

