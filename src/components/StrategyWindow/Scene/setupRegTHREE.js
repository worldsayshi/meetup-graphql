
import * as THREE from 'three';

// Bonkers workaround: https://github.com/expo/expo-cli/issues/2059

global.THREE = global.THREE || THREE;