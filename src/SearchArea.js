import React, {Component} from 'react'
import './SearchArea.css'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchArea extends Component{
	state = {
		query: ''
	}

	updateQuery = (query) =>{
		this.setState({query: query.trim()})
		const markersArray = this.props.locationMarkers
		markersArray.forEach(function (location){
			if(location.title.toLowerCase().indexOf(query.toLowerCase())>= 0){
				location.setVisible(true)
			}else {
				location.setVisible(false)
			}
		})
	}

	sendMarker = (marker) => {
		this.props.setMarker(marker)
	}

	render(){
		// console.log("Props", this.props)
		const {query} = this.state
		const locationNames = this.props.locationMarkers
		let toggleSearchbar = this.props.showSearch ? 'searchBar' : 'hide-searchbar'
		let toggleListings = this.props.showSearch ? 'address-listings' : 'hide-address-listings'

		let showingResults 
		if(query){
			const match = new RegExp(escapeRegExp(query), 'i')
			showingResults = locationNames.filter((location) => match.test(location.title))
		} else {
			showingResults = locationNames
		}

		showingResults.sort(sortBy('title'))

		return(
		<div>
		   	<div className="search-contents">
			   	<input
		        type="text"
		        placeholder="Search Locations"
		        className={toggleSearchbar}
		        onChange={(event) => this.updateQuery(event.target.value)}
	           />
	            <ul className={toggleListings}>
            		{showingResults.map((location, index) => (
            		<li className="listItem" onClick={this.sendMarker.bind(this, location)} key={index} tabIndex={0}>{location.title}</li>
            	))}
				</ul>
           </div>
         </div>
		)
	}
}

export default SearchArea