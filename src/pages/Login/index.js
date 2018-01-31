import React from 'react';
import { login } from '../../api'
import { Modal , Button } from 'semantic-ui-react'

class Login extends React.Component {
  state = {
    username : '',
    password : '',
    open: false
  }
  onTextChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    //console.log(value)
    this.setState({
      [name]: value //ให้ทุกอันพิมพ์ได้
    })
  }

  onSubmit = event => {
    event.preventDefault() //no refresh
    //console.log('Submit')
    login(this.state.username, this.state.password)
       .then(data => {
        if (data.status === 200) {
            localStorage.setItem('username', this.state.username)    
            this.state.username === 'admin' ? (
                this.props.history.replace('/Crpdaz') //redirect
            ) : (
                this.props.history.replace('/') //redirect
            )
        } else {
            this.setState({ open: true , password: "" }) 
        }
      })
  }

  close = () => this.setState({ open: false })  

  render() {
    return (
        <div class="ui container basic segment">
            <div class="ui form segment grid login">
                <div className='column center aligned'>
                    <h2 className='ui teal header login'>Login</h2>
                    <form className='ui large form' onSubmit={this.onSubmit}>
                        <div className='ui stacked segment basic'>
                        
                            <div className='field'>
                                <div className='ui left icon input'>
                                <i className='user icon' />
                                <input 
                                    className='login'
                                    type='text' 
                                    name='username' 
                                    placeholder='Username' 
                                    value={this.state.username}
                                    onChange={this.onTextChange} />
                                </div>
                            </div>

                            <div className='field'>
                                <div className='ui left icon input'>
                                <i className='lock icon' />
                                <input 
                                    className='login'
                                    type='password' 
                                    name='password' 
                                    placeholder='Password' 
                                    value={this.state.password}
                                    onChange={this.onTextChange} />
                                </div>
                            </div>

                            <div className='field'>
                                <div className='ui left icon input'>
                                <button type='submit' className='ui teal fluid button notAdmin'>
                                    Log in
                                </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
            </div>
            <Modal size='mini' open={this.state.open}>
              <Modal.Header>
               Alert!
              </Modal.Header>
            <Modal.Content>
              <p>Username or Password is not match.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.close}>OK</Button>
              </Modal.Actions>
            </Modal>
        </div>
    );
  }
}

export default Login;
