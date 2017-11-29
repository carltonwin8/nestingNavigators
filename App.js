import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import { Constants } from 'expo';

function Statusbar({backgroundColor, ...props}) {
  return (<View style={{backgroundColor, height: Constants.statusBarHeight}} >
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>)
}


class RecentChatsScreen extends React.Component {
  render() {
    return <View>
      <Text>List of recent chats</Text>
      <Button
        onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
        title="Chat with Lucy"
      />
    </View>
  }
}

class AllContactsScreen extends React.Component {
  render() { return <Text>List of all contacts</Text> }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen, },
  All: { screen: AllContactsScreen, },
});

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.user}` };
  };
  render() {
    return <View>
      <Text>Chatting Away</Text>
    </View>
  }
}

const SimpleApp = StackNavigator({
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: {
      title: 'My Chats',
    },
  },
  Chat: { screen: ChatScreen },
});

class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MainScreenNavigator navigation={this.props.navigation}/>
      </View>
    );
  }
}
NavigatorWrappingScreen.router = MainScreenNavigator.router;

const SimpleApp2 = StackNavigator({
  Home: {
    screen: NavigatorWrappingScreen,
    navigationOptions: {
      title: 'My Chats 2',
    },
  },
  Chat: { screen: ChatScreen },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Statusbar backgroundColor='aqua' barStyle='light-content' />
        <SimpleApp2 />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
