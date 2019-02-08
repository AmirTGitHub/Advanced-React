import React, { Component } from "react";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "../components/Item";

const ALL_ITEM_QUERY = gql`
  query ALL_ITEM_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const Centre = styled.div`
  text-align: center;
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class Items extends Component {
  state = {
    loading: false
  };
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEM_QUERY });
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEM_QUERY, data });
  };
  render() {
    return (
      <Centre>
        <Query query={ALL_ITEM_QUERY} fetchPolicy="cache-and-network">
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ........</p>;
            if (error) return <p>{error.message}</p>;
            return (
              <ListItem>
                {data.items.map(item => (
                  <Mutation
                    mutation={DELETE_ITEM_MUTATION}
                    key={item.id}
                    update={this.update}
                    fetchPolicy="cache-and-network"
                  >
                    {(deleteItem, { error, loading }) => (
                      <Item
                        item={item}
                        handleDelete={() =>
                          deleteItem({ variables: { id: item.id } })
                        }
                      />
                    )}
                  </Mutation>
                ))}
              </ListItem>
            );
          }}
        </Query>
      </Centre>
    );
  }
}
