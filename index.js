var firebaseConfig = {
    apiKey: "AIzaSyC8pdHYhdUGvqRKoyJex0TqoxTJjn5aI_g",
    authDomain: "jsfbcisneros.firebaseapp.com",
    databaseURL: "https://jsfbcisneros.firebaseio.com",
    projectId: "jsfbcisneros",
    storageBucket: "jsfbcisneros.appspot.com",
    messagingSenderId: "368719170019",
    appId: "1:368719170019:web:9a643d791295d981cb78d6",
    measurementId: "G-CCJ0NZFPNE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var superpoder = document.getElementById("Input3").value;
    var universo = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var heroe = {
            id, //matricula:id
            nombre,
            superpoder,
            universo,
        }

        //console.log(alumno);

        firebase.database().ref('Heroe/' + id).update(heroe).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Heroe');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(heroe){
    
    if(heroe!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = heroe.id;
        cell2.innerHTML = heroe.nombre; 
        cell3.innerHTML = heroe.superpoder;
        cell4.innerHTML = heroe.universo; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${heroe.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+heroe.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Heroe/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Heroe/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(heroe){
    if(heroe!=null)
    {
        document.getElementById("Input1").value=heroe.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=heroe.nombre;
        document.getElementById("Input3").value=heroe.superpoder;
        document.getElementById("Input4").value=heroe.universo;
    }
}


//Para consulta de universo
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Heroe");
    ref.orderByChild("universo").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(heroe){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = heroe.id;
    cell2.innerHTML = heroe.nombre; 
    cell3.innerHTML = heroe.superpoder;
    cell4.innerHTML = heroe.universo; 
   
}