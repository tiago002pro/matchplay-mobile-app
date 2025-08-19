import { View, StyleSheet, FlatList, Text } from "react-native";
import { IGamerPeriod, IPeriod } from "../interfaces/IPerson";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "native-base";

type DaysOfTheWeekType = {
  id: string;
  key: string;
  name: string;
}

type GamerPeriodProps = {
  gamerPeriod:IGamerPeriod;
  setGamerPeriod:any;
  pointerEvents:any
}

export function GamerPeriod({ gamerPeriod, setGamerPeriod, pointerEvents }:GamerPeriodProps) {
  const updatePeriod = (day: keyof IGamerPeriod, period: keyof IPeriod, value: boolean) => {
    setGamerPeriod((prev:any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: !value
      }
    }))
  }

  return(
    <View style={GamerPeriodStyles.container} pointerEvents={pointerEvents}>
      <GamerPeriodTable
        gamerPeriod={gamerPeriod}
        updatePeriod={updatePeriod}
      />
    </View>
  )
}

const GamerPeriodStyles = StyleSheet.create({
  container: {},
});

export function GamerPeriodTable({ gamerPeriod, updatePeriod }:any) {
  const daysOfTheWeek:DaysOfTheWeekType[] = [
    { id: '1', key: 'monday',    name: 'Segunda-feira' },
    { id: '2', key: 'tuesday',   name: 'Terça-feira'   },
    { id: '3', key: 'wednesday', name: 'Quarta-feira'  },
    { id: '4', key: 'thursday',  name: 'Quinta-feira'  },
    { id: '5', key: 'friday',    name: 'Sexta-feira'   },
    { id: '6', key: 'saturday',  name: 'Sábado'        },
    { id: '7', key: 'sunday',    name: 'Domingo'       },
  ]

  return(
    <LinearGradient
      colors={['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.1)']}
      style={gamerPeriodTablestyles.profileCardGradient}
    >
      <View style={gamerPeriodTablestyles.table}>
        <View style={gamerPeriodTablestyles.row}>
          <View style={gamerPeriodTablestyles.dayWeekCell}></View>

          <View style={gamerPeriodTablestyles.period}>
            <View style={gamerPeriodTablestyles.headerCell}>
              <Text style={gamerPeriodTablestyles.header}>Manhã</Text>
            </View>

            <View style={gamerPeriodTablestyles.headerCell}>
              <Text style={gamerPeriodTablestyles.header}>Tarde</Text>
            </View>

            <View style={gamerPeriodTablestyles.headerCell}>
              <Text style={gamerPeriodTablestyles.header}>Noite</Text>
            </View>
          </View>
        </View>
        

        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled={false}
          data={daysOfTheWeek}
          keyExtractor={(data:any) => data.id}
          renderItem={({ item, index }) =>
            <View style={[{ marginBottom: 10 }, index === daysOfTheWeek.length - 1 && { marginBottom: 0 }]}>
              <GamerPeriodRow
                daysOfTheWeek={item}
                gamerPeriod={gamerPeriod}
                updatePeriod={updatePeriod}
              />
            </View>
          }
        />
      </View>
    </LinearGradient>
  );
}

const gamerPeriodTablestyles = StyleSheet.create({
  profileCardGradient: {
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 20,
  },
  table: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
  },
  dayWeekCell: {
    width: 120,
  },
  period: {
    flexDirection: "row",
    gap: 10,
    display: `flex`,
    justifyContent: `center`,
    marginBottom: 15,
  },
  headerCell: {
  },
  header: {
    width: 50,
    color: '#FFF',
  },
});

export function GamerPeriodRow({ daysOfTheWeek, gamerPeriod, updatePeriod }:any) {
  const period = [
    {id: "1", name: "morning"},
    {id: "2", name: "afternoon"},
    {id: "3", name: "night"},
  ]

  return(
    <View style={gamerPeriodRowStyles.row}>
      <View style={gamerPeriodRowStyles.dayWeekCell}>
        <Text style={gamerPeriodRowStyles.dayWeek}>{daysOfTheWeek.name}</Text>
      </View>

      <FlatList
        scrollEnabled={false}
        nestedScrollEnabled={false}
        style={gamerPeriodRowStyles.period}
        data={period}
        keyExtractor={(data:any) => data.id}
        renderItem={({ item }) =>
          <View style={gamerPeriodRowStyles.cell}>
            <Button
              style={[
                gamerPeriodRowStyles.btn,
                gamerPeriod[daysOfTheWeek.key][item.name] && gamerPeriodRowStyles.btnActive,
                !gamerPeriod[daysOfTheWeek.key][item.name] && gamerPeriodRowStyles.btnDisable,
              ]}
              onPress={() => updatePeriod(daysOfTheWeek.key, item.name, gamerPeriod[daysOfTheWeek.key][item.name])}
            />
          </View>
        }
      />
    </View>
  );
}

const gamerPeriodRowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  dayWeekCell: {
    width: 120,
  },
  dayWeek: {
    color: '#FFF',
  },
  period: {
    display: `flex`,
    flexDirection: "row",
    gap: 10,
    justifyContent: 'center'
  },
  cell: {
  },
  btn: {
    width: 50,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
  },
  btnActive: {
    opacity: 1,
  },
  btnDisable: {
    opacity: .4,
  },
});
