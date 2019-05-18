import React from "react";
import { Button, View, Text, ActivityIndicator, FlatList, StyleSheet, ScrollView, Image } from "react-native";
import FromToForm from './FromToForm';
import Activity from './Activity';
import axios from 'axios';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import MyButton from '../MyButton';
import { Tooltip } from 'react-native-elements';


class ActivityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDateForm: true,
            period: {
                from: null,
                to: null
            },
            isLoading: false,
            requestFailed: false,
            timeLine: [],
            tableHead: ['strenouns', 'moderate', 'rest', 'ride'],
            tableIcons: [
                <Image source={require('../../assets/strenouns-icon.png')} style={styles.img} />,
                <Image source={require('../../assets/muderate-icon.png')} style={styles.img} />,
                <Image source={require('../../assets/rest-icon.png')} style={styles.img} />,
                <Image source={require('../../assets/ride-icon.png')} style={styles.img} />],
            tableData: []
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Activity tracker ',
            headerStyle: {
                backgroundColor: '#95a844',
            },
            headerTintColor: '#E0E8C3',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        };
    };
    setTableTitle = (timeLine) => {
        const tableData = [];
        timeLine.forEach((element) => {
            const arrToSave = [];
            arrToSave[0] = element.startTime.split(".")[0].replace('T', ' at ') + '\n to \n' + element.endTime.split(".")[0].replace('T', ' at ');
            switch (element.activityType) {
                case 'STRENUOUS':
                    arrToSave[1] = <Image source={require('../../assets/strenouns-icon.png')} style={styles.img} />;
                    break;
                case 'MODERATE':
                    arrToSave[1] = <Image source={require('../../assets/muderate-icon.png')} style={styles.img} />;
                    break;
                case 'REST':
                    arrToSave[1] = <Image source={require('../../assets/rest-icon.png')} style={styles.img} />;
                    break;
                case 'RIDE':
                    arrToSave[1] = <Image source={require('../../assets/ride-icon.png')} style={styles.img} />;
                    break;
                default:
                    arrToSave[1] = <Tooltip height={200} width={300} backgroundColor={'#95a844'} popover={<Text style={{ fontSize: 16, color: "#E0E8C3" }}>
                        The application identifies Unrecorded state in one of two cases:{"\n"}
                        1. More than 24 hour without recording location data{"\n"}
                        2. A distance of more than 100 meters between two consecutive location points,{"\n"}
                        when the difference of time between them is at least 4 minutes
                        </Text>}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: "#0000EE", textDecorationLine: 'underline' }}>Unrecorded</Text>
                    </Tooltip>;
                    break;
            }
            tableData.push(arrToSave);
        });
        this.setState({ tableData });
    }
    setFrom = (from) => {
        const to = this.state.period.to;
        this.setState({
            period: {
                from,
                to
            }
        });
    }
    setTo = (to) => {
        const from = this.state.period.from;
        this.setState({
            period: {
                from,
                to
            }
        });
    }
    runAlgorithm = () => {
        this.setState({
            showDateForm: false,
            isLoading: true
        }, this.activityTrackerAlgorithm());
    }
    activityTrackerAlgorithm = () => {
        const activityAlgorithmUrl = `/dev/algo2/${this.state.period.from}/${this.state.period.to}`;
        const baseUrl = 'http://192.168.14.109:8080/watchdog';
        axios({
            url: activityAlgorithmUrl,
            baseURL: baseUrl,
            method: 'GET'
        })
            .then(res => {
                if (res.data.length == 0) {
                    alert('There\'s data missing for the selected period. please choose another period');
                    this.setState({
                        isLoading: false,
                        requestFailed: false,
                        showDateForm: true
                    });
                    return;
                }
                this.setState({
                    isLoading: false,
                    requestFailed: false,
                    timeLine: res.data
                });
                this.setTableTitle(res.data);
            })
            .catch(e => {
                this.setState({
                    isLoading: false,
                    requestFailed: true
                })
            })
    }
    reset = () => {
        this.setState({
            showDateForm: true,
            period: {
                from: null,
                to: null
            },
            isLoading: false,
            requestFailed: false,
            timeLine: [],
            tableHead: ['strenouns', 'moderate', 'rest', 'ride'],
            tableData: []
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.showDateForm && <FromToForm runAlgorithm={this.runAlgorithm} setFrom={this.setFrom} setTo={this.setTo} />}
                {!this.state.isLoading && this.state.requestFailed && alert('Algorithm Failed')}
                {this.state.isLoading && <ActivityIndicator size="large" />}
                {this.state.timeLine.length > 0 &&
                    <View style={styles.container}>
                        <View style={styles.btnWrapper}>
                            <MyButton
                                name={'Reset'}
                                action={() => { this.reset() }}
                                fontSize={20}
                            />
                        </View>
                        <View style={styles.iconsWrapper}>
                            <Table>
                                <Row data={this.state.tableHead} flexArr={[2, 2, 2, 2]} style={styles.head} textStyle={styles.headerText} />
                                <Row data={this.state.tableIcons} flexArr={[2, 2, 2, 2]} style={styles.head} textStyle={styles.headerText} />
                            </Table>
                        </View>
                        <View style={styles.tableWrapper}>
                            <ScrollView style={styles.dataWrapper}>
                                <Table>
                                    <TableWrapper style={styles.wrapper}>
                                        <Rows data={this.state.tableData} flexArr={[6, 2]} style={styles.row} textStyle={styles.tableText} />
                                    </TableWrapper>
                                </Table>
                            </ScrollView>
                        </View>
                    </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#dedabb', justifyContent: 'center' },
    btnWrapper: { alignItems: 'center', justifyContent: 'flex-start' },
    iconsWrapper: { flex: 1 },
    tableWrapper: { flex: 6 },
    head: { height: 40, backgroundColor: '#dedabb' },
    wrapper: { flexDirection: 'row' },
    row: { height: 100 },
    headerText: { textAlign: 'center', fontSize: 18, color: "#44494f", },
    tableText: { textAlign: 'center', fontSize: 20, color: "#44494f", },
    dataWrapper: { marginTop: 50 },
    img: {
        flex: 1,
        alignSelf: 'stretch',
        resizeMode: 'contain',
        width: undefined,
        height: undefined,
        marginLeft: 20,
        marginRight: 20,
        marginTop: -70,
        marginBottom: -70
    },
});

export default ActivityScreen;