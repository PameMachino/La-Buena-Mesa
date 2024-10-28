import { Pedido } from "../entities/pedido.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createPedidoService(pedidoData) {
    try {
      const pedidoRepository = AppDataSource.getRepository(Pedido);
      const nuevoPedido = pedidoRepository.create(pedidoData); 
      await pedidoRepository.save(nuevoPedido); 
      return [nuevoPedido, null]; 
    } catch (error) {
      console.error("Error al crear pedido:", error);
      return [null, error.message];
    }
  }
  
  export async function getPedidoService(id) {
    try {
      const pedidoRepository = AppDataSource.getRepository(Pedido);
      const pedido = await pedidoRepository.findOneBy({ id }); 
      if (!pedido) return [null, "Pedido no encontrado"];
      return [pedido, null]; 
    } catch (error) {
      console.error("Error al obtener pedido:", error);
      return [null, error.message]; 
    }
  }
  

  export async function getPedidosService() {
    try {
      const pedidoRepository = AppDataSource.getRepository(Pedido);
      const pedidos = await pedidoRepository.find(); 
      return [pedidos, null]; 
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      return [null, error.message]; 
    }
  }
  

  export async function updatePedidoStatusService(id, nuevoEstado) {
    try {
      const pedidoRepository = AppDataSource.getRepository(Pedido);
      const pedido = await pedidoRepository.findOneBy({ id }); 
      if (!pedido) return [null, "Pedido no encontrado"];
  
      pedido.estado = nuevoEstado; 
      await pedidoRepository.save(pedido); 
      return [pedido, null]; 
    } catch (error) {
      console.error("Error al actualizar estado del pedido:", error);
      return [null, error.message]; 
    }
  }
  
  export async function deletePedidoService(id) {
    try {
      const pedidoRepository = AppDataSource.getRepository(Pedido);
      const pedido = await pedidoRepository.findOneBy({ id }); 
      if (!pedido) return [null, "Pedido no encontrado"];
  
      await pedidoRepository.remove(pedido); 
      return [null, null];
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
      return [null, error.message]; 
    }
  }