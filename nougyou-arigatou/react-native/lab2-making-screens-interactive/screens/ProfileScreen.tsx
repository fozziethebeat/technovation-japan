/**
 * A screen for displaying a farmer's profile to a consumer.
 */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, TextInput } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';

import farmers from '../storage/farmers';
import EditScreenInfo from '../components/EditScreenInfo';
import { TextButton } from '../components/ui/TextButton';
import { Text, View } from '../components/Themed';

export default function ProfileScreen({ navigation, route }) {
  // Making Screens Interactive:
  //   This state object can be used to store comments while they're being
  //   written.
  //   
  //   Here, `text` will store the contents of the current comment being
  //   written.  We can use `setText` to update the current comment every time
  //   a user types into the TextInput element.
  const [text, setText] = useState('');
  // Making Screens Interactive:
  //   This state object can be used to store all submitted comments.
  //
  //   Here, `comments` will be the list of all the submitted comments.  We can
  //   use `setComments` to update the list of comments to include all the
  //   previous comments and the newest comment being submitted.
  const [comments, setComments] = useState([]);

  const farmer = farmers
    .filter((farmer) => farmer.Username == route.params.farmer)[0];

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image style={styles.image} source={farmer.Image} />
        <View style={styles.detailsContent}>

          <View>
            <Text>Name: </Text>
            <Text style={styles.detailItem}>{farmer.Name}</Text>
          </View>

          <View>
            <Text>Location: </Text>
            <Text style={styles.detailItem}>{farmer.Location}</Text>
          </View>

          <View>
            <Text>Favorites: </Text>
            <Text style={styles.detailItem}>{farmer.Favorites}</Text>
          </View>
        </View>
      </View>

      {/*
        Making Screens Interactive:
          How do we get a new comment from a consumer?
          What should we do with the comment?
      */}
      <View style={styles.submitContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment"
          onChangeText={text => {
            // Making Screens Interactive Exercise:
            //   When a user is typing in an input box, we need to save the
            //   input.  How can we save that in a react component?
          }}
          defaultValue={text}
        />
        <TextButton
          onPress={() => { 
            // Making Screens Interactive Exercise:
            //   When a user clicks the Submit button, we should add the
            //   comment to the list of comments and show it automatically.
            //   How can we save that comment?
            const newComment = {
              Username: farmer.Username,
              Content: text,
              key: uuidv4(),
            };
            console.log(newComment);
          }}
          title="Submit"
        />
      </View>

      {/*
        Making Screens Interactive:
          Notice how we're displaying each comment automatically with a
          FlatList?
      */}
      <View style={styles.commentContainer}>
        <FlatList
            data={comments}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
          <View>
            <Text>{item.Content}</Text>
          </View>
            )}
          />
      </View>

     </View>
  );
}

// Styling Our App:
//   - How do we style each of the UI components in the app?
//   - Should we try using any global themes?
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  detailsContent: {
    paddingLeft: 4,
    width: '50%',
  },
  detailItem: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 2,
  },
  image: {
    padding: 10,
    height: 150,
    width: 150,
  },
  submitContainer: {
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 2,
  },
  commentContainer: {
    marginTop: 8,
    width: '100%',
    height: '60%',
  }
});
