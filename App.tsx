import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Button, InputAccessoryView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native";

const Stack = createStackNavigator();

const Screen1: React.FC = () => {
  const navigation = useNavigation();
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Focus Again");
      inputRef.current?.focus();
      // Hacky Solution: setTimeout(() => inputRef.current?.focus(), 300);
    });
    return unsubscribe;
  }, [navigation, inputRef.current]);

  return (
    <View>
      <Button
        title="Go To Screen2"
        onPress={() => navigation.navigate("Screen2")}
      />
      <InputAccessoryView>
        <TextInput ref={inputRef} autoFocus value="Hi there" />
      </InputAccessoryView>
    </View>
  );
};

const Screen2: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <View>
      <Button title="Go Back" onPress={goBack} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
