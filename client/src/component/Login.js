import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import {Link} from 'react-router-dom'
import axios from 'axios'
class Login extends React.Component {
    state={
        email:'',
        password:'',
        errorLog:''
    }
    
  componentDidMount(){
      window.localStorage.removeItem('application_data')
  }
  changeHandler=(event)=>{
    event.preventDefault()
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  submitHandler=(event)=>{
      const {email, password}=this.state
      axios.post('/login',{email, password})
      .then(res=>{
          console.log(res)
          localStorage.setItem('application_data',res.data)
          window.location.href='/home'
      })  
      .catch(err=>{
          console.log(err)
          if(err.response){
                this.setState({
                    errorLog:err.response.data.error
                })
          }
      })
    }
    render(){
        return(
            <div className="col-md-4 offset-md-4">
                <Card  className="mt-5">
                    <CardActionArea>
                        <CardContent>
                            <form >
                                <h3>Login Here</h3>
                                <b className="text-warning"> {this.state.errorLog?this.state.errorLog:''} </b>
                                <Input onChange={this.changeHandler} className="form-control mt-3" placeholder="Email" name="email" value={this.state.email} />
                                <Input onChange={this.changeHandler} className="form-control mt-3" placeholder="Password" type="password" name="password" value={this.state.password} />

                            </form>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.submitHandler}>Login</Button>
                        <Link className="ml-3" to ='/signup'>Go to Sign Up Page</Link>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default Login