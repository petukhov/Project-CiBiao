Main = React.createClass({

  handleSubmit(event) {
    event.preventDefault();
    
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("processUrl", text, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log(result);
      }

      //create a table of characters here. 
    });
  },
  
  render() {
    return (
      <div className="row main-input">
        <form className="col s12"  onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s1"></div>
            <div className="input-field col s8">
              <input ref="textInput" placeholder="Paste in your link or text here" id="first_name" type="text"/>
            </div>
            <div className="input-field col s2">
              <button className="btn waves-effect waves-light go-button" type="submit" name="action">Go!</button>
            </div>
            <div className="input-field col s1"></div>
          </div>
        </form>
      </div>
    );
  }
});