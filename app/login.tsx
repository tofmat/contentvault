import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // For now we'll simulate a login since we don't have Supabase connected yet
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)/dashboard");
    }, 1500);
  };

  return (
    <LinearGradient
      colors={["#312e81", "#6d28d9", "#9333ea"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View entering={FadeInDown.duration(600)} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>Welcome to Content Vault</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.cardContent}>
          <Pressable
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            <Ionicons name='logo-google' size={20} color='#4285F4' />
            <Text style={styles.googleButtonText}>
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Text>
          </Pressable>

          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "semibold",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  cardContent: {
    padding: 24,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#000",
  },
  termsText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 32,
  },
});
