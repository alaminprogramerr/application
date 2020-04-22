import React from 'react';
import { Card } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import decoder from 'jwt-decode'





export default class AllUser extends React.Component {
    constructor(){
        super()
        this.state={
            alluser:[]
        }
    }
    componentDidMount(){
        axios.get('/all-user')
        .then(res=>{
            this.setState({alluser:res.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    addBookmark=(bookmarkID)=>{
        let token =window.localStorage.getItem('application_data')
        var decodedToken = decoder(token)
        var userID= decodedToken.id
        axios.post('/add-bookmark',{userID:userID, bookmarkID:bookmarkID})
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    render(){
        return (
            <div className="col-md-8 offset-md-2 mt-5">
                <Card>
                <div className=''>
                    {
                        this.state.alluser.map(single=>{
                            return(     
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon style={{color:'#3c76d2'}} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography className="d-flex" style={{width:'100%', alignItems:'center'}} > 
                                        <img style={{maxWidth:'70px', borderRadius:'50%' , marginRight:'30px'}} src={require(`../uploads/${single.img}`)}/>
                                        {single.name}
                                        <div style={{marginLeft:'auto'}}>
                                            <span onClick={this.addBookmark.bind(this , single._id)}><BookmarkBorderIcon  style={{color:'#3c76d2'}} titleAccess="Add To Bookmark"/></span>
                                            <span><AssignmentIndIcon style={{color:'#3c76d2'}} titleAccess="Got To Profile"/></span>
                                            
                                        </div>
                                    </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Typography>
                                        {single.description}
                                    </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })
                    }
                    </div>
                </Card>
            </div>
        )
    }
}
