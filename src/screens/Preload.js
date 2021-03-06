import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { checkLogin } from "../actions/AuthActions";

export class Preload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.verifyStatus = this.verifyStatus.bind(this);
  }

  componentDidMount() {
    this.props.checkLogin();
  }

  componentDidUpdate() {
    this.verifyStatus();
  }

  verifyStatus() {
    //Fazer verificação do STATUS

    switch (this.props.status) {
      case 1:
        //manda para tela home
        alert("Manda pra Home");

        break;
      case 2:
        //manda usuario para login
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Login" })]
          })
        );
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Carregando...{this.props.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    status: state.auth.status
  };
};

const PreloadConnect = connect(
  mapStateToProps,
  { checkLogin }
)(Preload);

export default PreloadConnect;
