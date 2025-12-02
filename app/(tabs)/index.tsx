import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, TextInput, Animated, TouchableOpacity, FlatList } from "react-native";
import { useRecentSearches } from "@/context/RecentSearchesContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useMemo, useRef, useState } from "react";
import colors from "@/constants/colors";
import { ChevronRight, Clock, Search, X } from "lucide-react-native";
import { Medicine, medicines } from "@/api/medecine";

export default function HomePage() {
  const router = useRouter();
  const { recentSearches, addRecentSearch } = useRecentSearches();
  const inset = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const searchInputRef = useRef<TextInput>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const filteredMedications = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim()
    return medicines.filter((medicine) => {
      return medicine.name.toLowerCase().includes(query) ||
        medicine.genericName.toLowerCase().includes(query) ||
        medicine.category.toLowerCase().includes(query)
    })
  }, [searchQuery])

  const recentMedications = useMemo(() => {
    return recentSearches
      .map(search => medicines.find(m => m.id === search.medecineId))
      .filter((medicine): medicine is Medicine => medicine !== undefined);
  }, [recentSearches]);

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 7
    }).start();
  }, [isFocused, animatedValue]);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.ligth.border, colors.ligth.primary]
  })

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  }

  const handleMedecineSelect = (medecine: Medicine) => {
    addRecentSearch(medecine.id as string, medecine.name);
    router.push({
      pathname: '/pharmacy-results',
      params: {
        medecineId: medecine.id,
      }
    });
  }

  const renderMedecineItem = ({ item }: { item: Medicine }) => (
    <TouchableOpacity style={styles.medecinItem} onPress={() => handleMedecineSelect(item)}>
      <View style={styles.medecinInfo}>
      <Text style={styles.medecinText}>{item.name}</Text>
        <Text style={styles.medecinGeneric}>{item.genericName}</Text>
      </View>
      <ChevronRight size={20} color={colors.ligth.textTertiary} />
    </TouchableOpacity>
  )

  const renderRecentItem = ({ item }: { item: Medicine }) => (
    <TouchableOpacity style={styles.recentItem} onPress={() => handleMedecineSelect(item)}>
      <Clock size={18} color={colors.ligth.textSecondary} />
      <View style={styles.recentInfo}>
        <Text style={styles.recentName}>{item.name}</Text>
        <Text style={styles.recentGeneric}>{item.genericName}</Text>
      </View>
      <ChevronRight size={20} color={colors.ligth.textTertiary} />
    </TouchableOpacity>
  )

  return(
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: inset.top + 20 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bienvenue sur Medipharm</Text>
          <Text style={styles.headerSubtitle}>Rechercher et localiser vos médicaments</Text>
        </View>

        <Animated.View style={[styles.searchContainer, {borderColor: borderColor}]}>
          <Search size={20} color={colors.ligth.textSecondary} />
          <TextInput 
            ref={searchInputRef}
            style={styles.searchInput} 
            placeholder="Nom du médicament..."
            placeholderTextColor={colors.ligth.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color={colors.ligth.textSecondary} />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      {searchQuery.trim() ? (
        <View style={styles.content}>
          {filteredMedications.length > 0 ? (
            <>
            <Text style={styles.sectionTitle}>résultat{filteredMedications.length > 1 ? 's' : ''}</Text>
            <FlatList 
              data={filteredMedications}
              renderItem={renderMedecineItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
            </>
          ): (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Aucun médicament trouvé</Text>
              <Text style={styles.emptyStateSubtitle}>Essayez une autre recherche ou vérifier l&apos;orthographe</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.content}>
          {recentSearches.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>Recherches récentes</Text>
              <FlatList 
                data={recentMedications} 
                renderItem={renderRecentItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            </>
          ): (
            <View style={styles.emptyState}>
              <Search size={48} color={colors.ligth.textTertiary} />
              <Text style={styles.emptyStateText}>Commencer à rechercher</Text>
              <Text style={styles.emptyStateSubtitle}>Entrer le nom d&apos;un médicament pour trouver les pharmacies proches où il est disponible</Text>
            </View>
          )}
        </View>
      )}
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ligth.background,
  },
  header: {
    backgroundColor: colors.ligth.primary,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.ligth.surface,
    marginBottom: 6
  },
  headerSubtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ligth.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.ligth.text,
    marginLeft: 12,
    paddingVertical: 0
  },
  clearButton: {
    padding: 4
  },
  content: {
    flex: 1,
    paddingTop: 16
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.ligth.textSecondary,
    transform: 'uppercase',
    letterSpacing: .5,
    paddingHorizontal: 20,
    marginBottom: 12
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  medecinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ligth.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: colors.ligth.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  medecinInfo: {
    flex: 1,
  },
  medecinText: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: colors.ligth.text,
    marginBottom: 4
  },
  medecinGeneric: {
    fontSize: 14,
    color: colors.ligth.textSecondary
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12
  },
  recentName: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: colors.ligth.text,
    marginBottom: 2
  },
  recentGeneric: {
    fontSize: 13,
    color: colors.ligth.textSecondary
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ligth.surface,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.ligth.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8
  },
  emptyStateSubtitle: {
    fontSize: 15,
    color: colors.ligth.textSecondary,
    textAlign: 'center',
    lineHeight: 22
  },
});
