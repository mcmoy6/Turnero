

// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button'); 
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');
//const lblPaciente = document.querySelector('.form-control').value;

const searchParams = new URLSearchParams( window.location.search );
const  escritorio = searchParams.get('escritorio');

if( !escritorio ){

    alert("Por favor seleccione su consultorio");
    window.location = 'index.html';
    throw new Error( 'El escritorio es obligatorio' );

}

lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socketClient = io();

// ".on" Para escuchar un evento
socketClient.on('connect', () => {

    btnAtender.disabled = false;// Mantenr el boton habilitado cuando se encuentre conectado el servidor

});

socketClient.on('disconnect', () => {
   
    btnAtender.disabled = true;// Desabilitar el boton en caso de se desconecte el servidor

});

socketClient.on('tickets-pendientes', (pendientes) => {

    if(pendientes === 0){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
   
});



btnAtender.addEventListener( 'click', () => {

    const paciente = document.getElementById("lblPaciente").value; 
    //document.getElementById("valueInput").innerHTML = paciente;

    document.getElementById("lblPaciente").value = "";

    if(paciente){

        // "emit" Para emitir o enviar mensajes al servidor
    socketClient.emit( 'atender-ticket', { escritorio, paciente }, ({ok, ticket, msg}) => {
        //console.log(payload);
            if(!ok){
                lblTicket.innerText = 'Nadie';
                return divAlerta.style.display = '';
            }
            //lblTicket.innerText = 'Ticket ' + ticket.numero;
            lblTicket.innerText = ticket.paciente;
            divAlerta.style.display = 'none';  
            document.getElementById("lblPaciente").focus();  
            
        });

    }else{
        alert("Ingresa el nombre del paciente");
        document.getElementById("lblPaciente").focus();
    }

        
    

});