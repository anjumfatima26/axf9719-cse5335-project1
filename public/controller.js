//With Angular 1.3+ you can no longer use global controller declaration on the global scope(Without explicit registration).
// You would need to register the controller using module.controller syntax.
angular.module('myApp', []).controller('storeCtrl', storeCtrl);

function storeCtrl($scope,$http){


    $scope.find = function(){
        console.log("clicked");
        console.log($scope.location);
        $http.post("/stores",$scope.location).success(
            function(response){});
        $http.get("/stores").success($scope.renderStores);

    };


    $scope.renderStores=function(response)
    {
        $scope.stores=response;

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(38,-97),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        console.log("marker length:"+ $scope.markers.length);


        var createMarker = function (info){

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.Lat, info.Lon),
                company: info['Company Name'],
                address: info['Address 1'],
                city: info['City'],
                zip: info['Zip'],
                phone: info['Phone']

            });

            marker.content = '<div class="infoWindowContent">' + info['Address 1'] + '<br />' + info.City + '<br />'+ info.Zip + '<br />'+info.Lat + ' N,' + info.Lon +  ' W, </div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + info['Company Name'] + '</h2>' +
                    marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);


        }

        for (i = 0; i <= $scope.stores.length; i++){

            createMarker($scope.stores[i]);
        }


    };


    $scope.openInfoWindow = function(e, selectedMarker){
        console.log("link clicked");
        console.log(selectedMarker);
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }



};

