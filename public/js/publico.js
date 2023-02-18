

// Referencias Html

const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const lblTicket1m = document.querySelector('#lblTicket1m');
const lblEscritorio1m = document.querySelector('#lblEscritorio1m');

//console.log('Hola mundo');
const socketClient = io();

// ".on" Para escuchar un evento
socketClient.on('connect', () => {

   // btnCrear.disabled = false;// Mantenr el boton habilitado cuando se encuentre conectado el servidor

});

socketClient.on('disconnect', () => {
   
    //btnCrear.disabled = true;// Desabilitar el boton en caso de se desconecte el servidor

});

socketClient.on('estado-actual', (payload) => {

    const audio = new Audio('./audio/hangouts_message.ogg');
    audio.play();


    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if( ticket1 ){
        
        lblTicket1.innerText = ticket1.paciente;
        lblEscritorio1.innerText = ticket1.escritorio;

        //lblTicket1m.innerText = 'Turno: ' + ticket1.paciente;
        //lblEscritorio1m.innerText = ticket1.escritorio;
    }  

    if( ticket2 ){
        
        lblTicket2.innerText = ticket2.paciente;
        lblEscritorio2.innerText = ticket2.escritorio;
    }

    if(ticket3){
        
        lblTicket3.innerText = ticket3.paciente;
        lblEscritorio3.innerText = ticket3.escritorio;
    }

    if( ticket4 ){
        
        lblTicket4.innerText = ticket4.paciente;
        lblEscritorio4.innerText = ticket4.escritorio;
    }

});