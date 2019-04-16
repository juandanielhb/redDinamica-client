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
        id: "url",
        label: "Enlace",
        type: "text",
        attr: "url",
        required: true
    },
    {
        id: "file",
        label: "Archivo",
        type: "file",
        attr: "file",
        required: true
    },
    // {
    //     id: "justification",
    //     label: "Justificación",
    //     type: "textarea",
    //     attr: "justification",
    //     required: true
    // },
    {
        id: "source",
        label: "Fuente",
        type: "textarea",
        attr: "source",
        required: true
    }
];

export const TYPE_OF_RESOURCES = [
    {
        label: "Documentos",
        value: "document",       
    },
    {
        label: "Enlaces",
        value: "link"
    },
    {
        label: "Video",
        value: "video"
    },
    {
        label: "Software",
        value: "software"
    }
];

export const ICON_STYLE = {
    document: {
        label: "Documento",
        icon: "fa-file-alt",
        class: "bg-success"
    },
    link: {
        label: "Enlace",
        icon: "fa-link",
        class: "bg-danger"
    },
    video: {
        label: "Video",
        icon: "fa-file-video",
        class: "bg-warning"
    },
    software: {
        label: "Software",
        icon: "fa-mouse-pointer",
        class: "bg-info"
    }
};


