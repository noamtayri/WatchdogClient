import React from "react";
import { Button, View, Text, ActivityIndicator, FlatList, StyleSheet, ScrollView } from "react-native";
import axios from 'axios';
import Location from './Location';
import MapView from 'react-native-maps';

class PredictScreen extends React.Component {
    constructor(props) {
        super(props);
        this.colors = [
            'rgba(131, 214, 88, 0.3)',
            'rgba(198, 223, 159, 0.3)',
            'rgba(117, 167, 88, 0.3)',
            'rgba(49, 111, 85, 0.3)',
            'rgba(25, 150, 53, 0.3)'
        ]
        this.state = {
            isLoading: true,
            requestFailed: false,
            locations: [],
            focus: {
                lat: null,
                lon: null
            }
        };
        this.predictLocationAlgorithm();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Predict location',
            headerStyle: {
                backgroundColor: '#95a844',
            },
            headerTintColor: '#E0E8C3',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        };
    };

    predictLocationAlgorithm = () => {
        const predictAlgorithmUrl = '/dev/algo1';
        const baseUrl = 'http://192.168.14.109:8080/watchdog';
        axios({
            url: predictAlgorithmUrl,
            baseURL: baseUrl,
            method: 'GET'
        })
            .then(res => {
                this.setState({
                    isLoading: false,
                    requestFailed: false,
                    locations: res.data,
                    focus: {
                        lat: res.data[0].center.lat,
                        lon: res.data[0].center.lon,
                    }
                })
            })
            .catch(e => {
                this.setState({
                    isLoading: false,
                    requestFailed: true
                })
            })
    }

    setNewFocus = (index) => {
        this.setState({
            focus: {
                lat: this.state.locations[index].center.lat,
                lon: this.state.locations[index].center.lon,
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(222, 218, 187, 0.3)' }}>
                {this.state.isLoading && <ActivityIndicator size="large" />}
                {!this.state.isLoading && this.state.requestFailed && alert('Algorithm Failed')}
                {this.state.locations.length > 0 &&
                    [
                        <View key='map' style={{ flex: 2, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', backgroundColor: '#dedabb' }}>
                            <View style={styles.container}>
                                <MapView
                                    style={styles.map}
                                    region={{
                                        latitude: this.state.focus.lat,
                                        longitude: this.state.focus.lon,
                                        latitudeDelta: 0.003,
                                        longitudeDelta: 0.003
                                    }}

                                >
                                    {/* {this.state.locations.map((element, index) => (
                                        <MapView.Marker
                                            key={index}
                                            coordinate={{
                                                latitude: element.center.lat,
                                                longitude: element.center.lon
                                            }}
                                            title={`${element.percentage}`}
                                            description={`redius of ${element.radius} meters`}
                                        // pinColor={'#' + (Math.random() * 0xFFFFFF << 0).toString(16)}
                                        />
                                    ))} */}
                                    {this.state.locations.map((element, index) => (
                                        <MapView.Circle
                                            key={index}
                                            center={{
                                                latitude: element.center.lat,
                                                longitude: element.center.lon
                                            }}
                                            radius={element.radius}
                                            fillColor={this.colors[index % 5]}

                                        />
                                    ))}
                                </MapView>
                            </View>
                        </View>,
                        <View key='list' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
                            <ScrollView style={{ alignSelf: 'stretch' }}>
                                {this.state.locations.map((element, index) => (
                                    <Location key={index} percentage={element.percentage} setNewFocus={this.setNewFocus} index={index} color={this.colors[index % 5]} />
                                ))}
                            </ScrollView>
                        </View>
                    ]
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#dedabb'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})

export default PredictScreen;