import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { CustomTheme } from "../../app/themes/Theme";
import { useTheme } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface ChartData {
  labels: string[];
  datasets: { data: number[] }[];
}

interface SpendingChartProps {
  data: ChartData;
  activeTab: "spending" | "income" | "bills" | "savings";
}

export const SpendingChart = ({ data, activeTab }: SpendingChartProps) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View
      style={[
        styles.chartContainer,
        {
          backgroundColor: colors.modalBackgroun,
          borderRadius: 16,
          borderBottomWidth: 2,
          borderColor: colors.primary,
        },
      ]}
    >
      <BarChart
        data={{
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              colors: data.datasets[0].data.map(
                (_, index) => () =>
                  index % 2 === 0 ? colors.primary : "#FFD700"
              ),
            },
          ],
        }}
        width={width - 60}
        height={180}
        withInnerLines={false}
        showValuesOnTopOfBars={true}
        yAxisLabel="$"
        yAxisSuffix=""
        fromZero
        showBarTops={false}
        withCustomBarColorFromData={true}
        flatColor={true}
        chartConfig={{
          paddingRight: 30,
          backgroundColor: colors.modalBackgroun,
          backgroundGradientFrom: colors.modalBackgroun,
          backgroundGradientTo: colors.modalBackgroun,
          decimalPlaces: 0,
          color: (opacity = 1) => colors.textPrimary,
          labelColor: (opacity = 1) => colors.textPrimary,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.9,
          formatTopBarValue: (value) => `$ ${value}`,
          propsForLabels: {
            fontSize: 10,
          },
        }}
        style={{
          marginLeft: -10,
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 20,
    padding: 10,
  },
});