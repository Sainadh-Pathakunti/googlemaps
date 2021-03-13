import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text,Alert } from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 18.7934829;
const LONGITUDE = 98.9867401;

const GOOGLE_MAPS_APIKEY = 'Your-Key';

import { NativeModules } from 'react-native';
const reactNativeVersion = NativeModules.PlatformConstants.reactNativeVersion;
const reactNativeVersionString = reactNativeVersion ? `${reactNativeVersion.major}.${reactNativeVersion.minor}.${reactNativeVersion.patch}${reactNativeVersion.prerelease ? ' pre-release' : ''}` : '';

const reactNativeMapsVersion = require('./node_modules/react-native-maps/package.json').version;
const reactNativeMapsDirectionsVersion = require('./node_modules/react-native-maps-directions/package.json').version;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
     latitude: LATITUDE,
     longitude: LONGITUDE,
     error: null,
     initialPosition: 'unknown',
    lastPosition: 'unknown',
    };

    
   }

   getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
   });
   componentDidMount(){
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
    
   }
   componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
    
            <View style={{flex:1,justifyContent:'center'}}>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bubble: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
    },
    latlng: {
      width: 200,
      alignItems: 'stretch',
    },
    button: {
      width: 80,
      paddingHorizontal: 12,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: 'transparent',
    },
  });
  
  export default App;
  
