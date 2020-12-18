import React from "react";
import "./form.style.css";

const Form = (props) => {
  return (
    <div className="container">
      <div>{props.error ? error() : null}</div>
    
      <nav className="navbar navbar-light bg-light">
  <h2 className="navbar-brand">Weather App</h2>
  <form onSubmit={props.loadweather} className="force-inline">
  <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="city"
              placeholder="City"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="country"
              placeholder="Country"
              autoComplete="off"
            />
          </div>

            <button className="btn btn-warning">Get Weather</button>
        </div>
      </form>
</nav>

    </div>
  );
};

function error() {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please enter city and country.
    </div>
  );
}
export default Form;
