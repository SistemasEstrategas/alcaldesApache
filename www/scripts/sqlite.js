jQuery(document).ready(function () {
    // se une el envío de formularios y campos para el motor de validación
    jQuery("#formID").validationEngine();
});


(function () {
    "use strict";
    //sqwlite
    //document.addEventListener("deviceready", onDeviceReady, false);
    //
    var myDB;

    window.addEventListener('load', getDatos, false);

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    // getDatos
    function onDeviceReady() {
        jQuery(document).ready(function () {
            // se une el envío de formularios y campos para el motor de validación
            jQuery("#formID").validationEngine();
        });

        $('#btnMostrarMapa').click
            
            (sqlite);
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
        // getDatos
    };



    ///sqlite 
    function populateDB(tx) {


        //// EL ID SERA LA LATITUD LONGITUD Y FECHA HOY 
        ///


        ///  var nombre = "Juan";
        //  console.log(`¡Hola ${nombre}!`);
        var lat = document.getElementById("txtLat").value;
        var lng = document.getElementById("txtLon").value;
        tx.executeSql('DROP TABLE IF EXISTS id_incidencias1');

        tx.executeSql('CREATE TABLE   IF NOT EXISTS id_incidencias1 (id ,latitud  ,longitud  )');
        // tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        // var saludo = `¡\`Hola\` Mundo!`;
        //  tx.executeSql(`INSERT INTO id_incidencias1 VALUES("17","${lat }","${lng }")`);


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
        var id = today + '' + lat + '' + lng
        //  var d = new Date();
        /////DELETE ANTES DE INSERTAR 
        //// EL ID SERA LA LATITUD LONGITUD Y FECHA HOY 
        tx.executeSql(`INSERT INTO id_incidencias1 VALUES("${id}","${lat}","${lng}")`);


        ////PANTALLA 2 

        // tx.executeSql('CREATE TABLE  if not exists incidencias1  (id  TEXT NOT NULL PRIMARY KEY ,nombre    TEXT,telefono  TEXT,correo   TEXT,tipoIncidencia INTEGER,descripcion  TEXT, idplaza  INTEGER,latitud  TEXT,longitud TEXT, fechaCaptura  TEXT, tipo INTEGER NOT NULL DEFAULT 1, sincronizado   INTEGER NOT NULL DEFAULT 0 )')




        // tx.executeSql(`INSERT INTO id_incidencias1 VALUES("${id}","${lat}","${lng}") `);
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');

        console.log(`INSERT INTO id_incidencias1 VALUES("${id}","${lat}","${lng}") `);
        // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');


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

    function sqlite() {
        var url = "sqlite.html";
        $(location).attr('href', url);

        var db = window.openDatabase("Database", "1.0", "Alcaldes", 200000);
        db.transaction(populateDB, errorCB, successCB);

        // navigator("sqlite.html")

    }
    ////
    function getDatos() {




        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            maximunAge: 300000,
            timeout: 10000,
            enableHighAccuracy: true
        });
    }

    function onSuccess(position) {
        var cusLat = position.coords.latitude;
        var cusLon = position.coords.longitude;

        document.getElementById("txtLat").value = cusLat;
        document.getElementById("txtLon").value = cusLon;
        initialize()

        //  try {
        //      var coords = new google.maps.LatLng(cusLat, cusLon);

        //      var opciones = {
        //          center: coords, zoom: 15
        //      };

        //      var mapa = new google.maps.Map(document.getElementById("map"), opciones);
        //      var marcador = new google.maps.Marker({
        //          position: coords,
        //          map: mapa,
        //          title: "Mi ubicación",
        //          animation: google.maps.Animation.DROP,
        //           draggable:true
        //      });


        //      google.maps.event.addListener(marker, 'dragend', function (event) {
        //          document.getElementById("txtLat").value = this.getPosition().toString();
        //      });

        //      var latlng = marker.getPosition();
        //      document.getElementById("txtLat").value = latlng.latitude;
        //      document.getElementById("txtLon").value = latlng.longitude;


        //      var content = `
        //<div id="myid"  class="item item-thumbnail-left item-text-wrap">
        //  <ion-item>
        //    <ion-row>
        //      <h6>`+ marcador.title + `</h6>
        //    </ion-row>
        //  </ion-item>
        //</div>
        //`
        //          ;
        //      this.addInfoWindow(marcador, content);
        //      marker.setMap(this.mapa);

        //  }
        //  catch (err) {
        //      console.log(err.message);
        //  }
    }

    var map;
    function initialize() {
        var cusLat = document.getElementById("txtLat").value;
        var cusLon = document.getElementById("txtLon").value;

        // document.getElementById("txtLat").value = cusLat;
        // document.getElementById("txtLon").value = cusLon;

        //  try {
        var coords = new google.maps.LatLng(cusLat, cusLon);

        var opciones = {
            center: coords, zoom: 15
        };

        //  var mapa = new google.maps.Map(document.getElementById("map"), opciones);
        map = new google.maps.Map(document.getElementById('map'), opciones);

        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            draggable: true/// marcADOR MOVIBLE 

        });


        //FUNCION PARA OBTENER LA LATITUD Y LONG 
        google.maps.event.addListener(marker, 'dragend', function (event) {
            //  document.getElementById("txtLon").value = this.getPosition().toString();
            //    document.getElementById("txtLat").value = this.getPosition().lat() + "," + this.getPosition().lng();

            document.getElementById("txtLat").value = this.getPosition().lat();
            document.getElementById("txtLon").value = this.getPosition().lng();
        });
        //   document.getElementById("txtLat").value=this.getPosition();
        //  document.getElementById("txtLon").value = this.getPosition.longitude;
        //  });
    }


    //  google.maps.event.addDomListener(window, 'load', initialize);
    function onError(err) {
        console.log("codigo de err:" + err.code + "  msj=" + err.message);
    }
})();