"use strict";
import { EntitySchema } from "typeorm";

const PedidoSchema = new EntitySchema({
    name: "Pedido", // Nombre de la entidad
    tableName: "pedidos", // Nombre de la tabla en la base de datos
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        mesa: {
            type: "int",
            nullable: false,
        },
        items: {
            type: "json", // Suponiendo que almacenarás un array de objetos
            nullable: false,
        },
        notas: {
            type: "varchar",
            length: 255,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: false,
            default: "pendiente", // Estado por defecto
        },
        creadoEn: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        actualizadoEn: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    relations: {
        usuario: {
            type: "many-to-one", // Relación con la entidad User
            target: "User", // Nombre de la entidad relacionada
            joinColumn: {
                name: "usuarioId",
                referencedColumnName: "id",
            },
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_PEDIDO",
            columns: ["id"],
            unique: true,
        },
    ],
});

export default PedidoSchema;