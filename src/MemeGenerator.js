import React, { Component } from "react";
import { Button, Input, Container, Row, Col } from "reactstrap";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      font_size: "22",
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleClick = () => {
    let randomNumber = Math.floor(
      Math.random() * this.state.allMemeImgs.length
    );
    this.setState({ randomImg: this.state.allMemeImgs[randomNumber].url });
  };
  increaseFont = () => {};
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(data => data.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }
  render() {
    console.log(this.state.font_size);
    return (
      <Container className="themed-container" fluid={true}>
        <Row xs="2">
          <Col>
            <div className="meme">
              <h2
                style={{ fontSize: Number(this.state.font_size) }}
                className="top"
              >
                {this.state.topText}
              </h2>
              <img src={this.state.randomImg} alt="" />
              <h2
                style={{ fontSize: Number(this.state.font_size) }}
                className="bottom"
              >
                {this.state.bottomText}
              </h2>
            </div>
          </Col>
          <Col>
            <div className="meme-form">
              <Input
                type="text"
                name="topText"
                placeholder="Enter top text"
                onChange={this.handleChange}
                value={this.state.topText}
              />

              <Input
                type="text"
                name="bottomText"
                placeholder="Enter bottom text"
                onChange={this.handleChange}
                value={this.state.bottomText}
              />
              <Input
                type="number"
                name="font_size"
                placeholder="Enter font size"
                onChange={this.handleChange}
                value={this.state.font_size}
              />
              <Button onClick={this.handleClick} color="danger">
                Generate!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default MemeGenerator;
