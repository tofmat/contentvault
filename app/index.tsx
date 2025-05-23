import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <LinearGradient
      colors={["#312e81", "#6d28d9", "#9333ea"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        entering={FadeInDown.duration(800).springify()}
        style={styles.content}
      >
        <Text style={styles.title}>Content Vault</Text>
        <Text style={styles.subtitle}>
          All your favorite content from all over the internet, in one place,
          beautifully saved & organized.
        </Text>
        <Link href='/login' asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </Link>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(500).duration(1000)}
        style={styles.footer}
      >
        <Text style={styles.footerText}>
          Meet ContentVault - your digital treasure chest! 🎁 This awesome web
          app helps you collect and organize all your favorite stuff from the
          internet in one magical place. Whether it&apos;s cool articles, fun
          videos, or interesting links, just click once to save them into your
          own custom folders. Think of it as your personal digital library, but
          way more fun and organized! 🌟
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e9d5ff",
    marginBottom: 32,
    textAlign: "center",
    maxWidth: 400,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6d28d9",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    padding: 16,
    maxWidth: 600,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
});
