import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'
import {Link} from 'react-router-dom'
class Home extends React.Component {
    state={
        application:[]
    }
    componentDidMount(){
        if(!window.localStorage.getItem('application_data')){
            window.location.href='/login'
        }
        Axios.get('/all')
        .then(res=>{
            this.setState({application:res.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }
     delete=(id)=>{
        Axios.get('/delete/'+id)
        .then(res=>{
            console.log(res.data)
            Axios.get('/all')
            .then(res=>{
                this.setState({application:res.data})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className="col-md-8 offset-md-2 mb-5 ">
                {this.state.application.length<1?
                <Card className="mt-5">
                    <CardContent>
                        <h2 className="text-center">No application added yet !</h2>
                    </CardContent>
                </Card>:""
                }
                {
                    this.state.application.map(single=>{
                        return(

                            <Card  className="mt-5">
                            <CardActionArea>
                                <CardContent>
                                <Typography gutterBottom variant="h3" component="h2">
                                    {single.title}
                                </Typography>
                                <div>
                                    <img style={{maxWidth:'70%'}}  src={`../uploads/${single.img}`?require(`../uploads/${single.img}`):'not existing'}/>
                                </div>
                                <Typography variant="body2" color="textSecondary" className="mt-4" component="p">
                                    <h5>Description : </h5>
                                    <p style={{fontSize:'18px'}}> {single.description} </p>
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary"><Link to={`/edit?id=${single._id}&id=${single._id}`}><span>Edit</span></Link></Button>
                                <Button size="small" color="primary" onClick={this.delete.bind(this, single._id)}><span>Delete</span></Button>
                            </CardActions>
                        </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default Home