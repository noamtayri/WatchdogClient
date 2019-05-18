import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import MapView from 'react-native-maps';

class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Details of ' + navigation.getParam('name'),
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        };
    };
    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'no-name');
        const dogName = navigation.getParam('dogName', 'no-dog-name');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', alignSelf: 'stretch' }}>
                    <Text>Details Screen</Text>
                    <Text>{name}</Text>
                    <Text>{dogName}</Text>
                    <Button
                        title="Go to Details... again"
                        onPress={() => this.props.navigation.push('Details')}
                    />
                    <Button
                        title="Go to Home"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <Button
                        title="Go back"
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', alignSelf: 'stretch' }}>
                    <Text>Details Screen</Text>
                    <Text>{name}</Text>
                    <Text>{dogName}</Text>
                    <Button
                        title="Go to Details... again"
                        onPress={() => this.props.navigation.push('Details')}
                    />
                    <Button
                        title="Go to Home"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <Button
                        title="Go back"
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
            </View>
        );
        // return (
        //     <View style={styles.container}>
        //         <MapView style={styles.map} region={{
        //             latitude: 59.32932349999,
        //             longitude: 18.0685808000063,
        //             latitudeDelta: 0.1,
        //             longitudeDelta: 0.1
        //         }}>
        //             <MapView.Marker
        //                 coordinate={{
        //                     latitude: 59.32932349999,
        //                     longitude: 18.0685808000063
        //                 }}
        //                 title={'blabla'}
        //                 description={'stam'}
        //             />

        //         </MapView>
        //     </View >
        // );
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
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})

export default DetailsScreen;