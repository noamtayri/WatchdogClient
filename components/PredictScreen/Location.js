import React from "react";
import { Button, View, Text } from "react-native";
import MyButton from '../MyButton';

class Location extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, backgroundColor: this.props.color }} >
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 22, color: '#44494f' }}>{`${Number.parseFloat(this.props.percentage).toPrecision(4)} %`}</Text>
                    <MyButton
                        name={'Center'}
                        action={() => { this.props.setNewFocus(this.props.index) }}
                        fontSize={20}
                    />
                </View>
            </View>
        );
    }
}

export default Location;