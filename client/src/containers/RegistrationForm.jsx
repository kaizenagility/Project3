import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import ProfileController from '../components/ProfileController';
import Home from './Home';

class RegistrationForm extends React.Component{
  constructor(){
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
      cycle: '',
      aboutme: '',
      studentRegistered: false,
      redirectPath: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitEditForm = this.submitEditForm.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  submitEditForm(e, data){
    e.preventDefault();
    fetch(`/api/students/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(jsonRes => {
      console.log(jsonRes)
      this.setState({
        studentRegistered: true,
        redirectPath: `student/${jsonRes.data.student.email}`,
      })
    })
  }

  render(){
    return(
      <Router>
        <div>
          {this.state.studentRegistered === false ?
            (<div className = 'reg_form_container'>
              <form className = 'reg_form' onSubmit = {(e => this.submitEditForm(e, this.state))} >
                <input className='reg_input' type = 'text' name = 'first_name' placeholder = 'First Name' value = {this.state.first_name} onChange = {this.handleInputChange} />
                <input className='reg_input' type = 'text' name = 'last_name' placeholder = 'Last Name' value = {this.state.last_name} onChange = {this.handleInputChange} />
                <input className='reg_input' type = 'text' name = 'email' placeholder = 'Email' value = {this.state.email} onChange = {this.handleInputChange} />
                <input className='reg_input' type = 'password' name = 'password_digest' placeholder = 'Password' value = {this.state.password_digest} onChange = {this.handleInputChange} />
                <input className='reg_input' type = 'text' name = 'phone' placeholder = 'Phone Number' value = {this.state.phone} onChange = {this.handleInputChange} />
                <input className='reg_input' type = 'text' name = 'cycle' placeholder = 'Cohort Name' value = {this.state.cycle} onChange = {this.handleInputChange} />
                <input className='reg_input' type = 'text' name = 'aboutme' placeholder = 'Tell me about yourself' value = {this.state.aboutme} onChange = {this.handleInputChange} />
                <input className='reg_input' type = 'hidden' name = 'ispriority' value = {false} />
                <input className='reg_submit' type="submit" />
              </form>
            </div>)
          : (<div>
              <Redirect push to={this.state.redirectPath} />
            </div>)}
        </div>
      </Router>
    )
  }
}

export default RegistrationForm
