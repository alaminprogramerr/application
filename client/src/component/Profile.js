import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import decoder from 'jwt-decode'
class Profile extends React.Component {
    state={
        user:{}
    }
    componentDidMount(){
        
        if(!window.localStorage.getItem('application_data')){
            window.location.href='/login'
        }
        let token =window.localStorage.getItem('application_data')
        var decoded = decoder(token)
        this.setState({user:{...decoded}})
    }
    logout=()=>{
        localStorage.removeItem('application_data')
        window.location.href='/login'
    }
    render(){
        return(
            <div className="col-md-4 offset-md-4">
                <Card  className="mt-5">
                    <CardActionArea>
                        <CardContent>
                            <div style={{textAlign:'center'}}> 
                            {console.log(this.state.user.img)}
                            {this.state.user.img?
                                <img style={{borderRadius:'50%'}} src={require(`../uploads/${this.state.user.img}`)}/>:''
                            }
                            </div>
                            <Typography variant="body2" color="textSecondary" className="mt-4" component="p">
                                <p style={{fontSize:'18px'}}>Name: {this.state.user.name} </p>
                                <p style={{fontSize:'18px'}}>Email: {this.state.user.email} </p>
                                <p style={{fontSize:'18px'}}>Contact Number: {this.state.user.contactnumber} </p>
                                <h6 style={{textDecoration:'underline',textAlign:'center'}}>About yours:</h6>
                                <p  style={{fontSize:'18px'}}> {this.state.user.description} </p>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small"  color="danger" onClick={this.logout}>Log Out</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default Profile