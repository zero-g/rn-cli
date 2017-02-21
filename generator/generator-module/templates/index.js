import ReactNative from 'react-native';
import React, {Component} from 'react';

const {
    StyleSheet,
    View
} = ReactNative;

const styles = StyleSheet.create({
});

class <%= moduleName %> extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <View>
            </View>
        )
    }
}
module.exports = <%= moduleName %>;
