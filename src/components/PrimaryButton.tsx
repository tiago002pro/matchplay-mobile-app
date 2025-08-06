import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

type PrimaryButtonProps = {
  label?: string;
  action?: any;
  loading?: boolean;
}

export function PrimaryButton({ label, action, loading }:PrimaryButtonProps) {
  return (
    <TouchableOpacity 
      onPress={action} 
      style={[styles.authButton, loading && styles.disabledButton]}
      disabled={loading}
    >
      <LinearGradient
        colors={loading ? ['#666', '#666'] : ['#8B5CF6', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.authButtonGradient}
      >
        {loading
          ? ( <ActivityIndicator size="small" color="#FFFFFF" /> )
          : ( <Text style={styles.authButtonText}>{ label }</Text>)
        }
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  authButton: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  authButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  disabledButton: {
    opacity: 0.6,
  },
})