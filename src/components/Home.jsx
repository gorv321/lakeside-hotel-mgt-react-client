import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './HeaderMain';
import Parallax from './Parallax';
import HotelService from './HotelService';

const Home = () => {
	
	return (
		<section>
		
			<MainHeader />
			<div className="container">
				
				<Parallax />
				<HotelService />
				<Parallax />
				
			</div>
		</section>
	)
}


export default Home;
