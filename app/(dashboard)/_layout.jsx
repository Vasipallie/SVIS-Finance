import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const Dashlayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarStyle: { backgroundColor: '#1c0a26', borderTopColor: '#330033' },
      tabBarActiveTintColor: '#ff5800',
      tabBarInactiveTintColor: '#888888',
      height: 30,
      tabBarLabelStyle: { fontSize: 12, fontFamily: 'GSans', marginBottom: 5  },
    }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarLabel: 'Home', tabBarIcon: ({ focused}) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={focused ? '#ff5800' : '#888888'} /> }} />
      {/* <Tabs.Screen name="cards" options={{ title: 'Cards', tabBarLabel: 'Cards', tabBarIcon: ({ focused}) => <Ionicons name={focused ? "card" : "card-outline"} size={24} color={focused ? '#ff5800' : '#888888'} />  }} /> */}
      <Tabs.Screen name="txn" options={{ title: 'Transactions', tabBarLabel: 'Transactions', tabBarIcon: ({ focused}) => <Ionicons name={focused ? "list" : "list-outline"} size={24} color={focused ? '#ff5800' : '#888888'} /> }} />
      <Tabs.Screen name="txnadd" options={{ title: 'Add Transaction', tabBarLabel: 'Add Txn', tabBarIcon: ({ focused}) => <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={24} color={focused ? '#ff5800' : '#888888'} />  }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarLabel: 'Settings', tabBarIcon: ({ focused}) => <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={focused ? '#ff5800' : '#888888'} />  }} />
      
      </Tabs>
  )} 
export default Dashlayout 