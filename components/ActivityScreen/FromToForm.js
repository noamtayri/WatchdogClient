import React from "react";
import { Button, View, Text } from "react-native";
import DatePicker from 'react-native-datepicker'
import MyButton from '../MyButton';

class FromToForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: "2018-12-7",
            to: "2018-12-8"
        };
    }
    runAlgorithm = () => {
        if (!this.state.from || !this.state.to) {
            alert('Must enter period of time');
            return;
        }
        this.props.runAlgorithm(this.state.from, this.state.to);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#dedabb' }}>
                <Text style={{ fontSize: 30, margin: 15, textAlign: 'center', color: '#44494f' }}>Please insert the period of time you want to track dog's activity</Text>
                <Text style={{ fontSize: 20, marginTop: 35, marginBottom: 2, textAlign: 'center', color: '#44494f' }}>From date:</Text>
                <DatePicker
                    style={{ width: 220 }}
                    // date="2018-12-7"
                    date={this.state.from}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    //minDate="2016-05-01"
                    maxDate={this.state.to}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    // onDateChange={(date) => { this.setState({ from: date }) }}
                    onDateChange={(date) => {
                        this.setState({ from: date });
                        this.props.setFrom(date);
                    }}
                />
                <Text style={{ fontSize: 20, marginTop: 15, marginBottom: 2, textAlign: 'center', color: '#44494f' }}>To date:</Text>
                <DatePicker
                    style={{ width: 220 }}
                    // date="2018-12-8"
                    date={this.state.to}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.from}
                    // maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    // onDateChange={(date) => { this.setState({ to: date }) }}
                    onDateChange={(date) => {
                        this.setState({ to: date });
                        this.props.setTo(date);
                    }}
                />
                <View style={{ marginTop: 10 }}>
                    <MyButton
                        name={'Set period'}
                        action={() => { this.runAlgorithm() }}
                        fontSize={20}
                    />
                </View>
            </View>
        );
    }
}

export default FromToForm;