import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FlightLog } from '../models/flight-log';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FlightMetrics } from '../models/flight-metrics';

@Injectable({
  providedIn: 'root'
})
export class FlightlogService {
  private env = environment;
  private flightLogUrl = this.env.serviceBase + "flightlog";

  constructor(
    private http: HttpClient
  ) { }


  
  findFlightLogs(request: any) : Observable<FlightLog[]> {
    let params = new URLSearchParams();

    for(let key in request){
      var val = request[key];
      
      if(val)
        params.set(key, val);
    }

    var url = this.flightLogUrl + "?" + params.toString();

    return this.http
      .get<FlightLog[]>(url)
      .pipe(
          map(data => data), 
          catchError(this.handleError)
      );
  }


  addLog(log: FlightLog) : Observable<FlightLog> {
    return this.http
      .post<FlightLog>(this.flightLogUrl, log)
      .pipe(
          map(data => data), 
          catchError(this.handleError)
      );
  }


  bulkAddFlights(logs: FlightLog[]) : Observable<any> {
    var url = this.env.serviceBase + "flightlog/bulk-entry";

    return this.http
      .post<FlightLog>(url, logs)
      .pipe(
          map(data => data), 
          catchError(this.handleError)
      );
  }


  loadCsvToJson(logs: string) : Observable<any> {
    var flightsArray = this.csvToJson(logs);

    console.log(flightsArray);

    return this.bulkAddFlights(flightsArray);
  }

  loadJsonStringToObjectArray(logs: string) : Observable<any> {
    var array = JSON.parse(logs);

    return this.bulkAddFlights(array);
  }

  getFlightMetrics() : Observable<FlightMetrics> {
    var url = this.env.serviceBase + "flightlog/metrics";

    return this.http
      .get<FlightMetrics>(url)
      .pipe(
          map(data => data), 
          catchError(this.handleError)
      );
  }

  
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    alert(res.error || res.body.error);

    return observableThrowError(res.error || 'Server error');
  }


  private csvToJson(csv:string) : FlightLog[] {
    var lines = csv.split("\n");
    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          var h = headers[j];

          switch(h) {
            case("droneId"):
            case("droneGeneration"):
              obj[h] = parseInt(currentline[j]);
              break;
            case("longitude"):
            case("latitude"):
              obj[h] = parseFloat(currentline[j]);
              break;
            default:
              obj[h] = currentline[j].replace(/['"]+/g, '');
              break;
          }
        }

        result.push(obj); 
    }

    return result;
  }

  private CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
  }

}
