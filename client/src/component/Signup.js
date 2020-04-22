import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import axios from 'axios'
import { Link } from 'react-router-dom';

class Sighup extends React.Component {
    state={
        name:'',
        email:'',
        contactnumber:'',
        description:'',
        password:'',
        massage:'',
        errorLog:{},
        file:'',
        fileName:''
    }
  changeHandler=(event)=>{
    event.preventDefault()
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  choose=()=>{
    var file=document.getElementById('file')
    file.click()
  }
  fileChoose = (event)=>{
    this.setState({
        file:event.target.files[0],
        fileName:event.target.files[0].name
    })
  }
  submitHandler=(event)=>{
      let  formData= new FormData()
      formData.append('email',this.state.email)
      formData.append('password',this.state.password)
      formData.append('name',this.state.name)
      formData.append('contactnumber',this.state.contactnumber)
      formData.append('description',this.state.description)
      formData.append('file', this.state.file)
        axios.post('/signup',formData)
        .then(res=>{
            console.log(res.data)
            this.setState({massage:res.data.massage})
        })
        .catch(err=>{
            if(err.response){
                this.setState({errorLog:err.response.data})
            }
        })
    }
    componentDidMount(){
        window.localStorage.removeItem('application_data')
    }
    render(){
        return(
            <div className="col-md-6 offset-md-1">
                {this.state.massage?
                <Card className="mt-5">
                    <CardActionArea>
                        <CardContent>
                            <h1 className="text-center"> {this.state.massage} </h1>
                            <Link className="text-center" to='/login'>Go to login</Link>
                        </CardContent>
                    </CardActionArea>
                </Card>:
                <Card  className="mt-5">
                    <CardActionArea>
                        <CardContent>  
                            <form className="form">
                                <h2 className="text-center"></h2>
                                <b className="text-warning"> {this.state.errorLog.massage?<p>{this.state.errorLog.massage}</p>:''} </b>
                                <b className="text-warning"> {this.state.errorLog.name?<p>{this.state.errorLog.name}</p>:''} </b>
                                <b className="text-warning"> {this.state.errorLog.email?<p>{this.state.errorLog.email}</p>:''} </b>
                                <b className="text-warning"> {this.state.errorLog.contactnumber?<p>{this.state.errorLog.contactnumber}</p>:''} </b>
                                <b className="text-warning"> {this.state.errorLog.description?<p>{this.state.errorLog.description}</p>:''} </b>
                                <b className="text-warning"> {this.state.errorLog.password?<p>{this.state.errorLog.password}</p>:''} </b>
                                <b className="text-warning"> {this.state.errorLog.file?<p>{this.state.errorLog.file}</p>:''} </b>
                                <p className="text-warning"> {this.state.massage} </p>
                                <div className='text-center'>
                                    <input onChange={this.fileChoose} id="file" style={{display:'none'}} type="file" />
                                    <img onClick={this.choose} id="choose" style={{borderRadius:'100%', maxWidth:'100px'}} src={require('./image/camera.jpg')} />
                                    <p className="text-center"> {this.state.fileName?this.state.fileName:"Select Profile Picture"} </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Input onChange={this.changeHandler} className="form-control mt-3" placeholder="Name" name="name" value={this.state.name} />
                                    </div>
                                    <div className="col-md-6">
                                        <Input onChange={this.changeHandler} className="form-control mt-3" placeholder="Email" name="email" value={this.state.email} />
                                    </div>
                                </div>
                                <textarea 
                                    rows="5" 
                                    onChange={this.changeHandler}
                                    className="form-control mt-3" 
                                    placeholder="Description" 
                                    name="description" 
                                    value={this.state.description} 
                                />
                                <div className="row">
                                    <div className="col-md-6">
                                        <Input onChange={this.changeHandler} className="form-control mt-3" placeholder="Contact Number" name="contactnumber" value={this.state.contactnumber} />
                                    </div>
                                    <div className="col-md-6">
                                        <Input onChange={this.changeHandler} className="form-control mt-3" placeholder="Password" type="password" name="password" value={this.state.password} />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.submitHandler}>Submit</Button>
                        <Link to ='/login'>Go to Login</Link>

                    </CardActions>
                </Card>}
            </div>
        )
        
    }
}

export default Sighup