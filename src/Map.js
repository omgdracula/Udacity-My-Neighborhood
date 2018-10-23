import React, {Component} from 'react'
import './App.css'

class Map extends Component{

//make sure component did mount then initialize initMap
componentDidMount(){
  window.initMap = this.initMap
//load URL to Google API through loadJS function at the bottom.
//React has issues asyncrously loading URLs so we will need a function
//defined out of the scope of React for this path to load
  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDb21Y4NkoQCbutn0PtiwLBFFWDKdFTWiA&callback=initMap')
}

//initialize the map along with the markers
initMap = (map) => {
  var self = this
  //must define the google namespace
  const google = window.google
  const getMap = document.getElementById('map')
  getMap.style.height = window.innerHeight + "px"
//set the map using exact lat and lng props passed from the App.js component 
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.4975107, lng: -81.7760709},
    zoom: 11,
    mayTypeControl: false
  });

//grab reference to all markers in the state
  const allLocations = this.props.locations
  const locationMarkers = this.props.locationMarkers
  //create info window for markers
  const inforWindow = new google.maps.InfoWindow({
    className: "infoWindow"
  })

  this.props.infoWin(inforWindow)

  for (let i = 0; i < allLocations.length; i++){
    // console.log("State", this.state.markers);
    var position = allLocations[i].location
    var title = allLocations[i].name
    var address = allLocations[i].address
//define the position where the marker will drop
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      display: true,
      address: address,
      animation: google.maps.Animation.DROP,
      id: 1
    })
    //create a new array to push all markers into then 
    //set the new state of the markers 
      locationMarkers.push(marker)
      // console.log(locationMarkers)
      //add listener to each marker to open the info window
      //at each marker
      marker.addListener('click', function(){
        self.props.openInfoWin(this)
      })

      //makes sure location markers array length is 5 before marker state is updated
      if(locationMarkers.length >= 5){
        this.props.gatherMarkers(locationMarkers)
      }
  }
  
}

	render(){
    // console.log("Props", this.props)
   
		return(  
			 <div id={this.props.id}></div>
		)
	}
}

export default Map;

function loadJS(src){
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function(){
      document.write("Sorry but Google Maps Cannot Be Loaded Right Now")
    };
    ref.parentNode.insertBefore(script, ref);
}