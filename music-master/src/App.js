import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        // const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        var accessToken = 'BQDt-WrKRlS4B-Rfl_V_CkN0Js3oTTW--W6qhl49K6yzNoW8Wq__C-XVKvWfdWcvmXLcFf1HigEm7RjE14fkcgswRC3Mt0FnKkgdRWHokAmHZIqGaQ1enoAKVl521YTGCfcl-bLUfhjRBN1YXS8H_oj4LmkV&refresh_token=AQBwEInndK5HWb3qaOui7PQoeQgmwWPAgsQhvcM5lggQlfGovQ0KoAeyo6kt-RB_vaOOzGkSkiOkQhxFN9IpwDxD-pjl_-B4Y5wpOkQnhUnhb5DRXBmGjE2ESgyyPbUNlls';
        var myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };



        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({ artist });

            })

    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                        ?
                        <div>
                            <Profile
                                artist={this.state.artist}
                            />

                            <div className="Profile">
                                <div>Artist Picture</div>
                                <div>Artist Name</div>
                            </div>
                            <Gallery 
                            tracks={this.state.tracks}
                            />
                        </div>

                        : <div></div>
                }
            </div>
        )
    }
}

export default App;