import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Settings() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    router.replace("/");
  };

  const renderSettingItem = ({
    icon,
    title,
    value,
    onValueChange,
    type = "switch",
  }) => (
    <View
      style={[
        styles.settingItem,
        { backgroundColor: isDark ? "#111" : "#f5f5f5" },
      ]}
    >
      <View style={styles.settingContent}>
        <Ionicons name={icon} size={24} color={isDark ? "#fff" : "#000"} />
        <Text
          style={[styles.settingTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          {title}
        </Text>
      </View>
      {type === "switch" ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
        />
      ) : (
        <Ionicons
          name='chevron-forward'
          size={20}
          color={isDark ? "#666" : "#999"}
        />
      )}
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          Settings
        </Text>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: isDark ? "#999" : "#666" }]}
          >
            Preferences
          </Text>
          {renderSettingItem({
            icon: "notifications-outline",
            title: "Notifications",
            value: notifications,
            onValueChange: setNotifications,
          })}
          {renderSettingItem({
            icon: "sync-outline",
            title: "Auto Sync",
            value: autoSync,
            onValueChange: setAutoSync,
          })}
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: isDark ? "#999" : "#666" }]}
          >
            Account
          </Text>
          {renderSettingItem({
            icon: "person-outline",
            title: "Profile",
            type: "link",
          })}
          {renderSettingItem({
            icon: "shield-outline",
            title: "Security",
            type: "link",
          })}
        </View>

        <Pressable
          style={[
            styles.logoutButton,
            { backgroundColor: isDark ? "#111" : "#f5f5f5" },
          ]}
          onPress={handleLogout}
        >
          <Ionicons name='log-out-outline' size={24} color='#ff3b30' />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingTitle: {
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: "auto",
  },
  logoutText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
