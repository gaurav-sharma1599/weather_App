import React from "react";
import "./form.style.css";

const Aqi = (props) => {
  return (
    <div className="container text-dark">
        <div className="cards pt-4">
            <div className="description-color"> 
                <div className="row">
                  <div className="col-md-2 offset-4 pt-3 level_color">
                    <h2 className="description py-2">{props.AQI}</h2>
                  </div>
                  <div className="col-md-2 pt-3 level_clr">
                    <h2 className="ml-4 p-2">{props.levels}</h2> 
                  </div>
                </div>
            </div>
            <div>
              <table>
                <tr>
                  <th>o3</th>
                  <th>SO<sub>2</sub></th>
                  <th>NO<sub>2</sub></th>
                  <th>co</th>
                  <th>pm2.5</th>
                  <th>pm10</th>
                </tr>
                <tr>
                  <td>{props.o3}</td>
                  <td>{props.so2}</td>
                  <td>{props.no2}</td>
                  <td>{props.co}</td>
                  <td>{props.pm25}</td>
                  <td>{props.pm10}</td>
                </tr>
              </table>
            </div>
           <br></br>
           <p><strong>*Note. All units are in µg/m³</strong></p>
           
        </div>
    </div>
  );
};



export default Aqi;
