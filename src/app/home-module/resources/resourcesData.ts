export const FIELDS_FORM = [
    {
        id: "name",
        label: "Nombre",
        type: "text",
        attr: "name",
        required: true
    },
    {
        id: "description",
        label: "Descripción",
        type: "textarea",
        attr: "description",
        required: true
    },
    {
        id: "type",
        label: "Tipo",
        type: "select",
        attr: "type",
        required: true,
        options: [
            {
                label: "Documento",
                value: "document"
            },
            {
                label: "Enlace",
                value: "link"
            },
            {
                label: "Video",
                value: "video"
            },
            {
                label: "Software",
                value: "software"
            },
        ]
    },
    {
        id: "link",
        label: "Enlace",
        type: "text",
        attr: "link",
        required: true
    },
    {
        id: "file",
        label: "Archivo",
        type: "file",
        attr: "file",
        required: true
    },
    {
        id: "justification",
        label: "Justificación",
        type: "textarea",
        attr: "justification",
        required: true
    },
    {
        id: "source",
        label: "Fuente",
        type: "textarea",
        attr: "source",
        required: true
    }
];
