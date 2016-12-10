var app = angular.module('dabc', []);

app.controller( "readfileController", function( $scope, $window, $http) {
    $http.get('/site/data.txt')
        .then(function(response) {
            var allText = response.data;
            var data = allText.split('\r\n');

            var objeto = {
                "ciudades": []
            };

            for (var i = 0; i < data.length; i++) {

                var split = data[i].split(" / "),
                    firstLVL;

                if( (split.length - 1) < 1) {
                    firstLVL = split[0];

                    objeto.ciudades.push({
                        "code": firstLVL.split(" ")[0],
                        "name": firstLVL.split(" ")[1],
                        "provincias": []
                    })
                }
            }

            for (var ii = 0; ii < data.length; ii++) {

                var splitt = data[ii].split(" / "),
                    secondLVL;

                if( (splitt.length - 1) === 1){
                    secondLVL = splitt;

                    for (var j = 0; j < objeto.ciudades.length; j++) {
                        for (var x = 0; x < objeto.ciudades.length; x++) {
                            if (objeto.ciudades[j].code == secondLVL[x].split(" ")[0]) {
                                objeto.ciudades[j].provincias.push({
                                    "code": secondLVL[1].split(" ")[0],
                                    "name": secondLVL[1].split(" ")[1],
                                    "distritos": []
                                })
                            }
                        }
                    }
                }
            }

            for (var iii = 0; iii < data.length; iii++) {

                var split3 = data[iii].split(" / "),
                    thirdLVL;

                if( (split3.length - 1) === 2){
                    thirdLVL = split3;

                    for (var jj = 0; jj < objeto.ciudades.length; jj++) {
                        for (var zz = 0; zz < thirdLVL.length; zz++) {
                            if (objeto.ciudades[jj].code == thirdLVL[zz].split(" ")[0] &&
                                objeto.ciudades[jj].provincias[zz].code == thirdLVL[zz+1].split(" ")[0]) {
                                if(thirdLVL[zz+2].split(" ")[2] === undefined){
                                    objeto.ciudades[jj].provincias[zz].distritos.push({
                                        "code": thirdLVL[zz+2].split(" ")[0],
                                        "name": thirdLVL[zz+2].split(" ")[1]
                                    });
                                }else{
                                    objeto.ciudades[jj].provincias[zz].distritos.push({
                                        "code": thirdLVL[zz+2].split(" ")[0],
                                        "name": thirdLVL[zz+2].split(" ")[1] + ' ' + thirdLVL[zz+2].split(" ")[2]
                                    });
                                }
                            }
                        }
                    }
                }
            }
            $scope.data = objeto.ciudades;
        });
})