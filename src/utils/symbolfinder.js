export function extractAlertDetails(body: string): { symbol: string | null; type: string | null } {
  let symbol: string | null = null;
  let type: string | null = null;

  // Normalize line breaks and remove extra whitespace
  const cleanedBody = body.replace(/\n/g, ' ').trim();

  // Pattern: e.g., "Buy Alert on BANKNIFTY-I Intraday", "SELL Alert on NTPC"
  const tradePattern = /on\s+([A-Z0-9\-]+)(?:\s+(Intraday|Swing))?/i;

  // Pattern: e.g., "symbol : Gold"
  const symbolPattern = /symbol\s*:\s*([A-Za-z0-9\-]+)/i;

  const tradeMatch = cleanedBody.match(tradePattern);
  const symbolMatch = cleanedBody.match(symbolPattern);

  if (tradeMatch) {
    symbol = tradeMatch[1];
    type = tradeMatch[2] || null;  // type might be undefined
  } else if (symbolMatch) {
    symbol = symbolMatch[1];
  }

  return { symbol, type };
}
