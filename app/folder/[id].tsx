import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  Image,
  Linking,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const LIGHT_SCREEN_BG = "#f7fafd";
const DARK_SCREEN_BG = "#18181b";
const LIGHT_CARD_BG = "#fff";
const DARK_CARD_BG = "#23232a";

// Mock folder data
const MOCK_FOLDERS = {
  "1": {
    name: "Recipes",
    icon: "restaurant-outline",
    color: "#fee2e2",
    items: [
      {
        id: "101",
        title: "Pasta Carbonara Recipe",
        url: "https://example.com/pasta",
        description:
          "Authentic Italian pasta carbonara recipe with eggs and pancetta",
        thumbnail: "https://images.unsplash.com/photo-1546549032-9571cd6b27df",
        date: "2024-05-01",
      },
      {
        id: "102",
        title: "Easy Chicken Curry",
        url: "https://example.com/curry",
        description: "Quick and simple chicken curry for weeknight dinners",
        thumbnail:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
        date: "2024-05-02",
      },
    ],
  },
  "2": {
    name: "Travel",
    icon: "airplane-outline",
    color: "#dbeafe",
    items: [],
  },
  "3": {
    name: "Articles",
    icon: "document-text-outline",
    color: "#dcfce7",
    items: [],
  },
  "4": {
    name: "Videos",
    icon: "videocam-outline",
    color: "#fef9c3",
    items: [],
  },
  "5": { name: "Shopping", icon: "cart-outline", color: "#f3e8ff", items: [] },
};

