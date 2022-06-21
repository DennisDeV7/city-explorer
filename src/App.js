import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      value: ''
    };
  }

  render() {

    return( 
      <>
        <h1>Test</h1>
        <form>
          <button>Button</button>
        </form>
      </>
    )  
  };
}

export default App;
