import React, { Component } from 'react';

class CreateListing extends Component {
    render() {
      return (
        <form className="form-horizontal">
          <div className="form-group">
            <label for="inputText" className="col-sm-2 control-label">Item</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputText" placeholder="Item" />
            </div>
          </div>
          <div className="form-group">
            <label for="inputText2" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputText2" placeholder="Description" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Submit</button>
            </div>
          </div>
        </form>
      )
    }

}

export default CreateListing;