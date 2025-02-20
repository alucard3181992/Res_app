const camposBase = {
    texto: [
        { label: "", value: "", requerido: false, value2: "", key: "" }
    ],
    radiobutton: [
        {
            etiqueta: "",
            value: "",
            value2: "",
            requerido: false,
            opciones: [],
            key: ""
        },
    ],
    listas: [
        {
            etiqueta: "",
            value: "",
            value2: "",
            requerido: false,
            opciones: [],
            key: ""
        },
    ],
    imagen: [
        { label: "", value: "", requerido: false, value2: "", key: "" }
    ],
    chips: [
        {
            etiqueta: "",
            value: "",
            value2: "",
            valor: "",
            telefono: false,
            requerido: false,
            opciones: [],
            key: ""
        },
    ],
    toggleButton: [
        {
            etiqueta: "",
            value: "",
            value2: "",
            valor: "",
            requerido: false,
            opciones: [],
            key: ""
        },
    ]
};

/* export function ObtenerObjetoCampo(objetosConCategorias) {
    const result = { campos: [] };

    objetosConCategorias.forEach(({ objeto, categoria }) => {
        if (!camposBase[categoria]) {
            throw new Error(`Categoría ${categoria} no reconocida`);
        }

        const categoriaFields = Object.keys(objeto).map((key, index) => {
            return {
                ...camposBase[categoria][0],
                label: key,
                value: key,
                value2: key,
                requerido: true, // Puedes ajustar esto según tus necesidades
                key: `${key}_${index}`
            };
        });

        result.campos.push({ [categoria]: categoriaFields });
    });

    return result;
}
 */
export function ObtenerObjetoCampo(objetosConCategorias) {
    const result = {};

    objetosConCategorias.forEach(({ objeto, categoria }) => {
        if (!camposBase[categoria]) {
            throw new Error(`Categoría ${categoria} no reconocida`);
        }

        if (!result[categoria]) {
            result[categoria] = [];
        }

        Object.keys(objeto).forEach((key, index) => {
            const field = {
                ...camposBase[categoria][0],
                label: key,
                value: key,
                value2: key,
                requerido: true, // Puedes ajustar esto según tus necesidades
                key: `${key}_${index}`
            };
            result[categoria].push(field);
        });
    });

    // Eliminar categorías vacías
    Object.keys(result).forEach((categoria) => {
        if (result[categoria].length === 0) {
            delete result[categoria];
        }
    });

    return result;
}
// Ejemplo de uso
const caos = { nombre: "", ap: "", am: "", charla: "" };
const imagen = { base64: "" };
const objetosConCategorias = [
    { objeto: caos, categoria: "texto" },
    { objeto: imagen, categoria: "imagen" }
];

//console.log("EL OBJETO ES", JSON.stringify(ObtenerObjetoCampo(objetosConCategorias), null, 2));
