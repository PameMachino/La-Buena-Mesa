"use strict";
import {
    createPedidoService,
    getPedidoService,
    getPedidosService,
    updatePedidoStatusService,
    deletePedidoService,
  } from "../services/pedido.service.js";
  import { pedidoBodyValidation } from "../validations/pedido.validation.js";
  import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
  import { checkIngredientAvailability } from "../services/inventory.service.js";
  
  export async function createPedido(req, res) {
    try {
      const { error } = pedidoBodyValidation.validate(req.body);
      if (error) return handleErrorClient(res, 400, error.message);
  
      const { table, items, notes } = req.body;
  
      for (const item of items) {
        const available = await checkIngredientAvailability(item.dishId, item.quantity);
        if (!available) {
          return handleErrorClient(res, 400, `Ingredientes insuficientes para el plato: ${item.name}`);
        }
      }
  
      const [pedido, errorPedido] = await createPedidoService(req.body);
      if (errorPedido) return handleErrorClient(res, 400, errorPedido);
  
      handleSuccess(res, 201, "Pedido creado y enviado a cocina", pedido);
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      handleErrorServer(res, 500, error.message);
    }
  }
  
  export async function getPedido(req, res) {
    try {
      const id = req.params.id;
      const [pedido, errorPedido] = await getPedidoService(id);
      if (errorPedido) return handleErrorClient(res, 404, errorPedido);
  
      handleSuccess(res, 200, "Pedido encontrado", pedido);
    } catch (error) {
      console.error("Error al obtener pedido:", error);
      handleErrorServer(res, 500, error.message);
    }
  }
  
  export async function getPedidos(req, res) {
    try {
      const [pedidos, errorPedidos] = await getPedidosService();
      if (errorPedidos) return handleErrorClient(res, 500, errorPedidos);
  
      handleSuccess(res, 200, "Pedidos encontrados", pedidos);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      handleErrorServer(res, 500, error.message);
    }
  }
  
  export async function updatePedidoStatus(req, res) {
    try {
      const id = req.params.id;
      const { status } = req.body;
  
      const [pedido, errorPedido] = await updatePedidoStatusService(id, status);
      if (errorPedido) return handleErrorClient(res, 400, errorPedido);
  
      handleSuccess(res, 200, "Estado del pedido actualizado", pedido);
    } catch (error) {
      console.error("Error al actualizar estado del pedido:", error);
      handleErrorServer(res, 500, error.message);
    }
  }
  
  export async function deletePedido(req, res) { 
    try {
      const id = req.params.id;
      const [pedido, errorPedido] = await deletePedidoService(id); 
      if (errorPedido) return handleErrorClient(res, 400, errorPedido);
  
      handleSuccess(res, 200, "Pedido eliminado", pedido);
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
      handleErrorServer(res, 500, error.message);
    }
  }