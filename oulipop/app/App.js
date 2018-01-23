import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, Button } from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import RNShakeEvent from 'react-native-shake-event';

export default class OuliPop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentIndexes : []
    }
  }

  getRandomArrayOfIndexes () {
    let indexes = [];
    for(let row of this.state.data) {
      indexes.push( Math.floor ( Math.random() * (row.length) ) )
    }
    return indexes;
  }

  componentWillMount() {
    RNShakeEvent.addEventListener('shake', () => {
      console.log('Device shake!');
      let idx=this.getRandomArrayOfIndexes();
      this.setState({currentIndexes : idx})
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  componentDidMount() {
    return fetch('https://raw.githubusercontent.com/popuplille/oulipop/master/datasource.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading : false,
          data : responseJson,
          currentIndexes : Array.apply(null, Array(responseJson.length)).map(Number.prototype.valueOf,0)
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingbox}>
          <Text style={styles.boxlabel}>
            Loading
          </Text>
        </View>
      )    
    }else{

      const styleLoop = ['colorBox1','colorBox2','colorBox3','colorBox4','colorBox5'];
      return (
        
        <View style={styles.container}>
          <StatusBar hidden />
          {this.state.data.map((row,i) =>
            <SwipeableViews index={this.state.currentIndexes[i]} resistance={true} hysteresis={0.2} key={i} style={styles.swipeable}>
              {row.map((word,j) =>
                <View key={j} style={styles[styleLoop[i]]}>
                  <Text style={styles.boxlabel}>
                    {word}
                  </Text> 
                </View>
              )}
            </SwipeableViews>
            
          )}
            <Button style={styles.buttonbar}
              title = "Reload"
              onPress={() => {
                let idx=this.getRandomArrayOfIndexes();
                this.setState({currentIndexes : idx})
                } 
              }
            />
        </View>
      );  
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swipeable: {
    flex: 8
  },
  buttonbar: {
    flex: 2,
    color : '#666666',
  },
  loadingbox : {
    backgroundColor: 'lightgreen',
    flex: 1, 
    justifyContent : 'center', 
    alignItems : 'center'
  },
  colorBox1 : {
    backgroundColor: '#E7E7DE',
    flex: 1, 
    justifyContent : 'center', 
    alignItems : 'center'
  },
  colorBox2 : {
    backgroundColor: '#CDCBA6',
    flex: 1, 
    justifyContent : 'center', 
    alignItems : 'center'
  },
  colorBox3 : {
    backgroundColor: '#008891',
    flex: 1, 
    justifyContent : 'center', 
    alignItems : 'center'
  },
  colorBox4 : {
    backgroundColor: '#00587A',
    flex: 1, 
    justifyContent : 'center', 
    alignItems : 'center'
  },
  colorBox5 : {
    backgroundColor: '#0F3057',
    flex: 1, 
    justifyContent : 'center', 
    alignItems : 'center'
  },
  boxlabel : {
    fontFamily : 'Roboto',
    color : 'white', 
    fontSize:30
  }
});