import React, { Component } from "react";

import PropTypes from "prop-types";

import { 
  Text, View, StyleSheet, ListView, TouchableHighlight, Switch
  } from "react-native";

import TaskRow from './TaskRow/Component';

class TaskList extends Component {
  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSouce: ds.cloneWithRows(this.props.todos)
    };
  }

  componentWillReceiveProps(nextProps){
    const dataSouce = this
      .state
      .dataSouce
      .cloneWithRows(nextProps.todos);
    this.setState({dataSouce})
  }

  renderRow(todo) {
    return (
      <View>
        <TaskRow 
          onDone={this.props.onDone} 
          todo={todo} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toggleRow}>
          <Switch
            onValueChange={this.props.onToggle}
            style={styles.switch} 
            value={this.props.filter !== 'pending'}/>
          <Text
            style={styles.toggleText}>
            Showing {this.props.todos.length} {this.props.filter} todo(s)
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSouce}
          key={this.props.todos}
          renderRow={this.renderRow.bind(this)}
        />

        <TouchableHighlight 
          onPress={this.props.onAddStarted}
          style={styles.button}>
          <Text style={styles.buttonText}>Add One</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

TaskList.propTypes = {
  filter: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
  onAddStarted: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'flex-start'
  },
  button:{
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',    
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText:{
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600'
  },
  toggleRow:{
    flexDirection: 'row',
    padding: 10,
  },
  toggleText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 3
  }
});

export default TaskList;
