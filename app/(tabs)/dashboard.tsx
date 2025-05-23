import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Mock data for initial folders
const MOCK_FOLDERS = [
  {
    id: "1",
    name: "Recipes",
    icon: "restaurant-outline",
    color: "#fee2e2",
    itemCount: 12,
  },
  {
    id: "2",
    name: "Travel",
    icon: "airplane-outline",
    color: "#dbeafe",
    itemCount: 8,
  },
  {
    id: "3",
    name: "Articles",
    icon: "document-text-outline",
    color: "#dcfce7",
    itemCount: 23,
  },
  {
    id: "4",
    name: "Videos",
    icon: "videocam-outline",
    color: "#fef9c3",
    itemCount: 5,
  },
  {
    id: "5",
    name: "Shopping",
    icon: "cart-outline",
    color: "#f3e8ff",
    itemCount: 15,
  },
];

const ICONS = [
  { name: "folder-outline", label: "Folder" },
  { name: "airplane-outline", label: "Travel" },
  { name: "home-outline", label: "Home" },
  { name: "happy-outline", label: "Fun" },
  { name: "document-text-outline", label: "Document" },
  { name: "image-outline", label: "Image" },
  { name: "videocam-outline", label: "Video" },
  { name: "musical-notes-outline", label: "Music" },
  { name: "code-slash-outline", label: "Code" },
  { name: "link-outline", label: "Link" },
  { name: "star-outline", label: "Star" },
  { name: "heart-outline", label: "Heart" },
  { name: "bookmark-outline", label: "Bookmark" },
  { name: "pricetag-outline", label: "Tag" },
  { name: "calendar-outline", label: "Calendar" },
  { name: "settings-outline", label: "Settings" },
  { name: "archive-outline", label: "Archive" },
];

const LIGHT_SCREEN_BG = "#f7fafd";
const DARK_SCREEN_BG = "#18181b";
const LIGHT_CARD_BG = "#fff";
const DARK_CARD_BG = "#23232a";
const ICON_BG_MAP: Record<string, string> = {
  "#fee2e2": "#fee2e2",
  "#dbeafe": "#dbeafe",
  "#dcfce7": "#dcfce7",
  "#fef9c3": "#fef9c3",
  "#f3e8ff": "#f3e8ff",
  "#fce7f3": "#fce7f3",
};

