import React from 'react'
import localStorage from 'localStorage'
import './Main.css'
import Navbar from './Navbar'

// import _ from 'lodash'
// import { publishPost, getAllPosts , getDepartment , getUserDepartment } from '../api'
// import CKEditor from 'react-ckeditor-wrapper'
// import { Divider , Dropdown, Container, Icon, Image, Menu, Sidebar, Responsive, Segment, Grid } from "semantic-ui-react"

class Main extends React.Component {
  render() {
    return (
      <div className='body'>
        <Navbar history={this.props.history}/>
      </div>
    )
  }
}

export default Main