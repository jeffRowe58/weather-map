import React, {Fragment, useEffect, useRef} from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MAP_KEY from "./key";
import mapboxgl from "mapbox-gl";
import './Map.css'
import {getWeather} from "../../api/getWeather";


mapboxgl.accessToken = MAP_KEY;

const Map = () => {

    const startPoint = [-96.80, 32.77];
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({offset: 15}));



    // initialize map when component mounts
    useEffect(() => {
        const weather = getWeather(startPoint);
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/streets-v11",
            center: startPoint,
            zoom: 12.5
        });

        // create initial marker
        const marker = new mapboxgl.Marker({
            color: 'red'
        })
            .setDraggable(true)
            .setLngLat(map.getCenter())
            .addTo(map)

        //on marker move re-center
        marker.on('dragend', () => {
            const change = marker.getLngLat();
            map.setCenter(change);
            map.setZoom(15);
        });


        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");


        // clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Fragment>
            {weather > 0  && <div className='sidebar'>
                High: {weather.high} | Low: {weather.low} | Condition: {weather.condition}
            </div>}
            <div className="map-container" ref={mapContainerRef}/>
        </Fragment>
    );
};

export default Map;