export default function Dashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [folders, setFolders] = useState(MOCK_FOLDERS);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("folder-outline");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;

    setIsSubmitting(true);

    // Mock API request with timeout
    setTimeout(() => {
      const newFolder = {
        id: Date.now().toString(),
        name: folderName.trim(),
        icon: selectedIcon,
        color: [
          "#fee2e2",
          "#dbeafe",
          "#dcfce7",
          "#fef9c3",
          "#f3e8ff",
          "#fce7f3",
        ][Math.floor(Math.random() * 6)],
        itemCount: 0,
      };

      setFolders([...folders, newFolder]);
      setIsCreateFolderOpen(false);
      setFolderName("");
      setSelectedIcon("folder-outline");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? DARK_SCREEN_BG : LIGHT_SCREEN_BG,
      }}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
        <View style={styles.header}>
          <Text style={{ ...styles.title, color: isDark ? "#fff" : "#22223b" }}>
            My Folders
          </Text>
          <View style={styles.headerActions}>
            <View style={styles.viewToggle}>
              <Pressable
                style={{
                  ...styles.viewToggleButton,
                  ...(viewMode === "grid" ? styles.viewToggleActive : {}),
                }}
                onPress={() => setViewMode("grid")}
              >
                <Ionicons
                  name='grid-outline'
                  size={16}
                  color={viewMode === "grid" ? "#fff" : "#666"}
                />
              </Pressable>
              <Pressable
                style={{
                  ...styles.viewToggleButton,
                  ...(viewMode === "list" ? styles.viewToggleActive : {}),
                }}
                onPress={() => setViewMode("list")}
              >
                <Ionicons
                  name='list-outline'
                  size={16}
                  color={viewMode === "list" ? "#fff" : "#666"}
                />
              </Pressable>
            </View>
            <Pressable
              style={styles.createButton}
              onPress={() => setIsCreateFolderOpen(true)}
            >
              <Ionicons name='add-outline' size={20} color='#fff' />
              <Text style={styles.createButtonText}>Create Folder</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.folderList}
          contentContainerStyle={styles.folderGridContent}
          showsVerticalScrollIndicator={false}
        >
          {viewMode === "grid"
            ? Array.from({ length: Math.ceil(folders.length / 2) }).map(
                (_, rowIdx) => (
                  <View style={styles.gridRow} key={folders[rowIdx].id}>
                    {folders.slice(rowIdx * 2, rowIdx * 2 + 2).map((folder) => (
                      <Pressable
                        style={styles.folderGridItem}
                        key={folder.id}
                        onPress={() => router.push(`/folder/${folder.id}`)}
                      >
                        <View
                          style={[
                            styles.folderCard,
                            {
                              backgroundColor: isDark
                                ? DARK_CARD_BG
                                : LIGHT_CARD_BG,
                              shadowColor: "#000",
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.iconContainer,
                              {
                                backgroundColor:
                                  ICON_BG_MAP[folder.color as string] ||
                                  folder.color,
                              },
                            ]}
                          >
                            <Ionicons
                              name={folder.icon as any}
                              size={20}
                              color={isDark ? "#22223b" : "#fff"}
                            />
                          </View>
                          <Text
                            style={[
                              styles.folderName,
                              { color: isDark ? "#fff" : "#22223b" },
                            ]}
                          >
                            {folder.name}
                          </Text>
                          <Text
                            style={[
                              styles.itemCount,
                              { color: isDark ? "#a1a1aa" : "#6b7280" },
                            ]}
                          >
                            {folder.itemCount} items
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                )
              )
            : folders.map((folder) => (
                <View style={styles.gridRow} key={folder.id}>
                  <Pressable
                    style={[styles.folderGridItem, { maxWidth: "100%" }]}
                    onPress={() => router.push(`/folder/${folder.id}`)}
                  >
                    <View
                      style={[
                        styles.folderCard,
                        {
                          backgroundColor: isDark
                            ? DARK_CARD_BG
                            : LIGHT_CARD_BG,
                          shadowColor: isDark ? "#000" : "#000",
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.iconContainer,
                          {
                            backgroundColor:
                              ICON_BG_MAP[folder.color as string] ||
                              folder.color,
                          },
                        ]}
                      >
                        <Ionicons
                          name={folder.icon as any}
                          size={20}
                          color={isDark ? "#22223b" : "#fff"}
                        />
                      </View>
                      <Text
                        style={[
                          styles.folderName,
                          { color: isDark ? "#fff" : "#22223b" },
                        ]}
                      >
                        {folder.name}
                      </Text>
                      <Text
                        style={[
                          styles.itemCount,
                          { color: isDark ? "#a1a1aa" : "#6b7280" },
                        ]}
                      >
                        {folder.itemCount} items
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ))}
        </ScrollView>

        <Modal
          visible={isCreateFolderOpen}
          animationType='slide'
          transparent={true}
          onRequestClose={() => setIsCreateFolderOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={{
                ...styles.modalContent,
                backgroundColor: isDark ? "#111" : "#fff",
              }}
            >
              <Text
                style={{
                  ...styles.modalTitle,
                  color: isDark ? "#fff" : "#000",
                }}
              >
                Create New Folder
              </Text>

              <View style={styles.form}>
                <Text
                  style={{ ...styles.label, color: isDark ? "#fff" : "#000" }}
                >
                  Folder Name
                </Text>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: isDark ? "#222" : "#f5f5f5",
                    color: isDark ? "#fff" : "#000",
                  }}
                  value={folderName}
                  onChangeText={setFolderName}
                  placeholder='Enter folder name'
                  placeholderTextColor={isDark ? "#666" : "#999"}
                />

                <Text
                  style={{ ...styles.label, color: isDark ? "#fff" : "#000" }}
                >
                  Select Icon
                </Text>
                <ScrollView
                  style={styles.iconGrid}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.iconGridContent}>
                    {ICONS.map((icon) => (
                      <Pressable
                        key={icon.name}
                        style={{
                          ...styles.iconItem,
                          ...(selectedIcon === icon.name
                            ? styles.iconItemSelected
                            : {}),
                        }}
                        onPress={() => setSelectedIcon(icon.name)}
                      >
                        <Ionicons
                          name={icon.name as any}
                          size={24}
                          color={
                            selectedIcon === icon.name ? "#6d28d9" : "#666"
                          }
                        />
                        <Text
                          style={{
                            ...styles.iconLabel,
                            color:
                              selectedIcon === icon.name ? "#6d28d9" : "#666",
                          }}
                        >
                          {icon.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>

                <View style={styles.modalActions}>
                  <Pressable
                    style={{ ...styles.modalButton, ...styles.cancelButton }}
                    onPress={() => setIsCreateFolderOpen(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      ...styles.modalButton,
                      ...styles.createButton,
                      ...(!folderName.trim() || isSubmitting
                        ? styles.createButtonDisabled
                        : {}),
                    }}
                    onPress={handleCreateFolder}
                    disabled={!folderName.trim() || isSubmitting}
                  >
                    <Text style={styles.createButtonText}>
                      {isSubmitting ? "Creating..." : "Create Folder"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerActions: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    padding: 2,
  },
  viewToggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewToggleActive: {
    backgroundColor: "#6d28d9",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6d28d9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  folderList: {
    flex: 1,
  },
  folderGridContent: {
    paddingBottom: 20,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },
  folderGridItem: {
    flex: 1,
    marginLeft: 0,
  },
  folderCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: "flex-start",
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 120,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  folderName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    fontWeight: "400",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  iconGrid: {
    maxHeight: 300,
  },
  iconGridContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 8,
  },
  iconItem: {
    width: "23%",
    marginBottom: 12,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 8,
  },
  iconItemSelected: {
    borderColor: "#6d28d9",
    backgroundColor: "#f3e8ff",
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
});
