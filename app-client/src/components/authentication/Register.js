import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
        errors: {}
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            ...this.state,
        };
        delete newUser['errors'];
        console.log(newUser);
        axios.post('/api/users/register', newUser)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Name"
                                           name="name" autoComplete="name" value={this.state.name}
                                           onChange={this.onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg"
                                           placeholder="Email Address" name="email" autoComplete="email"
                                           value={this.state.email} onChange={this.onChange}/>
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email.
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg"
                                           placeholder="Password" name="password" autoComplete="new-password"
                                           value={this.state.password} onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg"
                                           placeholder="Confirm Password" name="confirmedPassword"
                                           autoComplete="new-password" value={this.state.confirmedPassword}
                                           onChange={this.onChange}/>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;