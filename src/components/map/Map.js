import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import MAP_KEY from "./key";
import "./Map.css"

mapboxgl.accessToken = MAP_KEY


const Map = () => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(-96.79);
    const [lat, setLat] = useState(32.77);
    const [zoom, setZoom] = useState(9);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');


        // Add marker
        let marker = new mapboxgl.Marker({
            color: 'red',
        })
            .setLngLat({lng, lat})
            .setDraggable(true)
            .addTo(map);

        marker.on('dragend', () => {
            let change = marker.getLngLat();
            console.log(change);
            map.setCenter(change);
            setLng(change.lng.toFixed(2));
            setLat(change.lat.toFixed(2));
            setZoom(25)
            map.setZoom(15)
        })

        // Clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className='sidebarStyle'>
                <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    );
};

export default Map;