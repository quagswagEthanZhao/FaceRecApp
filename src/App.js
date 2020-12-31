import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Nevigation/Nevigation';
import ImageForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './FaceRecognition/FaceRecognition';
import Sgnin from './components/Signin/Sgnin';
import Register from './components/Register/Register';


const particlesConfig = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '4f934b77a6f94da9990924561e8667c8'
});
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      userStatus: 'signin',
      isSignedIn: false,
      currentUser: {}
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(console.log)
  //     .catch(error => console.log(error));
  // }
  onDisplayFaceBox = (box) => {
    console.log(box);
    this.setState({ box });
  }

  onCalculateFaceLocation = (data) => {
    const clarifaiFaceRegion = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    // console.log(image);
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFaceRegion.left_col * width,
      topRow: clarifaiFaceRegion.top_row * height,
      rightCol: width - (clarifaiFaceRegion.right_col * width),
      bottomRow: height - (clarifaiFaceRegion.bottom_row * height)
    }
  }

  onInputChange = (event) => {
    // console.log(`OnInputChange: ${event.target.value}`);
    const input = event.target.value;
    this.setState({ input });
  }

  onDetectClick = () => {
    // console.log(`Clicked with input ${this.state.imageUrl}`);
    if (this.state.imageUrl.length > 0) {
      this.setState({ imageUrl: this.state.input });
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(response => {
          // console.log('hi', response.outputs[0].data.regions[0].region_info.bounding_box);
          this.onDisplayFaceBox(this.onCalculateFaceLocation(response))
        })
        .catch(error => console.log(error.message));
    }

    fetch('http://localhost:3000/users/updateEntries', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.currentUser.id
      })
    }).then(response => response.json()).then(data => this.setState({ currentUser: data.currentUser }))



  }

  onUserStatusChange = (value) => {
    if (value === 'home') {
      this.setState({ isSignedIn: true })
    } else if (value === 'signin') {
      this.setState({ isSignedIn: false })
    }
    this.setState({ userStatus: value });
  }
  getCurrentUser = (user) => {
    this.setState({ currentUser: user });
  }
  // onUserUpdateDetect = () => {
  //   fetch('http://localhost:3000/signin', {
  //     method: 'put',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: {
  //       id: this.state.currentUser.id
  //     }
  //   }).then(response => response.json()).then(data => console.log(data.currentUser))
  // }
  render() {
    return (
      <div className="App" >
        <Particles
          className='particals'
          params={particlesConfig} />
        <Navigation userStatusChange={this.onUserStatusChange} isSignedIn={this.state.isSignedIn} />
        { this.state.userStatus === 'home'
          ? <div> <Rank currentUser={this.state.currentUser} />
            <ImageForm userUpdateDetect={this.onUserUpdateDetect} inputChange={this.onInputChange} detectClick={this.onDetectClick} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
          : (
            this.state.userStatus === 'signin'
              ? <Sgnin getCurrentUser={this.getCurrentUser} userStatusChange={this.onUserStatusChange} />
              : <Register userStatusChange={this.onUserStatusChange} />
          )

        }
      </div>
    );
  }
}

export default App;
