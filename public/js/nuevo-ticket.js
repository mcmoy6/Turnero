// Referencias HTML

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

//console.log('Hola mundo');
const socketClient = io();

// ".on" Para escuchar un evento
socketClient.on('connect', () => {

    btnCrear.disabled = false;// Mantenr el boton habilitado cuando se encuentre conectado el servidor

});

socketClient.on('disconnect', () => {
   
    btnCrear.disabled = true;// Desabilitar el boton en caso de se desconecte el servidor

});

socketClient.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
});

// Escuchar mensaje emitido desde el Server
/*
socketClient.on('enviar-mensaje', (payload) => {
    console.log(payload);
});
*/

btnCrear.addEventListener( 'click', () => {

    
    // "emit" Para emitir o enviar mensajes al servidor
    socketClient.emit( 'siguiente-ticket', null, ( ticket ) => {
        
        // Asignamos al span en el HTML lblNuevoTicket el numero de ticket
        lblNuevoTicket.innerText = ticket;
    });


});