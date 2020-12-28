var fatherLink = 'http://localhost:9000'
var Global = {

    urlHomie: fatherLink + '/api/HoHomie/',
    urlCliente: fatherLink + '/api/HoCliente/',
    urlClienteByName: fatherLink + '/api/HoCliente/findByNombre/',
    urlCatalogo: fatherLink + '/api/HoCatalogo/',
    urlHomiePedidos: fatherLink + '/api/HoPedidoHomie/HoPedidosPorHomie',
    urlHomiePedidoCod: fatherLink + '/api/HoPedido/',
    urlPedidoHomie: fatherLink + '/api/HoPedidoHomie/',
    urlCrearPedido: fatherLink + '/api/HoPedido/HoCrearPedido',
    urlListarPedido: fatherLink + '/api/HoPedido/pedidos',
    urlPedidoPago: fatherLink + '/api/HoPedidoPagos',
    urlComentario: fatherLink + '/api/HoComentario',
    urlPedidoServicio: fatherLink + '/api/HoPedidoServicio',
    urlResumenPedidoPago: fatherLink + '/api/HoPedidoPagos/saldo',
    urlResumenPedidosXHomie: fatherLink + '/api/HoPedidoHomie/HoPedidosPorHomieFecha',
    urlResumenDashboard: fatherLink+'/api/HoDash/',
    urlLogin: fatherLink + '/'
};

export default Global;