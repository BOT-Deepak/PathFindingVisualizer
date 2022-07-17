import React from "react";
import { Carousel } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import "./Tutorial.css";

import SideSwipe from "./animations/SideSwipe";

export default class Tutorial extends React.Component {

    render() {

        const iconStyle = {
            height: "700px"
        };

        return (

            <div class="main-body">

                <div className="instructions">

                    <h2 className="iconId"><SideSwipe text="Icon Identifier" /></h2>

                    <div class="icons">

                        <div class="icon-img st-pt"></div>
                        <div class="icon-text">This is the starting node in the visualizer</div>
                    
                    </div>

                    <div class="icons">

                        <div class="icon-img wall"></div>
                        <div class="icon-text">This is the node with walls.</div>
                    
                    </div>

                    <div class="icons">

                        <div class="icon-img wei"></div>
                        <div class="icon-text">This node has weight ( traffic ), the path takes this more time to pass through it.</div>
                    
                    </div>

                    <div class="icons">

                        <div class="icon-img flag"></div>
                        <div class="icon-text">This node is the flag node means path should pass through this node before going to the final destination.</div>
                    
                    </div>

                    <div class="icons">

                        <div class="icon-img fin-pt"></div>
                        <div class="icon-text">This is the final destination for the shortest path.</div>
                    
                    </div>
                </div>

                <div className='container-fluid'>
                    
                    <Carousel className="carousel-control" interval={4000} keyboard={false} pauseOnHover={false}>
    
                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content">
                                <div class="content-high">
                                    <SideSwipe text="Algorithm Change" /> Option
                                </div>
                                <div class="content-low">
                                    This is used to select the algorithm to run in the visualizer.
                                </div>

                                <div class="img algo-choose-img"></div>
                            </div>
                            <Carousel.Caption><h3>Grid Control</h3></Carousel.Caption>
                        </Carousel.Item>  
                        
                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content">
                                <div class="content-high">
                                <SideSwipe text="Change Starting-Finishing" /> Option
                                    </div>
                                    <div class="content-low">
                                        This is used to select starting point and ending point for the algorithm to run in the visualizer.
                                    </div>

                                <div class="img start-end-img"></div>

                            </div>
                            <Carousel.Caption><h3>Grid Control</h3></Carousel.Caption>
                        </Carousel.Item>  
                        
                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content">
                                <div class="content-high">
                                    <SideSwipe text="Weight Toggling" /> Option
                                    </div>
                                    <div class="content-low">
                                        This is used to select the weights for the paths in the algorithm.
                                    </div>

                                <div class="img toggle-weight-img"></div>

                            </div>
                            <Carousel.Caption><h3>Grid Control</h3></Carousel.Caption>
                        </Carousel.Item>  

                        <Carousel.Item className="carousel-item" style={iconStyle}>
                            <div className="content">
                                <div class="content-high">
                                    <SideSwipe text="Flag Toggle" /> Option
                                    </div>
                                    <div class="content-low">
                                        This is used to select the flags ( from which path should traverse ).
                                    </div>

                                <div class="img toggle-flag-img"></div>

                            </div>
                            <Carousel.Caption><h3>Grid Control</h3></Carousel.Caption>
                        </Carousel.Item>
    
                    </Carousel>

                </div>  
            </div>
        );
    }
}