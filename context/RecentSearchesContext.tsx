import createContextHook from "@nkzw/create-context-hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useMemo } from "react";

const RECENT_SEARCHES_KEY = '@pharmacy-recent-searches';
const MAX_RECENT_SEARCHES = 10;

export interface RecentSearch {
    medecineId: number | string
    medecineName: string
    searchedAt: Date | number[] | string | number
}

export const [RecentSearchesContext, useRecentSearches] = createContextHook(() => {
    const queryClient = useQueryClient();

    const recentSearchesQuery = useQuery<RecentSearch[]>({
        queryKey: [RECENT_SEARCHES_KEY],
        queryFn: async () => {
            const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
            return stored ? JSON.parse(stored) as RecentSearch[] : [];
        }
    });

    const saveMutation = useMutation({
        mutationFn: async (searches: RecentSearch[]) => {
            await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
            return searches;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["recentSearches"], data);
        }
    })

    const { mutate: saveSearches } = saveMutation;

    const addRecentSearch = useCallback(
        (medecineId: number | string, medecineName: string) => {
            const currentSearches = recentSearchesQuery.data || [];
            const existingIndex = currentSearches.findIndex(s => s.medecineId === medecineId);

            let updatedSearches: RecentSearch[] = [];
            if (existingIndex !== -1) {
                updatedSearches = [
                    { medecineId, medecineName, searchedAt: Date.now() },
                    ...currentSearches.filter(s => s.medecineId !== medecineId)
                ]
            }else {
                updatedSearches = [
                    { medecineId, medecineName, searchedAt: Date.now() },
                    ...currentSearches
                ].slice(0, MAX_RECENT_SEARCHES);
            }

            saveSearches(updatedSearches);
        }
    , [recentSearchesQuery.data, saveSearches]);

    const clearRecentSearches = useCallback(() => {
        saveSearches([]);
    }, [saveSearches]);

    return useMemo(() => ({
        recentSearches: recentSearchesQuery.data || [],
        isLoading: recentSearchesQuery.isLoading,
        addRecentSearch,
        clearRecentSearches
    }), [
        recentSearchesQuery.data, 
        recentSearchesQuery.isLoading, 
        addRecentSearch, 
        clearRecentSearches
    ]);
})
