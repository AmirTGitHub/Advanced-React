import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export default class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    price: 0,
    image: "",
    largeImage: ""
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    let val = type === "number" ? parseInt(value) : value;
    this.setState({
      [name]: val
    });
  };
  uploadPhoto = async e => {
    const file = e.target.files[0];
    const fd = new FormData();
    const dataToSend = fd.append("image", file.name);
    console.log({ file: file.name, type: file.type });
  };

  render() {
    const { title, description, price, image, largeImage } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { error, loading }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const response = await createItem();
              Router.push({
                pathname: "/item"
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Photo
                <input
                  type="file"
                  name="file"
                  id="file"
                  placeholder="upload your photo"
                  required
                  onChange={this.uploadPhoto}
                />
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  required
                  value={title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="price"
                  required
                  value={price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  required
                  value={description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
