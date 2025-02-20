import { Validacion } from "@/recursos/js/Validacion";
import { Funciones } from "../Tabla/Funciones";

const columnMappings = {
    image: ['image', 'imagen', 'img'],
    status: ['inventoryStatus', 'estado', 'status', 'est'],
    category: ['category', 'categoria'],
    name: ['name', 'nombre'],
    price: ['price', 'precio'],
    fecha: ['fecha', 'fecnac', 'fecent'],
    rating: ['Ranking', 'rating', 'ranking']
    // Agrega más mapeos según sea necesario
}

const atributo2 = Funciones.obtenerValorPropiedad
const fecha = Validacion.formatoDMABIEN

export const atributoBusqueda = (item, attr) => {
    const valor = atributo2(item, attr);
    const esCampoFecha = columnMappings.fecha.includes(attr.toLowerCase());
    return esCampoFecha && !isNaN(Date.parse(valor)) ? fecha(valor) : valor;
}
export const FuncionesNuevas = {
    getSeverity(value) {
        if (typeof value === 'boolean') {
            return value ? 'success' : 'danger';
        }

        // Convert the value to lowercase for case-insensitive comparison
        const normalizedValue = value.toLowerCase();

        switch (normalizedValue) {
            case 'instock':
            case 'available':
            case 'valido':
                return 'success';
            case 'lowstock':
                return 'warning';
            case 'outofstock':
            case 'unavailable':
            case 'no valido':
            case 'no valido':
                return 'danger';
            default:
                return null;
        }
    },
    getSortOptions(product) {
        const sortOptions = [];
        for (const key in product) {
            if (typeof product[key] === 'number') {
                sortOptions.push(
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} Menor a Mayor`, value: key },
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} Mayor a Menor`, value: `!${key}` }
                );
            } else {
                sortOptions.push(
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} A - Z`, value: key },
                    { label: `${key.charAt(0).toUpperCase() + key.slice(1)} Z - A`, value: `!${key}` }
                );
            }
        }
        console.log("RETORNO", sortOptions);
        return sortOptions;
    },
    getSortOptions2(product, columnas) {
        const sortOptions = [];
        const columnFields = columnas.map(col => col.field);

        columnFields.forEach(field => {
            const fieldParts = field.split('.');
            let value = product;
            for (const part of fieldParts) {
                value = value[part];
                if (value === undefined) break;
            }

            if (value !== undefined) {
                const columna = columnas.find(col => col.field === field);
                if (columna) {
                    if (typeof value === 'number') {
                        sortOptions.push(
                            { label: `${columna.header} Menor a Mayor`, value: field },
                            { label: `${columna.header} Mayor a Menor`, value: `!${field}` }
                        );
                    } else {
                        sortOptions.push(
                            { label: `${columna.header} A - Z`, value: field },
                            { label: `${columna.header} Z - A`, value: `!${field}` }
                        );
                    }
                }
            }
        });

        return sortOptions;
    },
    getStandardKey(key) {
        for (const [standardKey, aliases] of Object.entries(columnMappings)) {
            if (aliases.includes(key)) {
                return standardKey;
            }
        }
        return key; // Devuelve la clave original si no se encuentra en el mapeo
    },
    getAllKeys(products) {
        const keys = new Set();
        products.forEach(product => {
            Object.keys(product).forEach(key => keys.add(key));
        });
        return Array.from(keys);
    },
    formatEstado(estado, valores) {
        if (typeof estado === 'boolean') {
            return estado ? valores.v : valores.f;
        }
        return estado.toUpperCase();
    },

}