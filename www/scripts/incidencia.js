// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en dispositivos/emuladores Ripple o Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";
    var myDB;
    var msg; 
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        document.getElementById("tipoincidencia").selectedIndex = "0";
        document.getElementById("btnGuardar").addEventListener('click', RegistrarUsuario, false);
        //sqlite

        sqlite()//arranco para sacar el id y la lat y lng 
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };

    //FUNCIONES PERSONALIZADAS
    function BuscarUsuario() {
        var pFullname = document.getElementById("txtNombre").value;
        if (pFullname == "") {
            $("#divResultado").html("Ingrese el nombre de usuario!");
        } else {
            var cadena = "<table data-role='table' class='ui-responsive' width='100%'>";
            cadena = cadena + "<thead><tr><th>Usuario</th><th>Nombre</th><th>Fecha Nac.</th></tr></thead><tbody>";

            //agregando evento Ajax
            $.ajax({
                type: "GET",
                url: "https://implementta.net/andro/AppIncidencias.aspx?query=select%20top%20%201%20*from[directory]",
                crossDomain: true,
                cache: false,
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "JSON",
                success: function (result) {
                    $.each(result, function (i, field) {
                        cadena = cadena + "<tr>" + "<td>" + field.id + "</td><td>" + field.fullname + "</td><td>" + field.phone + "</td></tr>";
                    });
                    cadena = cadena + "</table>";
                    $("#divLista").append(cadena);
                },
                error: function (result) {
                    alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
                }
            });
        }
    }

    function RegistrarUsuario() {

 

        var pnombre = document.getElementById("txtnombre").value;
        var ptelefono = document.getElementById("txttelefono").value;
        var pcorreo = document.getElementById("txtcorreo").value;
        var pincidencia = document.getElementById("tipoincidencia").selectedIndex;

        var pdescripcion = document.getElementById("txtDescripcion").value;
      

        if (pnombre == "") {
            alert("Ingrese un nombre!");
            return false;
        }
        if (ptelefono == "") {
            alert("Ingrese un telefono!");
            return false;
        }
        //if (pFullname == "") {
        //    alert("Ingrese el nombre completo!");
        //    return false;
        //}
        if (pincidencia == 0) {
            alert("Ingrese una incidencia!");
            return false;
        }

        var insert = 0;
        if (confirm("Estas seguro?")) {


           // sqlite()

            var db = openDatabase('Database', '1.0', 'Alcaldes', 2 * 1024 * 1024);
            var msg;
            db.executeSql('SELECT * FROM id_incidencias1', [], function (tx, results) {
                var len = results.rows.length, i;
                msg = "<p>Found rows: " + len + "</p>";
                document.querySelector('#status').innerHTML += msg;

                for (i = 0; i < len; i++) {
                    var ide = results.rows.item(i).id
                    var platitud = results.rows.item(i).latitud
                    var plongitud = results.rows.item(i).longitud
                    msg = "<p><b>" + results.rows.item(i).id + "</b></p>";
                    document.querySelector('#status').innerHTML += ide;
                }
            }, null);


            db.transaction(function (tx) {

                db.executeSql('CREATE TABLE  if not exists incidencias1  (id  TEXT NOT NULL PRIMARY KEY ,nombre    TEXT,telefono  TEXT,correo   TEXT,tipoIncidencia INTEGER,descripcion  TEXT,latitud  TEXT,longitud TEXT, fechaCaptura  TEXT,  sincronizado   INTEGER NOT NULL DEFAULT 0 )')

                // tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');


                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var h = today.getHours();
                var m = today.getMinutes();
                var s = today.getSeconds();
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = yyyy + '/' + mm + '/' + dd + '' + h + ':' + m + ':' + s;

                ///
                tx.executeSql('INSERT INTO incidencias1 (id, nombre,telefono,correo,tipoIncidencia,descripcion,idplaza,latitud,longitud,fechaCaptura,tipo,sincronizado) VALUES ("' + ide + '", "' + pnombre + '", "' + ptelefono + '", "' + pcorreo + '", "' + pcorreo + '", "' + pincidencia + '", "' + pdescripcion + '", "' + platitud + '", "' + plongitud +'")');
              //  tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
                msg = '<p>Se guardo correctamente.</p>';
                document.querySelector('#status').innerHTML = msg;



            })


            //agregando evento Ajax
            $.ajax({
           
                         type: "GET",
                    url: "https://implementta.net/andro/AppIncidencias.aspx?query=sp_CargaIncidencia%20%27Edu1%27,%27edu.revilla.vaquero@gmail.com%27,%2712345%27,2,%27descr%27,1,%27195252%27,%27-5252525%27,%272018/01/01%27",
                            crossDomain: true,
                                cache: false,
                                    contentType: "application/json; charset=utf-8",
                                        async: false,
                                            dataType: "JSON",
                                            success: function (result) {
                                                $.each(result,function(i, field) {
                                                    insert = field.id;  });
                    //if (result.d != null) {
                    //    insert = result.d;
                    //}

                                                if (insert != "") {

                        //var pnombre = document.getElementById("txtnombre").value;
                        //var ptelefono = document.getElementById("txttelefono").value;
                        //var pcorreo = document.getElementById("txtcorreo").value;
                        //var pincidencia = document.getElementById("tipoincidencia").selectedIndex;

                        //var pdescripcion = document.getElementById("txtDescripcion").value;


                        document.getElementById("txtnombre").value = "";
                        document.getElementById("txttelefono").value = "";
                        document.getElementById("txtcorreo").value = "";
                        document.getElementById("tipoincidencia").selectedIndex = "0";
                    
                        document.getElementById("txtDescripcion").value = "";
                      ///  document.getElementById("txtFechaNac").value = "";
                        $("#divRegistro").html("Registro creado satisfactoriamente!");
                    } else {
                        $("#divRegistro").html("Error al registrar el usuario!");
                    }
                },
                error: function (result) {
                    alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
                }
            });
        }
    }


    ///sql
    function sqlite() {

     //   var db = openDatabase('Database', '1.0', 'Alcaldes', 2 * 1024 * 1024);/// esta 
        var db = window.openDatabase("Database", "1.0", "Alcaldes", 200000);//esta sirve para los select 
        db.transaction(populateDB, errorCB, successCB);

      
      //  var url = "incidencia.html";
     //   $(location).attr('href', url);
    }



    function populateDB(tx) {
        ///select 
      //  db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM id_incidencias1', [], function (tx, results) {
                var len = results.rows.length, i;
                msg = "<p>Found rows: " + len + "</p>";
                document.querySelector('#status').innerHTML += msg;

                for (i = 0; i < len; i++) {
                    var ide = results.rows.item(i).id
                    msg = "<p><b>" + results.rows.item(i).id + "</b></p>";
                    document.querySelector('#status').innerHTML += ide;
                }
            }, null);
      //  }); 



        ////insert
        //   var lat = document.getElementById("txtLat").value;
        //var lng = document.getElementById("txtLon").value;
        //tx.executeSql('DROP TABLE IF EXISTS id_incidencias1');

        //tx.executeSql('CREATE TABLE   IF NOT EXISTS id_incidencias1 (id ,latitud  ,longitud  )');
  

        //var today = new Date();
        //var dd = today.getDate();
        //var mm = today.getMonth() + 1; //January is 0!
        //var h = today.getHours();
        //var m = today.getMinutes();
        //var s = today.getSeconds();
        //var yyyy = today.getFullYear();
        //if (dd < 10) {
        //    dd = '0' + dd;
        //}
        //if (mm < 10) {
        //    mm = '0' + mm;
        //}
        //var today = yyyy + '/' + mm + '/' + dd + '' + h + ':' + m + ':' + s;
        //var id = today + '' + lat + '' + lng
        ////  var d = new Date();
        ///////DELETE ANTES DE INSERTAR 
        ////// EL ID SERA LA LATITUD LONGITUD Y FECHA HOY 
        //tx.executeSql(`INSERT INTO id_incidencias1 VALUES("${id}","${lat}","${lng}")`);



        //console.log(`INSERT INTO id_incidencias1 VALUES("${id}","${lat}","${lng}") `);
      

    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: " + err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }

})();