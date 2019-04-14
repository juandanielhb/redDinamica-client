export const FIELDS_SUGGEST_FORM = [
    {
        id: "title",
        label: "Título",
        type: "text",
        attr: "title",
        required: true
    },
    {
        id: "resume",
        label: "Resumen",
        type: "textarea",
        attr: "resume",
        required: true
    },
    {
        id: "references",
        label: "Referencias",
        type: "textarea",
        attr: "references",
        required: true
    },
    {
        id: "justification",
        label: "Justificación",
        type: "textarea",
        attr: "justification",
        required: true
    }
    
];

export const FIELDS_SEND_FORM = [
    {
        id: "title",
        label: "Título",
        type: "text",
        attr: "title",
        required: true
    },
    {
        id: "resume",
        label: "Resumen",
        type: "textarea",
        attr: "resume",
        required: true
    },
    {
        id: "areas",
        label: "Áreas de conocimiento",
        type: "select",
        attr: "areas",
        required: true,
        autocomplete: true  
    },
    {
        id: "references",
        label: "Referencias",
        type: "textarea",
        attr: "references",
        required: true
    },
    {
        id: "level",
        label: "Nivel",
        type: "select",
        attr: "level",
        required: true,
        autocomplete: false,  
        options: [
            {
                label: "Básico",
                value: "basic"
            },
            {
                label: "Medio",
                value: "medium"
            },
            {
                label: "Avanzado",
                value: "advanced"
            }
        ]
    },
    {
        id: "type",
        label: "Tipo",
        type: "select",
        attr: "type",
        required: true,
        options: [
            {
                label: "Desarrollo",
                value: "development"
            },
            {
                label: "Consideración",
                value: "consideration"
            }
        ]
    }
];
