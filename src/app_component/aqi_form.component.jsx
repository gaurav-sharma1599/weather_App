import React from "react";
import "./form.style.css";

const Formaqi = (props) => {
  return (
    <div className="container">
      <div>{props.error ? error() : null}</div>
    
      <nav className="navbar navbar-light bg-light">
  <h2 className="navbar-brand">AQI</h2>
  <form onSubmit={props.loadaqi} className="force-inline">
  <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="latitude"
              placeholder="latitude"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="longitude"
              placeholder="longitude"
              autoComplete="off"
            />
          </div>
            <button className="btn btn-warning" onClick="changeBg()">Get AQI</button>
        </div>
      </form>
</nav>

    </div>
  );
};

function error() {
  return (
    <div className="alert alert-alert mx-5" role="alert">
      Please enter Latitude and Longitude.
    </div>
  );
}
export default Formaqi;
