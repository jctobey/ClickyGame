import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Friends from "./friends.json";
import Header from "./components/Header/Header";
class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends: Friends,
    score: 0,
    clickedFriend: [],
    highScore: 0,
    correctGuess: true
  };

  componentDidMount() {
    let { friends } = this.state;
    friends = this.fisherYates(friends);
    this.setState({
      friends
    });
  }

  addClickedFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    if (!this.state.clickedFriend.includes(id)) {
      // const clicked = this.state.friends.filter(friend => friend.id === id);
      // Set this.state.friends equal to the new friends array
      this.setState({
        clickedFriend: [...this.state.clickedFriend, id],
        score: this.state.score + 1,
        userMessage: "You guessed correctly!",
        correctGuess: true
      });
      if (
        this.state.score >= this.state.highScore ||
        this.state.highScore === 0
      ) {
        this.setState({ highScore: this.state.score + 1 });
      }
      this.fisherYates();
    } else {
      this.setState({
        userMessage: "You guessed incorrectly!",
        correctGuess: false
      });
      this.fisherYates();
      this.resetGame();
    }
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  resetGame = () => {
    this.setState({
      score: 0,
      clickedFriend: []
    });
  };
  //Fisher-Yates Shuffle
  fisherYates = friends => {
    let index = Friends.length;
    let tempVal;
    let randIndex;

    while (0 !== index) {
      randIndex = Math.floor(Math.random() * index);
      index -= 1;
      tempVal = Friends[index];
      Friends[index] = Friends[randIndex];
      Friends[randIndex] = tempVal;
    }
    return friends;
  };
  highScore = () => {
    if (this.state.score > this.state.highScore) {
      this.setState({ highScore: this.state.score + 1 });
    }
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Header
          className="Header"
          score={this.state.score}
          highscore={this.state.highScore}
          guess={this.state.userMessage}
          correctGuess={this.state.correctGuess}
        />
        <Title>Clicky Game</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            addClickedFriend={this.addClickedFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
