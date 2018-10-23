import React, {Component} from 'react'
import './MapArea.css'

import Map from './Map'
import SearchArea from './SearchArea'

class MapArea extends Component{

state = {
		//set 5 destinations around Cleveland
  locations:[
    {
      name:"Rock & Roll Hall of Fame",
      location: {lat: 41.5003155, lng:-81.6913023},
      address: "1100 E 9th St, Cleveland, OH 44114"
    },
    {
      name:"Quicken Loans Arena",
      location: {lat: 41.4968623, lng:-81.6906582},
      address: "1 Center Ct Cleveland, OH 44115"
    },
    {
      name:"Progressive Field",
      location: {lat: 41.496211, lng:-81.6874229},
      address: "2401 Ontario St, Cleveland, OH 44115"
    },
    {
      name:"Cleveland Museum of Art",
      location: {lat: 41.508917, lng:-81.6138076},
      address: "11150 East Blvd, Cleveland, OH 44106"
    },
    {
      name:"Terminal Tower",
      location: {lat: 41.4982285, lng:-81.696364},
      address: "848 Public Square, Cleveland, OH 44113"
    }
  ],
  locationMarkers: [],
  isOpen: false,
  prevMarker: "",
  infoWindow: "",
  showSearchContents: true 
}
  gatherMarkers = (markersGathered) =>{
    this.setState({locationMarkers: markersGathered})
    // console.log(this.state.locationMarkers.length)
  }

  changeClassName = (event) => {
    event.stopPropagation()
    this.setState({isOpen: !this.state.isOpen})
    this.setState({showSearchContents: !this.state.showSearchContents})
  }

  setInfoString = (infoWin) => {
    this.setState({infoWindow: infoWin})
  }

  setWikipediaContent = (marker) => {
    var self = this
    var searchTerm = marker.title
    var url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch="+searchTerm+"&gpslimit=20"
    fetch(url)
      .then(function(response){
        if(response.status !== 200){
          self.state.infoWindow.setContent("Sorry but this data cannot be loaded right now")
          return
        }
        response.json().then(function(data){
          var image = data.query.pages[0].thumbnail.source
          var description = data.query.pages[0].terms.description[0]

          // console.log(description)
          self.state.infoWindow.setContent('<div class="infoWindow"><div><b>' + marker.title + '</b></div>' + '\n'
          + '<div class="address">' + marker.address + '</div>' + '\n'
          + '<img src=' + image +'>' + '\n'
          + 'Description: ' + description + "</div>")
        })
      }).catch(function(err){
        self.state.infoWindow.setContent("Trouble connecting to Wikipedia")
      })
  }

  //set the info window with a bolded title and address underneath 
  setInfoWindow = (marker) => {
      var self = this
      this.closeInfoWindow()
      this.setState({prevMarker: marker})
      this.state.infoWindow.open(this.state.map, marker)
      this.setWikipediaContent(marker)
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
    window.google.maps.event.addListener(this.state.infoWindow, "closeclick", function(){
      self.closeInfoWindow()
    })
  } 

  closeInfoWindow = () =>{
    if (this.state.prevMarker){
      this.state.prevMarker.setAnimation(null)
    }
    this.setState({prevMarker: ""})
    this.state.infoWindow.close()
  } 



	render(){
    // console.log("State", this.state)
    const locationMarkers = []
    let toggleMapSize = this.state.isOpen ? 'map-container-expand' : 'map-container'
		let toggleSearchBarSize = this.state.isOpen ? 'search-container-shrink' : 'search-container'
    return(
		 <div className="mapArea">
			  <div role="Application" aria-label="Map Of Raleigh North Carolina" tabIndex={0} id={toggleMapSize}>
        		 <Map id="map" 
             infoWin={this.setInfoString} 
             openInfoWin={this.setInfoWindow} 
             gatherMarkers={this.gatherMarkers} 
             locationMarkers = {locationMarkers} 
             locations={this.state.locations} 
             />
			  </div>

			  <div role="Slider" aria-label="Search Panel" tabIndex={0} id={toggleSearchBarSize}>
           <div>
             <button role="Button" aria-label="Button To Display Search Menu" id="search-button" onClick={this.changeClassName}>Search</button>
           </div>
			  	  <SearchArea 
            setMarker={this.setInfoWindow} 
            locationMarkers= {this.state.locationMarkers} 
            showSearch={this.state.showSearchContents}
            />
			  </div>

			</div>
		)
	}
}
export default MapArea