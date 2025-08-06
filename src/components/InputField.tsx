import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { THEME } from "styles/Theme";

type InputFieldProps = {
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  keyboardType?: any;
  error?: boolean;
}

export function InputField({
  icon: Icon, 
  placeholder, 
  value, 
  onChangeText, 
  isPassword = false,
  keyboardType = 'default',
  error = false,
}: InputFieldProps) {

  const [showPassword, setShowPassword] = useState<boolean>(isPassword || false);

  return (
    <View style={[styles.inputContainer, { borderColor: error ? THEME.colors.red[500] : 'rgba(139, 92, 246, 0.3)' }]}>
      <Icon size={20} color={error ? THEME.colors.red[500] : "#8B5CF6"} style={styles.inputIcon} />
      <TextInput
        style={[styles.input, { color: error ? THEME.colors.red[500] : THEME.colors.font }]}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {placeholder.toLowerCase().includes('senha') && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword
            ? ( <EyeOff size={20} color="#666" /> )
            : ( <Eye size={20} color="#666" /> )
          }
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    paddingVertical: 10,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
})