export default function FolderView() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  // Get folder data
  const folder = MOCK_FOLDERS[id as keyof typeof MOCK_FOLDERS] || {
    name: "Unknown Folder",
    icon: "folder-outline",
    color: "#e5e7eb",
    items: [],
  };
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [contentItems, setContentItems] = useState(folder.items);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddContent = () => {
    if (!url.trim() || !title.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const newContent = {
        id: Date.now().toString(),
        title: title.trim(),
        url: url.trim(),
        description: description.trim(),
        thumbnail:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
        date: new Date().toISOString(),
      };
      setContentItems([...contentItems, newContent]);
      setIsAddContentOpen(false);
      setUrl("");
      setTitle("");
      setDescription("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleDeleteContent = (contentId: string) => {
    setContentItems(contentItems.filter((item) => item.id !== contentId));
  };

  const renderContentCard = (item: any) => (
    <Pressable
      key={item.id}
      style={[
        styles.contentCard,
        {
          backgroundColor: isDark ? DARK_CARD_BG : LIGHT_CARD_BG,
          shadowColor: "#000",
        },
        viewMode === "grid" ? styles.contentCardGrid : styles.contentCardList,
      ]}
      onPress={() => Linking.openURL(item.url)}
    >
      {item.thumbnail && (
        <Image
          source={{ uri: item.thumbnail }}
          style={
            viewMode === "grid" ? styles.thumbnailGrid : styles.thumbnailList
          }
        />
      )}
      <View style={styles.contentInfo}>
        <Text
          style={[styles.contentTitle, { color: isDark ? "#fff" : "#22223b" }]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.contentDesc,
            { color: isDark ? "#a1a1aa" : "#6b7280" },
          ]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <Text
          style={[
            styles.contentDate,
            { color: isDark ? "#a1a1aa" : "#a1a1aa" },
          ]}
        >
          {item.date ? new Date(item.date).toLocaleDateString() : ""}
        </Text>
      </View>
      <View style={styles.contentActions}>
        <Pressable
          onPress={() => Linking.openURL(item.url)}
          style={styles.iconBtn}
        >
          <Ionicons
            name='open-outline'
            size={20}
            color={isDark ? "#fff" : "#6d28d9"}
          />
        </Pressable>
        <Pressable
          onPress={() => handleDeleteContent(item.id)}
          style={styles.iconBtn}
        >
          <Ionicons name='trash-outline' size={20} color='#ef4444' />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? DARK_SCREEN_BG : LIGHT_SCREEN_BG,
      }}
    >
      <Stack.Screen
        options={{
          title: folder.name,
          headerStyle: {
            backgroundColor: isDark ? DARK_SCREEN_BG : LIGHT_SCREEN_BG,
          },
          headerTintColor: isDark ? "#fff" : "#22223b",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <Ionicons
                name='arrow-back'
                size={24}
                color={isDark ? "#fff" : "#22223b"}
              />
            </Pressable>
          ),
        }}
      />
      <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
        <View style={styles.headerRow}>
          <View
            style={[styles.iconContainer, { backgroundColor: folder.color }]}
          >
            <Ionicons
              name={folder.icon as any}
              size={20}
              color={isDark ? "#22223b" : "#fff"}
            />
          </View>
          <View>
            <Text
              style={[
                styles.folderTitle,
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
              {contentItems.length}{" "}
              {contentItems.length === 1 ? "item" : "items"}
            </Text>
          </View>
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
              style={styles.addBtn}
              onPress={() => setIsAddContentOpen(true)}
            >
              <Ionicons name='add-outline' size={20} color='#fff' />
              <Text style={styles.addBtnText}>Add Content</Text>
            </Pressable>
          </View>
        </View>
        {contentItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text
              style={[
                styles.emptyText,
                { color: isDark ? "#a1a1aa" : "#6b7280" },
              ]}
            >
              This folder is empty
            </Text>
            <Pressable
              style={styles.addBtn}
              onPress={() => setIsAddContentOpen(true)}
            >
              <Ionicons name='add-outline' size={20} color='#fff' />
              <Text style={styles.addBtnText}>Add Content</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              viewMode === "grid" ? styles.gridContent : styles.listContent
            }
          >
            {viewMode === "grid"
              ? Array.from({ length: Math.ceil(contentItems.length / 2) }).map(
                  (_, rowIdx) => (
                    <View style={styles.gridRow} key={contentItems[rowIdx].id}>
                      {contentItems
                        .slice(rowIdx * 2, rowIdx * 2 + 2)
                        .map(renderContentCard)}
                    </View>
                  )
                )
              : contentItems.map((item) => (
                  <View style={styles.gridRow} key={item.id}>
                    <View style={[styles.folderGridItem, { maxWidth: "100%" }]}>
                      {renderContentCard(item)}
                    </View>
                  </View>
                ))}
          </ScrollView>
        )}
        <Modal
          visible={isAddContentOpen}
          animationType='slide'
          transparent={true}
          onRequestClose={() => setIsAddContentOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: isDark ? DARK_CARD_BG : LIGHT_CARD_BG },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  { color: isDark ? "#fff" : "#22223b" },
                ]}
              >
                Add Content
              </Text>
              <View style={styles.form}>
                <Text
                  style={[styles.label, { color: isDark ? "#fff" : "#22223b" }]}
                >
                  URL
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? "#222" : "#f5f5f5",
                      color: isDark ? "#fff" : "#000",
                    },
                  ]}
                  value={url}
                  onChangeText={setUrl}
                  placeholder='https://example.com'
                  placeholderTextColor={isDark ? "#666" : "#999"}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='url'
                />
                <Text
                  style={[styles.label, { color: isDark ? "#fff" : "#22223b" }]}
                >
                  Title
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? "#222" : "#f5f5f5",
                      color: isDark ? "#fff" : "#000",
                    },
                  ]}
                  value={title}
                  onChangeText={setTitle}
                  placeholder='Content title'
                  placeholderTextColor={isDark ? "#666" : "#999"}
                />
                <Text
                  style={[styles.label, { color: isDark ? "#fff" : "#22223b" }]}
                >
                  Description
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? "#222" : "#f5f5f5",
                      color: isDark ? "#fff" : "#000",
                      height: 80,
                    },
                  ]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder='Brief description of the content'
                  placeholderTextColor={isDark ? "#666" : "#999"}
                  multiline
                />
                <View style={styles.modalActions}>
                  <Pressable
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setIsAddContentOpen(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.modalButton,
                      styles.addBtn,
                      (!url.trim() || !title.trim() || isSubmitting) &&
                        styles.addBtnDisabled,
                    ]}
                    onPress={handleAddContent}
                    disabled={!url.trim() || !title.trim() || isSubmitting}
                  >
                    <Text style={styles.addBtnText}>
                      {isSubmitting ? "Adding..." : "Add Content"}
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
  content: { flex: 1, padding: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  folderTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginRight: 8,
  },
  itemCount: {
    fontSize: 14,
    fontWeight: "400",
    marginRight: 8,
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
    alignItems: "center",
    gap: 8,
  },
  viewToggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewToggleActive: {
    backgroundColor: "#6d28d9",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6d28d9",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginLeft: 8,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  addBtnDisabled: {
    opacity: 0.5,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 16,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 16,
  },
  gridContent: {
    paddingBottom: 20,
  },
  listContent: {
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
    maxWidth: "48%",
    marginLeft: 0,
  },
  contentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contentCardGrid: {
    flex: 1,
    maxWidth: "48%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
  },
  contentCardList: {
    flex: 1,
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  thumbnailGrid: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailList: {
    width: 60,
    height: 48,
    borderRadius: 8,
    marginRight: 10,
  },
  contentInfo: {
    flex: 1,
    minWidth: 0,
    marginBottom: 2,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  contentDesc: {
    fontSize: 14,
    marginBottom: 2,
  },
  contentDate: {
    fontSize: 12,
    marginTop: 2,
  },
  contentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: "100%",
    justifyContent: "flex-end",
  },
  iconBtn: {
    padding: 6,
    borderRadius: 6,
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
});
