import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AuthContext } from "../context/AuthContext";
import { RoleContext } from "../context/RoleContext";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const AccountScreen = () => {
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { authData } = useContext(AuthContext);
  const { accountType } = useContext(RoleContext);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const accountInfo = await getAccountInfo();
      if (accountInfo) {
        setPrimaryEmail(accountInfo.primaryEmail);
        setAccountEmail(accountInfo[`${accountType.toLowerCase()}Email`]);
        setPhone(accountInfo[`${accountType.toLowerCase()}Phone`]);
      }
    };

    fetchAccountInfo();
  }, [accountType, authData]);

  const getAccountInfo = async () => {
    try {
      if (!EXPO_PUBLIC_NGROK_URL) {
        console.error("Ngrok url is not defined");
        return;
      }

      let url;
      if (accountType === "Customer") {
        url = `${EXPO_PUBLIC_NGROK_URL}/api/account/${authData.customer_id}?type=customer`;
      } else if (accountType === "Courier") {
        url = `${EXPO_PUBLIC_NGROK_URL}/api/account/${authData.courier_id}?type=courier`;
      } else {
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  };

  const updateAccount = async () => {
    try {
      if (!EXPO_PUBLIC_NGROK_URL) {
        console.error("Ngrok url is not defined");
        return;
      }

      let url;
      let body;
      if (accountType === "Customer") {
        url = `${EXPO_PUBLIC_NGROK_URL}/api/account/${authData.customer_id}`;
        body = JSON.stringify({
          customerEmail: accountEmail,
          customerPhone: phone,
        });
      } else if (accountType === "Courier") {
        url = `${EXPO_PUBLIC_NGROK_URL}/api/account/${authData.courier_id}`;
        body = JSON.stringify({
          courierEmail: accountEmail,
          courierPhone: phone,
        });
      } else {
        return;
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating account info:", error);
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>MY ACCOUNT</Text>
      <Text style={styles.loggedIn}>Logged In As: {accountType}</Text>

      <Text style={globalStyles.subText}>Primary Email (Read Only)</Text>
      <View style={globalStyles.formContainer}>
        <TextInput style={globalStyles.input} value={primaryEmail} editable={false} />
      </View>
      <Text style={styles.comment}>Email used to login to the application.</Text>

      <Text style={globalStyles.subText}>{accountType} Email:</Text>
      <View style={globalStyles.formContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter your account email here"
          value={accountEmail}
          onChangeText={setAccountEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <Text style={styles.comment}>Email used for your {accountType} account.</Text>

      <Text style={globalStyles.subText}>{accountType} Phone:</Text>
      <View style={globalStyles.formContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter your account phone number here"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View>
      <Text style={styles.comment}>Phone number for your {accountType} account.</Text>

      <TouchableOpacity style={[globalStyles.button, { marginTop: 20 }]} onPress={() => updateAccount()}>
        <Text style={globalStyles.buttonText}>UPDATE ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loggedIn: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  comment: {
    fontSize: 10,
    color: "#D3D3D3",
  },
});

export default AccountScreen;
