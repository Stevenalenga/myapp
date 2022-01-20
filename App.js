import React, { useState } from "react";

import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

const express = require("express");
const app = express();

import { SocialIcon } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { FontAwesome } from "@expo/vector-icons";
import profileImage from "./assets/profileImage.png";
import profilepicture2 from "./assets/profilepicture2.jpg";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const handleGoogleLogin = () => {
  googleSubmit(true);
  const config = () => {
    iosClientId: "410400880597-2qkbnmtf08mvnnlm0ijrir5gd9es6abo.apps.googleusercontent.com";
    androidClientId: "410400880597-0i81v368klq7egjmv1vf1mkc0hs6i6h5.apps.googleusercontent.com";
    scopes: ["profile", "email"];
  };
  Google.loginAsync(config)
    .then((result) => {
      const { type, user } = result;

      if (type == "success") {
        const { email, name, photoUrl } = user;
        handleMessage("Google signin was successful", "SUCCESS");
        setTimeout(
          () => navigation.navigate("home", { email, name, photoUrl }),
          1000
        );
      } else {
        handleMessage("Google signIn was cancelled");
      }
      setgoogleSubmit(false);
    })
    .catch((error) => {
      console.log(error);
      handleMessage("An error occured. check your network and try again");
      setgoogleSubmit(false);
    });
};

const Login = ({ navigation }) => {
  const [googleSubmit, setgoogleSubmit] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={{
          height: 50,
          width: 380,
          margin: 12,
          borderWidth: 2,
          padding: 10,
        }}
        placeholder="Password"
      />
      <TextInput
        style={{
          height: 50,
          width: 380,
          margin: 12,
          borderWidth: 2,
          padding: 10,
        }}
        placeholder="Username"
      />

      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
      <TouchableOpacity>
        <SocialIcon
          title={"Sign In With Facebook"}
          button={true}
          type={"facebook"}
        />
      </TouchableOpacity>
      <Text>or</Text>
      <TouchableOpacity onPress={handleGoogleLogin}>
        <SocialIcon
          title={"Sign In With Google"}
          button={true}
          type={"google"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        backgroundColor="blue"
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={{ margin: 20, color: "blue" }}> Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>
        Already Registered ?
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "blue" }}> Log In</Text>
        </TouchableOpacity>
      </Text>
      <TextInput
        style={{
          height: 50,
          width: 380,
          margin: 12,
          borderWidth: 2,
          padding: 10,
        }}
        placeholder="Email"
      />
      <TextInput
        style={{
          height: 50,
          width: 380,
          margin: 12,
          borderWidth: 2,
          padding: 10,
        }}
        placeholder="Username"
      />
      <TextInput
        style={{
          height: 50,
          width: 380,
          margin: 12,
          borderWidth: 2,
          padding: 10,
        }}
        placeholder="Password"
      />
      <Text>Register</Text>
      <TouchableOpacity>
        <SocialIcon
          title={"Sign In With Facebook"}
          button={true}
          type={"facebook"}
        />
      </TouchableOpacity>
      <Text>or</Text>
      <TouchableOpacity>
        <SocialIcon
          title={"Sign In With Google"}
          button={true}
          type={"google"}
        />
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>View Available Tasks</Text>
    </View>
  );
};
const TasksCompleted = () => {
  return (
    <View style={styles.container}>
      <Text>TasksCompleted</Text>
    </View>
  );
};

const Search = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
};
const Notifications = () => {
  return app.get("/", (req, res) => {
    res.send("Hello World");
  });
};
const Messages = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
};
const Profile = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={{ alignItems: "flex-end" }}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <FontAwesome name="bars" size={35} color="black" />
      </TouchableOpacity>
      <ImageBackground
        source={profileImage}
        style={{ width: 100, height: 100 }}
      >
        <Image
          source={profilepicture2}
          style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
        ></Image>
      </ImageBackground>
      <Text>Profile</Text>
    </View>
  );
};
const ContactUs = () => {
  return (
    <View>
      <Text>Contact Us</Text>
    </View>
  );
};
const Logout = () => {
  return (
    <View style={styles.container}>
      <Text>Logout</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Notifications") {
            iconName = focused ? "bell" : "bell";
          } else if (route.name === "Messages") {
            iconName = focused ? "envelope" : "envelope";
          } else if (route.name === "Profile") {
            iconName = focused ? "user-circle" : "user-circle";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name=" Home" component={TabNavigator} />

      <Drawer.Screen name=" TaskCompleted" component={TasksCompleted} />
      <Drawer.Screen name=" ContactUs" component={ContactUs} />

      <Drawer.Screen name=" Logout" component={Logout} />
    </Drawer.Navigator>
  );
};
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ header: () => null }}
      />
      <Stack.Screen name="Profile" component={DrawerNavigator} />

      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
