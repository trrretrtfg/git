import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View, BackHandler, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';
import ZIKRA_HTML from '../src/zikraHtml';

const APP_ID = Constants.expoConfig?.extra?.oneSignalAppId;

export default function HomeScreen() {
  const [ready, setReady] = useState(false);
  const [webRef, setWebRef] = useState(null);

  useEffect(() => {
    if (APP_ID) {
      OneSignal.initialize(APP_ID);
    }
  }, []);

  const enableNotifications = useCallback(async () => {
    try {
      await OneSignal.Notifications.requestPermission(true);
    } catch (error) {
      console.warn('OneSignal permission request failed:', error);
    }
  }, []);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (webRef) {
        webRef.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [webRef]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.webArea}>
        <WebView
          ref={setWebRef}
          source={{ html: ZIKRA_HTML, baseUrl: 'https://zikra.local' }}
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          allowFileAccess
          allowUniversalAccessFromFileURLs
          mixedContentMode="always"
          setSupportMultipleWindows={false}
          onLoadEnd={() => setReady(true)}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#202820" />
              <Text style={styles.loadingText}>جاري فتح ذِكرى...</Text>
            </View>
          )}
          style={styles.web}
        />
        {!ready && <View pointerEvents="none" style={styles.loadingCover} />}
      </View>
      <Pressable style={styles.notifyButton} onPress={enableNotifications}>
        <Text style={styles.notifyText}>تفعيل إشعارات ذِكرى</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  webArea: { flex: 1 },
  web: { flex: 1, backgroundColor: '#ffffff' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' },
  loadingCover: { ...StyleSheet.absoluteFillObject, backgroundColor: '#ffffff' },
  loadingText: { marginTop: 12, color: '#333333', fontSize: 14 },
  notifyButton: {
    marginHorizontal: 14, marginTop: 7, marginBottom: Platform.OS === 'android' ? 7 : 4,
    paddingVertical: 12, borderRadius: 14, backgroundColor: '#202820', alignItems: 'center'
  },
  notifyText: { color: '#ffffff', fontSize: 13, fontWeight: '600' }
});
