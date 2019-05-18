import React from "react";
import { Button, View, Text } from "react-native";

class Activity extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1 }}>
                <Text>Activity</Text>
                <Text>startTime = {this.props.startTime}</Text>
                <Text>endTime = {this.props.endTime}</Text>
                <Text>activityType = {this.props.activityType}</Text>
            </View>
        );
    }
}

export default Activity;