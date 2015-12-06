Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render(<Main />, document.getElementById("render-target"));
});