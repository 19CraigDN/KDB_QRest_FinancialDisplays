import React from 'react';
import axios from 'axios';



export default class QRest extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "5#select time, sym from trade",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            const persons = res.data.result;
            this.setState({ persons })
            console.log(persons);
        })
    }

    render() {
        return (
            <ul>
                { this.state.persons.map(person => <li>{person.sym}</li>)}
            </ul>
        )
    }
}