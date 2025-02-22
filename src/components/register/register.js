import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../actions/authActions";
import classnames from "classnames";
import {ButtonToggle, Form, FormGroup } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
class Register extends Component {
    constructor(props) {
        super(props);
        this.submit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            email: "",
            address: "",
            phone_number: "",
            password: "",
            password2: "",
            role: "",
            errors: {}
        }
    }
    componentDidMount() { // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/landingPage");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    check = e =>{
        console.log(this.state.role);
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone_number: this.state.phone_number,
            password: this.state.password,
            password2: this.state.password2,
            role: this.state.role
        };

        this.props.registerUser(newUser, this.props.history);
        /*
axios.post('http://localhost:5000/routes/users/register', newUser)
    .then(res=>{
      console.log(res.data)
      if(res.data === "User added!"){
        window.location = '/home';
      }
      else{
        window.location = '/register';
      }
    })
    */
        console.log(newUser);

    };


    render() {
        const {errors} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/home" className="btn-flat waves-effect">
                        <i className="material-icons left already">Back Home</i>      
                        </Link>
                            <h2 className="text-center">
                                <b>Register </b>
                                 with us
                            </h2>
                        <Form className="sign-up-form" noValidate
                            onSubmit={
                                this.onSubmit
                        }>
                            <FormGroup>
                                <label htmlFor="name">Name</label>
                                <br />
                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.name
                                    }
                                    error={
                                        errors.name
                                    }
                                    id="name"
                                    type="text"
                                    placeholder="Your Full Name"
                                    className={
                                        classnames("", {invalid: errors.name})
                                    }/>
                                <span className="red-text">
                                    {
                                    errors.name
                                }</span>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="email">Email</label>
                                <br />
                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.email
                                    }
                                    error={
                                        errors.email
                                    }
                                    id="email"
                                    type="email"
                                    className={
                                        classnames("", {invalid: errors.email})
                                    }/>
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="address">Address</label>
                                <br />
                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.address
                                    }
                                    error={
                                        errors.address
                                    }
                                    id="address"
                                    type="address"
                                    className={
                                        classnames("", {invalid: errors.email})
                                    }/>
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="phone_number">Phone Number</label>
                                <br />
                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.phone_number
                                    }
                                    error={
                                        errors.phone_number
                                    }
                                    id="phone_number"
                                    type="phone_number"
                                    className={
                                        classnames("", {invalid: errors.phone_number})
                                    }/>
                            </FormGroup>


                            <FormGroup>
                                <label htmlFor="password">Password</label>
                                <br />
                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.password
                                    }
                                    error={
                                        errors.password
                                    }
                                    id="password"
                                    type="password"
                                    className={
                                        classnames("", {invalid: errors.password})
                                    }/>
                                <span className="red-text">
                                    {
                                    errors.name
                                }</span>
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="password2">Confirm Password</label>
                                <br />
                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.password2
                                    }
                                    error={
                                        errors.password2
                                    }
                                    id="password2"
                                    type="password"/>
                                <span className="red-text">
                                    {
                                    errors.name
                                }</span>
                            </FormGroup>


                            <FormGroup>
                                <label htmlFor="role">Who are You?</label>
                                <br />
                                <select value={this.state.role} id = "role" onChange={this.onChange}>
                                    <option>Please select an option</option>
                                    <option value="student">Student</option>
                                    <option value="admin">Admin</option>
                                    <option value="Raeisi">Dr. Raeisi</option>
                                </select>
                            </FormGroup>
                                <br/>
                            <Button className="btn-block" variant="outline-success" type="submit">
                                {'Sign Up'} </Button>
                            <div className="text-center">
                                Already have an account? <Link className="already" to="/login"> Log in</Link>
                            </div>
                        </Form>
                        <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                    </div>
                </div>
            </div>
        );
    }
} Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth, errors: state.errors});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
