import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import {Component} from 'react';
//import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
//import axios, * as others from 'axios';




//const app= new Clarifai.App({
 // apiKey:'43bacb11611e40eeabddeda2bcf11fd8'

//});
//This is test
const PAT='57302919f3ba46d1a4d1511069947822'
//const USER_ID = 'sandeepgaur98223';       
//const APP_ID = 'firstapp';
const MODEL_ID = 'face-detection';

class App extends Component {

constructor(){
  super();
  this.state={
    input:'',
    imageUrl:'',
    box:{},
    route:'SignIn',
    isSignedIn:false
  }
}

onInputChange=(event)=>{
  console.log(event.target.value);
  this.setState({input:event.target.value})
}

calculateFaceLocation=(data)=>{
const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
const image=document.getElementById('inputimage');
const width=Number(image.width);
const height=Number(image.height);
//console.log(clarifaiFace);

return{
leftcol: clarifaiFace.left_col*width,
toprow:clarifaiFace.top_row*height,
rightcol:width-(clarifaiFace.right_col*width),
bottomrow:height- (clarifaiFace.bottom_row*height)
}

}


displayFaceBox=(box)=>{
  this.setState({box:box});
}


onButtonSubmit=()=>{
 
this.setState({imageUrl:this.state.input})

console.log(this.state.imageUrl);

 //console.log(this.state.input)
const raw = JSON.stringify({
  "user_app_id": {
    "user_id": "clarifai",
    "app_id": "main"
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": this.state.input
              }
          }
      }
  ]
});

console.log(raw);

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id
//6dc7e46bc9124c5c8824be4822abe105

fetch("https://api.clarifai.com/v2/models/"+MODEL_ID+"/outputs", requestOptions)
    .then(response => response.json())
    .then(result =>this.displayFaceBox(this.calculateFaceLocation(result)) )
    .catch(error => console.log('error', error));
  
}

onRouteChange=(route)=>{
   this.setState({route:route});
  if(route==='home')
  {
    this.setState({isSignedIn:true})
  }
  else 
  {
     this.setState({isSignedIn:false})
  }

}

render(){
  return (
    <div className="App">
    <ParticlesBg type="cobweb" bg={true} />
    
    <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>

    {
      this.state.route === 'SignIn'
      ? <SignIn onRouteChange={this.onRouteChange}/>
      : (
        this.state.route==='Register'
        ?<Register onRouteChange={this.onRouteChange}/>
        :<div>
          <Logo />
          <Rank />
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />

          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
        )

    }  
    </div>
  );
}

}

export default App;
