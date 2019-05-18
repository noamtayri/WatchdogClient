import React from "react";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import MyButton from '../MyButton';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerTintColor: '#44494f',
        headerStyle: {
            backgroundColor: '#dedabb',
        },
    };
    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.title}>Watchdog</Text> */}
                <Image source={require('../../assets/original-on-transparent.png')} style={styles.img} />
                {/* <Button
                    title="Go to Details"
                    onPress={() => {
                        this.props.navigation.navigate('Details', {
                            name: 'Noam'
                        });
                    }}
                /> */}
                <View style={styles.btnWrapper}>
                    <MyButton
                        name={'track\nactivity'}
                        action={() => { this.props.navigation.navigate('Activity') }}
                        fontSize={38}
                    />
                    <MyButton
                        name={'predict\nlocation'}
                        action={() => { this.props.navigation.navigate('Predict') }}
                        fontSize={38}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#dedabb'
    },
    img: {
        flex: 1,
        alignSelf: 'stretch',
        resizeMode: 'contain',
        width: undefined,
        height: undefined,
        marginLeft: 20,
        marginRight: 20,
        marginTop: -80,
        marginBottom: -100
    },
    title: {
        fontSize: 70,
        textAlign: 'center',
        margin: 20,
    },
    btnWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40,
    },
})

export default HomeScreen;