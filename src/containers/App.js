import React, { Component } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox';
import { robots } from '../robots';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
class App extends Component {
    constructor() {
        super()
        this.state = {
             robots: robots,
             searchfield: ''  
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => this.setState({robots:users}));
        
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value})
     
    }

    render() {  
        const { robots, searchfield } = this.state;
         const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
     return !robots.length ? 
     <h1>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                <CardList robots={filteredRobots}/>
                </ErrorBoundary>
                </Scroll>
            </div>
         );
    }  
}


export default App;
// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             robots: robots,
//             searchfield: ''
//         }
//     }
  
//     onSearchChange = (event) => {
//         console.log(event.target.value);
//        this.setState({ searchfield: event.target.value })
//     }

//     render() {
//         const filteredRobots = this.state.robots.filter(robots =>{
//             return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
//         }) 
//         return (
//             <div className='tc'>
//                 <h1>RoboFranz</h1>
//                 <SearchBox searchChange ={this.onSearchChange}/>
//                 <CardList robots={filteredRobots} />
//             </div>

//     );
//     }  
// }

// export default App;