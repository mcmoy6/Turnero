const { Socket } = require('socket.io');
const TicketControl = require('../models/ticket-control');


const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    //console.log('Cliente conectado', socket.id );
/** 
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });
*/

    // Emitir mensaje al ultimo cliente que se esta conectando
    socket.emit( 'ultimo-ticket', ticketControl.ultimo);
    socket.emit( 'estado-actual', ticketControl.ultimos4 );
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length );



    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        // TODO Notificar que hay un nuevo turno o ticket por asignar
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );

    });

    socket.on('atender-ticket', ({escritorio, paciente}, callback) => {

        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio, paciente );

        // TODO notificar cambio de los ultimos 4 turnos
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );

        // TODO notificar los tickets pendientes en tiempo real a todos los conectados
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );

        if(!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    });

}



module.exports = {
    socketController
}

