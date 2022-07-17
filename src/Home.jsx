import React from "react";
import { Carousel } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import "./Home.css";

import MapImg from "./images/path_map.jpg";
import { AboutAnimation, FirstAnimation, SecondAnimation, ThirdAnimation, FourthAnimation } from "./animations/TextAnimation";

export default class Home extends React.Component {

    render() {

        const iconStyle = {
            height: "700px",
        };

        return (

            <div class="main-body">

                <div className='container-fluid'>

                    <img className="map-img" src={MapImg} type="image" />
                    
                    <Carousel className="carousel-control" interval={7000} keyboard={false} pauseOnHover={true}>
    
                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content"><AboutAnimation /></div>
                            <Carousel.Caption><h3>About</h3></Carousel.Caption>
                        </Carousel.Item>  
                        
                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content"><FirstAnimation /></div>
                            <Carousel.Caption><h3>Algorithms Used</h3></Carousel.Caption>
                        </Carousel.Item>  
                        
                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content"><SecondAnimation /></div>
                            <Carousel.Caption><h3>Algorithms Used</h3></Carousel.Caption>
                        </Carousel.Item>  

                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content"><ThirdAnimation /></div>
                            <Carousel.Caption><h3>Algorithms Used</h3></Carousel.Caption>
                        </Carousel.Item> 

                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content"><FourthAnimation /></div>
                            <Carousel.Caption><h3>Algorithms Used</h3></Carousel.Caption>
                        </Carousel.Item> 
    
                    </Carousel>

                </div>  
            </div>
        );
    }
}