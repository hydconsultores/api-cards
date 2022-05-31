import { Injectable } from "@nestjs/common";

@Injectable()
class UtilsGeoreferences{
    getDistanceInMetersFor(latitudeInit, longitudeInit, latitudeEnd, longitudeEnd) {
        var rad = function(x) {return x*Math.PI/180;}
        var R = 6378.137; //Radio de la tierra en km 
        var dLat = rad( latitudeEnd - latitudeInit );
        var dLong = rad( longitudeEnd - longitudeInit );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(latitudeInit)) * 
        Math.cos(rad(latitudeEnd)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      
        //aquí obtienes la distancia en metros por la conversion 1Km =1000m
        //var d = R * c * 1000; 
        var d = R * c * 1000; 
        return d ; 
    }
}

export  { UtilsGeoreferences } ;