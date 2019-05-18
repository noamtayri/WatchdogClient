import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

class MyButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => { this.props.action() }}
            >
                <Text style={{
                    fontSize: this.props.fontSize,
                    fontWeight: '400',
                    color: "#E0E8C3",
                    textAlign: 'center'
                }}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    /* Here style the background of your button */
    customBtnBG: {
        backgroundColor: "#95a844",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 5,
        margin: 15
    }
})

export default MyButton;