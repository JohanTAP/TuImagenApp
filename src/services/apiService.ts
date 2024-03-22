export async function fetchOrdenById(id: string): Promise<any> {
    const response = await fetch(`http://192.168.0.101:8080/api/ordenes/${id}`);
    if (!response.ok) {
        throw new Error(`No se pudo obtener la orden con ID: ${id}`);
    }
    return await response.json();
}

export async function fetchEstadoOrdenById(id: string): Promise<any> {
    const response = await fetch(`http://192.168.0.101:8080/api/ordenes/${id}/estados`);
    if (!response.ok) {
        throw new Error(`No se pudo obtener el estado de la orden con ID: ${id}`);
    }
    return await response.json();
}

export function determinarMensajeEstado(estados: Record<string, string>): string {
    const todosTerminados = Object.values(estados).every(estado => estado === 'TERMINADO');
    const algunoAnulado = Object.values(estados).some(estado => estado === 'ANULADO');

    if (todosTerminados) {
        return 'TERMINADO';
    } else if (algunoAnulado) {
        return 'ANULADO';
    } else {
        return 'EN PROCESO';
    }
}
