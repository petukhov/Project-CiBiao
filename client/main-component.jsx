Main = React.createClass({

  getInitialState:function(){
    return{
      results: []
    }
  },

  handleSubmit(event) {
    event.preventDefault();
    
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    var self = this;

    self.setState({
      results: null
    });

    Meteor.call("processUrl", text, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log(result);
      }

      self.setState({
        results: result
      });
    });
  },
  
  render() {
    return (
      <div>
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
        <ResultsTable data={this.state.results}/>
      </div>
    );
  }
});

ResultsTable = React.createClass({
  render() {
    var rows=[];
    if(this.props.data) {
      this.props.data.forEach(function(character) {
        rows.push(<tr><td>{character.count}</td><td>{character.key}</td><td>{character.def}</td></tr>)
      });
      return(
        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>Character</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    } else {
      return(<div className="loader">Loading...</div>);
    }
  }
});