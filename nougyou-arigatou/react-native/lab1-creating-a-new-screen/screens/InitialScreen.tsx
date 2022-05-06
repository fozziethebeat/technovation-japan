/**
 * The first screen all users will see.
 */
import React from 'react';

import { View } from '../components/Themed';
import { TextButton } from '../components/ui/TextButton';

export default function InitialScreen({ navigation }) {
  // Creating a New Screen Exercise:
  //   When a user clicks the `Farmer` button, what screen should we go to?
  //   When a user clicks the `Consumer` button, what screen should we go to?
  const farmerHandler = () => {
    navigation.navigate("Farmer Profile", { farmer: 'yukino' });
  };
  const consumerHandler = () => {
    console.log("To be figured out");
  };
  return (
    <View>
      <TextButton
        onPress={() => farmerHander()}
        title="Farmer"
      />
      <TextButton
        onPress={() => {
          // Creating A New Screen Exercise:
          //   Navigate to the new screen you created for showing a list of
          //   farmers.  Use the screen name like we do above.
          console.log("Clicked Consumer Button");
        }}
        title="Consumer"
      />
    </View>
  )
}
