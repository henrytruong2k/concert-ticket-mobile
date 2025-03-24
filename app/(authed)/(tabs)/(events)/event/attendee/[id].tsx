import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import { VStack } from "@/components/VStack";
import { eventService } from "@/services/events";
import { Event } from "@/types/event";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function EventAttendeeDetailScreen() {
    // ... (các phần khác của component)

    return (
        <ScrollView style={styles.container}>
            <VStack m={20} gap={20} justifyContent="center" alignItems="center">
                <View style={styles.card}>
                    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradient}>
                        <Ionicons name="film-outline" size={30} color="white" />
                        <Text style={styles.title}>Tên sự kiện</Text>
                        <Text style={styles.content}>{eventData?.name}</Text>
                    </LinearGradient>
                </View>

                {/* Các card tương tự cho Địa điểm, Ngày tổ chức và Giá vé */}

                <View style={styles.imageCard}>
                    <Image source={{ uri: eventData?.image }} style={styles.image} resizeMode="cover" />
                </View>
            </VStack>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    card: {
        width: '90%',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    gradient: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 8 },
    content: { fontSize: 20, color: 'white', textAlign: 'center' },
    imageCard: {
        width: '90%',
        height: 250,
        overflow: 'hidden',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
});