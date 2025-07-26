import { Linking } from "react-native";

export const handleWebViewLink = symbol => {
  const formattedSymbol = symbol.replaceAll('-', '_');
  return Linking.openURL(
    `https://in.tradingview.com/chart/?symbol=NSE%3A${formattedSymbol}&interval=1D`,
  );
};
